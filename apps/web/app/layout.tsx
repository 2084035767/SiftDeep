import Providers from '@/components/providers';
import ErrorBoundary from '@/components/error-boundary';
import GlobalLoading from '@/components/global-loading';
import { APP_NAME, APP_URL } from '@repo/constants/app';
import { cn } from '@repo/shadcn/lib/utils';
import { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto, Roboto_Mono } from 'next/font/google';
import { ReactNode, Suspense } from 'react';

/** Tailwindcss **/
import '@repo/shadcn/shadcn.css';
import './siftdeep.css';
import { Toaster } from '@repo/shadcn/sonner';
import { cookies } from 'next/headers';

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-geist',
});

const geist_mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-geist-mono',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-roboto',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-roboto-mono',
});

export const metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: '深选 (SiftDeep) - B 站优质内容精选平台，让每一次浏览都有价值。',
  keywords: [
    '深选',
    'SiftDeep',
    'B 站',
    '哔哩哔哩',
    '视频精选',
    '内容策展',
    '优质视频',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: APP_NAME,
    description:
      '深选 (SiftDeep) - B 站优质内容精选平台，人工精选 + 算法兜底，让每一次浏览都有价值。',
    url: APP_URL,
    locale: 'zh-CN',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-token',
  },
  icons: {
    icon: '/metadata/favicon.ico',
    shortcut: '/metadata/favicon-16x16.png',
    apple: '/metadata/apple-touch-icon.png',
  },
  manifest: '/metadata/site.webmanifest',
} satisfies Metadata;

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const select_font =
    (await cookies()).get('select-font')?.value ?? '--font-geist';
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={cn(
          'leading-normal tracking-normal antialiased',
          geist.variable,
          geist_mono.variable,
          roboto.variable,
          roboto_mono.variable,
        )}
        style={{
          fontFamily: `var(${select_font})`,
        }}
        suppressHydrationWarning
      >
        <Providers>
          <ErrorBoundary>
            <Suspense fallback={<GlobalLoading />}>{children}</Suspense>
          </ErrorBoundary>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
