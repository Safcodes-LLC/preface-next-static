import '@/styles/tailwind.css'
import { Metadata } from 'next'
import { Noto_Serif } from 'next/font/google'
import ThemeProvider from './theme-provider'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'], // Adjust as needed
})

export const metadata: Metadata = {
  title: {
    template: '%s - Ncmaz',
    default: 'Ncmaz - Blog, News, Magazine template',
  },
  description: 'Ncmaz - Blog, News, Magazine template',
  keywords: ['Ncmaz', 'Blog', 'News', 'Magazine'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={notoSerif.className}>
      <body className="bg-[#F8F8F8] text-base text-neutral-900 dark:bg-[#000000] dark:text-neutral-200">
        <ThemeProvider>
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}