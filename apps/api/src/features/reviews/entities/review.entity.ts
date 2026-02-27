import { Base } from '@/common/entities';
import { Column, Entity, ManyToOne, Relation, Index, OneToMany } from 'typeorm';
import { User } from '@/features/users/entities/user.entity';
import { Video } from '@/features/videos/entities/video.entity';

/**
 * 评价实体 - 用户对视频的深度评价
 *
 * @property {string} videoId - 关联视频 ID
 * @property {string} userId - 评价者 ID
 * @property {number} rating - 评分 1-10
 * @property {string} title - 评价标题
 * @property {string} content - 详细评价内容
 * @property {string[]} pros - 优点标签
 * @property {string[]} cons - 不足标签
 * @property {boolean} isVerified - 是否已观看验证
 * @property {number} helpfulCount - 有帮助计数
 * @property {boolean} isEditorPick - 是否编辑精选
 */
@Entity()
export class Review extends Base {
  @Column({ type: 'varchar', nullable: false })
  @Index()
  videoId: string;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @Column({ type: 'int', nullable: false })
  @Index()
  rating: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column('simple-array', { nullable: true })
  pros: string[];

  @Column('simple-array', { nullable: true })
  cons: string[];

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'int', default: 0 })
  helpfulCount: number;

  @Column({ type: 'boolean', default: false })
  isEditorPick: boolean;

  @ManyToOne(() => User, { nullable: false })
  user: Relation<User>;

  @ManyToOne(() => Video, (video) => video.reviews, { nullable: false })
  @Index()
  video: Relation<Video>;

  @OneToMany(() => ReviewVote, (vote) => vote.review)
  votes: Relation<ReviewVote[]>;
}

/**
 * 评价投票实体 - 用户对评价的"有帮助"投票
 */
@Entity()
export class ReviewVote extends Base {
  @Column({ type: 'varchar', nullable: false })
  reviewId: string;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @Column({ type: 'boolean', default: true })
  isHelpful: boolean;

  @ManyToOne(() => Review, (review) => review.votes, { nullable: false })
  @Index()
  review: Relation<Review>;

  @ManyToOne(() => User, { nullable: false })
  user: Relation<User>;
}
