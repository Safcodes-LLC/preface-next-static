import { ReactNode } from 'react'
import DashboardLayoutClient from './_components/DashboardLayoutClient'

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}
