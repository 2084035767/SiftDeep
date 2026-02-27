import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import {
  CreateRecommendationDto,
  UpdateRecommendationDto,
} from './dto/recommendation.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('recommendations')
@UseGuards(AuthGuard('jwt'))
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post()
  create(
    @Body() createRecommendationDto: CreateRecommendationDto,
    @Request() req,
  ) {
    return this.recommendationsService.create(
      createRecommendationDto,
      req.user.id,
    );
  }

  @Get()
  findAll() {
    return this.recommendationsService.findAll();
  }

  @Get('editor-picks')
  findEditorPicks() {
    return this.recommendationsService.findEditorPicks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommendationsService.findOne(id);
  }

  @Get('video/:videoId')
  findByVideoId(@Param('videoId') videoId: string) {
    return this.recommendationsService.findByVideoId(videoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecommendationDto: UpdateRecommendationDto,
  ) {
    return this.recommendationsService.update(id, updateRecommendationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommendationsService.remove(id);
  }
}
