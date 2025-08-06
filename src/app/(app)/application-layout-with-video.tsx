import Footer from '@/components/Footer/Footer'
import Header2 from '@/components/Header/Header2'
import Header2WithScroll from '@/components/Header/Header2WithScroll'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  headerHasBorder?: boolean
}

const ApplicationLayoutWithVideo: React.FC<Props> = ({
  children,
  headerHasBorder,
}) => {
  return (
    <>
      {/* Fixed header with scroll-based transparency */}
      {/* <Header2/> */}
      <Header2WithScroll bottomBorder={headerHasBorder} />

      {/* Main content */}
      {children}

      {/* footer - Chose footer style here / footer 1 or footer 2 or footer 3 or footer 4 */}
      <Footer />
      {/* aside sidebar navigation */}
      <AsideSidebarNavigation />
    </>
  )
}

export { ApplicationLayoutWithVideo } 