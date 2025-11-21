'use client'

import { useEffect, useState } from 'react'

/**
 * Development helper component to log current origin for Google OAuth setup
 * Shows a warning banner if current origin might not be configured
 */
export default function GoogleAuthDebugger() {
  const [showBanner, setShowBanner] = useState(false)
  const [currentOrigin, setCurrentOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      setCurrentOrigin(origin)
      
      // Known configured origins
      const configuredOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:4000',
      ]

      // Show banner if origin might not be configured
      if (!configuredOrigins.includes(origin)) {
        setShowBanner(true)
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('🔍 GOOGLE OAUTH SETUP DEBUGGER')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('📍 Current Origin:', origin)
      console.log('📋 REQUIRED: Add this URL to Google Cloud Console:')
      console.log('   1. Go to: https://console.cloud.google.com/apis/credentials')
      console.log('   2. Click: 280351122038-kjua2hto0jb0g3lksg2d19eov5qdcv3g.apps.googleusercontent.com')
      console.log('   3. Find "Authorized JavaScript origins"')
      console.log('   4. Click "+ ADD URI"')
      console.log('   5. Paste this EXACT URL:', origin)
      console.log('   6. Click SAVE')
      console.log('   7. Wait 5-10 minutes')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    }
  }, [])

  if (!showBanner) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-yellow-500 px-4 py-3 text-center text-sm font-medium text-black shadow-lg">
      <div className="mx-auto max-w-4xl">
        ⚠️ <strong>Google OAuth Not Configured:</strong> Add{' '}
        <code className="rounded bg-yellow-600 px-2 py-1 text-white">{currentOrigin}</code> to{' '}
        <a
          href="https://console.cloud.google.com/apis/credentials"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Google Cloud Console
        </a>{' '}
        → Authorized JavaScript origins
        <button
          onClick={() => setShowBanner(false)}
          className="ml-4 rounded bg-black px-3 py-1 text-white hover:bg-gray-800"
        >
          ✕ Dismiss
        </button>
      </div>
    </div>
  )
}
