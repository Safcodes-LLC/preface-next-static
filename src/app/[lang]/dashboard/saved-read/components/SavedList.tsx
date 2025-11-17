'use client'

import Card24 from '@/components/PostCards/Card24'
import { useAuth } from '@/contexts/AuthContext'
import { getAuthToken } from '@/services/authService'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { getSavedArticlesList } from '@/utils/getServices'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

type Props = {
  lang: string
}

const SavedList = ({ lang }: Props) => {
  const { user } = useAuth()
  const token = getAuthToken() || ''

  const [savedPosts, setSavedPosts] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState<number>(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isPostType, setNowPostType] = useState('66d9d564987787d3e3ff1312')
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

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
      setIsTransitioning(true)
      // Reset pagination when post type changes
      setVisibleCount(12)
      setAllPostsLoaded(false)

      if (!token) {
        setSavedPosts([])
        setIsLoading(false)
        setIsTransitioning(false)
        return
      }

      try {
        const savedResponse = await getSavedArticlesList(isPostType, lang, token)
        if (savedResponse?.data) {
          setSavedPosts(savedResponse.data)
          // If initial load has less than visible count, mark as all loaded
          if (savedResponse.data.length <= 12) {
            setAllPostsLoaded(true)
          }
        } else {
          setSavedPosts([])
        }
      } catch (err) {
        console.error('Error fetching saved posts:', err)
        setSavedPosts([])
      } finally {
        // Add small delay for smooth transition
        setTimeout(() => {
          setIsLoading(false)
          setIsTransitioning(false)
        }, 300)
      }
    }

    fetchSavedPosts()
  }, [token, isPostType, lang])

  return (
    <div>
      <div className="max sticky top-0 left-0 z-10 mb-[24px] flex items-center justify-start gap-[10px] bg-[#f8f8f8] pb-[10px] max-md:flex-wrap dark:bg-black">
        <button
          onClick={() => {
            setNowPostType('66d9d564987787d3e3ff1312')
          }}
          disabled={isTransitioning}
          className={`relative cursor-pointer rounded-[6px] px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            isPostType === '66d9d564987787d3e3ff1312'
              ? 'bg-[#00652E] text-[#FFFFFF] hover:bg-[#004d24]'
              : 'bg-gray-200 text-[#2a2a2a] hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
          } ${isTransitioning ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          {isTransitioning && isPostType === '66d9d564987787d3e3ff1312' && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            </span>
          )}
          <span className={isTransitioning && isPostType === '66d9d564987787d3e3ff1312' ? 'invisible' : ''}>
            My Saved Articles
          </span>
        </button>
        <button
          onClick={() => {
            setNowPostType('66d9d564987787d3e3ff1314')
          }}
          disabled={isTransitioning}
          className={`relative cursor-pointer rounded-[6px] px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            isPostType === '66d9d564987787d3e3ff1314'
              ? 'bg-[#00652E] text-[#FFFFFF] hover:bg-[#004d24]'
              : 'bg-gray-200 text-[#2a2a2a] hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
          } ${isTransitioning ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          {isTransitioning && isPostType === '66d9d564987787d3e3ff1314' && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            </span>
          )}
          <span className={isTransitioning && isPostType === '66d9d564987787d3e3ff1314' ? 'invisible' : ''}>
            My Saved Videos
          </span>
        </button>
      </div>

      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-100' : 'opacity-100'}`}>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00652E] border-t-transparent"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading saved items...</p>
            </div>
          </div>
        ) : (
          <>
            {savedPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {savedPosts.slice(0, visibleCount).map((item, index) => (
                  <div key={item._id} className="animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
                    <Card24
                      lang={lang}
                      title={item.post?.title}
                      category={item.post?.categories?.[0]?.name || 'Uncategorized'}
                      thumbnail={item.post?.thumbnail || '/images/placeholder-image.png'}
                    />
                  </div>
                ))}
              </div>
            ) : !isLoading && user?._id ? (
              <p className="py-8 text-center text-gray-500 dark:text-gray-400">
                No saved {isPostType === '66d9d564987787d3e3ff1312' ? 'articles' : 'videos'} found.
              </p>
            ) : null}
          </>
        )}
      </div>

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

export default SavedList
