'use client'

import { useEffect } from 'react'

/**
 * Development helper component to log current origin for Google OAuth setup
 * Remove this in production or add it temporarily to debug OAuth issues
 */
export default function GoogleAuthDebugger() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('🔍 GOOGLE OAUTH SETUP DEBUGGER')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('📍 Current Origin:', origin)
      console.log('📋 Add this URL to Google Cloud Console:')
      console.log('   1. Go to: https://console.cloud.google.com/apis/credentials')
      console.log('   2. Click on your OAuth 2.0 Client ID')
      console.log('   3. Add to "Authorized JavaScript origins":', origin)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    }
  }, [])

  return null
}
