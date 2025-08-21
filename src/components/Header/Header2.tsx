import { TNavigationItem } from '@/data/navigation'
import { TPost } from '@/data/posts'
import { Button } from '@/shared/Button'
import Logo from '@/shared/Logo'
import { ChatBubbleLeftRightIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
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

const Header2: FC<Header2Props> = ({ bottomBorder, className, navigationMenu, featuredPosts, isTransparentHeader }) => {

  return (
    <div
      className={clsx(
        'header-2 sticky top-0 z-20  bg-white  dark:bg-[#0A0A0A]',
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
              className="flex min-w-[155px] items-center gap-2 rounded-sm border border-[#EEEEEE] dark:border-[#777777] px-5 py-2 text-sm font-medium text-neutral-900 transition-all duration-200 focus:outline-none dark:text-white hover:shadow-sm"
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
              className="h-8 !border-[#60A43A] !px-4 dark:hover:!border-[#60A43A] hover:!bg-[#60A43A] hover:text-white dark:hover:!text-white"
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
                  className={clsx('h-6 w-6 text-black dark:text-white transition-colors duration-200')}
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
