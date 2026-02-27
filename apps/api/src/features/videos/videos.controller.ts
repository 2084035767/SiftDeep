import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VideosService } from './videos.service';
import {
  FindVideosDto,
  MarkAsFeaturedDto,
  UpdateRatingDto,
} from './dto/find-videos.dto';

/**
 * 视频控制器 - 管理视频索引的 CRUD 操作
 */
@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('bv/:bvId')
  @ApiOperation({ summary: '通过 BV 号获取或创建视频' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findByBvId(@Param('bvId') bvId: string) {
    const video = await this.videosService.findByBvId(bvId);
    return { message: '获取成功', data: video };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取视频详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findOne(@Param('id') id: string) {
    const video = await this.videosService.findOne(id);
    return { message: '获取成功', data: video };
  }

  @Get()
  @ApiOperation({ summary: '获取视频列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findAll(@Query() query: FindVideosDto) {
    const result = await this.videosService.findAll(query);
    return { message: '获取成功', ...result };
  }

  @Get('featured/today')
  @ApiOperation({ summary: '获取今日推荐' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findTodayRecommendations() {
    const videos = await this.videosService.findTodayRecommendations();
    return { message: '获取成功', data: videos };
  }

  @Get('featured')
  @ApiOperation({ summary: '获取精选视频' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findFeatured(@Query('limit') limit?: number) {
    const videos = await this.videosService.findFeatured(limit);
    return { message: '获取成功', data: videos };
  }

  @Post('sync/:bvId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '同步视频信息（从 B 站 API）' })
  @ApiResponse({ status: 200, description: '同步成功' })
  async syncVideoInfo(@Param('bvId') bvId: string) {
    const video = await this.videosService.syncVideoInfo(bvId);
    return { message: '同步成功', data: video };
  }

  @Patch('featured')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '标记为精选' })
  @ApiResponse({ status: 200, description: '操作成功' })
  async markAsFeatured(@Body() dto: MarkAsFeaturedDto) {
    const video = await this.videosService.markAsFeatured(dto.bvId);
    return { message: '标记成功', data: video };
  }

  @Patch('unfeatured')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '取消精选' })
  @ApiResponse({ status: 200, description: '操作成功' })
  async unmarkAsFeatured(@Body() dto: MarkAsFeaturedDto) {
    const video = await this.videosService.unmarkAsFeatured(dto.bvId);
    return { message: '取消成功', data: video };
  }

  @Patch('rating')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '更新评分' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async updateRating(@Body() dto: UpdateRatingDto) {
    const video = await this.videosService.updateRating(dto.bvId, dto.rating);
    return { message: '更新成功', data: video };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除视频' })
  @ApiResponse({ status: 204, description: '删除成功' })
  async remove(@Param('id') id: string) {
    await this.videosService.remove(id);
    return { message: '删除成功' };
  }
}
