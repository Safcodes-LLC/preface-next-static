'use client'

import { useAuth } from '@/contexts/AuthContext'
import { HeadingWithSubProps } from '@/shared/Heading'
import { getContinuosRead , getContinuosReadByCategory} from '@/utils/getServices'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import Card23 from './PostCards/Card23'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  lang?: string
}

const SectionMagazine1: FC<Props> = ({ className, lang }) => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return

      try {
        setLoading(true)
        setError(null)
        console.log('Fetching data for user:', user._id)

        const response = await getContinuosReadByCategory(user._id)
        console.log('API Response:', response.data)

        // Check if response has data property and it's an array
        if (response?.data && Array.isArray(response.data)) {
          setPosts(response.data)
        } else {
          console.warn('Unexpected API response format:', response)
          setError('Unexpected data format received from server')
        }
      } catch (error) {
        console.error('Error fetching continuous read posts:', error)
        setError('Failed to load posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?._id])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

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
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {posts.map((post: any, index: any) => (
          <Card23 key={post._id || index} post={post} lang={lang} />
        ))}
      </div>
    </div>
  )
}

export default SectionMagazine1
