import { Suspense } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { SignupForm } from './signup-form';

export const metadata = createPageMetadata({
  title: 'Create Account',
  description: 'Create your FocusFu account to manage downloads and purchase access.',
  path: '/signup',
  noIndex: true,
});

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
