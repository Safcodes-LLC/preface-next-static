'use client'

import { useAuth } from '@/contexts/AuthContext'
import { HeadingWithSubProps } from '@/shared/Heading'
import { getContinuosReadByCategory } from '@/utils/getServices'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import Card23 from './PostCards/Card23'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  lang?: string
}

const SectionMagazine1: FC<Props> = ({ className, lang }) => {
  const [posts, setPosts] = useState<any[]>([])
  const { user } = useAuth()
  const postType = '66d9d564987787d3e3ff1312' // You can make this dynamic if needed

  // console.log(posts, 'posts')

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return

      try {
        const response = await getContinuosReadByCategory(user._id, lang || 'en', postType)
        if (response?.data && Array.isArray(response.data)) {
          setPosts(response.data)
        } else {
          console.warn('Unexpected API response format:', response)
        }
      } catch (error) {
        console.error('Error fetching continuous read posts:', error)
      }
    }

    fetchData()
  }, [user?._id, lang])

  // console.log(continuosRead?.data, 'continuosReadpost dashboard')

  return (
    <div className={clsx('section-magazine-1', className)}>
      {/* <SectionTabHeader
        subHeading={subHeading}
        dimHeading={dimHeading}
        heading={heading}
        tabActive="Workplace"
        tabs={['Workplace', 'Design', 'Development', 'Photography']}
      /> */}
      {/* {!posts.length && <span>Nothing we found!</span>} */}
      {/* <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {posts[0] && <Card2 size="large" post={posts[0]} />}
        <div className="grid gap-6 md:gap-8">
          {posts
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <Card6 key={index} post={item} />
            ))}
        </div>
      </div> */}
      <div className="grid grid-cols-1 gap-6 max-md:gap-[20px_15px] lg:grid-cols-2">
        {posts.slice(0, 6).map((post: any, index: any) => (
          <Card23 key={post._id || index} post={post} lang={lang} />
        ))}
      </div>
    </div>
  )
}

export default SectionMagazine1
