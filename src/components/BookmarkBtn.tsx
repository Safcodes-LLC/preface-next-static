'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useGetUserSaved, useRemoveSaved, useSaved } from '@/hooks/api/use-saved'
import { Bookmark02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
// import AuthRequiredModal from './ui/AuthRequiredModal'
import toast from 'react-hot-toast'
import LoginModal from './ui/LoginModal'

interface Props {
  className?: string
  bookmarked?: boolean
  color?: string
  post?: any
}

type Saved = {
  postId: {
    _id: string
  }
  // Add other properties from your favorite object if needed
}

const BookmarkBtn: FC<Props> = ({ className, bookmarked, color, post }) => {
  const { isAuthenticated, user } = useAuth()
  const [isBookmarked, setIsBookmarked] = useState(bookmarked)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { mutate: toggleSaved } = useSaved()
  const { data } = useGetUserSaved()
  const removeSaved = useRemoveSaved()
  const userSaved = data?.savedlist

  // Update liked state based on user's favorites
  useEffect(() => {
    if (userSaved && post?._id) {
      const isPostLiked = userSaved.some((saved: any) => saved.postId?._id === post._id)
      setIsBookmarked(isPostLiked)
    }
  }, [userSaved, post?._id])

  // Default color classes
  const defaultClasses =
    'relative flex size-5 cursor-pointer px-1 items-center justify-center rounded-full bg-neutral-50 transition-colors duration-300 hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20'

  const handleBookmarkClick = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    if (!post?._id || !user?._id) return

    const newSavedState = !isBookmarked
    // Optimistic update
    setIsBookmarked(newSavedState)

    // TODO: Add API call to save the bookmark status
    try {
      if (newSavedState) {
        await toggleSaved({
          userId: user._id,
          postId: post._id,
          postType: post.postType?._id,
        })
      } else {
        await removeSaved.mutateAsync({
          userId: user._id,
          postId: post._id,
        })
      }
    } catch (error) {
      console.log(error)
      setIsBookmarked(!newSavedState)
      toast.error(`Failed to ${newSavedState ? 'add to' : 'remove from'} reading list`)
    }
  }

  return (
    <>
      <button
        className={clsx(color ? color : defaultClasses, className)}
        title={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
        onClick={handleBookmarkClick}
        type="button"
      >
        <HugeiconsIcon 
          icon={Bookmark02Icon} 
          size={16} 
          strokeWidth={1} 
          fill={isBookmarked && isAuthenticated ? 'currentColor' : 'none'}
        />
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
