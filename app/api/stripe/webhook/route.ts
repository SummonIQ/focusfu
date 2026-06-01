import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/client';
import { db } from '@/lib/db/client';
import { trackServerEvent } from '@/lib/analytics/server';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook verification failed: ${(err as Error).message}` },
      { status: 400 },
    );
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      await trackServerEvent('focusfu_purchase_completed', {
        userId,
        sessionId: session.id,
        path: '/success',
        url: `${process.env.BETTER_AUTH_URL || 'https://focusfu.com'}/success?session_id=${session.id}`,
        properties: {
          product: 'focusfu',
          funnelStep: 'purchase_completed',
          stripeSessionId: session.id,
          stripeCustomerId:
            typeof session.customer === 'string'
              ? session.customer
              : session.customer?.id ?? null,
          mode: session.mode,
          paymentStatus: session.payment_status,
          amountTotal: session.amount_total,
          currency: session.currency,
          billingInterval: session.metadata?.billingInterval ?? null,
        },
      });
      if (userId && session.mode === 'subscription' && session.subscription) {
        const stripe = getStripe();
        const sub = await stripe.subscriptions.retrieve(session.subscription as string);
        await upsertSubscription(userId, sub);
      }
      break;
    }
    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      await trackServerEvent('focusfu_checkout_abandoned', {
        userId: session.metadata?.userId,
        sessionId: session.id,
        path: '/pricing',
        properties: {
          product: 'focusfu',
          funnelStep: 'checkout_abandoned',
          stripeSessionId: session.id,
          mode: session.mode,
          billingInterval: session.metadata?.billingInterval ?? null,
        },
      });
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      const stripe = getStripe();
      const customer = await stripe.customers.retrieve(sub.customer as string);
      const userId = (customer as Stripe.Customer).metadata?.userId;
      if (userId) await upsertSubscription(userId, sub);
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      await db.subscription.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: { status: 'canceled', cancelAtPeriodEnd: true },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}

async function upsertSubscription(userId: string, sub: Stripe.Subscription) {
  const item = sub.items.data[0];
  await db.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeSubscriptionId: sub.id,
      stripePriceId: item.price.id,
      status: sub.status,
      currentPeriodEnd: item.current_period_end
        ? new Date(item.current_period_end * 1000)
        : null,
      cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
    },
    update: {
      stripeSubscriptionId: sub.id,
      stripePriceId: item.price.id,
      status: sub.status,
      currentPeriodEnd: item.current_period_end
        ? new Date(item.current_period_end * 1000)
        : null,
      cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
    },
  });
}
