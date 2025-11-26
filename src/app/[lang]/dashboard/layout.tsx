import { ReactNode } from 'react'
import DashboardLayoutClient from './_components/DashboardLayoutClient'

export default function Layout({ children, params }: { children: ReactNode; params: { lang: string } }) {
  return <DashboardLayoutClient lang={params.lang}>{children}</DashboardLayoutClient>
}
