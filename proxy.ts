import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'yo'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // User requested / to stay clean
});

export const config = {
  // Skip all paths that should not be internationalized, e.g. api folders, pwa assets
  matcher: ['/((?!api|_next|_vercel|icon|manifest.json|sw.js|.*\\..*).*)']
};
