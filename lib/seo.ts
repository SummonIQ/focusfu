import type { Metadata } from 'next';

export const siteConfig = {
  name: 'FocusFu',
  url: 'https://focusfu.com',
  title: 'FocusFu | Master Your macOS Workspace',
  description:
    'Keyboard-first macOS workspace switching with visual previews, named Spaces, per-space focus rules, and one-keystroke context changes.',
  ogImage: '/og-image.png',
  downloadHref: process.env.NEXT_PUBLIC_FOCUSFU_DOWNLOAD_URL?.trim() || '#download',
  downloadUrl:
    process.env.NEXT_PUBLIC_FOCUSFU_DOWNLOAD_URL?.trim() ||
    'https://focusfu.com/#download',
  downloadUrlConfigured: Boolean(
    process.env.NEXT_PUBLIC_FOCUSFU_DOWNLOAD_URL?.trim(),
  ),
  keywords: [
    'FocusFu',
    'macOS Spaces',
    'macOS workspace switcher',
    'Mission Control alternative',
    'Mac productivity',
    'keyboard launcher',
    'focus app',
  ],
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  noIndex = false,
  absoluteTitle = false,
}: {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const displayTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    keywords: [...siteConfig.keywords],
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} macOS workspace switcher`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  creator: 'SummonIQ',
  publisher: 'SummonIQ',
  category: 'productivity',
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} macOS workspace switcher`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
