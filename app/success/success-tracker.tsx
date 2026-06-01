'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAnalytics } from '@summoniq/signalsplash-client-sdk';
import { useAnalytics } from '@summoniq/signalsplash-client-sdk/react';

export function SuccessTracker() {
  const searchParams = useSearchParams();
  const { track } = useAnalytics();
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    track('focusfu_purchase_success_page_viewed', {
      source: 'focusfu-web',
      product: 'focusfu',
      funnelStep: 'purchase_success_page',
      stripeSessionId: searchParams.get('session_id'),
    });
    void getAnalytics()?.flush().catch(() => undefined);
  }, [searchParams, track]);

  return null;
}
