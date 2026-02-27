import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

/**
 * B 站视频信息接口
 */
export interface BilibiliVideoInfo {
  bvId: string;
  title: string;
  description: string;
  coverUrl: string;
  duration: number;
  authorName: string;
  playCount: number;
  likeCount: number;
  coinCount: number;
  favoriteCount: number;
  category: string;
  tags: string[];
  pubdate: number;
  bilibiliUrl: string;
}

/**
 * B 站 API 响应接口
 */
interface BilibiliResponse<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * B 站视频详情接口
 */
interface BilibiliVideoDetail {
  bvid: string;
  title: string;
  desc: string;
  pic: string;
  duration: number;
  owner: {
    name: string;
  };
  stat: {
    view: number;
    like: number;
    coin: number;
    favorite: number;
  };
  tname: string;
  tag: string;
  pubdate: number;
}

/**
 * B 站服务 - 调用 B 站官方 API 获取视频信息
 * QPS 限制：≤ 2，带退避机制
 */
@Injectable()
export class BilibiliService {
  private readonly logger = new Logger(BilibiliService.name);
  private readonly api: AxiosInstance;
  private readonly wbiKey?: string;
  private requestCount = 0;
  private lastResetTime = Date.now();

  constructor(private readonly config: ConfigService) {
    this.wbiKey = this.config.get('BILIBILI_WBI_KEY');

    this.api = axios.create({
      baseURL: 'https://api.bilibili.com',
      timeout: 10000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://www.bilibili.com',
      },
    });

    // 请求拦截器 - QPS 限制
    this.api.interceptors.request.use(async (config) => {
      await this.rateLimit();
      return config;
    });
  }

  /**
   * QPS 限制 - 每秒最多 2 次请求
   */
  private async rateLimit(): Promise<void> {
    const now = Date.now();
    if (now - this.lastResetTime >= 1000) {
      this.requestCount = 0;
      this.lastResetTime = now;
    }

    if (this.requestCount >= 2) {
      const delay = 1000 - (now - this.lastResetTime);
      if (delay > 0) {
        this.logger.debug(`QPS 限制，等待 ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      this.requestCount = 0;
      this.lastResetTime = Date.now();
    }

    this.requestCount++;
  }

  /**
   * 通过 BV 号获取视频信息
   */
  async getVideoInfo(bvId: string): Promise<BilibiliVideoInfo> {
    try {
      const response = await this.api.get<
        BilibiliResponse<BilibiliVideoDetail>
      >('/x/web-interface/view', {
        params: { bvid: bvId },
      });

      if (response.data.code !== 0) {
        throw new Error(`B 站 API 错误：${response.data.message}`);
      }

      const data = response.data.data;
      return {
        bvId: data.bvid,
        title: data.title,
        description: data.desc,
        coverUrl: data.pic,
        duration: data.duration,
        authorName: data.owner.name,
        playCount: data.stat.view,
        likeCount: data.stat.like,
        coinCount: data.stat.coin,
        favoriteCount: data.stat.favorite,
        category: data.tname,
        tags: data.tag ? data.tag.split(',').filter(Boolean) : [],
        pubdate: data.pubdate,
        bilibiliUrl: `https://www.bilibili.com/video/${bvId}`,
      };
    } catch (error) {
      this.logger.error(`获取视频信息失败：${bvId}`, error);
      throw error;
    }
  }

  /**
   * 验证 BV 号是否有效
   */
  async validateBvId(bvId: string): Promise<boolean> {
    try {
      await this.getVideoInfo(bvId);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 生成 B 站视频链接
   */
  generateVideoUrl(bvId: string): string {
    return `https://www.bilibili.com/video/${bvId}`;
  }
}
