'use client'

import Footer from '@/components/Footer/Footer'
import Header2 from '@/components/Header/Header2'
import Header2WithScroll from '@/components/Header/Header2WithScroll'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import React, { ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
  headerHasBorder?: boolean
}

const ApplicationLayoutWithVideo: React.FC<Props> = ({
  children,
  headerHasBorder,
}) => {
   const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage')
    if (storedLang) {
      setSelectedLanguage(storedLang)
    }
  }, [])
  return (
    <>
      {/* Fixed header with scroll-based transparency */}
      {/* <Header2/> */}
      <Header2WithScroll bottomBorder={headerHasBorder} />

      {/* Main content */}
      {children}

      {/* footer - Chose footer style here / footer 1 or footer 2 or footer 3 or footer 4 */}
      <Footer lang={selectedLanguage}/>
      {/* aside sidebar navigation */}
      <AsideSidebarNavigation />
    </>
  )
}

export { ApplicationLayoutWithVideo } 