import { randomUUID } from 'crypto';
import type { EventPropertyValue } from '@summoniq/signalsplash-client-sdk';
import { siteConfig } from '@/lib/seo';

const DEFAULT_SIGNALSPLASH_ENDPOINT = 'https://api.signalsplash.com/api/events';
const SERVER_SESSION_ID = `server-${randomUUID()}`;

type TrackServerEventInput = {
  userId?: string | null;
  anonymousId?: string | null;
  sessionId?: string | null;
  path?: string | null;
  referrer?: string | null;
  url?: string | null;
  userAgent?: string | null;
  properties?: Record<string, EventPropertyValue>;
};

function analyticsEnabled() {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false';
}

function resolveEndpoint() {
  if (!analyticsEnabled()) return null;

  const configured =
    process.env.SIGNALSPLASH_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT?.trim();

  if (configured) {
    return configured.endsWith('/api/events')
      ? configured
      : `${configured.replace(/\/$/, '')}/api/events`;
  }

  return process.env.NODE_ENV === 'production'
    ? DEFAULT_SIGNALSPLASH_ENDPOINT
    : null;
}

export async function trackServerEvent(
  name: string,
  input: TrackServerEventInput = {},
) {
  const endpoint = resolveEndpoint();
  if (!endpoint) return;

  const pageUrl = input.url || siteConfig.url;
  const appId = process.env.SIGNALSPLASH_APP_ID?.trim() || 'focusfu';
  const anonymousId =
    input.anonymousId || input.userId || `server-${appId}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        appId,
        events: [
          {
            id: randomUUID(),
            appId,
            name,
            type: 'track',
            userId: input.userId || undefined,
            anonymousId,
            sessionId: input.sessionId || SERVER_SESSION_ID,
            timestamp: Date.now(),
            properties: {
              source: 'focusfu-server',
              ...input.properties,
            },
            context: {
              page: {
                url: pageUrl,
                path: input.path || new URL(pageUrl).pathname,
                title: '',
                referrer: input.referrer || '',
                search: new URL(pageUrl).search,
                hash: new URL(pageUrl).hash,
                host: new URL(pageUrl).host,
              },
              userAgent: input.userAgent || undefined,
              sdkVersion: 'focusfu-server',
            },
          },
        ],
      }),
    });
  } catch {
    // Analytics must never block checkout or webhook processing.
  } finally {
    clearTimeout(timeout);
  }
}
