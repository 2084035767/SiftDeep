import { Session } from 'next-auth';
import { NextRequest } from 'next/server';

/**
 * Determines whether a user is authorized to access a specific route.
 *
 * - Allows unrestricted access to static assets like `/assets` and `/favicon.ico`.
 * - Redirects unauthenticated users trying to access protected routes to `/auth/sign-in`.
 * - Redirects authenticated users to homepage (email verification is optional).
 * - Redirects authenticated users away from auth pages to the homepage.
 *
 * @param request - The incoming request object containing the target route.
 * @param auth - The current session object or null if unauthenticated.
 * @returns A `Response` redirect object if redirection is needed, or `true` if access is allowed.
 */
export const isAuthorized = ({
  request,
  auth,
}: {
  request: NextRequest;
  auth: Session | null;
}) => {
  const isAuth = !!auth?.user;
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  // Allow access to public assets
  if (pathname.startsWith('/assets') || pathname.startsWith('/favicon.ico')) {
    return true;
  }

  // Handle unauthenticated access
  if (!isAuth) {
    if (pathname === '/' || pathname.startsWith('/p')) {
      return Response.redirect(new URL('/auth/sign-in', nextUrl));
    }
  }

  // Handle authenticated user
  if (isAuth) {
    // Redirect authenticated users away from auth pages to homepage
    if (pathname.startsWith('/auth')) {
      return Response.redirect(new URL('/', nextUrl));
    }
  }

  return true;
};
