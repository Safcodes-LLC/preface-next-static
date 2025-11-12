'use client'

import { useAuth } from '@/contexts/AuthContext'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { getSavedList } from '@/utils/getServices'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import FavouriteCard from './FavouriteCard'

type Props = {
  lang: string
}

const FavouriteList = ({ lang }: Props) => {
  const { user } = useAuth()
  const [savedPosts, setSavedPosts] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState<number>(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load more posts
  const handleLoadMore = () => {
    if (isLoadingMore || allPostsLoaded) return

    setIsLoadingMore(true)
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 8
      if (newCount >= savedPosts.length) {
        setAllPostsLoaded(true)
      }
      return newCount
    })
    setIsLoadingMore(false)
  }

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setIsLoading(true)

      if (!user?._id) {
        setSavedPosts([])
        setIsLoading(false)
        return
      }

      try {
        const savedResponse = await getSavedList(user._id, lang || 'en')
        if (savedResponse?.data) {
          setSavedPosts(savedResponse.data)
          // If initial load has less than visible count, mark as all loaded
          if (savedResponse.data.length <= visibleCount) {
            setAllPostsLoaded(true)
          }
        } else {
          setSavedPosts([])
        }
      } catch (err) {
        console.error('Error fetching saved posts:', err)
        setSavedPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedPosts()
  }, [user?._id, lang])

  return (
    <div>
      <div className="sticky top-0 left-0 z-10 mb-[24px] flex items-center justify-between bg-[#f8f8f8] pb-[10px] dark:bg-black">
        <Link
          href="/"
          className="cursor-pointer rounded-[6px] bg-gray-400 px-4 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 hover:bg-gray-500"
        >
          My Favourite Articles
        </Link>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {savedPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {savedPosts.slice(0, visibleCount).map((item) => (
                <FavouriteCard key={item._id} lang={lang} post={item.postId} />
              ))}
            </div>
          ) : !isLoading && user?._id ? (
            <p className="py-8 text-center text-gray-500 dark:text-gray-400">No saved articles found.</p>
          ) : null}
        </>
      )}

      {savedPosts.length > visibleCount && (
        <div className="mt-8 flex justify-center">
          <ButtonSecondary
            onClick={handleLoadMore}
            disabled={isLoadingMore || allPostsLoaded}
            className={`flex items-center ${isLoadingMore || allPostsLoaded ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            {isLoadingMore ? (
              'Loading...'
            ) : allPostsLoaded ? (
              'No More Posts'
            ) : (
              <>
                Load More <ArrowDownIcon className="ml-2 h-5 w-5" />
              </>
            )}
          </ButtonSecondary>
        </div>
      )}
    </div>
  )
}

export default FavouriteList
