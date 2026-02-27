'use client';

import { Play, Eye, Star } from 'lucide-react';

export interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  upName: string;
  upAvatar: string;
  views: string;
  href?: string;
  rating?: number;
  reviewCount?: number;
}

export function VideoCard({
  title,
  thumbnail,
  duration,
  upName,
  upAvatar,
  views,
  href = '#',
  rating,
  reviewCount,
}: VideoCardProps) {
  return (
    <a
      href={href}
      className="group block overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50"
      aria-labelledby={`video-title-${title}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute right-2 bottom-2 rounded-md bg-black/80 px-2 py-1 text-xs font-medium tracking-wide text-white">
          {duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/15">
          <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
              <Play
                className="ml-1 h-6 w-6 fill-gray-900 text-gray-900"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        {/* 评分标签 */}
        {rating && (
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 shadow-sm backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-gray-900">{rating}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3
          id={`video-title-${title}`}
          className="mb-3 line-clamp-2 text-sm leading-snug font-medium text-gray-900 transition-colors duration-200 group-hover:text-gray-600"
        >
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src={upAvatar}
              alt={`${upName} 的头像`}
              className="h-6 w-6 flex-shrink-0 rounded-full ring-2 ring-gray-100"
              loading="lazy"
            />
            <span className="max-w-[100px] truncate text-xs text-gray-500">
              {upName}
            </span>
          </div>
          <div className="flex flex-shrink-0 items-center text-xs text-gray-400">
            <Eye className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
            {views}
          </div>
        </div>
        {/* 评价数量 */}
        {reviewCount !== undefined && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <Star className="h-3 w-3" />
            <span>{reviewCount} 条评价</span>
          </div>
        )}
      </div>
    </a>
  );
}
