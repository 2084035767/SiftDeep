/**
 * 推荐语 API 调用函数
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Recommendation {
  id: string;
  highlight: string;
  reason?: string;
  tags?: string[];
  targetAudience?: string;
  watchTime?: string;
  isEditorPick?: boolean;
  curator: {
    username: string;
    profile?: {
      name?: string;
      profilePicture?: string;
    };
  };
  createdAt: string;
}

/**
 * 获取视频推荐语
 */
export async function getRecommendationByVideoId(
  videoId: string,
): Promise<Recommendation | null> {
  try {
    const response = await fetch(`${API_URL}/recommendations/video/${videoId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch recommendation');
    }

    return response.json();
  } catch {
    return null;
  }
}

/**
 * 获取编辑精选推荐
 */
export async function getEditorPicks(): Promise<Recommendation[]> {
  const response = await fetch(`${API_URL}/recommendations/editor-picks`);

  if (!response.ok) {
    throw new Error('Failed to fetch editor picks');
  }

  return response.json();
}
