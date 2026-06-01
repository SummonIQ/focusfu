import { Suspense } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { LoginForm } from './login-form';

export const metadata = createPageMetadata({
  title: 'Sign In',
  description: 'Sign in to manage your FocusFu account, download access, and purchase status.',
  path: '/login',
  noIndex: true,
});

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
