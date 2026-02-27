import Link from 'next/link';
import { ChevronLeft, ChevronRight, Bell, MoreVertical } from 'lucide-react';

const dailyItems = [
  {
    id: '1',
    title: '从《黑镜》到现实：AI 生成内容的伦理边界探讨',
    description:
      '100 字短评：本视频深入分析了 AI 生成内容的版权问题和伦理挑战，结合最新案例探讨技术发展的边界...',
    thumbnail: 'https://picsum.photos/120/120?random=201',
    upName: '科技伦理观',
    duration: '10:24',
  },
  {
    id: '2',
    title: '敦煌壁画中的飞天形象演变：从十六国到元代',
    description:
      '100 字短评：通过高清壁画图像对比，详细解析飞天形象在不同历史时期的艺术特征和文化内涵，揭示...',
    thumbnail: 'https://picsum.photos/120/120?random=202',
    upName: '敦煌研究院',
    duration: '18:36',
  },
  {
    id: '3',
    title: 'Python 数据可视化进阶：Matplotlib 与 Seaborn 实战',
    description:
      '100 字短评：本教程通过实际案例，展示如何使用 Matplotlib 和 Seaborn 创建 publication 级别的数据可视化图表...',
    thumbnail: 'https://picsum.photos/120/120?random=203',
    upName: 'Python 数据之道',
    duration: '22:15',
  },
];

export function DailyExpress() {
  return (
    <section
      id="daily"
      className="bg-[#F5F7FA] py-16"
      aria-labelledby="daily-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2
            id="daily-heading"
            className="text-2xl font-bold text-[#0F172A] md:text-3xl"
          >
            每日速递
          </h2>
          <div
            className="flex items-center space-x-2"
            role="group"
            aria-label="导航控制"
          >
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#64748B] shadow-sm transition-colors duration-200 hover:text-[#FB7299]"
              aria-label="上一条"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#64748B] shadow-sm transition-colors duration-200 hover:text-[#FB7299]"
              aria-label="下一条"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center">
            <span className="rounded-full bg-[#23ADE5]/10 px-3 py-1.5 text-sm font-medium text-[#23ADE5]">
              今日 08:00 推送
            </span>
            <span className="ml-auto text-sm text-[#64748B]">
              已更新 12 条内容
            </span>
          </div>

          <div className="space-y-4" role="list">
            {dailyItems.map((item) => (
              <article
                key={item.id}
                className="flex cursor-pointer items-start rounded-xl p-4 transition-colors duration-200 hover:bg-[#F5F7FA]"
                role="listitem"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="ml-4 min-w-0 flex-1">
                  <h3 className="line-clamp-2 leading-snug font-medium text-[#0F172A]">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#64748B]">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs text-[#64748B]">
                      UP 主：{item.upName}
                    </span>
                    <span
                      className="mx-2 text-xs text-[#64748B]"
                      aria-hidden="true"
                    >
                      •
                    </span>
                    <span className="text-xs text-[#64748B]">
                      {item.duration}
                    </span>
                  </div>
                </div>
                <button
                  className="btn-base rounded-lg text-[#64748B] transition-colors duration-200 hover:text-[#FB7299]"
                  aria-label="更多选项"
                >
                  <MoreVertical className="h-5 w-5" aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="#"
              className="inline-flex min-h-[44px] items-center font-medium text-[#FB7299] transition-colors duration-200 hover:text-[#E55A8A]"
            >
              查看全部速递内容{' '}
              <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 订阅速递 */}
        <div
          className="rounded-2xl bg-gradient-to-r from-[#FB7299]/10 to-[#23ADE5]/10 p-6"
          role="complementary"
          aria-label="订阅每日速递"
        >
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-4 md:mb-0 md:w-2/3 md:pr-6">
              <h3 className="mb-2 text-xl font-bold text-[#0F172A]">
                订阅每日速递
              </h3>
              <p className="text-[#64748B]">
                每天早晚各一次，精选优质内容直达你的消息列表
              </p>
            </div>
            <div className="flex justify-center md:w-1/3 md:justify-end">
              <button className="min-h-[44px] rounded-full bg-white px-6 py-3 font-medium text-[#0F172A] shadow-sm transition-all hover:bg-gray-50 hover:shadow">
                <Bell className="mr-2 inline h-4 w-4" aria-hidden="true" />
                立即订阅
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
