import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({
    description: '反馈类型',
    enum: ['low_quality', 'copyright', 'inappropriate', 'spam', 'other'],
  })
  @IsEnum(['low_quality', 'copyright', 'inappropriate', 'spam', 'other'])
  @IsNotEmpty()
  type: 'low_quality' | 'copyright' | 'inappropriate' | 'spam' | 'other';

  @ApiProperty({ description: '反馈原因' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiPropertyOptional({ description: '详细描述' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'BV 号' })
  @IsString()
  @IsNotEmpty()
  bvId: string;

  @ApiPropertyOptional({ description: '是否匿名', default: false })
  @IsBoolean()
  @IsOptional()
  isAnonymous?: boolean;
}

export class UpdateFeedbackDto {
  @ApiPropertyOptional({
    description: '处理状态',
    enum: ['pending', 'reviewing', 'resolved', 'rejected'],
  })
  @IsEnum(['pending', 'reviewing', 'resolved', 'rejected'])
  @IsOptional()
  status?: 'pending' | 'reviewing' | 'reviewing' | 'resolved' | 'rejected';

  @ApiPropertyOptional({ description: '处理备注' })
  @IsString()
  @IsOptional()
  handlerNote?: string;
}

export class FindFeedbacksDto {
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
    description: '反馈类型',
    enum: ['low_quality', 'copyright', 'inappropriate', 'spam', 'other'],
  })
  @IsEnum(['low_quality', 'copyright', 'inappropriate', 'spam', 'other'])
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    description: '处理状态',
    enum: ['pending', 'reviewing', 'resolved', 'rejected'],
  })
  @IsEnum(['pending', 'reviewing', 'resolved', 'rejected'])
  @IsOptional()
  status?: string;
}
