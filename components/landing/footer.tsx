import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-panel py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <Image
            src="/branding/lockup-navy.svg"
            alt="FocusFu"
            width={808}
            height={270}
            className="h-5 w-auto block dark:hidden"
          />
          <Image
            src="/branding/lockup-white.svg"
            alt="FocusFu"
            width={808}
            height={270}
            className="h-5 w-auto hidden dark:block"
          />
          <span>· © {new Date().getFullYear()}</span>
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
