'use client'

import { getNavigation, TNavigationItem } from '@/data/navigation'
import { getAllPosts, TPost } from '@/data/posts'
import { Button } from '@/shared/Button'
import Logo from '@/shared/Logo'
import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import AvatarDropdown from './AvatarDropdown'
import HamburgerBtnMenu from './HamburgerBtnMenu'
import Navigation from './Navigation/Navigation'
import NotifyDropdown from './NotifyDropdown'
import SearchModal from './SearchModal'

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
        const [navigationData, postsData] = await Promise.all([
          getNavigation(),
          getAllPosts()
        ])
        setNavigationMenu(navigationData)
        setFeaturedPosts(postsData.slice(0, 2))
      } catch (error) {
        console.error('Error fetching header data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div
      className={clsx(
        'header-2 fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm border-neutral-200 dark:bg-neutral-900/95 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100' 
          : 'bg-transparent border-transparent text-white',
        bottomBorder && 'border-b',
        !bottomBorder && 'has-[.header-popover-full-panel]:border-b',
        className
      )}
    >
      <div className="container flex h-20 justify-between">
        <div className="flex flex-1 items-center gap-x-4 sm:gap-x-5 lg:gap-x-7">
          <Logo />
          <div className={clsx('h-8 border-l', isScrolled ? 'border-neutral-200 dark:border-neutral-700' : 'border-white/20')}></div>
          <div className="-ms-1.5">
            <SearchModal type="type1" />
          </div>
        </div>

        <div className="mx-4 hidden flex-2 justify-center lg:flex">
          <Navigation menu={navigationMenu} featuredPosts={featuredPosts} />
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-0.5">
          <div className="hidden sm:block">
            <Button className="h-10 px-3!" href={'/submission'} plain>
              <PlusIcon className="size-5!" />
              Create
            </Button>
          </div>
          <NotifyDropdown className="me-3" />
          <AvatarDropdown />
          <div className="ms-2 flex lg:hidden">
            <HamburgerBtnMenu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header2WithScroll 