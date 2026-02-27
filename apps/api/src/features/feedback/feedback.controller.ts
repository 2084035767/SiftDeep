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
import { FeedbackService } from './feedback.service';
import {
  CreateFeedbackDto,
  UpdateFeedbackDto,
  FindFeedbacksDto,
} from './dto/feedback.dto';
import { FeedbackType, FeedbackStatus } from './entities/feedback.entity';
import { JwtAuthGuard } from '@/common/guards';
import { User as CurrentUser } from '@/common/decorators';

@ApiTags('Feedback')
@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: '创建反馈' })
  @ApiResponse({ status: 201, description: '提交成功' })
  async create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateFeedbackDto,
  ) {
    const feedback = await this.feedbackService.createFeedback(
      user.id,
      dto.bvId,
      FeedbackType[dto.type.toUpperCase()],
      dto.reason,
      dto.description,
      dto.isAnonymous,
    );
    return { message: '提交成功', data: feedback };
  }

  @Get('my')
  @ApiOperation({ summary: '获取我的反馈列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findMyFeedbacks(
    @CurrentUser() user: { id: string },
    @Query() query: FindFeedbacksDto,
  ) {
    const result = await this.feedbackService.findUserFeedbacks(
      user.id,
      query.page,
      query.limit,
    );
    return { message: '获取成功', ...result };
  }

  @Get('pending')
  @ApiOperation({ summary: '获取待处理反馈（管理员）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findPending(@Query() query: FindFeedbacksDto) {
    const result = await this.feedbackService.findPendingFeedbacks(
      query.page,
      query.limit,
    );
    return { message: '获取成功', ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取反馈详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findOne(@Param('id') id: string) {
    const feedback = await this.feedbackService.findOne(id);
    return { message: '获取成功', data: feedback };
  }

  @Get('video/:bvId/stats')
  @ApiOperation({ summary: '获取视频反馈统计' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getVideoStats(@Param('bvId') bvId: string) {
    const stats = await this.feedbackService.getVideoFeedbackStats(bvId);
    return { message: '获取成功', data: stats };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '处理反馈（管理员）' })
  @ApiResponse({ status: 200, description: '处理成功' })
  async handle(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateFeedbackDto,
  ) {
    const feedback = await this.feedbackService.handleFeedback(
      id,
      user.id,
      dto.status ? FeedbackStatus[dto.status.toUpperCase()] : undefined,
      dto.handlerNote,
    );
    return { message: '处理成功', data: feedback };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除反馈' })
  @ApiResponse({ status: 204, description: '删除成功' })
  async remove(@Param('id') id: string) {
    await this.feedbackService.remove(id);
    return { message: '删除成功' };
  }
}
