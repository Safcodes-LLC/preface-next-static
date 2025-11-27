'use client'

import { Menu01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { useAside } from '../aside'

const HamburgerBtnMenu = ({ className, home, isTransparentHeader }: { className?: string, home?: boolean, isTransparentHeader?: boolean }) => {
  const { open: openAside } = useAside()

  return (
    <button
      type="button"
      onClick={() => openAside('sidebar-navigation')}
      className={clsx(
        '-m-2.5 flex cursor-pointer items-center justify-center rounded-full p-2.5 hover:bg-neutral-100 focus-visible:outline-0 dark:hover:bg-neutral-700',
        className
      )}
    >
      <span className="sr-only">Open main menu</span>
      <HugeiconsIcon 
        icon={Menu01Icon} 
        size={24} 
        color="currentColor" 
        strokeWidth={1.5} 
        className={
          clsx(
            'transition-colors duration-100',
            home
              ? isTransparentHeader
                ? 'text-[#fff] dark:text-[#fff]'
                : 'text-[#000000] dark:text-white'
              : 'text-[#000000] dark:text-white'
          )
        }
      />
    </button>
  )
}

export default HamburgerBtnMenu
