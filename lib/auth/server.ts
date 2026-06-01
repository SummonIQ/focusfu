import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@/lib/db/client';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.BETTER_AUTH_URL || 'https://focusfu.com'
    : process.env.BETTER_AUTH_URL || `http://localhost:${process.env.PORT ?? '30340'}`;

export const auth = betterAuth({
  appName: 'FocusFu',
  baseURL,
  database: prismaAdapter(db, { provider: 'postgresql' }),
  advanced: {
    cookiePrefix: 'focusfu',
    useSecureCookies: process.env.NODE_ENV === 'production',
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  session: {
    cookieCache: { enabled: true, maxAge: 7 * 24 * 60 * 60 },
    expiresIn: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || 'http://localhost:30340',
    'http://127.0.0.1:30340',
    'https://focusfu.com',
    'https://www.focusfu.com',
    'focusfu://',
  ],
});
