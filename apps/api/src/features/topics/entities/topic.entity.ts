import { Base } from '@/common/entities';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { User } from '@/features/users/entities/user.entity';
import { TopicVideo } from './topic-video.entity';

/**
 * 专题类型枚举
 */
export enum TopicType {
  EDUCATIONAL = 'educational', // 教育类
  DOCUMENTARY = 'documentary', // 纪录片
  TUTORIAL = 'tutorial', // 教程类
  ANALYSIS = 'analysis', // 解析类
  OTHER = 'other', // 其他
}

/**
 * 深度专题实体
 *
 * @property {string} title - 专题标题
 * @property {string} description - 专题简介
 * @property {string} coverUrl - 封面图
 * @property {TopicType} type - 专题类型
 * @property {string} category - 分类
 * @property {number} estimatedReadTime - 预计阅读时间（分钟）
 * @property {number} videoCount - 视频数量
 * @property {number} articleCount - 文章数量
 * @property {string[]} resources - 参考资料链接
 * @property {boolean} isPublished - 是否发布
 * @property {Date} publishedAt - 发布时间
 */
@Entity()
export class Topic extends Base {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  coverUrl: string;

  @Column({
    type: 'enum',
    enum: TopicType,
    default: TopicType.OTHER,
  })
  type: TopicType;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'int', default: 0 })
  estimatedReadTime: number;

  @Column({ type: 'int', default: 0 })
  videoCount: number;

  @Column({ type: 'int', default: 0 })
  articleCount: number;

  @Column('simple-array', { nullable: true })
  resources: string[];

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @ManyToOne(() => User, (user) => user.topics, { nullable: false })
  creator: Relation<User>;

  @OneToMany(() => TopicVideo, (topicVideo) => topicVideo.topic, {
    cascade: true,
  })
  topicVideos: Relation<TopicVideo[]>;
}
