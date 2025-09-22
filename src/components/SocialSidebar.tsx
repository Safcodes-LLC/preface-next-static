'use client'

import { Facebook01Icon, InstagramIcon, YoutubeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import React, { FC, useState } from 'react'

interface Props {
  className?: string
}

// Custom LinkedIn icon since it's not available in Hugeicons
const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
    <path
      d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z"
      fill="currentColor"
    />
    <path d="M6 9H2V21H6V9Z" fill="currentColor" />
    <path
      d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
      fill="currentColor"
    />
  </svg>
)

// Custom Snapchat ghost icon (monochrome, follows currentColor)
const SnapchatIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
  >
    {/* Simplified Snapchat ghost shape */}
    <path
      fill="currentColor"
      d="M12 3c-3.3 0-6 2.6-6 5.9 0 1.1.3 2 .7 2.7-.6.2-1.2.5-1.6.9-.3.3-.5.7-.5 1.1 0 .8.7 1.4 1.5 1.4.6 0 1.2-.2 1.7-.5.1.4.2.8.4 1.1.5.9 1.4 1.4 2.4 1.4.8 0 1.5-.3 2-.8.5.5 1.2.8 2 .8 1 0 1.9-.6 2.4-1.4.2-.3.3-.7.4-1.1.5.3 1.1.5 1.7.5.8 0 1.5-.6 1.5-1.4 0-.4-.2-.8-.5-1.1-.4-.4-1-.7-1.6-.9.4-.7.7-1.6.7-2.7C18 5.6 15.3 3 12 3zm-3.2 14.8c-.6 0-1.2.3-1.7.6-.3.2-.6.3-.9.3-.5 0-.9-.3-.9-.7 0-.4.3-.7.7-.8.9-.2 1.6-.6 2.2-1.2.1.4.3.8.5 1.1.2.3.4.5.7.7-.2.1-.4 0-.6 0zm9.9.9c-.3 0-.6-.1-.9-.3-.5-.3-1.1-.6-1.7-.6-.2 0-.4 0-.6 0 .3-.2.5-.4.7-.7.2-.3.4-.7.5-1.1.6.6 1.3 1 2.2 1.2.4.1.7.4.7.8 0 .4-.4.7-.9.7z"
    />
  </svg>
)

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
    icon: Facebook01Icon,
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
    icon: LinkedinIcon,
    useHugeicons: false,
    color: '#60A43A',
  },
  {
    name: 'Snapchat',
    href: 'https://www.snapchat.com/add/example',
    icon: SnapchatIcon,
    useHugeicons: false,
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
