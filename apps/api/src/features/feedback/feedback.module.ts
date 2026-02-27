import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { Feedback } from './entities/feedback.entity';
import { VideosModule } from '@/features/videos/videos.module';
import { SubmissionsModule } from '@/features/submissions/submissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    VideosModule,
    SubmissionsModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
