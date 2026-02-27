import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindVideosDto {
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

  @ApiPropertyOptional({ description: '分类' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: '标签', isArray: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: '排序字段',
    enum: ['createdAt', 'playCount', 'rating', 'featuredAt'],
    default: 'featuredAt',
  })
  @IsOptional()
  @IsEnum(['createdAt', 'playCount', 'rating', 'featuredAt'])
  sortBy?: 'createdAt' | 'playCount' | 'rating' | 'featuredAt';

  @ApiPropertyOptional({
    description: '排序方向',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}

export class MarkAsFeaturedDto {
  @ApiProperty({ description: 'BV 号' })
  @IsString()
  bvId: string;
}

export class UpdateRatingDto {
  @ApiProperty({ description: 'BV 号' })
  @IsString()
  bvId: string;

  @ApiProperty({ description: '评分 (0-10)', minimum: 0, maximum: 10 })
  @IsString()
  @Min(0)
  @Max(10)
  rating: number;
}
