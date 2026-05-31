'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/css';

const QUESTIONS = [
  {
    q: 'How is FocusFu different from Mission Control?',
    a: 'Mission Control shows you every window at once. FocusFu lets you decide which apps belong on which desktop, gives each one a name and a hotkey, and gets out of the way. Think of it as Mission Control with intentions.',
  },
  {
    q: 'Will it work on my Intel Mac?',
    a: 'Yes — FocusFu is a Universal binary. macOS 12.0 (Monterey) or newer, Apple Silicon or Intel. It uses native macOS APIs so performance is identical on both.',
  },
  {
    q: 'Does FocusFu send any data anywhere?',
    a: 'No. The desktop app runs entirely locally. There is no account required, no telemetry, no analytics, no phone-home. The only network traffic is when you check for updates — and you can disable that.',
  },
  {
    q: 'What if it doesn’t click for me?',
    a: '30-day refund, no questions asked. Email us once and we’ll process it the same day.',
  },
  {
    q: 'Do I have to use all the per-space features?',
    a: 'Absolutely not. The hotkey-and-previews workflow is the core. Focus rules, smart suggestions, and pattern learning are opt-in — leave them off and FocusFu is just a really fast switcher.',
  },
  {
    q: 'Will updates always be free?',
    a: 'Yes. One purchase covers every version we ship, on every macOS we support. No subscriptions, no upgrade fees, no surprises.',
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-300 mb-3 font-mono tracking-wider uppercase">
            FAQ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Questions, <span className="text-gradient">answered.</span>
          </h2>
        </div>

        <ul className="space-y-2">
          {QUESTIONS.map((item, i) => {
            const open = openIdx === i;
            return (
              <li
                key={item.q}
                className={cn(
                  'rounded-xl border bg-paper/60 backdrop-blur-sm overflow-hidden transition-colors',
                  open ? 'border-brand-500/40' : 'border-panel hover:border-brand-500/30',
                )}
              >
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold tracking-tight">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 mt-0.5 shrink-0 text-muted-foreground transition-transform duration-300',
                      open && 'rotate-180 text-brand-600 dark:text-brand-300',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
