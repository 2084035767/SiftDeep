'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Info, AlertCircle } from 'lucide-react';

export function SubmitForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bvNumber, setBvNumber] = useState('');
  const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // 验证 BV 号
    const bvRegex = /^BV[0-9A-Za-z]{10,}$/;
    if (!bvRegex.test(bvNumber.trim())) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    // 验证分类
    if (!category) {
      setSubmitError('请选择内容分类');
      return;
    }

    // 验证推荐理由
    if (reason.trim().length < 20) {
      setSubmitError('推荐理由至少需要 20 个字');
      return;
    }

    // 验证协议
    if (!agreed) {
      setSubmitError('请先确认社区规范');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: 调用 API 提交投稿
      // await fetch('/api/submissions', {
      //   method: 'POST',
      //   body: JSON.stringify({ bvId: bvNumber, category, reason }),
      // });

      // 模拟提交成功
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 跳转到投稿列表页
      router.push('/submit/list');
    } catch (err) {
      setSubmitError('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="submit"
      className="bg-gradient-to-b from-[#F5F7FA] to-white py-20"
      aria-labelledby="submit-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2
              id="submit-heading"
              className="mb-4 text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#0F172A]"
            >
              推荐优质内容
            </h2>
            <p className="text-lg leading-relaxed text-[#64748B]">
              分享你发现的 B 站宝藏视频，让更多人看到优质内容
            </p>
          </div>

          <div className="transform rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label
                  htmlFor="bv-number"
                  className="mb-2 block text-sm font-medium text-[#334155]"
                >
                  B 站视频 BV 号{' '}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only">（必填）</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="bv-number"
                    placeholder="例如：BV1XX4y1P71e"
                    value={bvNumber}
                    onChange={(e) => setBvNumber(e.target.value)}
                    className={`form-focus min-h-[48px] w-full rounded-xl border bg-[#F5F7FA] px-4 py-3.5 text-[#0F172A] transition-all ${
                      error ? 'border-red-500' : 'border-gray-200'
                    }`}
                    aria-required="true"
                    aria-invalid={error}
                    aria-describedby={error ? 'bv-error' : undefined}
                  />
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 transform text-xs text-[#64748B]">
                    如何获取 BV 号？
                  </div>
                </div>
                {error && (
                  <p
                    id="bv-error"
                    className="mt-2 flex items-center text-sm text-red-500"
                    role="alert"
                  >
                    <AlertCircle className="mr-1 h-4 w-4" aria-hidden="true" />
                    请输入有效的 B 站视频 BV 号
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="video-category"
                  className="mb-2 block text-sm font-medium text-[#334155]"
                >
                  内容分类{' '}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only">（必填）</span>
                </label>
                <select
                  id="video-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-focus min-h-[48px] w-full rounded-xl border border-gray-200 bg-[#F5F7FA] px-4 py-3.5 text-[#0F172A] transition-all"
                  aria-required="true"
                >
                  <option value="">请选择分类</option>
                  <option value="science">论文级科普</option>
                  <option value="animation">国创巅峰</option>
                  <option value="hidden-gem">冷门神作</option>
                  <option value="movie-analysis">影视解析</option>
                  <option value="history">历史人文</option>
                  <option value="technology">科技前沿</option>
                  <option value="life">生活技巧</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="recommend-reason"
                  className="mb-2 block text-sm font-medium text-[#334155]"
                >
                  推荐理由{' '}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only">（必填）</span>
                </label>
                <textarea
                  id="recommend-reason"
                  rows={4}
                  placeholder="请简要说明你推荐这个视频的理由，为什么它值得被更多人看到..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="form-focus min-h-[120px] w-full rounded-xl border border-gray-200 bg-[#F5F7FA] px-4 py-3.5 text-[#0F172A] transition-all"
                  aria-required="true"
                />
                <p className="mt-2 text-sm text-[#64748B]">
                  请至少输入 20 个字，清晰说明推荐理由
                </p>
              </div>

              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms-agreement"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="form-focus h-4 w-4 cursor-pointer rounded border border-gray-300 bg-[#F5F7FA]"
                  />
                </div>
                <label
                  htmlFor="terms-agreement"
                  className="ml-3 text-sm text-[#64748B]"
                >
                  我确认该视频内容积极健康，不涉及违法违规信息，且符合
                  <a href="#" className="text-[#FB7299] hover:underline">
                    社区规范
                  </a>
                </label>
              </div>

              {/* 错误提示 */}
              {submitError && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                  <div className="text-sm text-red-700">{submitError}</div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex min-h-[48px] w-full transform items-center justify-center rounded-xl bg-[#FB7299] px-6 py-3.5 font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E55A8A] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    提交中...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                    提交推荐
                  </>
                )}
              </button>
            </form>

            {/* 投稿须知 */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h3 className="mb-4 text-lg font-medium text-[#0F172A]">
                投稿须知
              </h3>
              <ul className="space-y-3 text-sm text-[#64748B]">
                <li className="flex items-start">
                  <Info
                    className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-[#FB7299]"
                    aria-hidden="true"
                  />
                  <span>
                    提交的视频将经过人工审核，优质内容将被收录到精选库
                  </span>
                </li>
                <li className="flex items-start">
                  <Info
                    className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-[#FB7299]"
                    aria-hidden="true"
                  />
                  <span>同一视频被多人推荐将提高入选概率，但请勿重复提交</span>
                </li>
                <li className="flex items-start">
                  <Info
                    className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-[#FB7299]"
                    aria-hidden="true"
                  />
                  <span>
                    优质推荐者将获得"内容伯乐"称号，享有优先审核等特权
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertCircle
                    className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-orange-500"
                    aria-hidden="true"
                  />
                  <span>
                    提交违规内容将被限制投稿权限，情节严重者将被封禁账号
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
