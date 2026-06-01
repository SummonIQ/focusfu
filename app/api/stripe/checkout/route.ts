import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/server';
import { db } from '@/lib/db/client';
import { getStripe } from '@/lib/stripe/client';
import { getPriceId, type BillingInterval } from '@/lib/stripe/constants';
import { trackServerEvent } from '@/lib/analytics/server';

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Lifetime-only product right now.
  const interval: BillingInterval = 'lifetime';
  const priceId = getPriceId(interval);
  if (!priceId) {
    return NextResponse.json({ error: 'Price not configured' }, { status: 500 });
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  let customerId = user.stripeCustomerId;
  const stripe = getStripe();
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
    await db.user.update({ where: { id: user.id }, data: { stripeCustomerId: customerId } });
  }

  const origin = request.headers.get('origin') ?? 'https://focusfu.com';
  const referrer = request.headers.get('referer');
  const userAgent = request.headers.get('user-agent');

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    allow_promotion_codes: true,
    metadata: { userId: user.id, billingInterval: interval },
  });

  await trackServerEvent('focusfu_checkout_session_created', {
    userId: user.id,
    sessionId: checkoutSession.id,
    url: `${origin}/pricing`,
    path: '/pricing',
    referrer,
    userAgent,
    properties: {
      product: 'focusfu',
      funnelStep: 'checkout_session_created',
      billingInterval: interval,
      priceId,
      stripeSessionId: checkoutSession.id,
      stripeCustomerId: customerId,
      mode: checkoutSession.mode,
    },
  });

  return NextResponse.json({
    url: checkoutSession.url,
    sessionId: checkoutSession.id,
  });
}
