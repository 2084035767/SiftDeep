import { Base } from '@/common/entities';
import {
  Column,
  Entity,
  ManyToOne,
  Relation,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@/features/users/entities/user.entity';
import { Video } from '@/features/videos/entities/video.entity';

/**
 * 推荐语实体 - 编辑/UP 主对视频的推荐
 *
 * @property {string} videoId - 关联视频 ID
 * @property {string} curatorId - 策展人 ID
 * @property {string} highlight - 一句话推荐（140 字）
 * @property {string} reason - 详细推荐理由
 * @property {string[]} tags - 推荐标签
 * @property {string} targetAudience - 适合人群
 * @property {string} watchTime - 建议观看时段
 * @property {boolean} isEditorPick - 是否编辑精选
 */
@Entity()
export class Recommendation extends Base {
  @Column({ type: 'varchar', nullable: false })
  @Index()
  videoId: string;

  @Column({ type: 'varchar', nullable: false })
  curatorId: string;

  @Column({ type: 'varchar', length: 140, nullable: false })
  highlight: string;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ type: 'varchar', nullable: true })
  targetAudience: string;

  @Column({ type: 'varchar', nullable: true })
  watchTime: string;

  @Column({ type: 'boolean', default: false })
  isEditorPick: boolean;

  @ManyToOne(() => User, { nullable: false })
  curator: Relation<User>;

  @OneToOne(() => Video, (video) => video.recommendation, { nullable: false })
  @JoinColumn({ name: 'videoId' })
  @Index()
  video: Relation<Video>;
}
