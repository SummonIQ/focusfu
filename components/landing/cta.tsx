'use client';

import { useEffect, useRef } from 'react';
import { useAnalytics } from '@summoniq/signalsplash-client-sdk/react';
import { Download } from 'lucide-react';
import { TrackedLink } from '@/components/analytics/tracked-link';
import { siteConfig } from '@/lib/seo';

export function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { track } = useAnalytics();

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let tracked = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || tracked) return;
        tracked = true;
        track('focusfu_download_section_viewed', {
          source: 'focusfu-web',
          product: 'focusfu',
          funnelStep: 'download_section_view',
        });
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [track]);

  return (
    <section ref={sectionRef} id="download" className="relative py-28">
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
            <TrackedLink
              href={siteConfig.downloadHref}
              eventName="focusfu_download_started"
              eventProperties={{
                placement: 'download_section',
                product: 'focusfu',
                funnelStep: 'download_start',
                downloadUrlConfigured: siteConfig.downloadUrlConfigured,
              }}
              flush
              className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-700 px-7 py-3.5 text-sm font-semibold shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <Download className="h-4 w-4" />
              Download for macOS — free trial
            </TrackedLink>
            <p className="mt-4 text-xs text-white/70">macOS 12.0+ · Universal binary · ~12 MB</p>
          </div>
        </div>
      </div>
    </section>
  );
}
