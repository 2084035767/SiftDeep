import { SubmitForm, Navbar } from '@/components/siftdeep';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '投稿推荐',
  description: '分享你发现的 B 站宝藏视频，让更多人看到优质内容',
};

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
      <Navbar />
      <main className="flex-grow">
        <SubmitForm />
      </main>
      <footer className="mt-auto border-t border-gray-100 bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-center text-sm text-gray-500">
              © 2025 深选 SiftDeep - 让好内容被看见
            </p>
            <Link
              href="/submit/list"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              我的投稿记录 →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
