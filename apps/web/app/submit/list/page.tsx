'use client';

import { useState } from 'react';
import { Navbar } from '@/components/siftdeep';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import React from 'react';

// 示例投稿数据
const mySubmissions = [
  {
    id: '1',
    bvId: 'BV1XX4y1P71e',
    title: '量子计算的未来：从理论到实践的突破之路',
    category: '科技前沿',
    reason:
      '这期视频深入浅出地讲解了量子计算的核心概念，UP 主用通俗易懂的方式解释了量子纠缠和量子叠加态，非常适合科普。',
    status: 'approved',
    submittedAt: '2025-02-25',
    reviewedAt: '2025-02-26',
    reviewNote: '内容优质，已收录到精选库',
  },
  {
    id: '2',
    bvId: 'BV1YY4y1Z82f',
    title: '中国动画百年发展史',
    category: '国创巅峰',
    reason:
      '详细梳理了中国动画从万氏兄弟到现代的发展历程，资料详实，制作精良。',
    status: 'pending',
    submittedAt: '2025-02-26',
    reviewedAt: null,
    reviewNote: null,
  },
  {
    id: '3',
    bvId: 'BV1ZZ4y1A93g',
    title: '某标题党视频',
    category: '其他',
    reason: '感觉还不错',
    status: 'rejected',
    submittedAt: '2025-02-24',
    reviewedAt: '2025-02-25',
    reviewNote: '内容质量一般，标题党嫌疑，不予收录',
  },
];

const statusConfig: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  pending: {
    label: '审核中',
    icon: Clock,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  approved: {
    label: '已通过',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  rejected: {
    label: '已拒绝',
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  under_review: {
    label: '复审中',
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
};

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('all');

  const filteredSubmissions = mySubmissions.filter((sub) => {
    if (activeTab === 'all') return true;
    return sub.status === activeTab;
  });

  const stats = {
    total: mySubmissions.length,
    pending: mySubmissions.filter((s) => s.status === 'pending').length,
    approved: mySubmissions.filter((s) => s.status === 'approved').length,
    rejected: mySubmissions.filter((s) => s.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面头部 */}
          <div className="mx-auto mb-8 max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">我的投稿</h1>
                <p className="text-gray-600">查看和管理你的视频投稿记录</p>
              </div>
            </div>

            {/* 统计卡片 */}
            <div className="mb-8 grid grid-cols-4 gap-4">
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500">全部投稿</div>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 shadow-sm">
                <div className="text-2xl font-bold text-amber-600">
                  {stats.pending}
                </div>
                <div className="text-sm text-amber-600">审核中</div>
              </div>
              <div className="rounded-xl border border-green-100 bg-green-50 p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </div>
                <div className="text-sm text-green-600">已通过</div>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 shadow-sm">
                <div className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </div>
                <div className="text-sm text-red-600">已拒绝</div>
              </div>
            </div>

            {/* 选项卡 */}
            <div className="mb-8 rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 rounded-lg px-4 py-2.5 font-medium transition-all ${
                    activeTab === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  全部 ({stats.total})
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`flex-1 rounded-lg px-4 py-2.5 font-medium transition-all ${
                    activeTab === 'pending'
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  审核中 ({stats.pending})
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`flex-1 rounded-lg px-4 py-2.5 font-medium transition-all ${
                    activeTab === 'approved'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  已通过 ({stats.approved})
                </button>
                <button
                  onClick={() => setActiveTab('rejected')}
                  className={`flex-1 rounded-lg px-4 py-2.5 font-medium transition-all ${
                    activeTab === 'rejected'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  已拒绝 ({stats.rejected})
                </button>
              </div>
            </div>
          </div>

          {/* 投稿列表 */}
          <div className="mx-auto max-w-4xl">
            {filteredSubmissions.length > 0 ? (
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => {
                  const config = statusConfig[submission.status];
                  if (!config) return null;
                  const StatusIcon = config.icon;

                  return (
                    <div
                      key={submission.id}
                      className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="p-6">
                        {/* 头部：标题和状态 */}
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="mb-1 text-lg font-bold text-gray-900">
                              {submission.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span>{submission.bvId}</span>
                              <span>•</span>
                              <span>{submission.category}</span>
                              <span>•</span>
                              <span>提交于 {submission.submittedAt}</span>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${config.bgColor} ${config.borderColor} border`}
                          >
                            <StatusIcon className={`h-4 w-4 ${config.color}`} />
                            <span
                              className={`text-sm font-medium ${config.color}`}
                            >
                              {config.label}
                            </span>
                          </div>
                        </div>

                        {/* 推荐理由 */}
                        <div className="mb-4">
                          <p className="line-clamp-2 text-sm text-gray-600">
                            {submission.reason}
                          </p>
                        </div>

                        {/* 审核备注 */}
                        {submission.reviewNote && (
                          <div
                            className={`rounded-lg p-3 ${
                              submission.status === 'approved'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                              <div>
                                <div className="mb-1 text-sm font-medium">
                                  审核意见
                                </div>
                                <div className="text-sm">
                                  {submission.reviewNote}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 审核时间 */}
                        {submission.reviewedAt && (
                          <div className="mt-3 text-sm text-gray-500">
                            审核于 {submission.reviewedAt}
                          </div>
                        )}
                      </div>

                      {/* 操作栏 */}
                      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-3">
                        <a
                          href={`https://www.bilibili.com/video/${submission.bvId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          查看原视频
                          <ChevronRight className="h-4 w-4" />
                        </a>
                        {submission.status === 'approved' && (
                          <span className="text-sm font-medium text-green-600">
                            已收录到精选库
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-gray-100 bg-white p-16 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <FileText className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  暂无投稿记录
                </h3>
                <p className="mb-8 text-gray-600">
                  {activeTab === 'all'
                    ? '你还没有提交过任何视频推荐'
                    : `没有${activeTab === 'pending' ? '审核中' : activeTab === 'approved' ? '已通过' : '已拒绝'}的投稿`}
                </p>
                <a
                  href="/submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  去投稿
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 深选 SiftDeep - 让好内容被看见
          </p>
        </div>
      </footer>
    </div>
  );
}
