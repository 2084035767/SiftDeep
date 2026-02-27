import { Navbar } from '@/components/siftdeep';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  Heart,
  Shield,
  Users,
  Mail,
  Github,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '关于我们',
  description: '深选 (SiftDeep) - B 站优质内容精选平台，让每一次浏览都有价值',
};

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* 头部 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <Compass className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">关于深选</h1>
            <p className="text-xl text-gray-600">让 B 站的好内容，真正被看见</p>
          </div>

          {/* 核心理念 */}
          <div className="mb-16 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-gray-900">人工策展</h2>
              <p className="leading-relaxed text-gray-600">
                编辑精选 + UP
                主共建，拒绝标题党与低质内容。每一部推荐视频都经过人工审核，确保内容质量。
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-gray-900">
                零版权风险
              </h2>
              <p className="leading-relaxed text-gray-600">
                所有内容外链至 B
                站原页，不存储任何视频文件。仅做内容索引，让好内容被看见。
              </p>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-gray-900">粉丝参与</h2>
              <p className="leading-relaxed text-gray-600">
                支持用户投稿、协同收藏夹、负反馈下架机制。让每一位用户都成为内容策展人。
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <Compass className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-gray-900">数据透明</h2>
              <p className="leading-relaxed text-gray-600">
                仅调用 B 站官方 API，日志 30
                天自动销毁，不追踪用户隐私。透明、可信赖。
              </p>
            </div>
          </div>

          {/* 项目介绍 */}
          <div className="mb-16 rounded-2xl bg-gray-50 p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              为什么需要深选？
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 leading-relaxed text-gray-600">
                在算法推荐的洪流中，太多优质内容被埋没：
              </p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>冷门神作无人问津，好内容被算法遗忘</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>论文级科普石沉大海，深度内容难以传播</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>中腰部 UP 主努力却无曝光，优质创作者被埋没</span>
                </li>
              </ul>
              <p className="leading-relaxed text-gray-600">
                <strong>深选不做搬运，也不做聚合，我们只做一件事：</strong>
                发现并点亮那些值得被看见的内容。
              </p>
            </div>
          </div>

          {/* 技术栈 */}
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">技术栈</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-3 font-bold text-gray-900">前端</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Next.js 15 (SSR/ISR)</li>
                  <li>• React 19</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-3 font-bold text-gray-900">后端</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Nest.js 11</li>
                  <li>• PostgreSQL</li>
                  <li>• TypeORM</li>
                  <li>• JWT 认证</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 联系我们 */}
          <div className="mb-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">联系我们</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>邮箱：contact@siftdeep.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <Github className="h-5 w-5" />
                <a
                  href="https://github.com/2084035767/SiftDeep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-blue-600"
                >
                  GitHub 仓库
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* 行动号召 */}
          <div className="text-center">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">加入我们</h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              如果你也相信"好内容不该被算法淹没"，欢迎参与深选的建设
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/library"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                浏览精选库
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                投稿推荐
              </Link>
              <a
                href="https://github.com/2084035767/SiftDeep"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
              >
                <Github className="h-5 w-5" />
                Star 项目
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
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
