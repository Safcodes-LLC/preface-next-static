import { TNavigationItem } from '@/data/navigation'
import { TPost } from '@/data/posts'
import { Button } from '@/shared/Button'
import Logo from '@/shared/Logo'
import { ChatBubbleLeftRightIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import AvatarDropdown from './AvatarDropdown'
import HamburgerBtnMenu from './HamburgerBtnMenu'
import Navigation from './Navigation/Navigation'
import SearchModal from './SearchModal'

interface Props {
  bottomBorder?: boolean
  className?: string
  isTransparentHeader?: boolean
}

interface Header2Props extends Props {
  navigationMenu: TNavigationItem[]
  featuredPosts: TPost[]
}

const Header2: FC<Header2Props> = ({ 
  bottomBorder, 
  className, 
  navigationMenu, 
  featuredPosts, 
  isTransparentHeader = false 
}) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Only add scroll listener if this is a transparent header page
    if (!isTransparentHeader) return

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop >= 50)
    }

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Check initial scroll position
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isTransparentHeader])

  // Determine if header should be transparent
  const shouldBeTransparent = isTransparentHeader && !isScrolled

  return (
    <div
      className={clsx(
        'header-2 transition-all duration-100',
        // Dynamic positioning and z-index
        shouldBeTransparent ? 'absolute z-10 w-full pt-2' : 'sticky z-20 top-0',
        shouldBeTransparent 
          ? 'bg-transparent backdrop-blur-none' 
          : 'bg-white dark:bg-[#0A0A0A] backdrop-blur-sm',
        className
      )}
    >
      <div className="container flex h-20 justify-between">
        <div className="flex flex-1 items-center gap-x-4 sm:gap-x-5 lg:gap-x-7">
          <Logo />
        </div>

        <div className="mx-4 hidden flex-2 justify-center lg:flex">
          <div className="flex items-center gap-x-2">
            <Navigation menu={navigationMenu} featuredPosts={featuredPosts} />
            <Link
              href="/ask-the-scholar"
              className={clsx(
                "flex min-w-[155px] items-center gap-2 rounded-sm border px-5 py-2 text-sm font-medium transition-all duration-200 focus:outline-none hover:shadow-sm",
                shouldBeTransparent
                  ? "border-white/20 text-white hover:border-white/40 hover:bg-white/10"
                  : "border-[#EEEEEE] dark:border-[#777777] text-neutral-900 dark:text-white"
              )}
              aria-label="Ask the Scholar"
              style={{ marginTop: 0 }}
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" aria-hidden="true" />
              <span className="whitespace-nowrap">Ask the Scholar</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-1">
          <div className="hidden sm:block">
            <Button
              className={clsx(
                "h-8 !px-4 transition-all duration-200",
                shouldBeTransparent
                  ? "!border-white/40 !text-white hover:!border-[#60A43A] hover:!bg-[#60A43A] hover:text-white"
                  : "!border-[#60A43A] dark:hover:!border-[#60A43A] hover:!bg-[#60A43A] hover:text-white dark:hover:!text-white"
              )}
              href={'/login'}
              color="logooutline"
            >
              Sign in
            </Button>
          </div>
          <SearchModal type="type1" />
          <AvatarDropdown
            trigger={
              <button
                type="button"
                aria-label="Settings"
                className="flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 focus:ring-2 focus:outline-none"
              >
                <Cog6ToothIcon
                  className={clsx(
                    'h-6 w-6 transition-colors duration-200',
                    shouldBeTransparent 
                      ? 'text-white' 
                      : 'text-black dark:text-white'
                  )}
                  aria-hidden="true"
                />
              </button>
            }
          />
          <div className="ms-2 flex lg:hidden">
            <HamburgerBtnMenu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header2