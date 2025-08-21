'use client'

import Footer from '@/components/Footer/Footer'
import Header2 from '@/components/Header/Header2'
import SocialSidebar from '@/components/SocialSidebar'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import { TNavigationItem, getNavigation as fetchNavigation } from '@/data/navigation'
import { TPost, getAllPosts } from '@/data/posts'
import Navbar2 from '@/shared/Navbar2'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
  headerHasBorder?: boolean
  headerStyle?: 'header-1' | 'header-2' | 'header-scroll' | 'header-3'
  showBanner?: boolean
}

const ApplicationLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname()
  const [navigationMenu, setNavigationMenu] = useState<TNavigationItem[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<TPost[]>([])

  useEffect(() => {
    // Fetch data on client side
    const fetchData = async () => {
      try {
        const [navData, postsData] = await Promise.all([fetchNavigation(), getAllPosts()])
        setNavigationMenu(navData)
        setFeaturedPosts(postsData.slice(0, 2))
      } catch (error) {
        console.error('Error fetching navigation or posts:', error)
      }
    }

    fetchData()
  }, [])

  // Check if current page should hide Navbar2 and use header-scroll
  const isTransparentHeader = pathname === '/' || pathname === '/visuals'

  return (
    <>
      <div className='relative'>
        <Navbar2 isTransparentHeader={isTransparentHeader} />
      </div>

   {/* Header2 - adjust top padding when transparent to account for Navbar2 */}
   <Header2
        isTransparentHeader={isTransparentHeader}
        navigationMenu={navigationMenu}
        featuredPosts={featuredPosts}
        className={isTransparentHeader ? 'top-12' : 'top-0'} // Adjust for navbar height
      />

      {/* Main content */}
      <main className={isTransparentHeader ? 'relative' : undefined}>
        {children}
      </main>

      <Footer />

      <AsideSidebarNavigation />
      <SocialSidebar />
    </>
  )
}

export { ApplicationLayout }
