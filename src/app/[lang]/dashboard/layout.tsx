import { getDictionary } from '@/i18n'
import { ReactNode } from 'react'
import DashboardLayoutClient from './_components/DashboardLayoutClient'

export default async function Layout({ children, params }: { children: ReactNode; params: any }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <DashboardLayoutClient lang={lang} dict={dict}>
      {children}
    </DashboardLayoutClient>
  )
}
