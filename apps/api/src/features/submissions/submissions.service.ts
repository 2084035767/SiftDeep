import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission, SubmissionStatus } from './entities/submission.entity';
import { VideosService } from '@/features/videos/videos.service';
import { User } from '@/features/users/entities/user.entity';

/**
 * 投稿服务 - 管理用户投稿的审核流程
 */
@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    private readonly videosService: VideosService,
  ) {}

  /**
   * 通过 BV 号查找投稿
   */
  async findByBvId(bvId: string): Promise<Submission | null> {
    return await this.submissionRepository.findOne({
      where: { bvId },
      relations: ['video'],
    });
  }

  /**
   * 创建投稿
   */
  async createSubmission(
    userId: string,
    bvId: string,
    reason: string,
    category: string,
  ): Promise<Submission> {
    // 验证 BV 号并获取视频信息
    await this.videosService.findByBvId(bvId);

    const submission = this.submissionRepository.create({
      bvId,
      reason,
      category,
      submitter: { id: userId } as User,
    });

    return await this.submissionRepository.save(submission);
  }

  /**
   * 获取用户投稿列表
   */
  async findUserSubmissions(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: Submission[]; total: number }> {
    const query = this.submissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.video', 'video')
      .where('submission.submitterId = :userId', { userId })
      .orderBy('submission.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 获取投稿详情
   */
  async findOne(id: string): Promise<Submission> {
    const submission = await this.submissionRepository.findOne({
      where: { id },
      relations: ['submitter', 'video'],
    });

    if (!submission) {
      throw new NotFoundException('投稿不存在');
    }

    return submission;
  }

  /**
   * 审核投稿（通过/拒绝）
   */
  async reviewSubmission(
    id: string,
    reviewerId: string,
    status: SubmissionStatus.APPROVED | SubmissionStatus.REJECTED,
    note?: string,
  ): Promise<Submission> {
    const submission = await this.findOne(id);

    submission.status = status;
    submission.reviewerId = reviewerId;
    submission.reviewedAt = new Date();
    if (note) {
      submission.reviewNote = note;
    }

    // 如果通过审核，将视频标记为精选
    if (status === SubmissionStatus.APPROVED) {
      await this.videosService.markAsFeatured(submission.bvId);
    }

    return await this.submissionRepository.save(submission);
  }

  /**
   * 获取待审核投稿列表
   */
  async findPendingSubmissions(
    page = 1,
    limit = 20,
  ): Promise<{ data: Submission[]; total: number }> {
    const query = this.submissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.submitter', 'submitter')
      .leftJoinAndSelect('submission.video', 'video')
      .where('submission.status = :status', {
        status: SubmissionStatus.PENDING,
      })
      .orderBy('submission.createdAt', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 标记为复审（负反馈触发）
   */
  async markForReview(id: string): Promise<Submission> {
    const submission = await this.findOne(id);
    submission.status = SubmissionStatus.UNDER_REVIEW;
    submission.isNegativeFeedback = true;
    return await this.submissionRepository.save(submission);
  }

  /**
   * 删除投稿
   */
  async remove(id: string): Promise<void> {
    const submission = await this.findOne(id);
    await this.submissionRepository.remove(submission);
  }
}
