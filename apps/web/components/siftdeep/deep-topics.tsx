import Link from 'next/link';
import { ChevronRight, Clock, Video, FileText } from 'lucide-react';

const topics = [
  {
    id: '1',
    title: '人工智能发展史：从图灵测试到 ChatGPT',
    description:
      '本专题系统梳理了人工智能从诞生到现在的发展历程，包含关键技术突破、重要人物故事和里程碑事件，帮助你全面了解 AI 的前世今生。',
    thumbnail: 'https://picsum.photos/800/400?random=301',
    category: '科技前沿',
    categoryColor: 'bg-[#FB7299]/90',
    readTime: '45 分钟',
    videos: 8,
    articles: 3,
    author: 'AI 研究社',
    authorAvatar: 'https://picsum.photos/40/40?random=311',
  },
  {
    id: '2',
    title: '日本动画大师系列：宫崎骏与吉卜力工作室',
    description:
      '深入解析宫崎骏的创作理念、吉卜力工作室的发展历程，以及他们对日本动画产业乃至全球动画艺术的深远影响。',
    thumbnail: 'https://picsum.photos/800/400?random=302',
    category: '动画研究',
    categoryColor: 'bg-[#23ADE5]/90',
    readTime: '60 分钟',
    videos: 12,
    articles: 5,
    author: '动画美学研究所',
    authorAvatar: 'https://picsum.photos/40/40?random=312',
  },
];

export function DeepTopics() {
  return (
    <section
      id="topics"
      className="bg-white py-16"
      aria-labelledby="topics-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2
            id="topics-heading"
            className="text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            深度专题
          </h2>
          <Link
            href="#"
            className="flex min-h-[44px] items-center font-medium text-[#FB7299] transition-colors duration-200 hover:text-[#E55A8A]"
          >
            更多专题{' '}
            <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {topics.map((topic) => (
            <article
              key={topic.id}
              className="card-hover overflow-hidden rounded-2xl bg-[#F5F7FA] shadow-sm transition-all hover:shadow-md"
              aria-labelledby={`topic-title-${topic.id}`}
            >
              <div className="relative h-48">
                <img
                  src={topic.thumbnail}
                  alt={topic.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="gradient-overlay absolute inset-0 flex flex-col justify-end p-6">
                  <span
                    className={`${topic.categoryColor} mb-2 inline-block w-fit rounded-full px-2 py-1 text-xs font-medium text-white`}
                  >
                    {topic.category}
                  </span>
                  <h3
                    id={`topic-title-${topic.id}`}
                    className="text-xl font-bold text-white"
                  >
                    {topic.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#64748B]">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" aria-hidden="true" />
                    预计阅读：{topic.readTime}
                  </span>
                  <span className="flex items-center">
                    <Video className="mr-1 h-4 w-4" aria-hidden="true" />
                    {topic.videos}个视频
                  </span>
                  <span className="flex items-center">
                    <FileText className="mr-1 h-4 w-4" aria-hidden="true" />
                    {topic.articles}篇文章
                  </span>
                </div>
                <p className="mb-4 leading-relaxed text-[#64748B]">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={topic.authorAvatar}
                      alt={`${topic.author} 的头像`}
                      className="mr-2 h-8 w-8 rounded-full"
                      loading="lazy"
                    />
                    <span className="text-sm font-medium text-[#334155]">
                      {topic.author}
                    </span>
                  </div>
                  <Link
                    href="#"
                    className="flex min-h-[44px] items-center text-sm font-medium text-[#FB7299] transition-colors duration-200 hover:text-[#E55A8A]"
                    aria-label={`进入专题：${topic.title}`}
                  >
                    进入专题{' '}
                    <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
