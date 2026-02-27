import { VideoCard, type VideoCardProps } from './video-card';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface VideoGridProps {
  title?: string;
  videos: VideoCardProps[];
  viewAllHref?: string;
}

export function VideoGrid({
  title = '热门视频',
  videos,
  viewAllHref,
}: VideoGridProps) {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="group flex min-h-[44px] items-center text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                查看更多
                <ChevronRight
                  className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}
