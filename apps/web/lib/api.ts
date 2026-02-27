/**
 * 深选 API 客户端
 * 用于前端调用后端 API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * 通用请求方法
 */
async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { data: null, error: result.message || '请求失败' };
    }

    return { data: result, error: null };
  } catch (error) {
    console.error('API request error:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : '未知错误',
    };
  }
}

/**
 * 获取认证 token
 */
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * 带认证的请求
 */
async function authRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<{ data: T | null; error: string | null }> {
  const token = getToken();
  return request<T>(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}

// ==================== 视频 API ====================

export const videosApi = {
  /**
   * 通过 BV 号获取视频
   */
  getByBvId: (bvId: string) => request(`/videos/bv/${bvId}`),

  /**
   * 获取视频列表
   */
  getList: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    tags?: string[];
    sortBy?: 'createdAt' | 'playCount' | 'rating' | 'featuredAt';
    sortOrder?: 'ASC' | 'DESC';
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.category) searchParams.set('category', params.category);
    if (params?.tags)
      params.tags.forEach((tag) => searchParams.append('tags[]', tag));
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    return request(`/videos?${searchParams.toString()}`);
  },

  /**
   * 获取今日推荐
   */
  getTodayRecommendations: () => request('/videos/featured/today'),

  /**
   * 获取精选视频
   */
  getFeatured: (limit?: number) =>
    request(`/videos/featured${limit ? `?limit=${limit}` : ''}`),
};

// ==================== 投稿 API ====================

export const submissionsApi = {
  /**
   * 创建投稿
   */
  create: (data: { bvId: string; reason: string; category: string }) =>
    authRequest('/submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * 获取我的投稿列表
   */
  getMyList: (page?: number, limit?: number) =>
    authRequest(`/submissions/my?page=${page || 1}&limit=${limit || 20}`),

  /**
   * 获取投稿详情
   */
  getOne: (id: string) => authRequest(`/submissions/${id}`),
};

// ==================== 收藏夹 API ====================

export const collectionsApi = {
  /**
   * 创建收藏夹
   */
  create: (data: {
    name: string;
    description?: string;
    visibility?: 'public' | 'private' | 'unlisted';
    isCollaborative?: boolean;
  }) =>
    authRequest('/collections', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * 获取公开收藏夹列表
   */
  getPublic: (page?: number, limit?: number) =>
    request(`/collections/public?page=${page || 1}&limit=${limit || 20}`),

  /**
   * 获取我的收藏夹列表
   */
  getMyList: (page?: number, limit?: number) =>
    authRequest(`/collections/my?page=${page || 1}&limit=${limit || 20}`),

  /**
   * 获取收藏夹详情
   */
  getOne: (id: string) => authRequest(`/collections/${id}`),

  /**
   * 获取收藏夹内容列表
   */
  getItems: (id: string, page?: number, limit?: number) =>
    authRequest(
      `/collections/${id}/items?page=${page || 1}&limit=${limit || 20}`,
    ),

  /**
   * 添加视频到收藏夹
   */
  addVideo: (collectionId: string, bvId: string, note?: string) =>
    authRequest(`/collections/${collectionId}/videos`, {
      method: 'POST',
      body: JSON.stringify({ bvId, note }),
    }),

  /**
   * 从收藏夹移除视频
   */
  removeVideo: (collectionId: string, itemId: string) =>
    authRequest(`/collections/${collectionId}/videos/${itemId}`, {
      method: 'DELETE',
    }),

  /**
   * 更新收藏夹
   */
  update: (
    id: string,
    data: {
      name?: string;
      description?: string;
      visibility?: 'public' | 'private' | 'unlisted';
      isCollaborative?: boolean;
    },
  ) =>
    authRequest(`/collections/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  /**
   * 删除收藏夹
   */
  delete: (id: string) =>
    authRequest(`/collections/${id}`, { method: 'DELETE' }),

  /**
   * 关注收藏夹
   */
  follow: (id: string) =>
    authRequest(`/collections/${id}/follow`, { method: 'POST' }),
};

// ==================== 专题 API ====================

export const topicsApi = {
  /**
   * 创建专题
   */
  create: (data: {
    title: string;
    description: string;
    type?: 'educational' | 'documentary' | 'tutorial' | 'analysis' | 'other';
    category?: string;
  }) =>
    authRequest('/topics', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * 获取专题列表
   */
  getList: (params?: {
    page?: number;
    limit?: number;
    type?: string;
    category?: string;
    isPublished?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.type) searchParams.set('type', params.type);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.isPublished !== undefined)
      searchParams.set('isPublished', String(params.isPublished));

    return request(`/topics?${searchParams.toString()}`);
  },

  /**
   * 获取我创建的专题
   */
  getMyList: (page?: number, limit?: number) =>
    authRequest(`/topics/my?page=${page || 1}&limit=${limit || 20}`),

  /**
   * 获取专题详情
   */
  getOne: (id: string) => authRequest(`/topics/${id}`),

  /**
   * 添加视频到专题
   */
  addVideo: (
    topicId: string,
    bvId: string,
    introduction?: string,
    isRequired?: boolean,
  ) =>
    authRequest(`/topics/${topicId}/videos`, {
      method: 'POST',
      body: JSON.stringify({ bvId, introduction, isRequired }),
    }),

  /**
   * 发布/取消发布专题
   */
  togglePublish: (id: string) =>
    authRequest(`/topics/${id}/publish`, { method: 'POST' }),

  /**
   * 更新专题
   */
  update: (
    id: string,
    data: {
      title?: string;
      description?: string;
      type?: string;
      category?: string;
      estimatedReadTime?: number;
      articleCount?: number;
      resources?: string[];
      isPublished?: boolean;
    },
  ) =>
    authRequest(`/topics/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  /**
   * 删除专题
   */
  delete: (id: string) => authRequest(`/topics/${id}`, { method: 'DELETE' }),
};

// ==================== 反馈 API ====================

export const feedbackApi = {
  /**
   * 创建反馈
   */
  create: (data: {
    type: 'low_quality' | 'copyright' | 'inappropriate' | 'spam' | 'other';
    reason: string;
    description?: string;
    bvId: string;
    isAnonymous?: boolean;
  }) =>
    authRequest('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * 获取我的反馈列表
   */
  getMyList: (page?: number, limit?: number) =>
    authRequest(`/feedback/my?page=${page || 1}&limit=${limit || 20}`),

  /**
   * 获取视频反馈统计
   */
  getVideoStats: (bvId: string) => request(`/feedback/video/${bvId}/stats`),
};

// ==================== 用户 API ====================

export const usersApi = {
  /**
   * 获取用户信息
   */
  getOne: (identifier: string) => request(`/users/${identifier}`),

  /**
   * 获取所有用户（管理员）
   */
  getAll: () => request('/users'),
};
