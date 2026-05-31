'use client';

import { createAuthClient } from 'better-auth/react';

const baseURL =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_AUTH_URL || 'https://focusfu.com';

export const authClient = createAuthClient({ baseURL });

export const { signIn, signUp, signOut, useSession } = authClient;
