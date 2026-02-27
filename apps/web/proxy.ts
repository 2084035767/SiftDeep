import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {
  refreshAccessToken,
  validateSessionIfExist,
} from '@/server/auth.server';

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  /**
   * @description Refresh Access Token if needed before each request to the protected routes in the application.
   */
  if (token && token.user) {
    const user = token.user as typeof token.user & {
      tokens: {
        session_refresh_time: string;
      };
    };
    const session_refresh_time = new Date(
      user.tokens.session_refresh_time,
    ).getTime();
    const now = new Date().getTime();
    if (session_refresh_time <= now) {
      console.log('========== Refresh Access Token Started =========');
      await refreshAccessToken(user as any);
      console.log('========== Refresh Access Token Ended =========');
    }
  }

  if (token && token.user) {
    console.log(`========== Validate Server Session Started =========`);
    await validateSessionIfExist();
    console.log('========== Validate Server Session Ended =========');
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
