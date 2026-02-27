import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsArray,
  Min,
  Max,
  Length,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  videoId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;

  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pros?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cons?: string[];

  @IsOptional()
  @IsBoolean()
  isEditorPick?: boolean;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pros?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cons?: string[];

  @IsOptional()
  @IsBoolean()
  isEditorPick?: boolean;
}

export class VoteReviewDto {
  @IsString()
  reviewId: string;

  @IsBoolean()
  isHelpful: boolean;
}
