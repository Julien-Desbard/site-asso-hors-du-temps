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
};

export default withSentryConfig(withPayload(nextConfig), {
  silent: !isDev,
  disableLogger: true,
});
