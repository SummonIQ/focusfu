import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { BuiltFor } from '@/components/landing/built-for';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { CTA } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, createPageMetadata, siteConfig } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: '/',
  absoluteTitle: true,
});

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl('/branding/focusfu-logo.png'),
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: {
        '@id': absoluteUrl('/#organization'),
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': absoluteUrl('/#software'),
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'macOS 12.0+',
      downloadUrl: siteConfig.downloadUrl,
      offers: {
        '@type': 'Offer',
        price: '99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: absoluteUrl('/pricing'),
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Header />
      <main>
        <Hero />
        <Features />
        <BuiltFor />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
