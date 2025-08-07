import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Header2 from '@/components/Header/Header2'
import Header2WithScroll from '@/components/Header/Header2WithScroll'
import Header3 from '@/components/Header/Header3'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import Banner from '@/shared/banner'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  headerHasBorder?: boolean
  headerStyle?: 'header-1' | 'header-2'
  showBanner?: boolean
}

const ApplicationLayout: React.FC<Props> = ({
  children,
  headerHasBorder,
  headerStyle = 'header-scroll',
  showBanner = false,
}) => {
  return (
    <>
      {/* header - Chose header style here / header 1 or header 2*/}
      {showBanner && <Banner />}
      {headerStyle === 'header-scroll' && <Header2WithScroll bottomBorder={headerHasBorder} /> }
      {headerStyle === 'header-3' && <Header3 bottomBorder={headerHasBorder} />}
      {headerStyle === 'header-2' && <Header2 bottomBorder={headerHasBorder} />}
      {headerStyle === 'header-1' && <Header bottomBorder={headerHasBorder} />}

      {children}

      {/* footer - Chose footer style here / footer 1 or footer 2 or footer 3 or footer 4 */}
      <Footer />
      {/* aside sidebar navigation */}
      <AsideSidebarNavigation />
    </>
  )
}

export { ApplicationLayout }
