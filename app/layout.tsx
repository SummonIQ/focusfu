import type { Metadata, Viewport } from 'next';
import { AppAnalyticsProvider } from '@/components/providers/analytics-provider';
import { rootMetadata } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf3' },
    { media: '(prefers-color-scheme: dark)', color: '#070E25' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <AppAnalyticsProvider>{children}</AppAnalyticsProvider>
      </body>
    </html>
  );
}
