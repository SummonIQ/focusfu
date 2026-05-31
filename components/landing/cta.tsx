import Link from 'next/link';
import { Download } from 'lucide-react';

export function CTA() {
  return (
    <section id="download" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 p-10 sm:p-16 text-center shadow-[0_30px_120px_-40px_rgba(99,102,241,0.6)]">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2), transparent 50%)',
          }} />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Reclaim your Mac.
            </h2>
            <p className="text-white/85 text-lg max-w-xl mx-auto mb-8">
              Three minutes to install. One keystroke to switch. Zero clutter forever.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-700 px-7 py-3.5 text-sm font-semibold shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <Download className="h-4 w-4" />
              Download for macOS — free trial
            </Link>
            <p className="mt-4 text-xs text-white/70">macOS 12.0+ · Universal binary · ~12 MB</p>
          </div>
        </div>
      </div>
    </section>
  );
}
