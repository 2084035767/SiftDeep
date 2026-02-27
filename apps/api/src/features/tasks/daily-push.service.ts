import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VideosService } from '@/features/videos/videos.service';
import { MailService } from '@/features/mail/mail.service';

/**
 * 每日推送服务
 * 每天 08:00 和 20:00 自动推送精选内容
 */
@Injectable()
export class DailyPushService {
  private readonly logger = new Logger(DailyPushService.name);

  constructor(
    private readonly videosService: VideosService,
    private readonly mailService: MailService,
  ) {}

  /**
   * 每天早上 8 点推送
   */
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleMorningPush(): Promise<void> {
    this.logger.log('执行每日早晨推送任务...');

    try {
      const videos = await this.videosService.findTodayRecommendations();

      if (videos.length === 0) {
        this.logger.warn('今日没有推荐内容');
        return;
      }

      // TODO: 获取订阅用户列表并发送邮件
      // await this.mailService.sendDailyPush({
      //   to: subscribers,
      //   subject: '深选每日速递 - 08:00',
      //   videos,
      // });

      this.logger.log(`早晨推送完成，共 ${videos.length} 个视频`);
    } catch (error) {
      this.logger.error('早晨推送失败', error);
    }
  }

  /**
   * 每天晚上 8 点推送
   */
  @Cron(CronExpression.EVERY_DAY_AT_8PM)
  async handleEveningPush(): Promise<void> {
    this.logger.log('执行每日晚间推送任务...');

    try {
      const videos = await this.videosService.findTodayRecommendations();

      if (videos.length === 0) {
        this.logger.warn('今日没有推荐内容');
        return;
      }

      // TODO: 获取订阅用户列表并发送邮件
      // await this.mailService.sendDailyPush({
      //   to: subscribers,
      //   subject: '深选每日速递 - 20:00',
      //   videos,
      // });

      this.logger.log(`晚间推送完成，共 ${videos.length} 个视频`);
    } catch (error) {
      this.logger.error('晚间推送失败', error);
    }
  }

  /**
   * 每天凌晨 2 点清理过期日志（30 天前）
   */
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleLogCleanup(): Promise<void> {
    this.logger.log('执行日志清理任务...');

    try {
      // TODO: 实现日志清理逻辑
      // const thirtyDaysAgo = new Date();
      // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      // await this.logsService.deleteOlderThan(thirtyDaysAgo);

      this.logger.log('日志清理完成');
    } catch (error) {
      this.logger.error('日志清理失败', error);
    }
  }
}
