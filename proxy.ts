import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'yo'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // User requested / to stay clean
});

// Next.js 16 requires a named 'proxy' export (default export / middleware is deprecated)
export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized, e.g. api folders, pwa assets
  matcher: ['/((?!api|_next|_vercel|icon|manifest.json|sw.js|.*\\..*).*)'  ],
};
