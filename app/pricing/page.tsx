import { Header } from '@/components/landing/header';
import { Pricing } from '@/components/landing/pricing';
import { Footer } from '@/components/landing/footer';

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
