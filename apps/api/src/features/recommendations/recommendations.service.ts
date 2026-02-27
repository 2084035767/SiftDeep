import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recommendation } from './entities/recommendation.entity';
import {
  CreateRecommendationDto,
  UpdateRecommendationDto,
} from './dto/recommendation.dto';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendation)
    private recommendationRepository: Repository<Recommendation>,
  ) {}

  async create(
    createRecommendationDto: CreateRecommendationDto,
    curatorId: string,
  ) {
    const { videoId } = createRecommendationDto;

    // Check if recommendation already exists for this video
    const existing = await this.recommendationRepository.findOne({
      where: { videoId },
    });

    if (existing) {
      throw new ConflictException(
        'Recommendation already exists for this video',
      );
    }

    const recommendation = this.recommendationRepository.create({
      ...createRecommendationDto,
      curatorId,
    });

    return this.recommendationRepository.save(recommendation);
  }

  async findAll() {
    return this.recommendationRepository.find({
      relations: ['curator', 'curator.profile'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const recommendation = await this.recommendationRepository.findOne({
      where: { id },
      relations: ['curator', 'curator.profile', 'video'],
    });

    if (!recommendation) {
      throw new NotFoundException('Recommendation not found');
    }

    return recommendation;
  }

  async findByVideoId(videoId: string) {
    return this.recommendationRepository.findOne({
      where: { videoId },
      relations: ['curator', 'curator.profile'],
    });
  }

  async findEditorPicks() {
    return this.recommendationRepository.find({
      where: { isEditorPick: true },
      relations: ['curator', 'curator.profile', 'video'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateRecommendationDto: UpdateRecommendationDto) {
    await this.findOne(id);
    await this.recommendationRepository.update(id, updateRecommendationDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.recommendationRepository.delete(id);
    return { message: 'Recommendation deleted successfully' };
  }
}
