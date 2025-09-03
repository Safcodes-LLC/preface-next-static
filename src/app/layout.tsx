import '@/styles/tailwind.css'
import { Metadata } from 'next'
import ClientLayout from './[lang]/client-layout'

export const metadata: Metadata = {
  title: {
    template: '%s - Ncmaz',
    default: 'Ncmaz - Blog, News, Magazine template',
  },
  description: 'Ncmaz - Blog, News, Magazine template',
  keywords: ['Ncmaz', 'Blog', 'News', 'Magazine'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}