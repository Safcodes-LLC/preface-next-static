'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import Footer from '@/components/Footer/Footer'
import Header2 from '@/components/Header/Header2'
import SocialSidebar from '@/components/SocialSidebar'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import { TNavigationItem, getNavigation as fetchNavigation } from '@/data/navigation'
import { TPost, getAllPosts } from '@/data/posts'
import Navbar2 from '@/shared/Navbar2'
import { Noto_Kufi_Arabic, Noto_Serif } from 'next/font/google'
import { usePathname } from 'next/navigation'

interface Props {
  children: ReactNode
  headerHasBorder?: boolean
  headerStyle?: 'header-1' | 'header-2' | 'header-scroll' | 'header-3'
  showBanner?: boolean
  home?: boolean
}
const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const ApplicationLayout: React.FC<Props> = ({ children, home }) => {
  const pathname = usePathname()
  const [navigationMenu, setNavigationMenu] = useState<TNavigationItem[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<TPost[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')

  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage')
    if (storedLang) {
      setSelectedLanguage(storedLang)
    }
    // Fetch data on client side
    const fetchData = async () => {
      try {
        const [navData, postsData] = await Promise.all([fetchNavigation(selectedLanguage), getAllPosts()])
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
  const currentLang = pathname?.startsWith('/ar') || pathname?.startsWith('/ar/')
  return (
    <div className={currentLang ? notoKufiArabic.className : notoSerif.className}>
      {home ? null : (
        <div className="container">
          <Navbar2 lang={selectedLanguage} />
        </div>
      )}

      {home ? null : (
        <Header2
          isTransparentHeader={isTransparentHeader}
          navigationMenu={navigationMenu}
          featuredPosts={featuredPosts}
          className="sticky top-0 z-40 bg-white dark:bg-[#000000]"
          lang={selectedLanguage}
        />
      )}

      {children}

      <Footer lang={selectedLanguage} />

      <AsideSidebarNavigation />
      <SocialSidebar />
    </div>
  )
}

export { ApplicationLayout }
