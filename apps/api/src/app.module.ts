import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import {
  LoggerModule,
  NodeMailerModule,
  ThrottleModule,
} from '@/common/modules';
import { validateEnv } from '@/common/utils';
import { DatabaseModule } from '@/database';
import { FileModule } from '@/features/file/file.module';
import { UsersModule } from '@/features/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './features/auth/auth.module';
import { HealthModule } from './features/health/health.module';
import { MailModule } from './features/mail/mail.module';
import { BilibiliModule } from './features/bilibili/bilibili.module';
import { VideosModule } from './features/videos/videos.module';
import { SubmissionsModule } from './features/submissions/submissions.module';
import { TasksModule } from './features/tasks/tasks.module';
import { CollectionsModule } from './features/collections/collections.module';
import { TopicsModule } from './features/topics/topics.module';
import { FeedbackModule } from './features/feedback/feedback.module';
import { ReviewsModule } from './features/reviews/reviews.module';
import { RecommendationsModule } from './features/recommendations/recommendations.module';

/**
 * The root module of the application.
 *
 * Configures global guards, environment validation, and imports all feature modules.
 */
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    NodeMailerModule,
    LoggerModule,
    ThrottleModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    MailModule,
    HealthModule,
    FileModule,
    BilibiliModule,
    VideosModule,
    SubmissionsModule,
    TasksModule,
    CollectionsModule,
    TopicsModule,
    FeedbackModule,
    ReviewsModule,
    RecommendationsModule,
  ],
})
export class AppModule {}
