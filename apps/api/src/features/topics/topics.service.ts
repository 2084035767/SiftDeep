import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic, TopicType } from './entities/topic.entity';
import { TopicVideo } from './entities/topic-video.entity';
import { User } from '@/features/users/entities/user.entity';
import { VideosService } from '@/features/videos/videos.service';

/**
 * 专题服务
 */
@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(TopicVideo)
    private readonly topicVideoRepository: Repository<TopicVideo>,
    private readonly videosService: VideosService,
  ) {}

  /**
   * 创建专题
   */
  async createTopic(
    creatorId: string,
    title: string,
    description: string,
    type:
      | 'educational'
      | 'documentary'
      | 'tutorial'
      | 'analysis'
      | 'other' = 'other',
    category?: string,
  ): Promise<Topic> {
    const topic = this.topicRepository.create({
      title,
      description,
      type: TopicType[type.toUpperCase()],
      category,
      creator: { id: creatorId },
    });

    return await this.topicRepository.save(topic);
  }

  /**
   * 获取专题详情
   */
  async findOne(id: string): Promise<Topic> {
    const topic = await this.topicRepository.findOne({
      where: { id },
      relations: ['creator', 'topicVideos', 'topicVideos.video'],
    });

    if (!topic) {
      throw new NotFoundException('专题不存在');
    }

    return topic;
  }

  /**
   * 获取专题列表
   */
  async findAll(options: {
    page?: number;
    limit?: number;
    type?: string;
    category?: string;
    isPublished?: boolean;
  }): Promise<{ data: Topic[]; total: number }> {
    const {
      page = 1,
      limit = 20,
      type,
      category,
      isPublished = true,
    } = options;

    const query = this.topicRepository
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.creator', 'creator')
      .leftJoinAndSelect('topic.topicVideos', 'topicVideos')
      .leftJoinAndSelect('topicVideos.video', 'video');

    if (type) {
      query.andWhere('topic.type = :type', { type });
    }

    if (category) {
      query.andWhere('topic.category = :category', { category });
    }

    if (isPublished !== undefined) {
      query.andWhere('topic.isPublished = :isPublished', { isPublished });
    }

    query
      .orderBy('topic.publishedAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 获取用户创建的专题列表
   */
  async findUserTopics(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: Topic[]; total: number }> {
    const query = this.topicRepository
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.topicVideos', 'topicVideos')
      .where('topic.creatorId = :userId', { userId })
      .orderBy('topic.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 添加视频到专题
   */
  async addVideoToTopic(
    topicId: string,
    bvId: string,
    userId: string,
    introduction?: string,
    isRequired: boolean = false,
  ): Promise<TopicVideo> {
    const topic = await this.findOne(topicId);

    if (topic.creator.id !== userId) {
      throw new ForbiddenException('无权修改此专题');
    }

    // 获取或创建视频
    const video = await this.videosService.findByBvId(bvId);

    // 检查是否已存在
    const existing = await this.topicVideoRepository.findOne({
      where: {
        topic: { id: topicId },
        video: { id: video.id },
      },
    });

    if (existing) {
      throw new ForbiddenException('视频已在专题中');
    }

    // 获取最大排序值
    const maxOrder = await this.topicVideoRepository
      .createQueryBuilder('tv')
      .where('tv.topicId = :topicId', { topicId })
      .select('MAX(tv.order)', 'maxOrder')
      .getRawOne()
      .then((r) => r?.maxOrder || 0);

    const topicVideo = this.topicVideoRepository.create({
      topic: { id: topicId } as Topic,
      video,
      order: maxOrder + 1,
      introduction,
      isRequired,
    });

    // 更新专题视频数量
    topic.videoCount += 1;
    await this.topicRepository.save(topic);

    return await this.topicVideoRepository.save(topicVideo);
  }

  /**
   * 从专题移除视频
   */
  async removeVideoFromTopic(
    topicId: string,
    topicVideoId: string,
    userId: string,
  ): Promise<void> {
    const topic = await this.findOne(topicId);

    if (topic.creator.id !== userId) {
      throw new ForbiddenException('无权修改此专题');
    }

    const topicVideo = await this.topicVideoRepository.findOne({
      where: { id: topicVideoId },
    });

    if (!topicVideo) {
      throw new NotFoundException('专题视频不存在');
    }

    await this.topicVideoRepository.remove(topicVideo);

    // 更新专题视频数量
    topic.videoCount = Math.max(0, topic.videoCount - 1);
    await this.topicRepository.save(topic);
  }

  /**
   * 更新专题
   */
  async updateTopic(
    id: string,
    userId: string,
    updates: {
      title?: string;
      description?: string;
      type?: 'educational' | 'documentary' | 'tutorial' | 'analysis' | 'other';
      category?: string;
      estimatedReadTime?: number;
      articleCount?: number;
      resources?: string[];
      isPublished?: boolean;
    },
  ): Promise<Topic> {
    const topic = await this.findOne(id);

    if (topic.creator.id !== userId) {
      throw new ForbiddenException('无权修改此专题');
    }

    Object.assign(topic, updates);

    if (updates.isPublished && !topic.publishedAt) {
      topic.publishedAt = new Date();
    }

    return await this.topicRepository.save(topic);
  }

  /**
   * 删除专题
   */
  async deleteTopic(id: string, userId: string): Promise<void> {
    const topic = await this.findOne(id);

    if (topic.creator.id !== userId) {
      throw new ForbiddenException('无权删除此专题');
    }

    await this.topicRepository.remove(topic);
  }

  /**
   * 发布/取消发布专题
   */
  async togglePublish(id: string, userId: string): Promise<Topic> {
    const topic = await this.findOne(id);

    if (topic.creator.id !== userId) {
      throw new ForbiddenException('无权操作此专题');
    }

    topic.isPublished = !topic.isPublished;
    if (topic.isPublished && !topic.publishedAt) {
      topic.publishedAt = new Date();
    }

    return await this.topicRepository.save(topic);
  }

  /**
   * 更新专题视频排序
   */
  async updateTopicVideoOrder(
    topicId: string,
    topicVideoId: string,
    newOrder: number,
    userId: string,
  ): Promise<TopicVideo> {
    const topic = await this.findOne(topicId);

    if (topic.creator.id !== userId) {
      throw new ForbiddenException('无权修改此专题');
    }

    const topicVideo = await this.topicVideoRepository.findOne({
      where: { id: topicVideoId },
    });

    if (!topicVideo) {
      throw new NotFoundException('专题视频不存在');
    }

    topicVideo.order = newOrder;
    return await this.topicVideoRepository.save(topicVideo);
  }
}
