'use client';

import { useEffect, useState } from 'react';

export default function GlobalLoading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 页面加载完成后隐藏 loading
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* 深选 Logo 动画 */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#FB7299]/20"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#FB7299] border-t-transparent"></div>
        </div>
        <p className="animate-pulse text-sm font-medium text-[#64748B]">
          加载中...
        </p>
      </div>
    </div>
  );
}
