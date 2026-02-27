'use client';

import { ThemeProvider } from '@repo/shadcn/themes-provider';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: Readonly<ProvidersProps>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <SessionProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
