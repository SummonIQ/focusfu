import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard', '/success'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  };
}
