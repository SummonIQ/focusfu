'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Download } from 'lucide-react';
import { InteractiveSpotlight } from './interactive-spotlight';
import { AnimatedWord } from './animated-word';
import { SpacesStack } from './spaces-stack';
import { CATEGORIES } from './categories';

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % CATEGORIES.length);
    }, 5800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative overflow-x-clip pt-28 pb-20 sm:pt-36 sm:pb-28"
      style={
        {
          ['--primary-rgb' as string]: '245, 158, 11',
          ['--primary-glow' as string]: '251, 113, 133',
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 -z-30 bg-paper" />
      <div className="absolute inset-0 -z-20 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-brand-300/40 to-accent-400/25 blur-3xl animate-[blob_14s_ease-in-out_infinite] dark:from-brand-700/35 dark:to-accent-700/20" />
        <div className="absolute -bottom-44 -left-44 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-accent-300/35 to-brand-400/25 blur-3xl animate-[blob_16s_ease-in-out_infinite] [animation-delay:-4s] dark:from-accent-700/30 dark:to-brand-700/20" />
      </div>

      <InteractiveSpotlight className="-z-10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] gap-10 lg:gap-12 items-center">
          {/* Copy column */}
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium bg-paper border border-brand-500/30 backdrop-blur-md shadow-sm shadow-brand-500/10 mb-7">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-foreground/80 font-mono">v0.9 beta · macOS 12+</span>
            </div>

            <h1 className="font-display text-[2.4rem] sm:text-[2.9rem] lg:text-[3rem] xl:text-[3.4rem] font-bold tracking-tight leading-[1.06] mb-7">
              <span className="block lg:whitespace-nowrap">
                Focus on <AnimatedWord activeIndex={activeIndex} />
              </span>
              <span className="block">in one keystroke.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mb-9 leading-relaxed">
              FocusFu turns macOS Spaces into a calm, keyboard-first workspace.
              Each space gets its own apps, its own rules, its own personality.
              Switch contexts in 1&ndash;2 seconds and never lose your flow.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-9">
              <Link
                href="#download"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 dark:bg-brand-500 text-white dark:text-ink-950 px-6 py-3.5 text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(245,158,11,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-400/0 via-brand-200/40 to-brand-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Download className="h-4 w-4" />
                <span>Download for macOS</span>
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-1.5 rounded-xl px-5 py-3.5 text-sm font-medium border border-foreground/20 bg-paper backdrop-blur-md hover:border-brand-500/40 transition-all"
              >
                See pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Bullet>Apple Silicon &amp; Intel</Bullet>
              <Bullet>Keyboard-first</Bullet>
              <Bullet>No telemetry, ever</Bullet>
            </ul>
          </div>

          {/* Visual column */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-[2.5rem] bg-gradient-to-br from-brand-400/25 via-accent-400/20 to-brand-500/10 blur-3xl -z-10" />
            <SpacesStack activeIndex={activeIndex} />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <Check className="h-4 w-4 text-emerald-500" />
      {children}
    </li>
  );
}
