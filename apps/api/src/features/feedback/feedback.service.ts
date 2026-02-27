import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Feedback,
  FeedbackStatus,
  FeedbackType,
} from './entities/feedback.entity';
import { User } from '@/features/users/entities/user.entity';
import { VideosService } from '@/features/videos/videos.service';
import { SubmissionsService } from '@/features/submissions/submissions.service';

/**
 * 反馈服务
 */
@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly videosService: VideosService,
    private readonly submissionsService: SubmissionsService,
  ) {}

  /**
   * 创建反馈
   */
  async createFeedback(
    reporterId: string,
    bvId: string,
    type: FeedbackType,
    reason: string,
    description?: string,
    isAnonymous: boolean = false,
  ): Promise<Feedback> {
    // 获取或创建视频
    const video = await this.videosService.findByBvId(bvId);

    const feedback = this.feedbackRepository.create({
      type,
      reason,
      description,
      isAnonymous,
      reporter: { id: reporterId } as User,
      video,
    });

    const savedFeedback = await this.feedbackRepository.save(feedback);

    // 如果是低质量反馈，标记相关投稿为复审
    if (type === FeedbackType.LOW_QUALITY) {
      const submission = await this.submissionsService.findByBvId(bvId);
      if (submission) {
        await this.submissionsService.markForReview(submission.id);
      }
    }

    return savedFeedback;
  }

  /**
   * 获取反馈详情
   */
  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['reporter', 'video'],
    });

    if (!feedback) {
      throw new NotFoundException('反馈不存在');
    }

    return feedback;
  }

  /**
   * 获取用户的反馈列表
   */
  async findUserFeedbacks(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: Feedback[]; total: number }> {
    const query = this.feedbackRepository
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.video', 'video')
      .where('feedback.reporterId = :userId', { userId })
      .orderBy('feedback.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 获取待处理反馈列表（管理员）
   */
  async findPendingFeedbacks(
    page = 1,
    limit = 20,
  ): Promise<{ data: Feedback[]; total: number }> {
    const query = this.feedbackRepository
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.reporter', 'reporter')
      .leftJoinAndSelect('feedback.video', 'video')
      .where('feedback.status = :status', { status: FeedbackStatus.PENDING })
      .orderBy('feedback.createdAt', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 处理反馈
   */
  async handleFeedback(
    id: string,
    handlerId: string,
    status: FeedbackStatus,
    note?: string,
  ): Promise<Feedback> {
    const feedback = await this.findOne(id);

    feedback.status = status;
    feedback.handlerId = handlerId;
    if (note) {
      feedback.handlerNote = note;
    }
    feedback.handledAt = new Date();

    // 如果标记为已解决且是版权问题，可能需要下架视频
    if (
      status === FeedbackStatus.RESOLVED &&
      feedback.type === FeedbackType.COPYRIGHT
    ) {
      // TODO: 实现视频下架逻辑
    }

    return await this.feedbackRepository.save(feedback);
  }

  /**
   * 获取视频的反馈统计
   */
  async getVideoFeedbackStats(bvId: string): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
  }> {
    const video = await this.videosService.findByBvId(bvId);

    const feedbacks = await this.feedbackRepository.find({
      where: { video: { id: video.id } },
    });

    const byType = {};
    const byStatus = {};

    feedbacks.forEach((f) => {
      byType[f.type] = (byType[f.type] || 0) + 1;
      byStatus[f.status] = (byStatus[f.status] || 0) + 1;
    });

    return {
      total: feedbacks.length,
      byType,
      byStatus,
    };
  }

  /**
   * 删除反馈
   */
  async remove(id: string): Promise<void> {
    const feedback = await this.findOne(id);
    await this.feedbackRepository.remove(feedback);
  }
}
