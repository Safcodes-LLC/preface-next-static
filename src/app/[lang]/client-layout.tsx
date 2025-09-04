 
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import {  Noto_Serif } from 'next/font/google'  
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/contexts/AuthContext'
import QueryProvider from '@/providers/query-provider'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
// const notoKufiArabic = Noto_Kufi_Arabic({
//   subsets: ['latin'],
//   display: 'swap',
//   weight: ['400', '500', '600', '700'],
// })

// const FORCE_DARK_PATHS = ['/visuals', '/video']

export default async function ClientLayout({ children }: { children: ReactNode;  }) { 
 

  return (
    <html
      lang="en"
      className={notoSerif.className}
      suppressHydrationWarning
    >
      <body className={`bg-[#F8F8F8] text-base text-neutral-900 dark:bg-[#000000] dark:text-neutral-200`}>
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
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
