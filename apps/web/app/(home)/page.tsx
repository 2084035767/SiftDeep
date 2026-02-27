import {
  Navbar,
  SearchSection,
  QuickFilters,
  VideoGrid,
  TodayRecommend,
} from '@/components/siftdeep';

const Page = () => {
  // 示例视频数据 - 包含评分和评价数量
  const featuredVideos = [
    {
      id: '1',
      title: '量子计算的未来：从理论到实践的突破之路',
      thumbnail: 'https://picsum.photos/600/400?random=1',
      duration: '12:34',
      upName: '科学探索者',
      upAvatar: 'https://picsum.photos/40/40?random=101',
      views: '24.5 万',
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
      views: '56.2 万',
      href: 'https://www.bilibili.com/video/BV1xx411c7mD',
      rating: 9.8,
      reviewCount: 243,
    },
    {
      id: '3',
      title: '被遗忘的经典：80 年代小众动画佳作盘点',
      thumbnail: 'https://picsum.photos/600/400?random=3',
      duration: '18:52',
      upName: '动画考古者',
      upAvatar: 'https://picsum.photos/40/40?random=103',
      views: '12.8 万',
      href: 'https://www.bilibili.com/video/BV1xx411c7mD',
      rating: 9.2,
      reviewCount: 87,
    },
    {
      id: '4',
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

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <Navbar />

      {/* 搜索区域 - 添加 pt-16 补偿 fixed 导航栏 */}
      <div className="pt-16">
        <SearchSection />
      </div>

      {/* 快速筛选 */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <QuickFilters />
        </div>
      </div>

      {/* 主内容区 */}
      <main className="pt-4">
        {/* 精选视频 */}
        <VideoGrid
          title="精选视频"
          videos={featuredVideos}
          viewAllHref="/library"
        />

        {/* 今日推荐 */}
        <TodayRecommend />
      </main>

      {/* 极简页脚 */}
      <footer className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 深选 SiftDeep - 让好内容被看见
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
