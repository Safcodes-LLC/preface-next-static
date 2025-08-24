'use client'

import { FC } from 'react'
import SectionSliderPosts from './SectionSliderPosts'
import { HeadingWithSubProps } from '@/shared/Heading'
import { usePopularArticles, type Post } from '@/hooks/api'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  heading?: string
  postCardName?: 'card4' | 'card7' | 'card9' | 'card10' | 'card10V2' | 'card11' | 'card10V5' | 'card16Podcast'
  subcategorySlug?: string
  parentSlug?: string
  limit?: number
}

const ClientSectionSliderPosts: FC<Props> = ({ 
  subcategorySlug, 
  parentSlug, 
  limit = 6, 
  ...props 
}) => {
  const { data: popularArticles, isLoading, error } = usePopularArticles({
    subcategorySlug,
    parentSlug,
    limit
  })

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">Error loading popular articles</div>
  }

  const posts = popularArticles?.data || []

  // Type assertion to convert Post[] to TPost[]
  return <SectionSliderPosts {...props} posts={posts as unknown as any[]} />
}

export default ClientSectionSliderPosts

