import { env, isAuthorized, jwtCallback, sessionCallback } from '@/lib';
import { authorizeSignIn } from '@/server/auth.server';
import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  /**
   * @description Authentication providers
   */
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        identifier: { label: 'Identifier', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      /**
       * @description Authorization logic for credentials provider
       * @param credentials - Credentials object (contains identifier and password)
       */
      async authorize(credentials) {
        return await authorizeSignIn({
          identifier: credentials?.identifier as string,
          password: credentials?.password as string,
        });
      },
    },
  ],

  /**
   * @description Callback functions for token and session management
   */
  callbacks: {
    /**
     * @description Custom JWT callback to extend the token with additional fields
     * @param token - Current JWT token
     * @param user - User object (only available on sign-in)
     * @param trigger - Trigger type (e.g., "signIn", "update")
     * @param session - Current session object (on update)
     */
    async jwt({ token, user, trigger, session }) {
      return jwtCallback({ token, user, trigger, session } as {
        token: JWT;
        user: User;
        trigger: 'signIn' | 'update';
        session: Session;
      });
    },

    /**
     * @description Custom session callback to include token data in the session
     * @param session - Current session
     * @param token - Current JWT token
     */
    async session({ session, token }) {
      return sessionCallback({ session, token } as {
        session: Session;
        token: JWT;
      });
    },
  },

  /**
   * @description JWT session strategy settings
   */
  session: {
    strategy: 'jwt',
    maxAge: env.AUTH_SESSION_AGE, // Total session lifetime (in seconds)
    updateAge: 86400 * 5, // Revalidate session every 5 days
  },

  /**
   * @description Secret used to sign the JWT and encrypt session data
   */
  secret: env.AUTH_SECRET,

  /**
   * @description Use secure cookies in production only
   */
  useSecureCookies: env.NODE_ENV === 'production',

  /**
   * @description Custom pages for authentication flow
   */
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/auth/sign-in',
    verifyRequest: '/', // Redirect to home after verification
    newUser: '/auth/sign-up',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/**
 * Wrapper for next-auth/react signIn
 */
export const signIn = async (
  provider?: string,
  options?: Record<string, unknown>,
) => {
  const { signIn: nextAuthSignIn } = await import('next-auth/react');
  return nextAuthSignIn(provider, options);
};

/**
 * Wrapper for next-auth/react signOut
 */
export const signOut = async (options?: Record<string, unknown>) => {
  const { signOut: nextAuthSignOut } = await import('next-auth/react');
  return nextAuthSignOut(options);
};

/**
 * Wrapper for next-auth/react update
 */
export const update = async (data: unknown) => {
  // @ts-ignore - unstable_update exists in next-auth v4
  const { unstable_update } = await import('next-auth/react');
  return unstable_update(data);
};
