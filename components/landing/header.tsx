'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type CSSProperties } from 'react';

const markMaskStyle: CSSProperties = {
  height: 28,
  width: 25,
  maskImage: 'url(/branding/mark.png)',
  WebkitMaskImage: 'url(/branding/mark.png)',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
};

/**
 * Frosted-glass header inspired by bizfoo: a 200%-tall backdrop with a
 * vertical mask that fades to transparent, plus a 1px bottom hairline and
 * a soft top-edge highlight. Sits on top of the page without ever forming
 * a hard rectangle.
 */

const backdropStyle: CSSProperties = {
  height: '200%',
  background:
    'linear-gradient(to bottom, color-mix(in srgb, hsl(var(--background)) 85%, transparent) 0%, color-mix(in srgb, hsl(var(--background)) 0%, transparent) 50%)',
  backdropFilter: 'blur(22px) saturate(160%) brightness(1.06)',
  WebkitBackdropFilter: 'blur(22px) saturate(160%) brightness(1.06)',
  maskImage:
    'linear-gradient(to bottom, black 0%, black 50%, transparent 50%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to bottom, black 0%, black 50%, transparent 50%, transparent 100%)',
};

const bottomEdgeStyle: CSSProperties = {
  height: '100%',
  transform: 'translateY(100%)',
  background: 'color-mix(in srgb, hsl(var(--foreground)) 4%, transparent)',
  backdropFilter: 'blur(16px) brightness(180%) saturate(130%) contrast(110%)',
  WebkitBackdropFilter:
    'blur(16px) brightness(180%) saturate(130%) contrast(110%)',
  pointerEvents: 'none',
  maskImage: 'linear-gradient(to bottom, black 0, black 1px, transparent 1px)',
  WebkitMaskImage:
    'linear-gradient(to bottom, black 0, black 1px, transparent 1px)',
};

const topEdgeStyle: CSSProperties = {
  opacity: 0.7,
  backdropFilter: 'blur(16px) saturate(250%) brightness(200%) contrast(120%)',
  WebkitBackdropFilter:
    'blur(16px) saturate(250%) brightness(200%) contrast(120%)',
  maskImage:
    'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
  filter: 'blur(0.25px)',
};

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={backdropStyle}
        />

        <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="FocusFu home"
          >
            {/* F mark — PNG used as a CSS mask so the silhouette picks up
                the site's brand color (amber light / amber-dark variant). */}
            <span
              aria-hidden
              className="block bg-brand-600 dark:bg-brand-400 transition-transform group-hover:scale-[1.05]"
              style={markMaskStyle}
            />
            <Image
              src="/branding/wordmark-navy.svg"
              alt="FocusFu"
              width={494}
              height={160}
              priority
              className="h-8 w-auto block dark:hidden -translate-y-px"
            />
            <Image
              src="/branding/wordmark-white.svg"
              alt="FocusFu"
              width={494}
              height={160}
              priority
              className="h-8 w-auto hidden dark:block -translate-y-px"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '#features', label: 'Features' },
              { href: '#how', label: 'How it works' },
              { href: '#pricing', label: 'Pricing' },
              { href: '#faq', label: 'FAQ' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="#download"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-sm"
            >
              Download
            </Link>
          </div>
        </div>

        {/* Hairline + top-edge highlight */}
        <div
          className="pointer-events-none absolute -top-px right-0 left-0 z-20 h-0.5"
          style={topEdgeStyle}
        />
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={bottomEdgeStyle}
        />
      </div>
    </header>
  );
}
