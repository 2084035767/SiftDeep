import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['openid-client'],
  experimental: {
    viewTransition: true,
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
  // 解决 openid-client 在 Turbopack 下的兼容性问题
  // 参考：https://github.com/panva/openid-client/issues/365
  // Next.js 16 中 turbopack 配置放在顶层
  turbopack: {
    resolveAlias: {
      // 强制使用 CommonJS 入口，避免 Turbopack 解析 ESM 时的错误
      'openid-client': 'openid-client/lib/index.js',
    },
  },
};

export default nextConfig;
