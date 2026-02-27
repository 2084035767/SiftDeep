import { Base } from '@/common/entities';
import { Column, Entity, ManyToOne, Relation, Index } from 'typeorm';
import { Topic } from './topic.entity';
import { Video } from '@/features/videos/entities/video.entity';

/**
 * 专题视频关联实体
 *
 * @property {number} order - 排序顺序
 * @property {string} introduction - 视频介绍
 * @property {boolean} isRequired - 是否必看
 */
@Entity()
export class TopicVideo extends Base {
  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ type: 'boolean', default: false })
  isRequired: boolean;

  @ManyToOne(() => Topic, (topic) => topic.topicVideos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @Index()
  topic: Relation<Topic>;

  @ManyToOne(() => Video, (video) => video.topicVideos, {
    nullable: false,
  })
  video: Relation<Video>;
}
