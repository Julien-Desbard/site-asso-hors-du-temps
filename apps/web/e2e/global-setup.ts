import { rm } from 'fs/promises';
import { join } from 'path';

export default async function globalSetup() {
  // Clear Next.js fetch cache so Strapi-fetching pages don't use stale cached responses
  // during E2E tests — ensures the try/catch fallback logic is exercised correctly.
  const cacheDir = join(__dirname, '../.next/cache/fetch-cache');
  await rm(cacheDir, { recursive: true, force: true });
}
