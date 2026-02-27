import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { Topic } from './entities/topic.entity';
import { TopicVideo } from './entities/topic-video.entity';
import { VideosModule } from '@/features/videos/videos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, TopicVideo]), VideosModule],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
