import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth/server';
import { db } from '@/lib/db/client';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Dashboard',
  description: 'Manage your FocusFu account and download access.',
  path: '/dashboard',
  noIndex: true,
});

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/login?next=/dashboard');

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <main className="min-h-screen px-6 py-16 bg-gradient-to-br from-brand-50 via-white to-accent-400/10 dark:from-brand-950 dark:via-black dark:to-accent-600/10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Hi, {session.user.name ?? session.user.email}</h1>
        <p className="text-muted-foreground mt-1">Welcome to FocusFu.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Subscription">
            {subscription ? (
              <div className="space-y-1 text-sm">
                <div>Status: <span className="font-medium">{subscription.status}</span></div>
                {subscription.currentPeriodEnd && (
                  <div>Renews: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">No active subscription.</p>
                <Link href="/pricing" className="inline-flex rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium">
                  Choose a plan
                </Link>
              </div>
            )}
          </Card>
          <Card title="Download">
            <p className="text-sm text-muted-foreground">macOS app coming to your inbox shortly.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur p-6">
      <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">{title}</h2>
      {children}
    </div>
  );
}
