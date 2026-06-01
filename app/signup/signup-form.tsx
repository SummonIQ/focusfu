'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { getAnalytics } from '@summoniq/signalsplash-client-sdk';
import { useAnalytics } from '@summoniq/signalsplash-client-sdk/react';
import { signUp } from '@/lib/auth/client';

export function SignupForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { identify, track } = useAnalytics();
  const next = search.get('next') ?? '/dashboard';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    track('focusfu_auth_form_submitted', {
      source: 'focusfu-web',
      mode: 'signup',
      next,
      funnelStep: 'account_start',
    });
    const result = await signUp.email({ email, password, name });
    setLoading(false);
    if (result.error) {
      setError(result.error.message ?? 'Sign up failed');
      track('focusfu_auth_form_failed', {
        source: 'focusfu-web',
        mode: 'signup',
        next,
        funnelStep: 'account_error',
        reason: result.error.code ?? result.error.message ?? 'signup_failed',
      });
      return;
    }
    const user = result.data?.user;
    if (user?.id) {
      identify(user.id, {
        email: user.email,
        name: user.name,
        source: 'focusfu-web',
      });
    }
    track('focusfu_auth_form_succeeded', {
      source: 'focusfu-web',
      mode: 'signup',
      next,
      funnelStep: 'account_created',
    });
    await getAnalytics()?.flush().catch(() => undefined);
    router.push(next);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-br from-brand-50 via-white to-accent-400/10 dark:from-brand-950 dark:via-black dark:to-accent-600/10">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-center text-sm text-muted-foreground mb-6 hover:text-foreground">
          &larr; Back home
        </Link>
        <div className="rounded-2xl border border-foreground/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-7 shadow-2xl shadow-brand-500/10">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Create your account</h1>
          <p className="text-sm text-muted-foreground mb-6">It takes ten seconds. No card needed.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <Field label="Name" type="text" value={name} onChange={setName} autoComplete="name" required />
            <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" required />
            <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="new-password" required minLength={8} />
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-foreground text-background py-3 text-sm font-semibold transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create account'}
            </button>
          </form>
          <p className="text-sm text-muted-foreground mt-5 text-center">
            Have an account?{' '}
            <Link href={`/login?next=${encodeURIComponent(next)}`} className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
  required,
  minLength,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="w-full rounded-lg border border-foreground/15 bg-white/60 dark:bg-white/5 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50"
      />
    </label>
  );
}
