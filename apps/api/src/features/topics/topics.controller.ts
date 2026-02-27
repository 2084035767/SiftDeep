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
import { TopicsService } from './topics.service';
import {
  CreateTopicDto,
  UpdateTopicDto,
  AddVideoToTopicDto,
  UpdateTopicVideoOrderDto,
  FindTopicsDto,
} from './dto/topic.dto';
import { JwtAuthGuard } from '@/common/guards';
import { User as CurrentUser } from '@/common/decorators';

@ApiTags('Topics')
@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiOperation({ summary: '创建专题' })
  @ApiResponse({ status: 201, description: '创建成功' })
  async create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateTopicDto,
  ) {
    const topic = await this.topicsService.createTopic(
      user.id,
      dto.title,
      dto.description,
      dto.type,
      dto.category,
    );
    return { message: '创建成功', data: topic };
  }

  @Get()
  @ApiOperation({ summary: '获取专题列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findAll(@Query() query: FindTopicsDto) {
    const result = await this.topicsService.findAll(query);
    return { message: '获取成功', ...result };
  }

  @Get('my')
  @ApiOperation({ summary: '获取我创建的专题' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findMyTopics(
    @CurrentUser() user: { id: string },
    @Query() query: FindTopicsDto,
  ) {
    const result = await this.topicsService.findUserTopics(
      user.id,
      query.page,
      query.limit,
    );
    return { message: '获取成功', ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取专题详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findOne(@Param('id') id: string) {
    const topic = await this.topicsService.findOne(id);
    return { message: '获取成功', data: topic };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '更新专题' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateTopicDto,
  ) {
    const topic = await this.topicsService.updateTopic(id, user.id, dto);
    return { message: '更新成功', data: topic };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除专题' })
  @ApiResponse({ status: 204, description: '删除成功' })
  async delete(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    await this.topicsService.deleteTopic(id, user.id);
    return { message: '删除成功' };
  }

  @Post(':id/publish')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '发布/取消发布专题' })
  @ApiResponse({ status: 200, description: '操作成功' })
  async togglePublish(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ) {
    const topic = await this.topicsService.togglePublish(id, user.id);
    return { message: '操作成功', data: topic };
  }

  @Post(':id/videos')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '添加视频到专题' })
  @ApiResponse({ status: 201, description: '添加成功' })
  async addVideo(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: AddVideoToTopicDto,
  ) {
    const topicVideo = await this.topicsService.addVideoToTopic(
      id,
      dto.bvId,
      user.id,
      dto.introduction,
      dto.isRequired,
    );
    return { message: '添加成功', data: topicVideo };
  }

  @Delete(':id/videos/:topicVideoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '从专题移除视频' })
  @ApiResponse({ status: 204, description: '移除成功' })
  async removeVideo(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Param('topicVideoId') topicVideoId: string,
  ) {
    await this.topicsService.removeVideoFromTopic(id, topicVideoId, user.id);
    return { message: '移除成功' };
  }

  @Patch(':id/videos/order')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '更新专题视频排序' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async updateOrder(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateTopicVideoOrderDto,
  ) {
    const topicVideo = await this.topicsService.updateTopicVideoOrder(
      id,
      dto.topicVideoId,
      dto.newOrder,
      user.id,
    );
    return { message: '更新成功', data: topicVideo };
  }
}
