'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { getAnalytics } from '@summoniq/signalsplash-client-sdk';
import type { EventPropertyValue } from '@summoniq/signalsplash-client-sdk';
import { useAnalytics } from '@summoniq/signalsplash-client-sdk/react';

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventProperties?: Record<string, EventPropertyValue>;
  flush?: boolean;
};

export function TrackedLink({
  eventName,
  eventProperties,
  flush = false,
  onClick,
  ...props
}: TrackedLinkProps) {
  const { track } = useAnalytics();

  return (
    <Link
      {...props}
      onClick={(event) => {
        track(eventName, {
          source: 'focusfu-web',
          ...eventProperties,
        });
        onClick?.(event);
        if (flush) void getAnalytics()?.flush().catch(() => undefined);
      }}
    />
  );
}
