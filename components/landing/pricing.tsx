'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/css';

type Plan = {
  id: string;
  name: string;
  price: string;
  suffix: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$4',
    suffix: '/mo',
    blurb: 'Try it out. Cancel anytime.',
    features: ['Unlimited spaces', 'Live previews', 'Custom hotkeys', 'Updates included'],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$36',
    suffix: '/yr',
    blurb: 'Save 25%. Two months free.',
    features: [
      'Everything in Monthly',
      'Priority email support',
      'Beta access to new modes',
      'Bring-your-own-icon packs',
    ],
    highlight: true,
    badge: 'Most popular',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$99',
    suffix: ' once',
    blurb: 'Pay once. Own forever.',
    features: [
      'Everything in Yearly',
      'All future macOS versions',
      'Founder discount lifetime',
      'Vote on the roadmap',
    ],
  },
];

export function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const onCheckout = async (id: string) => {
    setLoading(id);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interval: id }),
      });
      if (res.status === 401) {
        window.location.href = `/signup?next=${encodeURIComponent('/pricing')}`;
        return;
      }
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            One small price. <span className="text-gradient">Every focused hour back.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            FocusFu is built and maintained by a tiny team. Your money keeps it indie and ad-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative rounded-2xl p-7 border bg-white/50 dark:bg-white/[0.02] backdrop-blur-md flex flex-col',
                plan.highlight
                  ? 'border-brand-500/40 shadow-2xl shadow-brand-500/20 scale-[1.02] md:scale-105'
                  : 'border-foreground/10',
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  {plan.badge}
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{plan.blurb}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                <span className="text-muted-foreground">{plan.suffix}</span>
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onCheckout(plan.id)}
                disabled={loading !== null}
                className={cn(
                  'w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all disabled:opacity-50',
                  plan.highlight
                    ? 'bg-foreground text-background hover:scale-[1.02]'
                    : 'border border-foreground/15 hover:bg-foreground/5',
                )}
              >
                {loading === plan.id ? 'Redirecting…' : `Choose ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          30-day refund, no questions asked. Stripe-secured payments.
        </p>
      </div>
    </section>
  );
}
