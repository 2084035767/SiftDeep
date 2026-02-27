import { Collections, Navbar } from '@/components/siftdeep';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '收藏夹',
  description: '创建你的专属收藏夹，与粉丝协同编辑',
};

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
      <Navbar />
      <main className="flex-grow">
        <Collections />
      </main>
      <footer className="mt-auto border-t border-gray-100 bg-gray-50 py-8">
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
