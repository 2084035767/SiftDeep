'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  Clock,
  Filter,
  Grid3x3,
  List,
  ChevronRight,
  Bookmark,
  Sparkles,
  Film,
  Music,
  Gamepad2,
  Utensils,
  Palette,
  Dumbbell,
  Car,
  BookOpen,
} from 'lucide-react';

const filterCategories = [
  '全部内容',
  '论文级科普',
  '国创巅峰',
  '冷门神作',
  '影视解析',
  '历史人文',
  '科技前沿',
  '生活技巧',
];

const libraryVideos = [
  {
    id: '1',
    title: '机器学习中的梯度下降算法详解',
    thumbnail: 'https://picsum.photos/400/300?random=401',
    duration: '08:45',
    rating: '9.6',
    upName: 'AI 算法研习社',
    upAvatar: 'https://picsum.photos/30/30?random=411',
  },
  {
    id: '2',
    title: '《红楼梦》中的饮食文化与清代社会',
    thumbnail: 'https://picsum.photos/400/300?random=402',
    duration: '15:22',
    rating: '9.4',
    upName: '古典文学讲堂',
    upAvatar: 'https://picsum.photos/30/30?random=412',
  },
  {
    id: '3',
    title: '摄影构图：如何拍出有故事感的照片',
    thumbnail: 'https://picsum.photos/400/300?random=403',
    duration: '22:18',
    rating: '9.7',
    upName: '光影摄影课',
    upAvatar: 'https://picsum.photos/30/30?random=413',
  },
  {
    id: '4',
    title: '咖啡品鉴入门：从种植到烘焙的全过程',
    thumbnail: 'https://picsum.photos/400/300?random=404',
    duration: '10:55',
    rating: '9.2',
    upName: '咖啡百科',
    upAvatar: 'https://picsum.photos/30/30?random=414',
  },
];

const categoryLinks = [
  {
    id: 'tech',
    label: '科技',
    icon: Sparkles,
    color: 'blue',
    href: '/library/tech',
  },
  {
    id: 'animation',
    label: '动画',
    icon: Film,
    color: 'pink',
    href: '/library/animation',
  },
  {
    id: 'music',
    label: '音乐',
    icon: Music,
    color: 'purple',
    href: '/library/music',
  },
  {
    id: 'game',
    label: '游戏',
    icon: Gamepad2,
    color: 'green',
    href: '/library/game',
  },
  {
    id: 'food',
    label: '美食',
    icon: Utensils,
    color: 'orange',
    href: '/library/food',
  },
  {
    id: 'art',
    label: '艺术',
    icon: Palette,
    color: 'indigo',
    href: '/library/art',
  },
  {
    id: 'sports',
    label: '运动',
    icon: Dumbbell,
    color: 'red',
    href: '/library/sports',
  },
  {
    id: 'auto',
    label: '汽车',
    icon: Car,
    color: 'slate',
    href: '/library/auto',
  },
  {
    id: 'knowledge',
    label: '知识',
    icon: BookOpen,
    color: 'amber',
    href: '/library/knowledge',
  },
];

const colorMap: Record<string, string> = {
  blue: 'from-blue-50 to-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white',
  pink: 'from-pink-50 to-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white',
  purple:
    'from-purple-50 to-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white',
  green:
    'from-green-50 to-green-100 text-green-600 hover:bg-green-600 hover:text-white',
  orange:
    'from-orange-50 to-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white',
  indigo:
    'from-indigo-50 to-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white',
  red: 'from-red-50 to-red-100 text-red-600 hover:bg-red-600 hover:text-white',
  slate:
    'from-slate-50 to-slate-100 text-slate-600 hover:bg-slate-600 hover:text-white',
  amber:
    'from-amber-50 to-amber-100 text-amber-600 hover:bg-amber-600 hover:text-white',
};

export function Library() {
  const [activeCategory, setActiveCategory] = useState('全部内容');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <section
      id="library"
      className="bg-[#F5F7FA] py-16"
      aria-labelledby="library-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2
            id="library-heading"
            className="text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            精选库
          </h2>
          <div
            className="flex items-center rounded-full bg-white p-1 shadow-sm"
            role="group"
            aria-label="视图切换"
          >
            <button
              onClick={() => setViewMode('grid')}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-[#FB7299]/10 text-[#FB7299]'
                  : 'text-[#64748B] hover:text-[#FB7299]'
              }`}
              aria-label="网格视图"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid3x3 className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-[#64748B] transition-all duration-200 hover:text-[#FB7299] ${
                viewMode === 'list' ? 'bg-[#FB7299]/10 text-[#FB7299]' : ''
              }`}
              aria-label="列表视图"
              aria-pressed={viewMode === 'list'}
            >
              <List className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 分区导航 */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-[#0F172A]">分区导航</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
            {categoryLinks.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${colorMap[category.color]}`}
              >
                <category.icon className="h-6 w-6" />
                <span className="text-sm font-medium">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 筛选器区域 */}
        <div
          className="mb-8 rounded-xl bg-white p-6 shadow-sm"
          role="search"
          aria-label="内容筛选"
        >
          {/* 分类标签栏 */}
          <div className="scrollbar-hide mb-3 flex items-center overflow-x-auto pb-3">
            <span className="mr-2 text-sm font-medium whitespace-nowrap text-[#64748B]">
              内容分类：
            </span>
            <div className="flex space-x-2">
              {filterCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`filter-item ${
                    activeCategory === category
                      ? 'active'
                      : 'bg-[#F5F7FA] text-[#334155] hover:bg-[#FB7299]/10 hover:text-[#FB7299]'
                  }`}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 过滤选项栏 */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center">
              <span className="mr-2 text-sm text-[#64748B]">时长：</span>
              <select className="filter-select" aria-label="按时长筛选">
                <option>全部时长</option>
                <option>0-5 分钟</option>
                <option>5-15 分钟</option>
                <option>15-30 分钟</option>
                <option>30 分钟以上</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-[#64748B]">评分：</span>
              <select className="filter-select" aria-label="按评分筛选">
                <option>全部评分</option>
                <option>9 分以上</option>
                <option>8 分以上</option>
                <option>7 分以上</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-[#64748B]">播放量：</span>
              <select className="filter-select" aria-label="按播放量筛选">
                <option>全部播放量</option>
                <option>10 万以上</option>
                <option>100 万以上</option>
                <option>1000 万以上</option>
              </select>
            </div>
            <div className="ml-auto flex items-center">
              <span className="mr-2 text-sm text-[#64748B]">排序：</span>
              <select className="filter-select" aria-label="排序方式">
                <option>推荐优先</option>
                <option>最新发布</option>
                <option>播放量高</option>
                <option>评分高</option>
              </select>
            </div>
          </div>
        </div>

        {/* 精选内容网格 */}
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1'
          }`}
          role="list"
          aria-label="视频列表"
        >
          {libraryVideos.map((video) => (
            <article
              key={video.id}
              className={`card-hover group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              role="listitem"
              aria-labelledby={`video-title-${video.id}`}
            >
              <div
                className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                    viewMode === 'list' ? 'h-full' : 'h-36'
                  }`}
                  loading="lazy"
                />
                <div className="gradient-overlay absolute inset-0 flex items-end">
                  <div className="w-full p-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
                        {video.duration}
                      </span>
                      <span className="flex items-center rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
                        <Star
                          className="mr-1 h-3 w-3 text-yellow-400"
                          aria-hidden="true"
                        />
                        {video.rating}分
                      </span>
                    </div>
                  </div>
                </div>
                {/* 悬停时显示播放按钮 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full bg-[#FB7299]/90 transition-transform duration-200 hover:scale-110">
                    <svg
                      className="ml-1 h-5 w-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className={`p-4 ${viewMode === 'list' ? 'flex flex-1 flex-col justify-between' : ''}`}
              >
                <h3
                  id={`video-title-${video.id}`}
                  className={`mb-2 line-clamp-2 font-medium text-[#0F172A] transition-colors duration-200 group-hover:text-[#FB7299] ${
                    viewMode === 'list' ? 'text-lg' : ''
                  }`}
                >
                  {video.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={video.upAvatar}
                      alt={`${video.upName} 的头像`}
                      className="mr-2 h-6 w-6 rounded-full"
                      loading="lazy"
                    />
                    <span className="text-xs text-[#64748B]">
                      {video.upName}
                    </span>
                  </div>
                  <button
                    className="btn-base rounded-full text-[#64748B] transition-colors duration-200 hover:text-[#FB7299]"
                    aria-label="收藏"
                  >
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 加载更多 */}
        <div className="mt-10 text-center">
          <button className="min-h-[48px] transform rounded-full border border-gray-200 bg-white px-8 py-3.5 font-medium text-[#0F172A] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow">
            加载更多{' '}
            <ChevronRight className="ml-2 inline h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
