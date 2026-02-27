import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({ description: '收藏夹名称' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: '描述' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: '可见性',
    enum: ['public', 'private', 'unlisted'],
    default: 'public',
  })
  @IsEnum(['public', 'private', 'unlisted'])
  @IsOptional()
  visibility?: 'public' | 'private' | 'unlisted';

  @ApiPropertyOptional({ description: '是否协同编辑', default: false })
  @IsBoolean()
  @IsOptional()
  isCollaborative?: boolean;
}

export class UpdateCollectionDto {
  @ApiPropertyOptional({ description: '收藏夹名称' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: '描述' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: '可见性',
    enum: ['public', 'private', 'unlisted'],
  })
  @IsEnum(['public', 'private', 'unlisted'])
  @IsOptional()
  visibility?: 'public' | 'private' | 'unlisted';

  @ApiPropertyOptional({ description: '是否协同编辑' })
  @IsBoolean()
  @IsOptional()
  isCollaborative?: boolean;
}

export class AddVideoToCollectionDto {
  @ApiProperty({ description: 'BV 号' })
  @IsString()
  @IsNotEmpty()
  bvId: string;

  @ApiPropertyOptional({ description: '备注' })
  @IsString()
  @IsOptional()
  note?: string;
}

export class UpdateItemOrderDto {
  @ApiProperty({ description: '收藏项 ID' })
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @ApiProperty({ description: '新排序', minimum: 0 })
  @IsInt()
  @Min(0)
  newOrder: number;
}

export class FindCollectionsDto {
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
