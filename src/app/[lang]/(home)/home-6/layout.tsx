 
import { ReactNode } from 'react'
import { ApplicationLayout } from '@/app/[lang]/application-layout'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ApplicationLayout headerStyle="header-1" showBanner={true}>
      {children}
    </ApplicationLayout>
  )
}

export default Layout
