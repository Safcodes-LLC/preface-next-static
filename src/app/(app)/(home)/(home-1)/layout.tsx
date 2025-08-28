import { ApplicationLayout } from '@/app/(app)/application-layout'
// import { ApplicationLayoutWithVideo } from '@/app/(app)/application-layout-with-video'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return <ApplicationLayout headerHasBorder home>{children}</ApplicationLayout>
  // return <ApplicationLayoutWithVideo headerHasBorder>{children}</ApplicationLayoutWithVideo>

}

export default Layout
