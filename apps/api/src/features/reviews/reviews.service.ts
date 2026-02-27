import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review, ReviewVote } from './entities/review.entity';
import {
  CreateReviewDto,
  UpdateReviewDto,
  VoteReviewDto,
} from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(ReviewVote)
    private voteRepository: Repository<ReviewVote>,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      userId,
    });
    return this.reviewRepository.save(review);
  }

  async findAll(
    videoId?: string,
    sortBy: string = 'createdAt',
    order: 'ASC' | 'DESC' = 'DESC',
  ) {
    const query = this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile');

    if (videoId) {
      query.where('review.videoId = :videoId', { videoId });
    }

    const validSortFields = ['createdAt', 'rating', 'helpfulCount'];
    if (!validSortFields.includes(sortBy)) {
      sortBy = 'createdAt';
    }

    query.orderBy(`review.${sortBy}`, order);

    return query.getMany();
  }

  async findOne(id: string) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'user.profile'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, userId: string) {
    const review = await this.findOne(id);

    if (review.userId !== userId) {
      throw new BadRequestException('You can only update your own reviews');
    }

    await this.reviewRepository.update(id, updateReviewDto);
    return this.findOne(id);
  }

  async remove(id: string, userId: string) {
    const review = await this.findOne(id);

    if (review.userId !== userId) {
      throw new BadRequestException('You can only delete your own reviews');
    }

    await this.reviewRepository.delete(id);
    return { message: 'Review deleted successfully' };
  }

  async vote(voteReviewDto: VoteReviewDto, userId: string) {
    const { reviewId, isHelpful } = voteReviewDto;

    // Check if review exists
    await this.findOne(reviewId);

    // Check if user already voted
    const existingVote = await this.voteRepository.findOne({
      where: { reviewId, userId },
    });

    if (existingVote) {
      // Update existing vote
      existingVote.isHelpful = isHelpful;
      await this.voteRepository.save(existingVote);
    } else {
      // Create new vote
      const vote = this.voteRepository.create({
        reviewId,
        userId,
        isHelpful,
      });
      await this.voteRepository.save(vote);
    }

    // Update helpful count
    const helpfulCount = await this.voteRepository.count({
      where: { reviewId, isHelpful: true },
    });

    await this.reviewRepository.update(reviewId, { helpfulCount });

    return { helpfulCount };
  }

  async getAverageRating(videoId: string) {
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.videoId = :videoId', { videoId })
      .getRawOne();

    return result?.average || 0;
  }
}
