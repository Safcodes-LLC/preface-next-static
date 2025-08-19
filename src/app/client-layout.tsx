'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import ThemeProvider from './theme-provider'
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
        <ThemeProvider forceDarkMode={isForcedDarkMode}>
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
