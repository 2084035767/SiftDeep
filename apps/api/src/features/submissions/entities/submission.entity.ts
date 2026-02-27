import { Base } from '@/common/entities';
import { Column, Entity, ManyToOne, Relation, Index } from 'typeorm';
import { User } from '@/features/users/entities/user.entity';
import { Video } from '@/features/videos/entities/video.entity';

/**
 * 投稿状态枚举
 */
export enum SubmissionStatus {
  PENDING = 'pending', // 待审核
  APPROVED = 'approved', // 已通过
  REJECTED = 'rejected', // 已拒绝
  UNDER_REVIEW = 'under_review', // 复审中（负反馈）
}

/**
 * 投稿实体 - 用户提交的视频推荐
 *
 * @property {string} bvId - B 站 BV 号
 * @property {string} reason - 推荐理由
 * @property {string} category - 投稿分类
 * @property {SubmissionStatus} status - 审核状态
 * @property {string} reviewNote - 审核备注
 * @property {string} reviewerId - 审核人 ID
 * @property {Date} reviewedAt - 审核时间
 * @property {boolean} isNegativeFeedback - 是否负反馈触发
 */
@Entity()
export class Submission extends Base {
  @Column({ type: 'varchar', nullable: false })
  @Index()
  bvId: string;

  @Column({ type: 'text', nullable: false })
  reason: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.PENDING,
  })
  status: SubmissionStatus;

  @Column({ type: 'text', nullable: true })
  reviewNote: string;

  @Column({ type: 'varchar', nullable: true })
  reviewerId: string;

  @Column({ type: 'timestamp', nullable: true })
  reviewedAt: Date;

  @Column({ type: 'boolean', default: false })
  isNegativeFeedback: boolean;

  @ManyToOne(() => User, (user) => user.submissions, { nullable: false })
  submitter: Relation<User>;

  @ManyToOne(() => Video, (video) => video.submissions, { nullable: true })
  video: Relation<Video>;
}
