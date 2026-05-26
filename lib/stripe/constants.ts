export const PRICE_IDS = {
  monthly: process.env.STRIPE_PRICE_ID_MONTHLY!,
  yearly: process.env.STRIPE_PRICE_ID_YEARLY!,
  lifetime: process.env.STRIPE_PRICE_ID_LIFETIME!,
};

export type BillingInterval = keyof typeof PRICE_IDS;

export function getPriceId(interval: BillingInterval): string {
  return PRICE_IDS[interval];
}
