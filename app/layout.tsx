import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://focusfu.com'),
  title: {
    default: 'FocusFu — Master Your macOS Workspace',
    template: '%s · FocusFu',
  },
  description:
    'The fastest way to switch between macOS desktops. Lightning-fast workspace switching with beautiful visual previews, keyboard-first navigation, and focus modes that actually keep you on task.',
  openGraph: {
    title: 'FocusFu — Master Your macOS Workspace',
    description:
      'Lightning-fast workspace switching for macOS. Keyboard-first, visual, and built for focus.',
    url: 'https://focusfu.com',
    siteName: 'FocusFu',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FocusFu' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FocusFu — Master Your macOS Workspace',
    description: 'Lightning-fast macOS workspace switching, built for focus.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

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
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
