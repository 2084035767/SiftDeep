import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty({ description: '专题标题' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '专题描述' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: '专题类型',
    enum: ['educational', 'documentary', 'tutorial', 'analysis', 'other'],
    default: 'other',
  })
  @IsEnum(['educational', 'documentary', 'tutorial', 'analysis', 'other'])
  @IsOptional()
  type?: 'educational' | 'documentary' | 'tutorial' | 'analysis' | 'other';

  @ApiPropertyOptional({ description: '分类' })
  @IsString()
  @IsOptional()
  category?: string;
}

export class UpdateTopicDto {
  @ApiPropertyOptional({ description: '专题标题' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: '专题描述' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: '专题类型',
    enum: ['educational', 'documentary', 'tutorial', 'analysis', 'other'],
  })
  @IsEnum(['educational', 'documentary', 'tutorial', 'analysis', 'other'])
  @IsOptional()
  type?: 'educational' | 'documentary' | 'tutorial' | 'analysis' | 'other';

  @ApiPropertyOptional({ description: '分类' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: '预计阅读时间（分钟）' })
  @IsInt()
  @Min(0)
  @IsOptional()
  estimatedReadTime?: number;

  @ApiPropertyOptional({ description: '文章数量' })
  @IsInt()
  @Min(0)
  @IsOptional()
  articleCount?: number;

  @ApiPropertyOptional({ description: '参考资料链接', isArray: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  resources?: string[];

  @ApiPropertyOptional({ description: '是否发布' })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class AddVideoToTopicDto {
  @ApiProperty({ description: 'BV 号' })
  @IsString()
  @IsNotEmpty()
  bvId: string;

  @ApiPropertyOptional({ description: '视频介绍' })
  @IsString()
  @IsOptional()
  introduction?: string;

  @ApiPropertyOptional({ description: '是否必看', default: false })
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;
}

export class UpdateTopicVideoOrderDto {
  @ApiProperty({ description: '专题视频 ID' })
  @IsString()
  @IsNotEmpty()
  topicVideoId: string;

  @ApiProperty({ description: '新排序', minimum: 0 })
  @IsInt()
  @Min(0)
  newOrder: number;
}

export class FindTopicsDto {
  @ApiPropertyOptional({ description: '页码', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: '每页数量', default: 20 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({
    description: '专题类型',
    enum: ['educational', 'documentary', 'tutorial', 'analysis', 'other'],
  })
  @IsEnum(['educational', 'documentary', 'tutorial', 'analysis', 'other'])
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ description: '分类' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: '是否已发布', default: true })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean = true;
}
