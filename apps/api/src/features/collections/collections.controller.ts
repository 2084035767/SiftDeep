import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
  AddVideoToCollectionDto,
  UpdateItemOrderDto,
  FindCollectionsDto,
} from './dto/collection.dto';
import { JwtAuthGuard } from '@/common/guards';
import { User as CurrentUser } from '@/common/decorators';

@ApiTags('Collections')
@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  @ApiOperation({ summary: '创建收藏夹' })
  @ApiResponse({ status: 201, description: '创建成功' })
  async create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateCollectionDto,
  ) {
    const collection = await this.collectionsService.createCollection(
      user.id,
      dto.name,
      dto.description,
      dto.visibility,
      dto.isCollaborative,
    );
    return { message: '创建成功', data: collection };
  }

  @Get('public')
  @ApiOperation({ summary: '获取公开收藏夹列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findPublic(@Query() query: FindCollectionsDto) {
    const result = await this.collectionsService.findPublicCollections(
      query.page,
      query.limit,
    );
    return { message: '获取成功', ...result };
  }

  @Get('my')
  @ApiOperation({ summary: '获取我的收藏夹列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findMyCollections(
    @CurrentUser() user: { id: string },
    @Query() query: FindCollectionsDto,
  ) {
    const result = await this.collectionsService.findUserCollections(
      user.id,
      query.page,
      query.limit,
    );
    return { message: '获取成功', ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取收藏夹详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findOne(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    const collection = await this.collectionsService.findOne(id, user.id);
    return { message: '获取成功', data: collection };
  }

  @Get(':id/items')
  @ApiOperation({ summary: '获取收藏夹内容列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findItems(@Param('id') id: string, @Query() query: FindCollectionsDto) {
    const result = await this.collectionsService.findCollectionItems(
      id,
      query.page,
      query.limit,
    );
    return { message: '获取成功', ...result };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '更新收藏夹' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateCollectionDto,
  ) {
    const collection = await this.collectionsService.updateCollection(
      id,
      user.id,
      dto,
    );
    return { message: '更新成功', data: collection };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除收藏夹' })
  @ApiResponse({ status: 204, description: '删除成功' })
  async delete(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    await this.collectionsService.deleteCollection(id, user.id);
    return { message: '删除成功' };
  }

  @Post(':id/videos')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '添加视频到收藏夹' })
  @ApiResponse({ status: 201, description: '添加成功' })
  async addVideo(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: AddVideoToCollectionDto,
  ) {
    const item = await this.collectionsService.addVideoToCollection(
      id,
      dto.bvId,
      user.id,
      dto.note,
    );
    return { message: '添加成功', data: item };
  }

  @Delete(':id/videos/:itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '从收藏夹移除视频' })
  @ApiResponse({ status: 204, description: '移除成功' })
  async removeVideo(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ) {
    await this.collectionsService.removeVideoFromCollection(
      id,
      itemId,
      user.id,
    );
    return { message: '移除成功' };
  }

  @Patch(':id/items/order')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '更新收藏项排序' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async updateOrder(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateItemOrderDto,
  ) {
    const item = await this.collectionsService.updateItemOrder(
      id,
      dto.itemId,
      dto.newOrder,
      user.id,
    );
    return { message: '更新成功', data: item };
  }

  @Post(':id/follow')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '关注收藏夹' })
  @ApiResponse({ status: 200, description: '操作成功' })
  async toggleFollow(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ) {
    const result = await this.collectionsService.toggleFollow(id, user.id);
    return { message: '操作成功', data: result };
  }
}
