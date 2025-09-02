'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from './theme-provider'
import AuthProvider from '@/contexts/AuthContext'
import QueryProvider from '@/providers/query-provider'
import { Noto_Serif, Noto_Kufi_Arabic } from 'next/font/google'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const FORCE_DARK_PATHS = ['/visuals', '/video']

const storedLang = localStorage.getItem('selectedLanguage')
console.log("storedLang",storedLang)
// useEffect(() => {
  //     const currentLocale = getCurrentLocale()
  //     const lang = languages.find(lang => lang.code === currentLocale) || 
  //                 languages.find(lang => lang.code === defaultLocale) || 
  //                 languages[0]
  //     setSelectedLanguage(lang)
  //   }, [pathname, languages])
  
  export default function ClientLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    console.log("pathname",pathname) 
    const currentLang= pathname?.startsWith('/ar')||pathname?.startsWith('/ar/')
    const isForcedDarkMode = FORCE_DARK_PATHS.some(path => 
      pathname?.startsWith(path)
  )
  
  return (
    <html lang="en" className={currentLang ? notoKufiArabic.className : notoSerif.className}>
      <body className={`bg-[#F8F8F8] text-base text-neutral-900 dark:bg-[#000000] dark:text-neutral-200 ${
        isForcedDarkMode ? 'dark' : ''
      }`}>
        <AuthProvider>
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
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: 'white',
                    },
                  },
                }}
              />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
