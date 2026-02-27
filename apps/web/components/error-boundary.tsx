'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@repo/shadcn/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * 错误边界组件 - 捕获并处理子组件树中的错误
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F7FA] p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
            {/* 错误图标 */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* 错误信息 */}
            <h2 className="mb-2 text-xl font-bold text-[#0F172A]">出错了</h2>
            <p className="mb-6 text-sm text-[#64748B]">
              {error?.message || '抱歉，发生了一些意外错误'}
            </p>

            {/* 操作按钮 */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={this.handleRetry}
                className="flex-1 bg-[#FB7299] text-white hover:bg-[#E55A8A]"
              >
                重新加载
              </Button>
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="flex-1"
              >
                返回上一页
              </Button>
            </div>

            {/* 错误详情（开发环境） */}
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-xs text-[#64748B]">
                  错误详情
                </summary>
                <pre className="mt-2 max-h-48 overflow-auto rounded bg-gray-100 p-3 text-xs text-red-600">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
