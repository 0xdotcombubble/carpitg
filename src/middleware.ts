import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Cache static assets aggressively
  if (request.nextUrl.pathname.startsWith('/api/media')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Cache images from R2 storage
  if (request.nextUrl.pathname.includes('/api/media/file/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('CDN-Cache-Control', 'public, max-age=31536000')
  }

  // Cache static files (JS, CSS, fonts, images from /public)
  if (
    request.nextUrl.pathname.startsWith('/_next/static/') ||
    request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|woff|woff2|ttf|otf)$/)
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Cache HTML pages with revalidation
  if (request.nextUrl.pathname === '/' || !request.nextUrl.pathname.includes('.')) {
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/webpack-hmr (webpack hot module reloading)
     * - _next/static (already cached by Next.js)
     * - admin (Payload CMS admin)
     */
    '/((?!_next/webpack-hmr|admin).*)',
  ],
}
