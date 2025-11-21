'use client'

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

interface SocialLoginProps {
  className?: string
  dict?: any
  lang?: string
  onSuccess?: () => void
}

export default function SocialLogin({ className = '', dict, lang, onSuccess }: SocialLoginProps) {
  const router = useRouter()
  const googleLoginRef = useRef<HTMLDivElement | null>(null)

  const clientId = '280351122038-kjua2hto0jb0g3lksg2d19eov5qdcv3g.apps.googleusercontent.com'

  const handleGoogleSuccess = async (response: any) => {
    try {
      console.log('[Google Auth] Login Success:', response)

      const credential = response?.credential
      console.log('[Google Auth] Credential received:', credential ? 'Yes' : 'No')

      if (!credential) {
        throw new Error('No credential received from Google')
      }

      // Decode the JWT to see user info
      const decoded = jwtDecode(credential)
      console.log('[Google Auth] Decoded User Info:', decoded)

      // Send credential to your backend
      const apiResponse = await fetch('https://king-prawn-app-x9z27.ondigitalocean.app/api/authentication/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      })

      const data = await apiResponse.json()

      if (!apiResponse.ok) {
        throw new Error(data?.message || 'Google authentication failed')
      }

      // Try to find a token across common response shapes
      const isLikelyJwt = (val: unknown) =>
        typeof val === 'string' && /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(val)

      // Also try Authorization header (e.g., "Bearer <jwt>")
      const authHeader = apiResponse.headers.get('authorization') || apiResponse.headers.get('Authorization')
      const headerToken = authHeader?.replace(/^Bearer\s+/i, '').trim()

      let token: string | undefined =
        (headerToken && isLikelyJwt(headerToken) ? headerToken : undefined) ||
        data?.token ||
        data?.accessToken ||
        data?.jwt ||
        data?.idToken ||
        data?.id_token ||
        data?.authToken ||
        data?.data?.token ||
        data?.data?.accessToken ||
        data?.data?.jwt ||
        data?.data?.idToken ||
        data?.data?.id_token ||
        data?.data?.authToken

      // Fallback: scan shallow keys for a JWT-like string
      if (!token && data && typeof data === 'object') {
        for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
          if (isLikelyJwt(v)) {
            token = v as string
            break
          }
        }
      }

      const userData = data?.userData || data?.user || data?.data?.userData || data?.data?.user

      if (!token) {
        console.warn('[Google Auth] No token found in response. Data keys:', Object.keys(data || {}))
        throw new Error('No token received from Google authentication')
      }

      // Store token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token)
        localStorage.setItem('authToken_backup', token)
        if (userData) localStorage.setItem('user', JSON.stringify(userData))
        try {
          const se = new StorageEvent('storage', { key: 'authToken' })
          window.dispatchEvent(se)
        } catch (_) {}
      }

      toast.success(dict?.login?.success || 'Logged in successfully')

      // Navigate or call onSuccess
      if (onSuccess) {
        onSuccess()
      } else {
        router.push(lang ? `/${lang}` : '/')
      }
    } catch (err: any) {
      console.error('[Google Auth] Error:', err)
      toast.error(dict?.login?.error || err?.message || 'Authentication failed. Please try again.')
    }
  }

  const handleGoogleError = () => {
    console.error('[Google Auth] Login Failed')
    toast.error('Google Sign-In failed. Please try again.')
  }

  const handleCustomClick = () => {
    // Programmatically trigger the Google Login
    const googleLoginButton = googleLoginRef.current?.querySelector('div[role="button"]')
    if (googleLoginButton) {
      ;(googleLoginButton as HTMLElement).click()
    }
  }

  const t = {
    google: dict?.login?.google || 'Continue with Google',
    facebook: dict?.login?.facebook || 'Continue with Facebook',
    or: dict?.login?.or || 'Or continue with',
  }

  const socials = [
    {
      name: t.google,
      href: '/auth/google',
      type: 'google' as const,
      icon: <FcGoogle className="size-5 shrink-0" />,
    },
    {
      name: t.facebook,
      href: '#',
      icon: (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2]">
          <FaFacebookF size={12} color="white" />
        </span>
      ),
    },
  ]

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {/* OR divider */}
      <div className="relative text-center">
        <span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-[#000000] dark:text-neutral-400">
          {t.or}
        </span>
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 transform border border-neutral-100 dark:border-neutral-800"></div>
      </div>

      {/* Social buttons */}
      <div className="grid gap-3 lg:grid-cols-2">
        {socials.map((item, index) =>
          item.type === 'google' ? (
            <div key={index} className="relative">
              {/* Visible custom-styled button */}
              <div
                onClick={handleCustomClick}
                className="flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#E2E2E2] bg-white px-4 py-3 shadow-lg transition-transform hover:translate-y-[-2px] dark:border-[#363636] dark:bg-[#000000]"
              >
                <div>{item.icon}</div>
                <span className="line-clamp-1 flex-1 text-center text-sm font-medium whitespace-nowrap text-[#404040] dark:text-white">
                  {item.name}
                </span>
              </div>

              {/* Hidden Google Login trigger */}
              <div ref={googleLoginRef} className="hidden">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} type="icon" />
              </div>
            </div>
          ) : (
            <Link
              key={index}
              href={item.href}
              className="flex w-full items-center gap-2 overflow-hidden rounded-full border border-[#E2E2E2] bg-white px-4 py-3 shadow-lg transition-transform hover:translate-y-[-2px] dark:border-[#363636] dark:bg-[#000000]"
            >
              <div>{item.icon}</div>
              <span className="line-clamp-1 flex-1 text-center text-sm font-medium whitespace-nowrap text-[#404040] dark:text-white">
                {item.name}
              </span>
            </Link>
          )
        )}
      </div>
    </GoogleOAuthProvider>
  )
}
