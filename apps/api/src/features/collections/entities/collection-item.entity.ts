import { Base } from '@/common/entities';
import { Column, Entity, ManyToOne, Relation, Index } from 'typeorm';
import { Collection } from './collection.entity';
import { Video } from '@/features/videos/entities/video.entity';
import { User } from '@/features/users/entities/user.entity';

/**
 * 收藏夹内容项实体
 *
 * @property {number} order - 排序顺序
 * @property {string} note - 备注/评论
 * @property {boolean} isPinned - 是否置顶
 */
@Entity()
export class CollectionItem extends Base {
  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'boolean', default: false })
  isPinned: boolean;

  @ManyToOne(() => Collection, (collection) => collection.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @Index()
  collection: Relation<Collection>;

  @ManyToOne(() => Video, (video) => video.collectionItems, {
    nullable: false,
  })
  video: Relation<Video>;

  @ManyToOne(() => User, { nullable: false })
  addedBy: Relation<User>;
}
