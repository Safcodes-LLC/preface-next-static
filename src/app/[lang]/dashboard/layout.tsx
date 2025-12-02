import { getDictionary } from '@/i18n'
import { ReactNode } from 'react'
import DashboardLayoutClient from './_components/DashboardLayoutClient'

export default async function Layout({ children, params }: { children: ReactNode; params: { lang: string } }) {
  const dict = await getDictionary((await params).lang)
  
  console.log(dict, "dictionary checking...");
  
  return (
    <DashboardLayoutClient lang={params.lang} dict={dict}>
      {children}
    </DashboardLayoutClient>
  )
}
