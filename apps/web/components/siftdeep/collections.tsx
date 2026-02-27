import Link from 'next/link';
import { Users, ChevronRight, Plus } from 'lucide-react';

const collections = [
  {
    id: '1',
    title: '计算机科学基础课程',
    description:
      '包含数据结构、算法分析、计算机组成原理等基础课程，适合编程入门者系统学习。',
    videoCount: 24,
    followers: '1.2k',
    creator: '计算机教育联盟',
    creatorAvatar: 'https://picsum.photos/40/40?random=511',
    thumbnails: [
      'https://picsum.photos/60/60?random=501',
      'https://picsum.photos/60/60?random=502',
      'https://picsum.photos/60/60?random=503',
      'https://picsum.photos/60/60?random=504',
    ],
  },
  {
    id: '2',
    title: '世界电影史经典片段解析',
    description:
      '从默片时代到当代电影，精选各时期代表作的经典片段进行专业解析，了解电影语言的演变。',
    videoCount: 36,
    followers: '2.5k',
    creator: '电影学院',
    creatorAvatar: 'https://picsum.photos/40/40?random=512',
    thumbnails: [
      'https://picsum.photos/60/60?random=505',
      'https://picsum.photos/60/60?random=506',
      'https://picsum.photos/60/60?random=507',
      'https://picsum.photos/60/60?random=508',
    ],
  },
  {
    id: '3',
    title: '中国传统音乐鉴赏',
    description:
      '涵盖古琴、古筝、二胡等传统乐器的经典曲目赏析，以及戏曲、民歌等不同音乐形式的介绍。',
    videoCount: 18,
    followers: '896',
    creator: '国乐传承者',
    creatorAvatar: 'https://picsum.photos/40/40?random=513',
    thumbnails: [
      'https://picsum.photos/60/60?random=509',
      'https://picsum.photos/60/60?random=510',
      'https://picsum.photos/60/60?random=511',
      'https://picsum.photos/60/60?random=512',
    ],
  },
];

export function Collections() {
  return (
    <section
      id="collections"
      className="bg-white py-16"
      aria-labelledby="collections-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2
            id="collections-heading"
            className="text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            热门收藏夹
          </h2>
          <Link
            href="#"
            className="flex min-h-[44px] items-center font-medium text-[#FB7299] transition-colors duration-200 hover:text-[#E55A8A]"
          >
            查看全部{' '}
            <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <article
              key={collection.id}
              className="card-hover overflow-hidden rounded-xl bg-[#F5F7FA] shadow-sm transition-all hover:shadow-md"
              aria-labelledby={`collection-title-${collection.id}`}
            >
              <div className="p-5">
                <div className="mb-4 flex items-start justify-between">
                  <h3
                    id={`collection-title-${collection.id}`}
                    className="text-lg font-bold text-[#0F172A]"
                  >
                    {collection.title}
                  </h3>
                  <span className="rounded-full bg-[#FB7299]/10 px-2 py-1 text-xs font-medium text-[#FB7299]">
                    {collection.videoCount}个视频
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[#64748B]">
                  {collection.description}
                </p>

                {/* 收藏夹内容预览 */}
                <div
                  className="mb-4 flex -space-x-2"
                  aria-label={`${collection.videoCount} 个视频预览`}
                >
                  {collection.thumbnails.map((thumb, index) => (
                    <img
                      key={index}
                      src={thumb}
                      alt={`收藏内容缩略图 ${index + 1}`}
                      className="h-12 w-12 rounded border-2 border-[#F5F7FA] object-cover"
                      loading="lazy"
                    />
                  ))}
                  <div className="flex h-12 w-12 items-center justify-center rounded border-2 border-[#F5F7FA] bg-gray-200 text-xs font-medium text-[#64748B]">
                    +{collection.videoCount - 4}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={collection.creatorAvatar}
                      alt={`${collection.creator} 的头像`}
                      className="mr-2 h-6 w-6 rounded-full"
                      loading="lazy"
                    />
                    <span className="text-xs text-[#64748B]">
                      {collection.creator}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className="flex items-center text-xs text-[#64748B]"
                      aria-label={`${collection.followers} 人关注`}
                    >
                      <Users className="mr-1 h-3 w-3" aria-hidden="true" />
                      {collection.followers}
                    </span>
                    <button className="flex min-h-[44px] min-w-[44px] items-center justify-center text-xs font-medium text-[#FB7299] hover:text-[#E55A8A]">
                      关注
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 创建收藏夹按钮 */}
        <div className="mt-8 text-center">
          <button className="inline-flex min-h-[48px] transform items-center rounded-full bg-[#FB7299] px-6 py-3.5 font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E55A8A] hover:shadow-lg">
            <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
            创建我的收藏夹
          </button>
        </div>
      </div>
    </section>
  );
}
