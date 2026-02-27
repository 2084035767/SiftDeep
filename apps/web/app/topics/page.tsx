import { DeepTopics, Navbar } from '@/components/siftdeep';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '深度专题',
  description: '系统化的知识网络，视频 + 资料 + 参考文献',
};

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
      <Navbar />
      <main className="flex-grow">
        <DeepTopics />
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
