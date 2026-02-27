import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection, CollectionVisibility } from './entities/collection.entity';
import { CollectionItem } from './entities/collection-item.entity';
import { User } from '@/features/users/entities/user.entity';
import { VideosService } from '@/features/videos/videos.service';

/**
 * 收藏夹服务
 */
@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @InjectRepository(CollectionItem)
    private readonly collectionItemRepository: Repository<CollectionItem>,
    private readonly videosService: VideosService,
  ) {}

  /**
   * 创建收藏夹
   */
  async createCollection(
    ownerId: string,
    name: string,
    description?: string,
    visibility: 'public' | 'private' | 'unlisted' = 'public',
    isCollaborative: boolean = false,
  ): Promise<Collection> {
    const collection = this.collectionRepository.create({
      name,
      description,
      visibility: CollectionVisibility[visibility.toUpperCase()],
      isCollaborative,
      owner: { id: ownerId },
    });

    return await this.collectionRepository.save(collection);
  }

  /**
   * 获取收藏夹详情
   */
  async findOne(id: string, userId?: string): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      where: { id },
      relations: [
        'owner',
        'collaborators',
        'items',
        'items.video',
        'items.addedBy',
      ],
    });

    if (!collection) {
      throw new NotFoundException('收藏夹不存在');
    }

    // 检查权限
    if (collection.visibility === 'private' && collection.owner.id !== userId) {
      throw new ForbiddenException('无权访问此收藏夹');
    }

    return collection;
  }

  /**
   * 获取用户的收藏夹列表
   */
  async findUserCollections(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: Collection[]; total: number }> {
    const query = this.collectionRepository
      .createQueryBuilder('collection')
      .leftJoinAndSelect('collection.owner', 'owner')
      .leftJoinAndSelect('collection.items', 'items')
      .leftJoinAndSelect('items.video', 'video')
      .where('collection.ownerId = :userId', { userId })
      .orderBy('collection.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 获取公开收藏夹列表
   */
  async findPublicCollections(
    page = 1,
    limit = 20,
  ): Promise<{ data: Collection[]; total: number }> {
    const query = this.collectionRepository
      .createQueryBuilder('collection')
      .leftJoinAndSelect('collection.owner', 'owner')
      .leftJoinAndSelect('collection.items', 'items')
      .leftJoinAndSelect('items.video', 'video')
      .where('collection.visibility = :visibility', { visibility: 'public' })
      .orderBy('collection.followerCount', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 添加视频到收藏夹
   */
  async addVideoToCollection(
    collectionId: string,
    bvId: string,
    userId: string,
    note?: string,
  ): Promise<CollectionItem> {
    const collection = await this.findOne(collectionId, userId);

    // 检查权限
    const isOwner = collection.owner.id === userId;
    const isCollaborator = collection.collaborators?.some(
      (c) => c.id === userId,
    );

    if (!isOwner && !isCollaborator) {
      throw new ForbiddenException('无权向此收藏夹添加内容');
    }

    // 获取或创建视频
    const video = await this.videosService.findByBvId(bvId);

    // 检查是否已存在
    const existing = await this.collectionItemRepository.findOne({
      where: {
        collection: { id: collectionId },
        video: { id: video.id },
      },
    });

    if (existing) {
      throw new BadRequestException('视频已在收藏夹中');
    }

    // 获取最大排序值
    const maxOrder = await this.collectionItemRepository
      .createQueryBuilder('item')
      .where('item.collectionId = :collectionId', { collectionId })
      .select('MAX(item.order)', 'maxOrder')
      .getRawOne()
      .then((r) => r?.maxOrder || 0);

    const item = this.collectionItemRepository.create({
      collection: { id: collectionId } as Collection,
      video,
      addedBy: { id: userId } as User,
      order: maxOrder + 1,
      note,
    });

    // 更新收藏夹视频数量
    collection.itemCount += 1;
    await this.collectionRepository.save(collection);

    return await this.collectionItemRepository.save(item);
  }

  /**
   * 从收藏夹移除视频
   */
  async removeVideoFromCollection(
    collectionId: string,
    itemId: string,
    userId: string,
  ): Promise<void> {
    const collection = await this.findOne(collectionId, userId);

    // 检查权限
    const isOwner = collection.owner.id === userId;
    const isCollaborator = collection.collaborators?.some(
      (c) => c.id === userId,
    );

    if (!isOwner && !isCollaborator) {
      throw new ForbiddenException('无权操作此收藏夹');
    }

    const item = await this.collectionItemRepository.findOne({
      where: { id: itemId },
      relations: ['collection'],
    });

    if (!item || item.collection.id !== collectionId) {
      throw new NotFoundException('收藏项不存在');
    }

    await this.collectionItemRepository.remove(item);

    // 更新收藏夹视频数量
    collection.itemCount = Math.max(0, collection.itemCount - 1);
    await this.collectionRepository.save(collection);
  }

  /**
   * 更新收藏夹
   */
  async updateCollection(
    id: string,
    userId: string,
    updates: {
      name?: string;
      description?: string;
      visibility?: 'public' | 'private' | 'unlisted';
      isCollaborative?: boolean;
    },
  ): Promise<Collection> {
    const collection = await this.findOne(id, userId);

    if (collection.owner.id !== userId) {
      throw new ForbiddenException('无权修改此收藏夹');
    }

    Object.assign(collection, updates);
    return await this.collectionRepository.save(collection);
  }

  /**
   * 删除收藏夹
   */
  async deleteCollection(id: string, userId: string): Promise<void> {
    const collection = await this.findOne(id, userId);

    if (collection.owner.id !== userId) {
      throw new ForbiddenException('无权删除此收藏夹');
    }

    await this.collectionRepository.remove(collection);
  }

  /**
   * 关注/取消关注收藏夹
   */
  async toggleFollow(
    collectionId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userId: string,
  ): Promise<{ followed: boolean; count: number }> {
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new NotFoundException('收藏夹不存在');
    }

    // TODO: 实现关注逻辑（需要创建 collection_followers 表）
    // 暂时简化处理
    collection.followerCount += 1;
    await this.collectionRepository.save(collection);

    return {
      followed: true,
      count: collection.followerCount,
    };
  }

  /**
   * 获取收藏夹内容列表
   */
  async findCollectionItems(
    collectionId: string,
    page = 1,
    limit = 50,
  ): Promise<{ data: CollectionItem[]; total: number }> {
    const query = this.collectionItemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.video', 'video')
      .leftJoinAndSelect('item.addedBy', 'addedBy')
      .where('item.collectionId = :collectionId', { collectionId })
      .orderBy('item.order', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 更新收藏项排序
   */
  async updateItemOrder(
    collectionId: string,
    itemId: string,
    newOrder: number,
    userId: string,
  ): Promise<CollectionItem> {
    const collection = await this.findOne(collectionId, userId);

    if (collection.owner.id !== userId) {
      throw new ForbiddenException('无权操作此收藏夹');
    }

    const item = await this.collectionItemRepository.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('收藏项不存在');
    }

    item.order = newOrder;
    return await this.collectionItemRepository.save(item);
  }
}
