'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

declare global {
  interface Window {
    google?: any
  }
}

interface SocialLoginProps {
  className?: string
  dict?: any
  lang?: string
  onSuccess?: () => void
}

export default function SocialLogin({ className = '', dict, lang, onSuccess }: SocialLoginProps) {
  const router = useRouter()
  const [gisReady, setGisReady] = useState(false)
  const [googleInited, setGoogleInited] = useState(false)
  const initOnceRef = useRef(false)
  const googleBtnRef = useRef<HTMLDivElement | null>(null)

  const handleGoogleCredential = useCallback(
    async (credential: string) => {
      try {
        let response: Response
        try {
          response = await fetch('https://king-prawn-app-x9z27.ondigitalocean.app/api/authentication/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential }),
            credentials: 'include',
          })
        } catch (e: any) {
          // Fallback retry without credentials to diagnose CORS-with-credentials issues
          console.warn('[Google Auth] First request with credentials failed, retrying without credentials...', e)
          response = await fetch('https://king-prawn-app-x9z27.ondigitalocean.app/api/authentication/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential }),
          })
        }

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.message || 'Google authentication failed')
        }

        // Try to find a token across common response shapes
        const isLikelyJwt = (val: unknown) =>
          typeof val === 'string' && /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(val)

        // Also try Authorization header (e.g., "Bearer <jwt>")
        const authHeader = response.headers.get('authorization') || response.headers.get('Authorization')
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

        // Recursive scan (limited depth) for a JWT-like string
        if (!token) {
          const seen = new WeakSet<object>()
          const dfs = (obj: unknown, depth: number): string | undefined => {
            if (!obj || depth > 3) return undefined
            if (typeof obj === 'string') return isLikelyJwt(obj) ? obj : undefined
            if (typeof obj !== 'object') return undefined
            if (seen.has(obj as object)) return undefined
            seen.add(obj as object)
            for (const v of Object.values(obj as Record<string, unknown>)) {
              const found = dfs(v, depth + 1)
              if (found) return found
            }
            return undefined
          }
          token = dfs(data, 0)
        }

        const userData = data?.userData || data?.user || data?.data?.userData || data?.data?.user

        if (!token) {
          // Minimal debug information to help diagnose response shape during development
          console.warn('[Google Auth] No token found in response. Data keys:', Object.keys(data || {}))
          throw new Error('No token received from Google authentication')
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', token)
          localStorage.setItem('authToken_backup', token)
          if (userData) localStorage.setItem('user', JSON.stringify(userData))
          try {
            const se = new StorageEvent('storage', { key: 'authToken' })
            window.dispatchEvent(se)
          } catch (_) {}
        }

        if (onSuccess) {
          toast.success(dict?.login?.success || 'Logged in successfully')
          onSuccess()
        } else {
          router.push(lang ? `/${lang}` : '/')
        }
      } catch (err) {
        console.error('Google auth error:', err)
      }
    },
    [router, onSuccess, dict, lang]
  )

  const initGoogle = useCallback(() => {
    if (initOnceRef.current) return
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) {
      console.error(
        '[Google Auth] NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set. Add it to .env.local and restart the dev server.'
      )
      return
    }
    if (!window.google) return
    initOnceRef.current = true
    try {
      // Prevent auto sign-in selection issues
      window.google.accounts.id.disableAutoSelect?.()
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: { credential: string }) => {
          if (response?.credential) {
            handleGoogleCredential(response.credential)
          }
        },
      })
      // Render the official GIS button into our container
      if (googleBtnRef.current) {
        try {
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            type: 'standard',
            theme: 'filled_blue',
            size: 'large',
            shape: 'pill',
            text: 'continue_with',
            logo_alignment: 'left',
            width: '100%',
          })
        } catch (e) {
          console.error('Failed to render Google button', e)
        }
      }
      setGoogleInited(true)
      setGisReady(true)
    } catch (e) {
      console.error('Failed to initialize Google Identity Services', e)
    }
  }, [handleGoogleCredential])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.google) initGoogle()
  }, [initGoogle])

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
      // href: '/auth/facebook',
      icon: (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2]">
          <FaFacebookF size={12} color="white" />
        </span>
      ),
    },
  ]
  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          setGisReady(true)
          initGoogle()
        }}
      />
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
              {/* Visible custom-styled button (old UI) */}
              <div className="pointer-events-none flex h-full w-full items-center gap-2 overflow-hidden rounded-full border border-[#E2E2E2] bg-white px-4 py-3 shadow-lg dark:border-[#363636] dark:bg-[#000000]">
                <div>{item.icon}</div>
                <span className="line-clamp-1 text-center text-sm font-medium whitespace-nowrap text-[#404040] dark:text-white">
                  {item.name}
                </span>
              </div>

              {/* Invisible GIS button overlay to capture clicks and trigger Google flow */}
              <div className="absolute inset-0" style={{ opacity: 0, display: 'flex', alignItems: 'center' }}>
                <div ref={googleBtnRef} className="w-full" />
              </div>
            </div>
          ) : (
            <Link
              key={index}
              href={item.href}
              className="flex w-full items-center gap-2 overflow-hidden rounded-full border border-[#E2E2E2] bg-white px-4 py-3 shadow-lg transition-transform dark:border-[#363636] dark:bg-[#000000]"
            >
              <div>{item.icon}</div>
              <span className="line-clamp-1 flex-1 text-center text-sm font-medium whitespace-nowrap text-[#404040] dark:text-white">
                {item.name}
              </span>
            </Link>
          )
        )}
      </div>
    </>
  )
}
