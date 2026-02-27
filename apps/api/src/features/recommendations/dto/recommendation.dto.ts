import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateRecommendationDto {
  @IsString()
  videoId: string;

  @IsString()
  highlight: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  targetAudience?: string;

  @IsOptional()
  @IsString()
  watchTime?: string;

  @IsOptional()
  @IsBoolean()
  isEditorPick?: boolean;
}

export class UpdateRecommendationDto {
  @IsOptional()
  @IsString()
  highlight?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  targetAudience?: string;

  @IsOptional()
  @IsString()
  watchTime?: string;

  @IsOptional()
  @IsBoolean()
  isEditorPick?: boolean;
}
