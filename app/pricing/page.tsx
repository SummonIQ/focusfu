import { Header } from '@/components/landing/header';
import { Pricing } from '@/components/landing/pricing';
import { Footer } from '@/components/landing/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Pricing',
  description:
    'Buy FocusFu once for $99. Get the macOS workspace switcher, every future update, and a 30-day refund window.',
  path: '/pricing',
});

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'FocusFu',
  description:
    'A keyboard-first macOS workspace switcher with named Spaces, live previews, and focus rules.',
  brand: {
    '@type': 'Brand',
    name: 'FocusFu',
  },
  offers: {
    '@type': 'Offer',
    url: absoluteUrl('/pricing'),
    price: '99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingJsonLd} />
      <Header />
      <main className="pt-24">
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
