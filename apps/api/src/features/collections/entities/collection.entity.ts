import { Base } from '@/common/entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  Relation,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from '@/features/users/entities/user.entity';
import { CollectionItem } from './collection-item.entity';

/**
 * 收藏夹可见性枚举
 */
export enum CollectionVisibility {
  PUBLIC = 'public', // 公开
  PRIVATE = 'private', // 私密
  UNLISTED = 'unlisted', // 不公开（有链接可访问）
}

/**
 * 收藏夹实体
 *
 * @property {string} name - 收藏夹名称
 * @property {string} description - 描述
 * @property {string} coverUrl - 封面图
 * @property {CollectionVisibility} visibility - 可见性
 * @property {boolean} isCollaborative - 是否协同编辑
 * @property {number} itemCount - 视频数量
 * @property {number} followerCount - 关注人数
 */
@Entity()
export class Collection extends Base {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  coverUrl: string;

  @Column({
    type: 'enum',
    enum: CollectionVisibility,
    default: CollectionVisibility.PUBLIC,
  })
  visibility: CollectionVisibility;

  @Column({ type: 'boolean', default: false })
  isCollaborative: boolean;

  @Column({ type: 'int', default: 0 })
  itemCount: number;

  @Column({ type: 'int', default: 0 })
  followerCount: number;

  @ManyToOne(() => User, (user) => user.collections, { nullable: false })
  owner: Relation<User>;

  @ManyToMany(() => User, (user) => user.collaboratingCollections)
  @JoinTable({
    name: 'collection_collaborators',
    joinColumn: { name: 'collection_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  collaborators: Relation<User[]>;

  @OneToMany(() => CollectionItem, (item) => item.collection, { cascade: true })
  items: Relation<CollectionItem[]>;
}
