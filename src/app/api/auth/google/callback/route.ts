import { NextRequest, NextResponse } from 'next/server'

// Exchanges authorization code for tokens using OAuth 2.0 code flow.
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${url.origin}/login?oauth_error=${encodeURIComponent(error)}`)
  }

  if (!code) {
    return NextResponse.redirect(`${url.origin}/login?oauth_error=missing_code`)
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT || `${url.origin}/api/auth/google/callback`

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${url.origin}/login?oauth_error=missing_client_config`)
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    const tokenData = await tokenRes.json()
    if (!tokenRes.ok) {
      return NextResponse.redirect(
        `${url.origin}/login?oauth_error=token_exchange_failed&details=${encodeURIComponent(tokenData.error || 'unknown')}`
      )
    }

    const idToken = tokenData.id_token
    const accessToken = tokenData.access_token

    // Fetch user info (optional)
    let userInfo: any = null
    if (accessToken) {
      const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (userRes.ok) {
        userInfo = await userRes.json()
      }
    }

    // Here you would normally create a session/JWT. For now redirect with tokens in URL (NOT recommended for prod).
    // Better: set an HttpOnly cookie server-side. Simplified for demonstration.
    const redirectTarget = new URL(`${url.origin}/login`)
    if (idToken) redirectTarget.searchParams.set('google_id_token', idToken)
    if (userInfo?.email) redirectTarget.searchParams.set('email', userInfo.email)
    return NextResponse.redirect(redirectTarget)
  } catch (e: any) {
    return NextResponse.redirect(
      `${url.origin}/login?oauth_error=exception&details=${encodeURIComponent(e?.message || 'error')}`
    )
  }
}