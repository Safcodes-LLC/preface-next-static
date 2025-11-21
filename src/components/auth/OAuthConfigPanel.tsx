'use client'

import { useEffect, useState } from 'react'

/**
 * Admin/Developer Panel - Shows OAuth Configuration Status
 * Add this to any page temporarily to see configuration instructions
 */
export default function OAuthConfigPanel() {
  const [currentOrigin, setCurrentOrigin] = useState('')
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      setCurrentOrigin(origin)

      // Check if we're on a known configured origin
      const configuredOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:4000',
      ]
      setIsConfigured(configuredOrigins.includes(origin))
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  if (!currentOrigin) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-md rounded-lg border-2 border-red-500 bg-white p-6 shadow-2xl dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-red-600 dark:text-red-400">
          {isConfigured ? '✅ OAuth Configured' : '⚠️ OAuth Not Configured'}
        </h3>
      </div>

      {!isConfigured && (
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Current Origin:</p>
            <div className="mt-1 flex items-center gap-2">
              <code className="flex-1 rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                {currentOrigin}
              </code>
              <button
                onClick={() => copyToClipboard(currentOrigin)}
                className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
            <p className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              📋 Required Action:
            </p>
            <ol className="ml-4 list-decimal space-y-1 text-xs text-yellow-900 dark:text-yellow-100">
              <li>
                Open{' '}
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Google Cloud Console
                </a>
              </li>
              <li>Find OAuth Client ID: 280351122038-kjua2hto0jb0g3lksg2d19eov5qdcv3g</li>
              <li>Click on it to edit</li>
              <li>Scroll to &quot;Authorized JavaScript origins&quot;</li>
              <li>Click &quot;+ ADD URI&quot;</li>
              <li>
                Paste: <code className="rounded bg-white px-1 dark:bg-gray-800">{currentOrigin}</code>
              </li>
              <li>Click SAVE</li>
              <li>Wait 5-10 minutes</li>
              <li>Test in incognito mode</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded bg-blue-600 px-4 py-2 text-center text-xs font-semibold text-white hover:bg-blue-700"
            >
              Open Google Console
            </a>
            <button
              onClick={() => {
                const panel = document.getElementById('oauth-config-panel')
                if (panel) panel.style.display = 'none'
              }}
              className="rounded bg-gray-600 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {isConfigured && (
        <div className="text-sm text-green-600 dark:text-green-400">
          <p>✅ This origin is configured for local development.</p>
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Google Sign-In should work on this URL.
          </p>
        </div>
      )}
    </div>
  )
}
