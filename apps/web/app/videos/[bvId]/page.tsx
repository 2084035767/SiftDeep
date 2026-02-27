'use client';

import { useState, useEffect } from 'react';
import {
  Play,
  Eye,
  ThumbsUp,
  Coins,
  Star,
  Share2,
  ExternalLink,
} from 'lucide-react';
import {
  RecommendationBanner,
  ReviewCard,
  type Review,
  type Recommendation,
} from '@/components/siftdeep';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/shadcn/avatar';
import { Button } from '@repo/shadcn/button';
import { Textarea } from '@repo/shadcn/textarea';
import {
  getVideoByBvId,
  getVideoAverageRating,
  type Video,
} from '@/lib/api/videos';
import { getRecommendationByVideoId } from '@/lib/api/recommendations';
import { getReviews, createReview, voteReview } from '@/lib/api/reviews';
import { useSession } from 'next-auth/react';

interface VideoDetail {
  bvId: string;
  title: string;
  description: string;
  coverUrl: string;
  duration: number;
  authorName: string;
  playCount: number;
  likeCount: number;
  coinCount: number;
  favoriteCount: number;
  rating: number;
  tags?: string[];
  bilibiliUrl: string;
}

export default function VideoDetailPage({
  params,
}: {
  params: { bvId: string };
}) {
  const [video, setVideo] = useState<Video | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 8,
    title: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function loadData() {
      try {
        // 获取视频详情
        const videoData = await getVideoByBvId(params.bvId);
        setVideo(videoData);

        // 获取推荐语
        const recData = await getRecommendationByVideoId(params.bvId);
        setRecommendation(recData);

        // 获取评价列表
        const reviewsData = await getReviews(params.bvId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [params.bvId]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    }
    return num.toString();
  };

  const handleSubmitReview = async () => {
    if (!newReview.title.trim() || !newReview.content.trim()) {
      alert('请填写标题和内容');
      return;
    }

    if (!session?.user) {
      alert('请先登录后评价');
      return;
    }

    try {
      await createReview(
        {
          videoId: video!.bvId,
          rating: newReview.rating,
          title: newReview.title,
          content: newReview.content,
        },
        session.user.tokens.access_token,
      );

      alert('评价提交成功');
      setNewReview({ rating: 8, title: '', content: '' });

      // 重新加载评价列表
      const reviewsData = await getReviews(video!.bvId);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Failed to create review:', error);
      alert('评价提交失败，请重试');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">视频不存在</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏占位 */}
      <div className="h-16 border-b border-gray-100 bg-white" />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 左侧：视频信息 */}
          <div className="space-y-6 lg:col-span-2">
            {/* 视频封面 */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative aspect-video">
                <img
                  src={video.coverUrl}
                  alt={video.title}
                  className="h-full w-full object-cover"
                />
                <a
                  href={video.bilibiliUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 hover:opacity-100"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90">
                    <Play className="ml-1 h-10 w-10 fill-gray-900 text-gray-900" />
                  </div>
                </a>
                <div className="absolute right-4 bottom-4 rounded-md bg-black/80 px-3 py-1 text-sm font-medium text-white">
                  {formatDuration(video.duration)}
                </div>
              </div>

              <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold text-gray-900">
                  {video.title}
                </h1>

                {/* 视频统计 */}
                <div className="mb-4 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye className="h-5 w-5" />
                    <span>{formatNumber(video.playCount)} 播放</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ThumbsUp className="h-5 w-5" />
                    <span>{formatNumber(video.likeCount)} 点赞</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Coins className="h-5 w-5" />
                    <span>{formatNumber(video.coinCount)} 投币</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="h-5 w-5" />
                    <span>{formatNumber(video.favoriteCount)} 收藏</span>
                  </div>
                </div>

                {/* 评分 */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex items-center">
                    {[...Array(10)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(video.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {video.rating}
                  </span>
                  <span className="text-gray-500">/ 10</span>
                </div>

                {/* 标签 */}
                {video.tags && video.tags.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 简介 */}
                <p className="mb-6 leading-relaxed text-gray-600">
                  {video.description}
                </p>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <a
                    href={video.bilibiliUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <ExternalLink className="h-5 w-5" />
                    前往 B 站观看
                  </a>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-5 w-5" />
                    分享
                  </Button>
                </div>
              </div>
            </div>

            {/* 推荐语 */}
            {recommendation && (
              <RecommendationBanner recommendation={recommendation} />
            )}

            {/* 评价列表 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  用户评价 ({reviews.length})
                </h2>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：UP 主信息和写评价 */}
          <div className="space-y-6">
            {/* UP 主信息 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                UP 主信息
              </h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/avatar-${video.authorName}.png`} />
                  <AvatarFallback>{video.authorName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {video.authorName}
                  </p>
                  <p className="text-sm text-gray-500">优质科普 UP 主</p>
                </div>
              </div>
            </div>

            {/* 写评价 */}
            <div className="sticky top-20 rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">发表评价</h3>

              <div className="space-y-4">
                {/* 评分 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    评分
                  </label>
                  <div className="flex items-center gap-2">
                    {[...Array(10)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setNewReview({ ...newReview, rating: i + 1 })
                        }
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            i < newReview.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-200 text-gray-200 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-lg font-bold text-gray-900">
                      {newReview.rating}
                    </span>
                  </div>
                </div>

                {/* 标题 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    评价标题
                  </label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) =>
                      setNewReview({ ...newReview, title: e.target.value })
                    }
                    placeholder="一句话总结你的看法"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                {/* 内容 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    详细评价
                  </label>
                  <Textarea
                    value={newReview.content}
                    onChange={(e) =>
                      setNewReview({ ...newReview, content: e.target.value })
                    }
                    placeholder="分享你的观看体验、优点和不足..."
                    rows={4}
                    className="w-full resize-none"
                  />
                </div>

                <Button
                  onClick={handleSubmitReview}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  提交评价
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
