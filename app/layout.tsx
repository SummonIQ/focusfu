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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FocusFu — Master Your macOS Workspace',
    description: 'Lightning-fast macOS workspace switching, built for focus.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a1a' },
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
