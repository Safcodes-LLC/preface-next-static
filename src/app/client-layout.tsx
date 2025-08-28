'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from './theme-provider'
import QueryProvider from '@/providers/query-provider'
import { Noto_Serif } from 'next/font/google'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const FORCE_DARK_PATHS = ['/visuals', '/video']

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isForcedDarkMode = FORCE_DARK_PATHS.some(path => 
    pathname?.startsWith(path)
  )
  
  return (
    <html lang="en" className={notoSerif.className}>
      <body className={`bg-[#F8F8F8] text-base text-neutral-900 dark:bg-[#000000] dark:text-neutral-200 ${
        isForcedDarkMode ? 'dark' : ''
      }`}>
        <QueryProvider>
          <ThemeProvider forceDarkMode={isForcedDarkMode}>
            <div>{children}</div>
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: 'var(--color-bg-elevated)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  padding: '16px',
                  fontSize: '14px',
                  maxWidth: '500px',
                  width: 'auto',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: 'white',
                  },
                },
                error: {
                  style: {
                    background: '#FEF2F2',
                    color: '#B91C1C',
                    border: '1px solid #FECACA',
                  },
                  iconTheme: {
                    primary: '#DC2626',
                    secondary: 'white',
                  },
                },
              }}
            />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
