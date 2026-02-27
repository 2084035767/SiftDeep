'use client';

import { useState } from 'react';
import { Navbar, VideoCard } from '@/components/siftdeep';
import { Trophy, TrendingUp, Star, Clock } from 'lucide-react';

// 示例数据 - 实际应从 API 获取
const hotVideos = [
  {
    id: '1',
    title: '量子计算的未来：从理论到实践的突破之路',
    thumbnail: 'https://picsum.photos/600/400?random=1',
    duration: '12:34',
    upName: '科学探索者',
    upAvatar: 'https://picsum.photos/40/40?random=101',
    views: '245.5 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.5,
    reviewCount: 156,
  },
  {
    id: '2',
    title: '中国动画百年发展史：从万氏兄弟到今日国创',
    thumbnail: 'https://picsum.photos/600/400?random=2',
    duration: '24:15',
    upName: '国创研究院',
    upAvatar: 'https://picsum.photos/40/40?random=102',
    views: '156.2 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.8,
    reviewCount: 243,
  },
  {
    id: '3',
    title: '深度学习入门：从零构建神经网络',
    thumbnail: 'https://picsum.photos/600/400?random=4',
    duration: '32:10',
    upName: 'AI 学院',
    upAvatar: 'https://picsum.photos/40/40?random=104',
    views: '89.3 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.6,
    reviewCount: 512,
  },
  {
    id: '4',
    title: '被遗忘的经典：80 年代小众动画佳作盘点',
    thumbnail: 'https://picsum.photos/600/400?random=3',
    duration: '18:52',
    upName: '动画考古者',
    upAvatar: 'https://picsum.photos/40/40?random=103',
    views: '52.8 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.2,
    reviewCount: 87,
  },
  {
    id: '5',
    title: '日本料理的精髓：寿司制作全流程',
    thumbnail: 'https://picsum.photos/600/400?random=5',
    duration: '15:20',
    upName: '美食家小王',
    upAvatar: 'https://picsum.photos/40/40?random=105',
    views: '34.7 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.0,
    reviewCount: 178,
  },
  {
    id: '6',
    title: '城市摄影技巧：如何捕捉光影之美',
    thumbnail: 'https://picsum.photos/600/400?random=6',
    duration: '20:45',
    upName: '摄影师老张',
    upAvatar: 'https://picsum.photos/40/40?random=106',
    views: '21.2 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 8.9,
    reviewCount: 95,
  },
];

const topRatedVideos = [
  {
    id: '2',
    title: '中国动画百年发展史：从万氏兄弟到今日国创',
    thumbnail: 'https://picsum.photos/600/400?random=2',
    duration: '24:15',
    upName: '国创研究院',
    upAvatar: 'https://picsum.photos/40/40?random=102',
    views: '156.2 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.8,
    reviewCount: 243,
  },
  {
    id: '3',
    title: '深度学习入门：从零构建神经网络',
    thumbnail: 'https://picsum.photos/600/400?random=4',
    duration: '32:10',
    upName: 'AI 学院',
    upAvatar: 'https://picsum.photos/40/40?random=104',
    views: '89.3 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.6,
    reviewCount: 512,
  },
  {
    id: '1',
    title: '量子计算的未来：从理论到实践的突破之路',
    thumbnail: 'https://picsum.photos/600/400?random=1',
    duration: '12:34',
    upName: '科学探索者',
    upAvatar: 'https://picsum.photos/40/40?random=101',
    views: '245.5 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.5,
    reviewCount: 156,
  },
  {
    id: '4',
    title: '被遗忘的经典：80 年代小众动画佳作盘点',
    thumbnail: 'https://picsum.photos/600/400?random=3',
    duration: '18:52',
    upName: '动画考古者',
    upAvatar: 'https://picsum.photos/40/40?random=103',
    views: '52.8 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.2,
    reviewCount: 87,
  },
  {
    id: '5',
    title: '日本料理的精髓：寿司制作全流程',
    thumbnail: 'https://picsum.photos/600/400?random=5',
    duration: '15:20',
    upName: '美食家小王',
    upAvatar: 'https://picsum.photos/40/40?random=105',
    views: '34.7 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.0,
    reviewCount: 178,
  },
  {
    id: '6',
    title: '城市摄影技巧：如何捕捉光影之美',
    thumbnail: 'https://picsum.photos/600/400?random=6',
    duration: '20:45',
    upName: '摄影师老张',
    upAvatar: 'https://picsum.photos/40/40?random=106',
    views: '21.2 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 8.9,
    reviewCount: 95,
  },
];

const newVideos = [
  {
    id: '6',
    title: '城市摄影技巧：如何捕捉光影之美',
    thumbnail: 'https://picsum.photos/600/400?random=6',
    duration: '20:45',
    upName: '摄影师老张',
    upAvatar: 'https://picsum.photos/40/40?random=106',
    views: '21.2 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 8.9,
    reviewCount: 95,
  },
  {
    id: '5',
    title: '日本料理的精髓：寿司制作全流程',
    thumbnail: 'https://picsum.photos/600/400?random=5',
    duration: '15:20',
    upName: '美食家小王',
    upAvatar: 'https://picsum.photos/40/40?random=105',
    views: '34.7 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.0,
    reviewCount: 178,
  },
  {
    id: '4',
    title: '被遗忘的经典：80 年代小众动画佳作盘点',
    thumbnail: 'https://picsum.photos/600/400?random=3',
    duration: '18:52',
    upName: '动画考古者',
    upAvatar: 'https://picsum.photos/40/40?random=103',
    views: '52.8 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.2,
    reviewCount: 87,
  },
  {
    id: '3',
    title: '深度学习入门：从零构建神经网络',
    thumbnail: 'https://picsum.photos/600/400?random=4',
    duration: '32:10',
    upName: 'AI 学院',
    upAvatar: 'https://picsum.photos/40/40?random=104',
    views: '89.3 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.6,
    reviewCount: 512,
  },
  {
    id: '2',
    title: '中国动画百年发展史：从万氏兄弟到今日国创',
    thumbnail: 'https://picsum.photos/600/400?random=2',
    duration: '24:15',
    upName: '国创研究院',
    upAvatar: 'https://picsum.photos/40/40?random=102',
    views: '156.2 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.8,
    reviewCount: 243,
  },
  {
    id: '1',
    title: '量子计算的未来：从理论到实践的突破之路',
    thumbnail: 'https://picsum.photos/600/400?random=1',
    duration: '12:34',
    upName: '科学探索者',
    upAvatar: 'https://picsum.photos/40/40?random=101',
    views: '245.5 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
    rating: 9.5,
    reviewCount: 156,
  },
];

const tabs = [
  { id: 'hot', label: '热门榜', icon: TrendingUp, description: '按播放量排序' },
  { id: 'rating', label: '高分榜', icon: Star, description: '按评分排序' },
  { id: 'new', label: '最新榜', icon: Clock, description: '按发布时间排序' },
];

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<'hot' | 'rating' | 'new'>('hot');

  const getVideos = () => {
    switch (activeTab) {
      case 'hot':
        return hotVideos;
      case 'rating':
        return topRatedVideos;
      case 'new':
        return newVideos;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面头部 */}
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50">
              <Trophy className="h-8 w-8 text-amber-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">排行榜</h1>
            <p className="text-lg text-gray-600">发现最受欢迎的优质内容</p>
          </div>

          {/* 选项卡 */}
          <div className="mx-auto mb-12 max-w-4xl">
            <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
              <div className="grid grid-cols-3 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(tab.id as 'hot' | 'rating' | 'new')
                    }
                    className={`flex flex-col items-center gap-2 rounded-xl px-4 py-4 transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon
                      className={`h-6 w-6 ${
                        activeTab === tab.id ? 'fill-blue-600' : ''
                      }`}
                    />
                    <div className="text-center">
                      <div className="text-sm font-medium">{tab.label}</div>
                      <div className="text-xs text-gray-500">
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 视频列表 */}
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {getVideos().map((video, index) => (
                <div key={video.id} className="relative">
                  {/* 排名标签 */}
                  <div
                    className={`absolute -top-2 -left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg ${
                      index === 0
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-500'
                        : index === 1
                          ? 'bg-gradient-to-br from-gray-400 to-gray-500'
                          : index === 2
                            ? 'bg-gradient-to-br from-amber-600 to-amber-700'
                            : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <VideoCard
                    id={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    duration={video.duration}
                    upName={video.upName}
                    upAvatar={video.upAvatar}
                    views={video.views}
                    href={video.href}
                    rating={video.rating}
                    reviewCount={video.reviewCount}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 深选 SiftDeep - 让好内容被看见
          </p>
        </div>
      </footer>
    </div>
  );
}
