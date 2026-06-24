import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(isDev
        ? [{ protocol: 'http' as const, hostname: 'localhost', port: '1337', pathname: '/uploads/**' }]
        : []),
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  silent: !isDev,
  disableLogger: true,
});
