'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  AnalyticsProvider,
  WebVitals,
  useAnalytics,
} from '@summoniq/signalsplash-client-sdk/react';
import type { AnalyticsConfig } from '@summoniq/signalsplash-client-sdk';
import { useSession } from '@/lib/auth/client';

interface Props {
  children: React.ReactNode;
}

const envEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT?.trim();
const defaultEndpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://api.signalsplash.com/api/events'
    : '';
const resolvedEndpoint = envEndpoint || defaultEndpoint;
const isAnalyticsEnabled =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false' &&
  Boolean(resolvedEndpoint);

const analyticsConfig: AnalyticsConfig = {
  appId: 'focusfu',
  endpoint: resolvedEndpoint || undefined,
  enabled: isAnalyticsEnabled,
  debug: process.env.NODE_ENV === 'development',
  trackPageViews: true,
  trackWebVitals: true,
  trackClicks: true,
  sessionTimeout: 30,
};

function RouteFunnelAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { track } = useAnalytics();
  const trackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const search = searchParams.toString();
    const path = `${pathname}${search ? `?${search}` : ''}`;
    if (trackedPathRef.current === path) return;
    trackedPathRef.current = path;

    track('focusfu_route_viewed', {
      source: 'focusfu-web',
      path,
      route: pathname,
      funnelStep: 'route_view',
    });
  }, [pathname, searchParams, track]);

  return null;
}

function AnalyticsIdentify() {
  const { data: session } = useSession();
  const { identify, reset } = useAnalytics();
  const identifiedUserIdRef = useRef<string | null>(null);
  const user = session?.user;

  useEffect(() => {
    if (!user) {
      if (identifiedUserIdRef.current) {
        reset();
        identifiedUserIdRef.current = null;
      }
      return;
    }

    if (identifiedUserIdRef.current === user.id) return;

    identify(user.id, {
      email: user.email ?? undefined,
      name: user.name ?? undefined,
      source: 'focusfu-web',
    });
    identifiedUserIdRef.current = user.id;
  }, [identify, reset, user]);

  return null;
}

export function AppAnalyticsProvider({ children }: Props) {
  return (
    <AnalyticsProvider config={analyticsConfig}>
      <WebVitals />
      <Suspense fallback={null}>
        <RouteFunnelAnalytics />
      </Suspense>
      <AnalyticsIdentify />
      {children}
    </AnalyticsProvider>
  );
}
