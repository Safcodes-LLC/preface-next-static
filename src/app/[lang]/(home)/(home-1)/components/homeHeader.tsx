'use client'
import React, { useEffect, useState } from 'react'
import { TNavigationItem, getNavigation as fetchNavigation } from '@/data/navigation'
import { TPost, getAllPosts } from '@/data/posts'
import Navbar2 from '@/shared/Navbar2'
import Header2 from '@/components/Header/Header2'

const HomeHeader = ({lang}: {lang?: string}) => {
  const [navigationMenu, setNavigationMenu] = useState<TNavigationItem[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<TPost[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Always show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true)
        setScrolled(false)
        return
      }

      // Scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } 
      // Scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
      
      setScrolled(currentScrollY > 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <React.Fragment>
      <div className={`w-full fixed top-0 z-30 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container">
          <Navbar2 home={true} lang={lang}/>
        </div>
      </div>
      <Header2 
        className={`z-40 w-full transition-all duration-300 ${scrolled ? 'fixed top-0 bg-white dark:bg-black shadow-md' : 'fixed top-[60px]'}`} 
        isTransparentHeader={!scrolled} 
        navigationMenu={navigationMenu} 
        featuredPosts={featuredPosts} 
        home={true}
        lang={lang}
      />
    </React.Fragment>
  )
}

export default HomeHeader
