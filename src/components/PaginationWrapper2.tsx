'use client'

import { Pagination, PaginationNext, PaginationPrevious } from '@/shared/Pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useMemo } from 'react'

interface Props {
  totalPages?: number
  className?: string
  post?: any
  posts?: any
}

function PaginationComponent({ totalPages = 10, className, post, posts }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // Memoize the current index to prevent unnecessary recalculations
  const { currentIndex, hasNext, hasPrevious } = useMemo(() => {
    const index = posts.findIndex((p: any) => p.slug === post?.slug)
    return {
      currentIndex: index,
      hasNext: index < posts.length - 1,
      hasPrevious: index > 0
    }
  }, [post?.slug, posts])
  // console.log(post,"post continuos read");
  console.log(posts, 'continuosRead abcd')

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  // const currentPage = Number(searchParams.get('page')) || 1
  // for demo purpose, we set currentPage to 2
  const currentPage = 2

  // Generate the URL for a specific article index
  const getArticlePath = (index: number) => {
    if (index < 0 || index >= posts.length) return null
    const targetPost = posts[index]
    if (!targetPost) return null

    // Format: /:lang/:category/:subcategory/:article
    const parts = pathname.split('/')
    parts[parts.length - 1] = targetPost.slug
    return parts.join('/')
  }

  // Show nothing if no posts or invalid current post
  if (!post || !posts.length || currentIndex === -1) {
    return null
  }

  return (
    <div className="w-full">
      <Pagination className="!flex !justify-start gap-4">
        <PaginationPrevious
          className="!grow-0 !basis-auto"
          // href={currentPage > 1 ? pathname + '?' + createQueryString('page', (currentPage - 1).toString()) : null}
          href={hasPrevious ? getArticlePath(currentIndex - 1) : null}
        />
        <PaginationNext
          className="!grow-0 !basis-auto"
          // href={
          //   currentPage < totalPages ? pathname + '?' + createQueryString('page', (currentPage + 1).toString()) : null
          // }
          href={hasNext ? getArticlePath(currentIndex + 1) : null}
          postId={post?._id}
        />
      </Pagination>
    </div>
  )
}

export default function PaginationWrapper2(props: Props) {
  return (
    <Suspense>
      <PaginationComponent {...props} />
    </Suspense>
  )
}
