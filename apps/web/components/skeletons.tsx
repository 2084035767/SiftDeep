/**
 * 骨架屏加载组件
 */

/**
 * 视频卡片骨架屏
 */
export function VideoCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl bg-[#F5F7FA] shadow-sm">
      {/* 封面图 */}
      <div className="h-48 w-full bg-gray-200"></div>

      {/* 内容区 */}
      <div className="space-y-3 p-5">
        {/* 标题 */}
        <div className="h-5 w-3/4 rounded bg-gray-200"></div>
        <div className="h-4 w-full rounded bg-gray-200"></div>

        {/* UP 主信息 */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          <div className="h-4 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

/**
 * 列表项骨架屏
 */
export function ListItemSkeleton() {
  return (
    <div className="flex animate-pulse items-start gap-4 rounded-xl bg-white p-4">
      {/* 缩略图 */}
      <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-200"></div>

      {/* 内容区 */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
        <div className="h-3 w-full rounded bg-gray-200"></div>
        <div className="h-3 w-1/2 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}

/**
 * 专题卡片骨架屏
 */
export function TopicCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-[#F5F7FA] shadow-sm">
      {/* 封面图 */}
      <div className="relative h-48 bg-gray-200"></div>

      {/* 内容区 */}
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <div className="h-5 w-1/4 rounded bg-gray-200"></div>
          <div className="h-6 w-3/4 rounded bg-gray-200"></div>
        </div>

        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}

/**
 * 收藏夹卡片骨架屏
 */
export function CollectionCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 overflow-hidden rounded-xl bg-[#F5F7FA] p-5 shadow-sm">
      {/* 标题 */}
      <div className="h-6 w-3/4 rounded bg-gray-200"></div>

      {/* 描述 */}
      <div className="h-4 w-full rounded bg-gray-200"></div>
      <div className="h-4 w-2/3 rounded bg-gray-200"></div>

      {/* 缩略图预览 */}
      <div className="flex -space-x-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-12 w-12 rounded border-2 border-[#F5F7FA] bg-gray-200"
          ></div>
        ))}
      </div>
    </div>
  );
}

/**
 * 页面骨架屏 - 用于整个页面加载
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-[#F5F7FA]">
      {/* 导航栏骨架屏 */}
      <div className="bg-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-24 rounded bg-gray-200"></div>
            <div className="h-10 w-64 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* 内容区骨架屏 */}
      <div className="container mx-auto space-y-8 px-4 py-8">
        {/* Hero 区 */}
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-3/4 rounded bg-gray-200"></div>
          <div className="mx-auto h-6 w-1/2 rounded bg-gray-200"></div>
        </div>

        {/* 视频网格 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
