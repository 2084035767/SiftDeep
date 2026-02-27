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
import { SubmissionsService } from './submissions.service';
import {
  CreateSubmissionDto,
  ReviewSubmissionDto,
  FindSubmissionsDto,
} from './dto/submission.dto';
import { JwtAuthGuard } from '@/common/guards';
import { User as CurrentUser } from '@/common/decorators';

@ApiTags('Submissions')
@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @ApiOperation({ summary: '创建投稿' })
  @ApiResponse({ status: 201, description: '投稿成功' })
  async create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateSubmissionDto,
  ) {
    const submission = await this.submissionsService.createSubmission(
      user.id,
      dto.bvId,
      dto.reason,
      dto.category,
    );
    return { message: '投稿成功，等待审核', data: submission };
  }

  @Get('my')
  @ApiOperation({ summary: '获取我的投稿列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findMySubmissions(
    @CurrentUser() user: { id: string },
    @Query() query: FindSubmissionsDto,
  ) {
    const result = await this.submissionsService.findUserSubmissions(
      user.id,
      query.page,
      query.limit,
    );
    return { message: '获取成功', ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取投稿详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findOne(@Param('id') id: string) {
    const submission = await this.submissionsService.findOne(id);
    return { message: '获取成功', data: submission };
  }

  @Get('pending/all')
  @ApiOperation({ summary: '获取待审核投稿（管理员）' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findPending(@Query() query: FindSubmissionsDto) {
    const result = await this.submissionsService.findPendingSubmissions(
      query.page,
      query.limit,
    );
    return { message: '获取成功', ...result };
  }

  @Patch(':id/review')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '审核投稿（管理员）' })
  @ApiResponse({ status: 200, description: '审核成功' })
  async review(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: ReviewSubmissionDto,
  ) {
    const submission = await this.submissionsService.reviewSubmission(
      id,
      user.id,
      dto.status,
      dto.note,
    );
    return {
      message: dto.status === 'approved' ? '已通过' : '已拒绝',
      data: submission,
    };
  }

  @Post(':id/mark-review')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '标记为复审' })
  @ApiResponse({ status: 200, description: '操作成功' })
  async markForReview(@Param('id') id: string) {
    const submission = await this.submissionsService.markForReview(id);
    return { message: '已标记为复审', data: submission };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除投稿' })
  @ApiResponse({ status: 204, description: '删除成功' })
  async remove(@Param('id') id: string) {
    await this.submissionsService.remove(id);
    return { message: '删除成功' };
  }
}
