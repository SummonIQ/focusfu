'use client';

import Link from 'next/link';
import { ArrowRight, Check, Download } from 'lucide-react';
import { InteractiveSpotlight } from './interactive-spotlight';
import { AnimatedWord } from './animated-word';
import { SpacesStack } from './spaces-stack';

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
      style={
        {
          ['--primary-rgb' as string]: '99, 102, 241',
          ['--primary-glow' as string]: '167, 139, 250',
        } as React.CSSProperties
      }
    >
      {/* Layered background */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-brand-50 via-white to-accent-400/10 dark:from-brand-950 dark:via-black dark:to-accent-600/10" />
      <div className="absolute inset-0 -z-20 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Animated blobs */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-brand-400/30 to-accent-500/20 blur-3xl animate-[blob_12s_ease-in-out_infinite] dark:from-brand-600/30 dark:to-accent-600/20" />
        <div className="absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-accent-500/25 to-brand-400/20 blur-3xl animate-[blob_14s_ease-in-out_infinite] [animation-delay:-4s] dark:from-accent-600/25 dark:to-brand-600/20" />
        <div className="absolute top-1/2 left-1/3 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-400/20 to-brand-500/20 blur-3xl animate-[float_10s_ease-in-out_infinite] [animation-delay:-2s]" />
      </div>

      {/* Pointer-tracked spotlight (canvas) */}
      <InteractiveSpotlight className="-z-10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium bg-white/60 dark:bg-white/5 border border-brand-500/15 backdrop-blur-md shadow-sm shadow-brand-500/10 mb-7">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-foreground/80">Public beta — macOS 12+</span>
            </div>

            <h1 className="text-[2.6rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.02] mb-6">
              <span className="text-foreground">Focus on</span>{' '}
              <AnimatedWord />
              <br />
              <span className="text-gradient">in one keystroke.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-9 leading-relaxed">
              FocusFu turns macOS Spaces into a calm, keyboard-first workspace.
              Lightning previews. Per-space focus rules. Switch contexts in 1–2
              seconds and never lose your flow.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-9">
              <Link
                href="#download"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3.5 text-sm font-semibold shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-brand-500/30 to-brand-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Download className="h-4 w-4" />
                <span>Download for macOS</span>
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-1.5 rounded-xl px-5 py-3.5 text-sm font-medium border border-foreground/10 bg-white/60 dark:bg-white/5 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/10 transition-all"
              >
                View pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Bullet>Apple Silicon & Intel</Bullet>
              <Bullet>Keyboard-first</Bullet>
              <Bullet>Privacy-first, no telemetry</Bullet>
            </ul>
          </div>

          {/* Right: 3D stack */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 blur-3xl -z-10" />
            <SpacesStack />
          </div>
        </div>
      </div>

      {/* Fade-out to next section */}
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
