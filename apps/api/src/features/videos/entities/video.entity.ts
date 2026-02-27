import { Base } from '@/common/entities';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  Relation,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '@/features/users/entities/user.entity';
import { Submission } from '@/features/submissions/entities/submission.entity';
import { CollectionItem } from '@/features/collections/entities/collection-item.entity';
import { TopicVideo } from '@/features/topics/entities/topic-video.entity';
import { Feedback } from '@/features/feedback/entities/feedback.entity';
import { Review } from '@/features/reviews/entities/review.entity';
import { Recommendation } from '@/features/recommendations/entities/recommendation.entity';

/**
 * 视频实体 - 索引 B 站视频信息（不存储视频文件）
 *
 * @property {string} bvId - B 站 BV 号（唯一标识）
 * @property {string} title - 视频标题
 * @property {string} description - 视频简介
 * @property {string} coverUrl - 封面图片 URL
 * @property {string} duration - 视频时长（秒）
 * @property {string} authorId - UP 主用户 ID（本站）
 * @property {string} authorName - UP 主名称（B 站）
 * @property {number} playCount - 播放量
 * @property {number} likeCount - 点赞数
 * @property {number} coinCount - 投币数
 * @property {number} favoriteCount - 收藏数
 * @property {string} category - 分区（动画/科技/生活等）
 * @property {string[]} tags - 标签数组
 * @property {number} rating - 评分（0-10）
 * @property {boolean} isFeatured - 是否精选
 * @property {Date} featuredAt - 精选时间
 * @property {string} bilibiliUrl - B 站视频链接
 */
@Entity()
export class Video extends Base {
  @Column({ type: 'varchar', unique: true, nullable: false })
  @Index()
  bvId: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  coverUrl: string;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'varchar', nullable: true })
  authorId: string;

  @Column({ type: 'varchar', nullable: false })
  authorName: string;

  @Column({ type: 'int', default: 0 })
  playCount: number;

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @Column({ type: 'int', default: 0 })
  coinCount: number;

  @Column({ type: 'int', default: 0 })
  favoriteCount: number;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ type: 'timestamp', nullable: true })
  featuredAt: Date;

  @Column({ type: 'varchar', nullable: false })
  bilibiliUrl: string;

  @ManyToOne(() => User, (user) => user.videos, { nullable: true })
  uploader: Relation<User>;

  @OneToMany(() => Submission, (submission) => submission.video)
  submissions: Relation<Submission[]>;

  @OneToMany(() => CollectionItem, (item) => item.video)
  collectionItems: Relation<CollectionItem[]>;

  @OneToMany(() => TopicVideo, (topicVideo) => topicVideo.video)
  topicVideos: Relation<TopicVideo[]>;

  @OneToMany(() => Feedback, (feedback) => feedback.video)
  feedbacks: Relation<Feedback[]>;

  @OneToMany(() => Review, (review) => review.video)
  reviews: Relation<Review[]>;

  @OneToOne(() => Recommendation, (recommendation) => recommendation.video)
  recommendation: Relation<Recommendation>;
}
