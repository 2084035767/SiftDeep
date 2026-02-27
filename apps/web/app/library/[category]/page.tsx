'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar, VideoCard } from '@/components/siftdeep';
import {
  Grid,
  Film,
  Music,
  Gamepad2,
  Utensils,
  Palette,
  Dumbbell,
  Car,
  BookOpen,
  Sparkles,
} from 'lucide-react';

// 分区配置
const categories = [
  { id: 'all', label: '全部', icon: Grid, color: 'gray' },
  { id: 'tech', label: '科技', icon: Sparkles, color: 'blue' },
  { id: 'animation', label: '动画', icon: Film, color: 'pink' },
  { id: 'music', label: '音乐', icon: Music, color: 'purple' },
  { id: 'game', label: '游戏', icon: Gamepad2, color: 'green' },
  { id: 'food', label: '美食', icon: Utensils, color: 'orange' },
  { id: 'art', label: '艺术', icon: Palette, color: 'indigo' },
  { id: 'sports', label: '运动', icon: Dumbbell, color: 'red' },
  { id: 'auto', label: '汽车', icon: Car, color: 'slate' },
  { id: 'knowledge', label: '知识', icon: BookOpen, color: 'amber' },
];

// 示例视频数据
const videosByCategory: Record<string, any[]> = {
  all: [
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
      category: 'tech',
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
      category: 'animation',
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
      category: 'tech',
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
      category: 'animation',
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
      category: 'food',
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
      category: 'art',
    },
    {
      id: '7',
      title: '独立游戏开发日志：从零到上线的完整过程',
      thumbnail: 'https://picsum.photos/600/400?random=7',
      duration: '45:30',
      upName: '独立游戏制作人',
      upAvatar: 'https://picsum.photos/40/40?random=107',
      views: '67.8 万',
      href: 'https://www.bilibili.com/video/BV1xx411c7mD',
      rating: 9.4,
      reviewCount: 321,
      category: 'game',
    },
    {
      id: '8',
      title: '古典音乐入门：必听的 50 首经典曲目',
      thumbnail: 'https://picsum.photos/600/400?random=8',
      duration: '28:15',
      upName: '音乐学堂',
      upAvatar: 'https://picsum.photos/40/40?random=108',
      views: '43.2 万',
      href: 'https://www.bilibili.com/video/BV1xx411c7mD',
      rating: 9.3,
      reviewCount: 198,
      category: 'music',
    },
  ],
  tech: [
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
      category: 'tech',
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
      category: 'tech',
    },
  ],
  animation: [
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
      category: 'animation',
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
      category: 'animation',
    },
  ],
  music: [
    {
      id: '8',
      title: '古典音乐入门：必听的 50 首经典曲目',
      thumbnail: 'https://picsum.photos/600/400?random=8',
      duration: '28:15',
      upName: '音乐学堂',
      upAvatar: 'https://picsum.photos/40/40?random=108',
      views: '43.2 万',
      href: 'https://www.bilibili.com/video/BV1xx411c7mD',
      rating: 9.3,
      reviewCount: 198,
      category: 'music',
    },
  ],
  game: [
    {
      id: '7',
      title: '独立游戏开发日志：从零到上线的完整过程',
      thumbnail: 'https://picsum.photos/600/400?random=7',
      duration: '45:30',
      upName: '独立游戏制作人',
      upAvatar: 'https://picsum.photos/40/40?random=107',
      views: '67.8 万',
      href: 'https://www.bilibili.com/video/BV1xx411c7mD',
      rating: 9.4,
      reviewCount: 321,
      category: 'game',
    },
  ],
  food: [
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
      category: 'food',
    },
  ],
  art: [
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
      category: 'art',
    },
  ],
  sports: [],
  auto: [],
  knowledge: [],
};

const colorMap: Record<string, string> = {
  gray: 'from-gray-50 to-gray-100 border-gray-200 text-gray-700',
  blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
  pink: 'from-pink-50 to-pink-100 border-pink-200 text-pink-700',
  purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700',
  green: 'from-green-50 to-green-100 border-green-200 text-green-700',
  orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-700',
  indigo: 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700',
  red: 'from-red-50 to-red-100 border-red-200 text-red-700',
  slate: 'from-slate-50 to-slate-100 border-slate-200 text-slate-700',
  amber: 'from-amber-50 to-amber-100 border-amber-200 text-amber-700',
};

const activeColorMap: Record<string, string> = {
  gray: 'bg-gray-600 text-white',
  blue: 'bg-blue-600 text-white',
  pink: 'bg-pink-600 text-white',
  purple: 'bg-purple-600 text-white',
  green: 'bg-green-600 text-white',
  orange: 'bg-orange-600 text-white',
  indigo: 'bg-indigo-600 text-white',
  red: 'bg-red-600 text-white',
  slate: 'bg-slate-600 text-white',
  amber: 'bg-amber-600 text-white',
};

export default function LibraryCategoryPage() {
  const params = useParams();
  const categoryId = (params?.category as string) || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryId);

  const videos = videosByCategory[selectedCategory] || [];
  const currentCategory =
    categories.find((c) => c.id === selectedCategory) || categories[0];

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16 text-center">
              <h1 className="text-2xl font-bold text-gray-900">分类不存在</h1>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面头部 */}
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div
              className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${colorMap[currentCategory.color]}`}
            >
              <currentCategory.icon
                className={`h-8 w-8 ${currentCategory.color === 'gray' ? 'text-gray-600' : `text-${currentCategory.color}-600`}`}
              />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              {currentCategory.label}
            </h1>
            <p className="text-lg text-gray-600">
              {selectedCategory === 'all'
                ? '浏览所有分类的优质内容'
                : `探索${currentCategory.label}类精彩视频`}
            </p>
          </div>

          {/* 分类选项卡 */}
          <div className="mx-auto mb-12 max-w-6xl">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium transition-all ${
                      selectedCategory === category.id
                        ? activeColorMap[category.color]
                        : `bg-gradient-to-br ${colorMap[category.color]} hover:opacity-80`
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="text-sm">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 视频网格 */}
          <div className="mx-auto max-w-6xl">
            {videos.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
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
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <Film className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  暂无内容
                </h3>
                <p className="text-gray-600">
                  该分类的视频正在筹备中，敬请期待...
                </p>
              </div>
            )}
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
