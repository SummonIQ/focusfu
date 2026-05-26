import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const markMaskStyle: CSSProperties = {
  height: 22,
  width: 20,
  maskImage: 'url(/branding/mark.png)',
  WebkitMaskImage: 'url(/branding/mark.png)',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
};

export function Footer() {
  return (
    <footer className="border-t border-panel py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="block bg-brand-600 dark:bg-brand-400"
            style={markMaskStyle}
          />
          <Image
            src="/branding/wordmark-navy.svg"
            alt="FocusFu"
            width={494}
            height={160}
            className="h-5 w-auto block dark:hidden"
          />
          <Image
            src="/branding/wordmark-white.svg"
            alt="FocusFu"
            width={494}
            height={160}
            className="h-5 w-auto hidden dark:block"
          />
          <span className="mx-2 text-foreground/30 select-none" aria-hidden>
            ·
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-foreground transition-colors">Sign in</Link>
          <a href="mailto:hello@focusfu.com" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
