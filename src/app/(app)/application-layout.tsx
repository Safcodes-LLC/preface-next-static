'use client'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Header2 from '@/components/Header/Header2'
import Header2WithScroll from '@/components/Header/Header2WithScroll'
import Header3 from '@/components/Header/Header3'
import SocialSidebar from '@/components/SocialSidebar'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import Navbar2 from '@/shared/Navbar2'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  headerHasBorder?: boolean
  headerStyle?: 'header-1' | 'header-2' | 'header-scroll' | 'header-3'
  showBanner?: boolean
}

const ApplicationLayout: React.FC<Props> = ({
  children,
  headerHasBorder,
  headerStyle = 'header-2',
  showBanner = false,
}) => {
  const pathname = usePathname()

  // Check if current page should hide Navbar2 and use header-scroll
  const isSpecialPage = pathname === '/' || pathname === '/visuals' || pathname.startsWith('/video/')

  // Determine which header to show
  const finalHeaderStyle = isSpecialPage ? 'header-scroll' : headerStyle

  // Show Navbar2 and Header2 only when NOT on special pages
  const showNavbar2AndHeader2 = !isSpecialPage && finalHeaderStyle === 'header-2'

  return (
    <>
      {/* header - Chose header style here / header 1 or header 2*/}
      {/* {showBanner && <Banner />} */}

      {/* Navbar2 - only show when not on homepage, visuals, or video individual pages */}
      {showNavbar2AndHeader2 && (
        <div className="container">
          <Navbar2 />
        </div>
      )}

      {/* Headers based on page type and headerStyle */}
      {finalHeaderStyle === 'header-scroll' && <Header2WithScroll bottomBorder={headerHasBorder} />}
      {finalHeaderStyle === 'header-3' && <Header3 bottomBorder={headerHasBorder} />}
      {showNavbar2AndHeader2 && <Header2 bottomBorder={headerHasBorder} />}
      {finalHeaderStyle === 'header-1' && <Header bottomBorder={headerHasBorder} />}

      {children}

      {/* footer - Chose footer style here / footer 1 or footer 2 or footer 3 or footer 4 */}
      <Footer />
      {/* aside sidebar navigation */}
      <AsideSidebarNavigation />
      {/* social media sidebar */}
      <SocialSidebar />
    </>
  )
}

export { ApplicationLayout }
