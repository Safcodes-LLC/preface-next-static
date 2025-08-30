import { ApplicationLayout } from '@/app/[lang]/application-layout'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ApplicationLayout headerStyle="header-1" showBanner={true} headerHasBorder>
      {children}
    </ApplicationLayout>
  )
}

export default Layout
