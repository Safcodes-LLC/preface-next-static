// import { ApplicationLayout } from '@/app/[lang]/application-layout'
// import { ApplicationLayoutWithVideo } from '@/app/[lang]/application-layout-with-video'
import { ReactNode } from 'react'
import { ApplicationLayout } from '@/app/[lang]/application-layout'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return <ApplicationLayout headerHasBorder home>{children}</ApplicationLayout>
  // return <ApplicationLayoutWithVideo headerHasBorder>{children}</ApplicationLayoutWithVideo>

}

export default Layout
