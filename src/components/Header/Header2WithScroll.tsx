'use client'

import { getNavigation, TNavigationItem } from '@/data/navigation'
import { getAllPosts, TPost } from '@/data/posts'
import { Button } from '@/shared/Button'
import Logo from '@/shared/Logo'
import { PlusIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import HamburgerBtnMenu from './HamburgerBtnMenu'
import Navigation from './Navigation/Navigation'
import NotifyDropdown from './NotifyDropdown'
import SearchModal from './SearchModal'
import TopNavbar from './TopNavbar'
import AvatarDropdown from './AvatarDropdown'

interface Header2WithScrollProps {
  bottomBorder?: boolean
  className?: string
}

const Header2WithScroll: FC<Header2WithScrollProps> = ({ bottomBorder, className }) => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navigationMenu, setNavigationMenu] = useState<TNavigationItem[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<TPost[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 50)
    }

    // Set initial values
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Fetch data on client side
    const fetchData = async () => {
      try {
        const [navigationData, postsData] = await Promise.all([getNavigation(), getAllPosts()])
        setNavigationMenu(navigationData)
        setFeaturedPosts(postsData.slice(0, 2))
      } catch (error) {
        console.error('Error fetching header data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {/* Top Navbar */}
      <TopNavbar isScrolled={isScrolled} />
      
      {/* Main Header */}
      <div
        className={clsx(
          'header-2 fixed top-8 right-0 left-0 z-40 transition-all duration-300',
          isScrolled
            ? 'border-neutral-200 bg-white/95 text-neutral-900 backdrop-blur-sm dark:border-neutral-700 dark:bg-[#0A0A0A] dark:text-neutral-100'
            : 'border-transparent bg-transparent text-white',
          bottomBorder && 'border-b',
          !bottomBorder && 'has-[.header-popover-full-panel]:border-b',
          className
        )}
      >
        
        <div className="container flex h-20 justify-between">
        <div className="flex flex-1 items-center gap-x-4 sm:gap-x-5 lg:gap-x-7">
          <Logo />
          {/* <div
            className={clsx(
              'h-8 border-l',
              isScrolled ? 'border-neutral-200 dark:border-neutral-700' : 'border-white/20'
            )}
          ></div> */}
          {/* <div className="-ms-1.5">
            <SearchModal type="type1" />
          </div> */}
        </div>

        <div className="mx-4 hidden flex-2 justify-center lg:flex">
          <div className="flex items-center gap-x-2">
            <Navigation menu={navigationMenu} featuredPosts={featuredPosts} />
            <a
              href="/ask-the-scholar"
              className="flex items-center gap-2 border border-white bg-white/80 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-white px-5 py-2 rounded-sm shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-w-[155px] text-sm font-medium"
              aria-label="Ask the Scholar"
              style={{ marginTop: 0 }}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" aria-hidden="true" />
              <span className="whitespace-nowrap">Ask the Scholar</span>
            </a>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-0.5">
          <div className="hidden sm:block text-[#60A43A]">
            <Button className="h-10 px-3! " href={'/submission'} plain>
              {/* <PlusIcon className="size-5!" /> */}
              Sign in
            </Button>
          </div>
          {/* <NotifyDropdown className="me-3" /> */}
          <SearchModal type="type1" />
          <AvatarDropdown
            trigger={<button type="button" aria-label="Settings" className="ml-2 flex items-center cursor-pointer justify-center rounded-full p-2 focus:outline-none focus:ring-2 transition-all duration-200">
              <Cog6ToothIcon className="w-6 h-6 text-[#4A4A4A]" aria-hidden="true" />
            </button>}
          />
          <div className="ms-2 flex lg:hidden">
            <HamburgerBtnMenu />
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Header2WithScroll
