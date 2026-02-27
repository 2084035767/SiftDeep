'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SearchSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/library?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="border-b border-gray-200 bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            发现优质 B 站视频
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            人工精选 + 算法兜底，让好内容被看见
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="search" className="sr-only">
              搜索视频、UP 主或 BV 号
            </label>
            <div className="group relative">
              <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索视频、UP 主或 BV 号..."
                className="w-full rounded-xl border border-gray-200 bg-white py-4 pr-4 pl-12 text-lg text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 group-hover:shadow-md focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none"
                aria-label="搜索视频、UP 主或 BV 号"
              />
              <Search
                className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-gray-600"
                aria-hidden="true"
              />
            </div>
            <button
              type="submit"
              className="mt-4 min-h-[56px] w-full rounded-xl bg-gray-900 px-6 py-4 font-medium text-white shadow-md transition-all duration-200 hover:bg-gray-800 hover:shadow-lg"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
