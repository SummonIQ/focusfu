'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/css';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-panel backdrop-blur-xl bg-paper/80'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center group" aria-label="FocusFu home">
          {/* Light mode: navy lockup; dark mode: white lockup. Use two <Image>s
              swapped via Tailwind dark: variants so theming is automatic. */}
          <Image
            src="/focusfu-lockup-navy.svg"
            alt="FocusFu"
            width={808}
            height={270}
            priority
            className="h-7 w-auto block dark:hidden"
          />
          <Image
            src="/focusfu-lockup-white.svg"
            alt="FocusFu"
            width={808}
            height={270}
            priority
            className="h-7 w-auto hidden dark:block"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
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
    </header>
  );
}
