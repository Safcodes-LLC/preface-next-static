import { ApplicationLayout } from '@/app/[lang]/application-layout'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return <ApplicationLayout headerHasBorder>{children}</ApplicationLayout>
}

export default Layout
