import Link from 'next/link';
import { Suspense } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { SuccessTracker } from './success-tracker';

export const metadata = createPageMetadata({
  title: 'Purchase Complete',
  description: 'Your FocusFu purchase is complete.',
  path: '/success',
  noIndex: true,
});

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-br from-brand-50 via-white to-accent-400/10 dark:from-brand-950 dark:via-black dark:to-accent-600/10">
      <Suspense fallback={null}>
        <SuccessTracker />
      </Suspense>
      <div className="text-center max-w-md">
        <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto mb-5" />
        <h1 className="text-3xl font-bold tracking-tight mb-3">You&apos;re in!</h1>
        <p className="text-muted-foreground mb-8">
          Welcome to FocusFu. We&apos;ve sent you a download link by email. Go reclaim your Mac.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex rounded-xl bg-foreground text-background px-6 py-3 text-sm font-semibold"
        >
          Go to dashboard
        </Link>
      </div>
    </main>
  );
}
