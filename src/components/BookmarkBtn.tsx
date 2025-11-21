'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useGetUserSaved, useRemoveSaved } from '@/hooks/api/use-saved'
import { getSavedArticleStatus, postSavedArticle } from '@/utils/getServices'
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
  const [isBookmarked, setIsBookmarked] = useState(bookmarked || false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { data } = useGetUserSaved()
  const removeSaved = useRemoveSaved()
  const userSaved = data?.savedlist

  // Fetch saved status on mount for authenticated users
  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (!isAuthenticated || !post?._id) {
        setIsBookmarked(false)
        return
      }

      const token =
        typeof window !== 'undefined' ? localStorage.getItem('authToken') || localStorage.getItem('token') || '' : ''

      if (!token) {
        setIsBookmarked(false)
        return
      }

      try {
        const response = await getSavedArticleStatus(post._id, token)
        // Check the correct response structure
        if (response?.data?.isSaved !== undefined) {
          setIsBookmarked(response.data.isSaved)
        } else if (response?.isSaved !== undefined) {
          setIsBookmarked(response.isSaved)
        } else {
          setIsBookmarked(false)
        }
      } catch (error) {
        console.error('Failed to fetch saved status:', error)
        setIsBookmarked(false)
      }
    }

    fetchSavedStatus()
  }, [isAuthenticated, post?._id])

  // Update liked state based on user's favorites (fallback)
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

    if (!post?._id) return

    // Prevent double-clicking
    if (isProcessing) return

    const token =
      typeof window !== 'undefined' ? localStorage.getItem('authToken') || localStorage.getItem('token') || '' : ''

    if (!token) {
      toast.error('Authentication token not found')
      return
    }

    const previousState = isBookmarked

    // Optimistic update
    setIsProcessing(true)
    setIsBookmarked(!previousState)

    try {
      // Use the new API function that toggles save/unsave
      const response = await postSavedArticle(post._id, token)

      // Verify the response and update state accordingly
      if (response?.data?.isSaved !== undefined) {
        setIsBookmarked(response.data.isSaved)
        // toast.success(response.data.isSaved ? 'Added to reading list' : 'Removed from reading list')
      } else if (response?.isSaved !== undefined) {
        setIsBookmarked(response.isSaved)
        // toast.success(response.isSaved ? 'Added to reading list' : 'Removed from reading list')
      } else {
        // Fallback to optimistic state
        // toast.success(!previousState ? 'Added to reading list' : 'Removed from reading list')
      }
    } catch (error) {
      console.error('Failed to toggle bookmark:', error)
      // Revert to previous state on error
      setIsBookmarked(previousState)
      toast.error(`Failed to ${!previousState ? 'add to' : 'remove from'} reading list`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <button
        className={clsx(
          color ? color : defaultClasses,
          className,
          'relative overflow-hidden transition-all duration-300',
          isProcessing ? 'scale-95' : 'scale-100'
        )}
        title={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
        onClick={handleBookmarkClick}
        disabled={isProcessing}
        type="button"
      >
        {isProcessing && (
          <>
            {/* Rotating ring animation */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70"></span>
            </span>
            {/* Pulse effect */}
            <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-20"></span>
          </>
        )}
        <span className={`transition-all duration-300 ${isProcessing ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}>
          <HugeiconsIcon
            icon={Bookmark02Icon}
            size={12}
            strokeWidth={1}
            fill={isBookmarked && isAuthenticated ? 'currentColor' : 'none'}
          />
        </span>
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
