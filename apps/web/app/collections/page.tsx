import { authOptions } from '@/auth';
import { Navbar } from '@/components/siftdeep';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Bookmark, Plus, MoreVertical, Lock, Globe, Trash2, Edit } from 'lucide-react';

export const metadata: Metadata = {
  title: '我的收藏',
  description: '管理你的收藏夹和视频',
};

// 示例数据
const collections = [
  {
    id: '1',
    name: '深度学习入门',
    description: '机器学习相关的优质视频合集',
    videoCount: 12,
    isPublic: true,
    updatedAt: '2025-02-26',
    coverImage: 'https://picsum.photos/400/300?random=101',
  },
  {
    id: '2',
    name: '科普精选',
    description: '各种有趣的科普视频',
    videoCount: 8,
    isPublic: true,
    updatedAt: '2025-02-25',
    coverImage: 'https://picsum.photos/400/300?random=102',
  },
  {
    id: '3',
    name: '待观看',
    description: '稍后观看的视频列表',
    videoCount: 25,
    isPublic: false,
    updatedAt: '2025-02-27',
    coverImage: 'https://picsum.photos/400/300?random=103',
  },
  {
    id: '4',
    name: '动画经典',
    description: '经典动画作品合集',
    videoCount: 15,
    isPublic: true,
    updatedAt: '2025-02-24',
    coverImage: 'https://picsum.photos/400/300?random=104',
  },
];

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面头部 */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">我的收藏</h1>
                <p className="text-gray-600">管理你的收藏夹和视频</p>
              </div>
              <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                <Plus className="w-5 h-5" />
                创建收藏夹
              </button>
            </div>
          </div>

          {/* 收藏夹网格 */}
          <div className="max-w-6xl mx-auto">
            {collections.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.id}`}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
                  >
                    {/* 封面图 */}
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={collection.coverImage}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* 视频数量 */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                          <Bookmark className="w-4 h-4 text-gray-700" />
                          <span className="text-sm font-medium text-gray-900">{collection.videoCount} 个视频</span>
                        </div>
                      </div>

                      {/* 公开/私有标识 */}
                      <div className="absolute top-3 right-3">
                        {collection.isPublic ? (
                          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                            <Globe className="w-4 h-4 text-gray-700" />
                          </div>
                        ) : (
                          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                            <Lock className="w-4 h-4 text-gray-700" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 内容区 */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {collection.name}
                        </h3>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>更新于 {collection.updatedAt}</span>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-red-50 transition-colors">
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* 创建新收藏夹卡片 */}
                <Link
                  href="/collections/new"
                  className="group bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 p-8 hover:border-gray-400 hover:bg-gray-100 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                    <Plus className="w-8 h-8 text-gray-500 group-hover:text-gray-700" />
                  </div>
                  <span className="font-medium text-gray-600 group-hover:text-gray-900">
                    创建新收藏夹
                  </span>
                </Link>
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bookmark className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  暂无收藏夹
                </h3>
                <p className="text-gray-600 mb-8">
                  创建你的第一个收藏夹，整理喜欢的视频
                </p>
                <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  <Plus className="w-5 h-5" />
                  创建收藏夹
                </button>
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
};

export default Page;
