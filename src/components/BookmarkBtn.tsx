'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Bookmark02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { FC, useState } from 'react'
import AuthRequiredModal from './ui/AuthRequiredModal'
import LoginModal from './ui/LoginModal'

interface Props {
  className?: string
  bookmarked?: boolean
  color?: string
}

const BookmarkBtn: FC<Props> = ({ className, bookmarked, color }) => {
  const { isAuthenticated } = useAuth()
  const [isBookmarked, setIsBookmarked] = useState(bookmarked)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Default color classes
  const defaultClasses =
    'relative flex size-5 cursor-pointer px-1 items-center justify-center rounded-full bg-neutral-50 transition-colors duration-300 hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20'

  const handleBookmarkClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    setIsBookmarked(!isBookmarked)
    // TODO: Add API call to save the bookmark status
  }

  return (
    <>
      <button
        className={clsx(color ? color : defaultClasses, className)}
        title={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
        onClick={handleBookmarkClick}
        type="button"
      >
        <HugeiconsIcon icon={Bookmark02Icon} size={16} strokeWidth={1} fill={isBookmarked ? 'currentColor' : 'none'} />
      </button>

      <LoginModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={() => setShowAuthModal(false)}
        redirectPath="/"
      />
    </>
  )
}

export default BookmarkBtn
