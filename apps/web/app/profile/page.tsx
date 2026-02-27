import { authOptions } from '@/auth';
import { Navbar } from '@/components/siftdeep';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Video, Bookmark, Star, Clock, ChevronRight, Settings, LogOut } from 'lucide-react';

export const metadata: Metadata = {
  title: '个人中心',
  description: '管理你的个人资料、收藏和投稿',
};

// 示例数据
const myVideos = [
  {
    id: '1',
    title: '量子计算的未来：从理论到实践的突破之路',
    thumbnail: 'https://picsum.photos/600/400?random=1',
    duration: '12:34',
    upName: '科学探索者',
    views: '245.5 万',
    href: '/videos/BV1xx411c7mD',
    rating: 9.5,
  },
  {
    id: '2',
    title: '中国动画百年发展史：从万氏兄弟到今日国创',
    thumbnail: 'https://picsum.photos/600/400?random=2',
    duration: '24:15',
    upName: '国创研究院',
    views: '156.2 万',
    href: '/videos/BV1xx411c7mD',
    rating: 9.8,
  },
];

const myCollections = [
  {
    id: '1',
    name: '深度学习入门',
    description: '机器学习相关的优质视频合集',
    videoCount: 12,
    isPublic: true,
  },
  {
    id: '2',
    name: '科普精选',
    description: '各种有趣的科普视频',
    videoCount: 8,
    isPublic: true,
  },
  {
    id: '3',
    name: '待观看',
    description: '稍后观看的视频列表',
    videoCount: 25,
    isPublic: false,
  },
];

const mySubmissions = [
  {
    id: '1',
    bvId: 'BV1XX4y1P71e',
    title: '量子计算的未来',
    status: 'approved',
    submittedAt: '2025-02-25',
  },
  {
    id: '2',
    bvId: 'BV1YY4y1Z82f',
    title: '中国动画百年发展史',
    status: 'pending',
    submittedAt: '2025-02-26',
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
          {/* 用户信息卡片 */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* 封面图 */}
              <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-700" />
              
              <div className="relative px-6 pb-6">
                {/* 头像 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-3xl font-bold text-gray-600 border-4 border-white shadow-md">
                      {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {session.user.name || session.user.email?.split('@')[0]}
                    </h1>
                    <p className="text-gray-500 text-sm">@{session.user.username || '未设置用户名'}</p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/profile/${session.user.username || 'settings'}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      编辑资料
                    </Link>
                    <Link
                      href="/auth/sign-out"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      退出登录
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 统计卡片 */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Video className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{myVideos.length}</div>
                </div>
                <div className="text-sm text-gray-500">观看历史</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Bookmark className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{myCollections.reduce((acc, c) => acc + c.videoCount, 0)}</div>
                </div>
                <div className="text-sm text-gray-500">收藏视频</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{myCollections.length}</div>
                </div>
                <div className="text-sm text-gray-500">收藏夹</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{mySubmissions.length}</div>
                </div>
                <div className="text-sm text-gray-500">投稿记录</div>
              </div>
            </div>
          </div>

          {/* 主要内容区 */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* 我的收藏夹 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">我的收藏夹</h2>
                <Link href="/collections" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  查看全部
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {myCollections.slice(0, 3).map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.id}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                          <Bookmark className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{collection.name}</div>
                          <div className="text-sm text-gray-500">{collection.videoCount} 个视频</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 我的投稿 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">我的投稿</h2>
                <Link href="/submit/list" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  查看全部
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {mySubmissions.map((submission) => (
                  <div key={submission.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{submission.title}</div>
                        <div className="text-sm text-gray-500">{submission.bvId} · {submission.submittedAt}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        submission.status === 'approved'
                          ? 'bg-green-50 text-green-700'
                          : submission.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {submission.status === 'approved' ? '已通过' : submission.status === 'pending' ? '审核中' : '已拒绝'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
};

export default Page;
