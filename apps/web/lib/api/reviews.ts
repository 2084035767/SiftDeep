/**
 * 评价 API 调用函数
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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

export interface CreateReviewDto {
  videoId: string;
  rating: number;
  title: string;
  content: string;
  pros?: string[];
  cons?: string[];
}

/**
 * 获取视频评价列表
 */
export async function getReviews(
  videoId: string,
  token?: string,
): Promise<Review[]> {
  const response = await fetch(
    `${API_URL}/reviews?videoId=${videoId}&sortBy=createdAt&order=DESC`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }

  return response.json();
}

/**
 * 创建评价
 */
export async function createReview(
  data: CreateReviewDto,
  token: string,
): Promise<Review> {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create review');
  }

  return response.json();
}

/**
 * 投票评价
 */
export async function voteReview(
  reviewId: string,
  isHelpful: boolean,
  token: string,
): Promise<{ helpfulCount: number }> {
  const response = await fetch(`${API_URL}/reviews/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reviewId, isHelpful }),
  });

  if (!response.ok) {
    throw new Error('Failed to vote review');
  }

  return response.json();
}

/**
 * 删除评价
 */
export async function deleteReview(id: string, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete review');
  }
}
