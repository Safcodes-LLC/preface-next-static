import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle Chrome DevTools requests
  if (pathname.startsWith('/.well-known/appspecific/com.chrome.devtools.json')) {
    return NextResponse.json({
      name: "Preface to Islam",
      short_name: "Preface",
      description: "Islamic knowledge and insights",
      start_url: "/",
      display: "standalone",
      theme_color: "#16a34a",
      background_color: "#ffffff"
    })
  }

  // Handle other .well-known requests
  if (pathname.startsWith('/.well-known/')) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Validate article routes - they should not contain dots or invalid characters
  if (pathname.match(/\/[^\/]+\/[^\/]+\/[^\/]+$/)) {
    const segments = pathname.split('/')
    const article = segments[segments.length - 1]
    
    // Check if the article segment contains invalid characters
    if (article.includes('.') || article.includes('com.chrome.devtools.json')) {
      return new NextResponse('Invalid article URL', { status: 400 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static files, api routes, and _next routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}
