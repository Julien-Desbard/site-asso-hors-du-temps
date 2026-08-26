import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';
import { withPayload } from '@payloadcms/next/withPayload';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/((?!admin).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "img-src 'self' https://*.public.blob.vercel-storage.com data:",
              // 'unsafe-eval' requis uniquement en dev : le runtime HMR de
              // `next dev` exécute ses modules via eval() (devtool eval-source-map).
              // Absent en prod, où le bundle ne l'utilise pas.
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
              "style-src 'self' 'unsafe-inline'",
              "connect-src 'self' https://*.sentry.io",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(withPayload(nextConfig), {
  silent: !isDev,
  disableLogger: true,
});
