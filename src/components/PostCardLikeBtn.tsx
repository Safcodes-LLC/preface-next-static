'use client'

import { useAuth } from '@/contexts/AuthContext'
import convertNumbThousand from '@/utils/convertNumbThousand'
import { HeartIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import LoginModal from './ui/LoginModal'

interface Props {
  className?: string
  likeCount: number
  liked?: boolean
  color?: string
  post?: any
  iconsize?: string
}

type Favorite = {
  postId: {
    _id: string
  }
  // Add other properties from your favorite object if needed
}

const PostCardLikeBtn: FC<Props> = ({ className, color, post, iconsize }) => {
  const { isAuthenticated, user } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  const [count, setCount] = useState<number>(0)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // console.log('post', post.postType._id)
  // console.log('isAuthenticated', isAuthenticated)
  // console.log('user', user?._id)

  useEffect(() => {
    const controller = new AbortController()
    const fetchCount = async () => {
      try {
        const baseUrl = `https://king-prawn-app-x9z27.ondigitalocean.app/api/favourites/count/${post._id}`
        const url = isAuthenticated && user?._id ? `${baseUrl}?userId=${user._id}` : baseUrl
        const response = await fetch(url, { signal: controller.signal })
        const data = await response.json()
        setCount(data.favouriteCount ?? data.count ?? 0)
        setIsLiked(Boolean(data.isFavourite) && Boolean(isAuthenticated))
      } catch (error: any) {
        if (error?.name === 'AbortError' || error?.code === 20) {
          // fetch aborted during unmount or dependency change; ignore
          return
        }
        console.error('Error fetching count:', error)
      }
    }
    fetchCount()
    return () => controller.abort()
  }, [post._id, isAuthenticated, user?._id])

  const handleLike = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    try {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('authToken') || localStorage.getItem('authToken_backup')
          : null
      const response = await fetch(`https://king-prawn-app-x9z27.ondigitalocean.app/api/favourites/posts/${post._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token ?? ''}`,
        },
        body: JSON.stringify({ postType: post.postType._id }),
      })
      const data = await response.json()
      setIsLiked(data.isFavourite)
      setCount(data.favouriteCount)
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  // Default color classes
  const defaultClasses =
    'bg-neutral-50 hover:bg-rose-50 hover:text-rose-600 dark:bg-white/10 dark:hover:bg-white/10 dark:hover:bg-rose-400'
  // If color is provided, use it, otherwise use default classes
  const colorClasses = color ? color : defaultClasses

  return (
    <>
      <button
        className={clsx(
          'post-card-like-btn group flex h-5 cursor-pointer items-center rounded-full ps-1 pe-2 text-xs leading-none transition-colors',
          className,
          isLiked ? 'bg-[#D6F2E2] text-[#00652E]' : colorClasses
        )}
        title={isLiked ? 'Unlike' : 'Like'}
        onClick={handleLike}
      >
        <HeartIcon className={iconsize || 'size-3'} strokeWidth={1} fill={isLiked ? 'currentColor' : 'none'} />

        <span className={clsx('ms-1', isLiked && 'text-[#00652E]')}>{convertNumbThousand(count)}</span>
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

export default PostCardLikeBtn
