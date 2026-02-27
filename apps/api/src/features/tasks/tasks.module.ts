import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DailyPushService } from './daily-push.service';
import { VideosModule } from '@/features/videos/videos.module';
import { MailModule } from '@/features/mail/mail.module';

@Module({
  imports: [ScheduleModule.forRoot(), VideosModule, MailModule],
  providers: [DailyPushService],
})
export class TasksModule {}
