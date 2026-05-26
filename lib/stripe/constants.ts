export const PRICE_IDS = {
  lifetime: process.env.STRIPE_PRICE_ID_LIFETIME!,
};

export type BillingInterval = keyof typeof PRICE_IDS;

export function getPriceId(interval: BillingInterval = 'lifetime'): string {
  return PRICE_IDS[interval];
}
