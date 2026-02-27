import { VideoCard, type VideoCardProps } from './video-card';

const todayVideos: VideoCardProps[] = [
  {
    id: '1',
    title: '量子计算的未来：从理论到实践的突破之路',
    thumbnail: 'https://picsum.photos/600/400?random=1',
    duration: '12:34',
    upName: '科学探索者',
    upAvatar: 'https://picsum.photos/40/40?random=101',
    views: '24.5 万',
    href: 'https://www.bilibili.com/video/BV1xx411c7mD',
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
  },
];

export function TodayRecommend() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900">
          今日推荐
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {todayVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}
