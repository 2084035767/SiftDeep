/**
 * 视频 API 调用函数
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Video {
  id: string;
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
  isFeatured: boolean;
  createdAt: string;
}

/**
 * 获取视频详情
 */
export async function getVideoByBvId(bvId: string): Promise<Video> {
  const response = await fetch(`${API_URL}/videos/bv/${bvId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch video');
  }

  return response.json();
}

/**
 * 获取精选视频列表
 */
export async function getFeaturedVideos(
  page = 1,
  limit = 12,
): Promise<{ data: Video[]; total: number }> {
  const response = await fetch(
    `${API_URL}/videos?isFeatured=true&page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  return response.json();
}

/**
 * 获取视频平均评分
 */
export async function getVideoAverageRating(bvId: string): Promise<number> {
  try {
    const response = await fetch(`${API_URL}/reviews/video/${bvId}/average`);

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.average || 0;
  } catch {
    return 0;
  }
}
