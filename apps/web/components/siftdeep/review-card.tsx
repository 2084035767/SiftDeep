'use client';

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

export interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  pros?: string[];
  cons?: string[];
  isVerified?: boolean;
  helpfulCount?: number;
  isEditorPick?: boolean;
  user: {
    username: string;
    profile?: {
      name?: string;
      profilePicture?: string;
    };
  };
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
  onVote?: (reviewId: string, isHelpful: boolean) => void;
}

export function ReviewCard({ review, onVote }: ReviewCardProps) {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (isHelpful: boolean) => {
    if (hasVoted) return;
    onVote?.(review.id, isHelpful);
    setHasVoted(true);
  };

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow duration-300 hover:shadow-md">
      {/* 头部：用户信息和评分 */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.user.profile?.profilePicture || '/default-avatar.png'}
            alt={review.user.username}
            className="h-10 w-10 rounded-full ring-2 ring-gray-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">
                {review.user.profile?.name || review.user.username}
              </span>
              {review.isEditorPick && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                  编辑精选
                </span>
              )}
              {review.isVerified && (
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                  已观看
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
        </div>

        {/* 评分 */}
        <div className="flex items-center gap-1">
          {[...Array(10)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
          <span className="ml-2 text-lg font-bold text-gray-900">
            {review.rating}
          </span>
        </div>
      </div>

      {/* 标题和内容 */}
      <h3 className="mb-3 text-lg font-bold text-gray-900">{review.title}</h3>
      <p className="mb-4 leading-relaxed whitespace-pre-line text-gray-600">
        {review.content}
      </p>

      {/* 优缺点标签 */}
      {(review.pros?.length || review.cons?.length) && (
        <div className="mb-4 flex gap-4">
          {(review.pros || []).length > 0 && (
            <div className="flex-1">
              <p className="mb-2 text-sm font-medium text-green-600">优点</p>
              <div className="flex flex-wrap gap-2">
                {review.pros?.map((pro, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700"
                  >
                    {pro}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(review.cons || []).length > 0 && (
            <div className="flex-1">
              <p className="mb-2 text-sm font-medium text-red-600">不足</p>
              <div className="flex flex-wrap gap-2">
                {review.cons?.map((con, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-700"
                  >
                    {con}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 操作栏 */}
      <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
        <button
          onClick={() => handleVote(true)}
          disabled={hasVoted}
          className={`flex items-center gap-2 text-sm transition-colors ${
            hasVoted ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{review.helpfulCount || 0} 有帮助</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700">
          <MessageSquare className="h-4 w-4" />
          <span>回复</span>
        </button>
      </div>
    </article>
  );
}
