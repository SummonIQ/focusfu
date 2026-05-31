'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Infinity as InfinityIcon, ShieldCheck, Sparkles } from 'lucide-react';

const INCLUDED = [
  'Unlimited named Spaces with custom hotkeys',
  'Live thumbnail previews of every desktop',
  'Per-space focus rules & app rosters',
  'Pattern learning & smart suggestions',
  'All future updates, forever',
  'Works on Apple Silicon & Intel',
  'Runs locally — no account, no telemetry',
];

export function Pricing() {
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interval: 'lifetime' }),
      });
      if (res.status === 401) {
        window.location.href = `/signup?next=${encodeURIComponent('/pricing')}`;
        return;
      }
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-300 mb-3 font-mono tracking-wider uppercase">
            Pricing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Buy once.{' '}
            <span className="relative inline-block">
              <span className="marker-bg px-2 -mx-1 rounded-[2px]">Own it forever.</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            No subscriptions. No tiers. No nickel-and-diming. One price for
            FocusFu and every update we ever ship.
          </p>
        </div>

        <div className="relative">
          {/* glow */}
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-400/30 via-accent-400/20 to-brand-500/15 blur-3xl -z-10" />

          <div className="rounded-3xl border border-brand-500/30 bg-paper backdrop-blur-xl p-8 sm:p-12 shadow-2xl shadow-brand-500/20">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-4">
                  <Sparkles className="h-3 w-3" />
                  Lifetime
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight mb-1">
                  FocusFu, forever yours.
                </h3>
                <p className="text-sm text-muted-foreground">
                  One payment. Every macOS release. Every future feature.
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="font-display text-6xl font-bold tracking-tight">$99</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-mono">USD · one-time</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-9">
              {INCLUDED.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 mt-0.5 text-brand-600 dark:text-brand-300 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onCheckout}
                disabled={loading}
                className="group relative inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink-900 dark:bg-brand-500 text-white dark:text-ink-950 px-6 py-4 text-sm font-semibold shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] overflow-hidden disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-400/0 via-brand-200/30 to-brand-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <InfinityIcon className="h-4 w-4" />
                {loading ? 'Redirecting…' : 'Get FocusFu — $99 once'}
              </button>
              <Link
                href="#download"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-4 text-sm font-medium border border-foreground/15 hover:border-brand-500/40 transition-colors"
              >
                Try free for 14 days
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> 30-day refund, no questions
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-500" /> Stripe-secured checkout
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-500" /> No card to start trial
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
