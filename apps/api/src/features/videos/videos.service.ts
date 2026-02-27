import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { BilibiliService } from '@/features/bilibili/bilibili.service';

/**
 * 视频服务 - 管理视频索引的 CRUD 操作
 */
@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly bilibiliService: BilibiliService,
  ) {}

  /**
   * 通过 BV 号获取或创建视频
   */
  async findByBvId(bvId: string): Promise<Video> {
    let video = await this.videoRepository.findOne({ where: { bvId } });

    if (!video) {
      // 从 B 站 API 获取视频信息
      const videoInfo = await this.bilibiliService.getVideoInfo(bvId);

      video = this.videoRepository.create({
        bvId: videoInfo.bvId,
        title: videoInfo.title,
        description: videoInfo.description,
        coverUrl: videoInfo.coverUrl,
        duration: videoInfo.duration,
        authorName: videoInfo.authorName,
        playCount: videoInfo.playCount,
        likeCount: videoInfo.likeCount,
        coinCount: videoInfo.coinCount,
        favoriteCount: videoInfo.favoriteCount,
        category: videoInfo.category,
        tags: videoInfo.tags,
        bilibiliUrl: videoInfo.bilibiliUrl,
      });

      await this.videoRepository.save(video);
    }

    return video;
  }

  /**
   * 获取视频详情
   */
  async findOne(id: string): Promise<Video> {
    const video = await this.videoRepository.findOne({ where: { id } });
    if (!video) {
      throw new NotFoundException('视频不存在');
    }
    return video;
  }

  /**
   * 获取精选视频列表
   */
  async findFeatured(limit = 10): Promise<Video[]> {
    return await this.videoRepository.find({
      where: { isFeatured: true },
      order: { featuredAt: 'DESC', createdAt: 'DESC' },
      take: limit,
    });
  }

  /**
   * 获取视频列表（支持分页和筛选）
   */
  async findAll(options: {
    page?: number;
    limit?: number;
    category?: string;
    tags?: string[];
    sortBy?: 'createdAt' | 'playCount' | 'rating' | 'featuredAt';
    sortOrder?: 'ASC' | 'DESC';
  }): Promise<{ data: Video[]; total: number }> {
    const {
      page = 1,
      limit = 20,
      category,
      tags,
      sortBy = 'featuredAt',
      sortOrder = 'DESC',
    } = options;

    const query = this.videoRepository.createQueryBuilder('video');

    if (category) {
      query.andWhere('video.category = :category', { category });
    }

    if (tags && tags.length > 0) {
      query.andWhere('video.tags && :tags', { tags });
    }

    query.orderBy(`video.${sortBy}`, sortOrder);
    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total };
  }

  /**
   * 更新视频信息（从 B 站 API 同步）
   */
  async syncVideoInfo(bvId: string): Promise<Video> {
    const video = await this.findByBvId(bvId);
    const videoInfo = await this.bilibiliService.getVideoInfo(bvId);

    Object.assign(video, {
      title: videoInfo.title,
      description: videoInfo.description,
      coverUrl: videoInfo.coverUrl,
      duration: videoInfo.duration,
      authorName: videoInfo.authorName,
      playCount: videoInfo.playCount,
      likeCount: videoInfo.likeCount,
      coinCount: videoInfo.coinCount,
      favoriteCount: videoInfo.favoriteCount,
      category: videoInfo.category,
      tags: videoInfo.tags,
    });

    return await this.videoRepository.save(video);
  }

  /**
   * 标记为精选
   */
  async markAsFeatured(bvId: string): Promise<Video> {
    const video = await this.findByBvId(bvId);
    video.isFeatured = true;
    video.featuredAt = new Date();
    return await this.videoRepository.save(video);
  }

  /**
   * 取消精选
   */
  async unmarkAsFeatured(bvId: string): Promise<Video> {
    const video = await this.findByBvId(bvId);
    video.isFeatured = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (video.featuredAt as any) = null;
    return await this.videoRepository.save(video);
  }

  /**
   * 更新评分
   */
  async updateRating(bvId: string, rating: number): Promise<Video> {
    if (rating < 0 || rating > 10) {
      throw new BadRequestException('评分必须在 0-10 之间');
    }

    const video = await this.findByBvId(bvId);
    video.rating = rating;
    return await this.videoRepository.save(video);
  }

  /**
   * 删除视频
   */
  async remove(id: string): Promise<void> {
    const video = await this.findOne(id);
    await this.videoRepository.remove(video);
  }

  /**
   * 获取今日推荐视频
   */
  async findTodayRecommendations(): Promise<Video[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.videoRepository.find({
      where: {
        isFeatured: true,
        featuredAt: today,
      },
      order: { rating: 'DESC', playCount: 'DESC' },
      take: 3,
    });
  }
}
