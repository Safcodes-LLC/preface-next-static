'use client'

import Card24 from '@/components/PostCards/Card24'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { useAuth } from '@/contexts/AuthContext'
import { getSavedList } from '@/utils/getServices'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  lang: string
}

const SavedList = ({ lang }: Props) => {
  const { user } = useAuth()
  const [savedPosts, setSavedPosts] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState<number>(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)

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
      if (!user?._id) return

      try {
        const savedResponse = await getSavedList(user._id, lang || 'en')
        if (savedResponse?.data) {
          setSavedPosts(savedResponse.data)
          // If initial load has less than visible count, mark as all loaded
          if (savedResponse.data.length <= visibleCount) {
            setAllPostsLoaded(true)
          }
        }
      } catch (err) {
        console.error('Error fetching saved posts:', err)
      }
    }

    fetchSavedPosts()
  }, [user?._id, lang, visibleCount])

  return (
    <div>
      <div className="sticky top-0 left-0 z-10 mb-[24px] flex items-center justify-between bg-[#f8f8f8] pb-[10px] dark:bg-black">
        <Link
          href={`/${lang}/dashboard/ask-the-scholar`}
          className="cursor-pointer rounded-[6px] bg-gray-400 px-4 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 hover:bg-gray-500"
        >
          My Saved Articles
        </Link>
      </div>

      {savedPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {savedPosts.slice(0, visibleCount).map((item) => (
            <Card24
              key={item._id}
              lang={lang}
              title={item.postId?.title}
              category={item.postId?.categories?.[0]?.name || 'Uncategorized'}
              thumbnail={item.postId?.thumbnail || '/images/placeholder-image.png'}
            />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-gray-500 dark:text-gray-400">No saved articles found.</p>
      )}

      {savedPosts.length > visibleCount && (
        <div className="mt-8 flex justify-center">
          <ButtonSecondary
            onClick={handleLoadMore}
            disabled={isLoadingMore || allPostsLoaded}
            className={`flex items-center ${(isLoadingMore || allPostsLoaded) ? 'opacity-70 cursor-not-allowed' : ''}`}
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

export default SavedList
