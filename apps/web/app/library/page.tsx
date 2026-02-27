import { Library, Navbar } from '@/components/siftdeep';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '精选库',
  description: '人工精选 + 算法兜底，拒绝标题党与低质内容',
};

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
      <Navbar />
      <main className="flex-grow">
        <Library />
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
