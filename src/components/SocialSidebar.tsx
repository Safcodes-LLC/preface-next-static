'use client'

import { Facebook02Icon, InstagramIcon, YoutubeIcon, Linkedin02Icon, SnapchatIcon, NewTwitterIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import React, { FC, useState } from 'react'

interface Props {
  className?: string
}

type SocialItem = {
  name: string
  href: string
  icon: any
  useHugeicons: boolean
  color: string
}

const socialItems: SocialItem[] = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/example',
    icon: InstagramIcon,
    useHugeicons: true,
    color: '#60A43A',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: Facebook02Icon,
    useHugeicons: true,
    color: '#60A43A',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@example',
    icon: YoutubeIcon,
    useHugeicons: true,
    color: '#60A43A',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/example',
    icon: Linkedin02Icon,
    useHugeicons: true,
    color: '#60A43A',
  },
  {
    name: 'Snapchat',
    href: 'https://www.snapchat.com/add/example',
    icon: SnapchatIcon,
    useHugeicons: true,
    color: '#60A43A',
  },
  // add x icon
  {
    name: 'X',
    href: 'https://www.x.com/',
    icon: NewTwitterIcon,
    useHugeicons: true,
    color: '#60A43A',
  },
]

const SocialSidebar: FC<Props> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleItems = isExpanded ? socialItems : socialItems.slice(0, 3)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={clsx('fixed top-1/2 right-0 z-50 -translate-y-1/2 transform', className)}>
      <div className="relative flex flex-col items-center space-y-2 rounded-l-lg p-3">
        {/* Top Vertical Line */}
        <div className="absolute top-[-60px] left-1/2 h-16 w-0.5 -translate-x-1/2 bg-[#60A43A]"></div>

        {/* Bottom Vertical Line */}
        <div className="absolute bottom-[-60px] left-1/2 h-14 w-0.5 -translate-x-1/2 bg-[#60A43A]"></div>

        {/* Social Media Icons */}
        {visibleItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#60A43A] text-white transition-opacity duration-200 hover:opacity-80"
            aria-label={`Follow us on ${item.name}`}
          >
            {item.useHugeicons ? (
              <HugeiconsIcon icon={item.icon} size={20} color="currentColor" />
            ) : (
              <div className="h-5 w-5">{React.createElement(item.icon)}</div>
            )}
          </Link>
        ))}

        {/* Toggle Button */}
        <button
          onClick={toggleExpanded}
          className="relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#D9D9D9] bg-transparent text-[#B3B3B3] transition-colors duration-200 hover:bg-white/10"
          aria-label={isExpanded ? 'Collapse social media bar' : 'Expand social media bar'}
        >
          <span className="text-lg font-bold">{isExpanded ? '×' : '+'}</span>
        </button>
      </div>
    </div>
  )
}

export default SocialSidebar
