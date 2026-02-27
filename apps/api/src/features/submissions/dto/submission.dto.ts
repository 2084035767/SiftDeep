import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubmissionStatus } from '../entities/submission.entity';

export class CreateSubmissionDto {
  @ApiProperty({ description: 'BV 号' })
  @IsString()
  @IsNotEmpty()
  bvId: string;

  @ApiProperty({ description: '推荐理由' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ description: '分类' })
  @IsString()
  @IsNotEmpty()
  category: string;
}

export class ReviewSubmissionDto {
  @ApiProperty({
    description: '审核结果',
    enum: ['approved', 'rejected'],
  })
  @IsEnum(['approved', 'rejected'])
  @IsNotEmpty()
  status: SubmissionStatus.APPROVED | SubmissionStatus.REJECTED;

  @ApiPropertyOptional({ description: '审核备注' })
  @IsString()
  @IsOptional()
  note?: string;
}

export class FindSubmissionsDto {
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
}
