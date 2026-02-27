import { Base } from '@/common/entities';
import { Column, Entity, ManyToOne, Relation, Index } from 'typeorm';
import { User } from '@/features/users/entities/user.entity';
import { Video } from '@/features/videos/entities/video.entity';

/**
 * 反馈类型枚举
 */
export enum FeedbackType {
  LOW_QUALITY = 'low_quality', // 质量不符
  COPYRIGHT = 'copyright', // 版权投诉
  INAPPROPRIATE = 'inappropriate', // 不当内容
  SPAM = 'spam', // 垃圾内容
  OTHER = 'other', // 其他
}

/**
 * 反馈状态枚举
 */
export enum FeedbackStatus {
  PENDING = 'pending', // 待处理
  REVIEWING = 'reviewing', // 审核中
  RESOLVED = 'resolved', // 已解决
  REJECTED = 'rejected', // 已驳回
}

/**
 * 反馈实体 - 用户对内容的负反馈
 *
 * @property {FeedbackType} type - 反馈类型
 * @property {string} reason - 反馈原因
 * @property {string} description - 详细描述
 * @property {FeedbackStatus} status - 处理状态
 * @property {string} handlerNote - 处理备注
 * @property {string} handlerId - 处理人 ID
 * @property {Date} handledAt - 处理时间
 * @property {boolean} isAnonymous - 是否匿名
 */
@Entity()
export class Feedback extends Base {
  @Column({
    type: 'enum',
    enum: FeedbackType,
    default: FeedbackType.LOW_QUALITY,
  })
  type: FeedbackType;

  @Column({ type: 'varchar', nullable: false })
  reason: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: FeedbackStatus,
    default: FeedbackStatus.PENDING,
  })
  status: FeedbackStatus;

  @Column({ type: 'text', nullable: true })
  handlerNote: string;

  @Column({ type: 'varchar', nullable: true })
  handlerId: string;

  @Column({ type: 'timestamp', nullable: true })
  handledAt: Date;

  @Column({ type: 'boolean', default: false })
  isAnonymous: boolean;

  @ManyToOne(() => User, { nullable: false })
  reporter: Relation<User>;

  @ManyToOne(() => Video, (video) => video.feedbacks, { nullable: false })
  @Index()
  video: Relation<Video>;
}
