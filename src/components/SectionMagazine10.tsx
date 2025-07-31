import { TPost } from '@/data/posts'
import clsx from 'clsx'
import { FC } from 'react'
import Card18 from './PostCards/Card18'
import Card19 from './PostCards/Card19'

interface Props {
  posts: TPost[]
  className?: string
}

const SectionMagazine10: FC<Props> = ({ posts, className }) => {
  return (
    <div className={clsx('section-magazine-10 relative', className)}>
      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {posts[0] && <Card19 post={posts[0]} titleClass="text-lg sm:text-xl" ratio='aspect-4/3 sm:aspect-1/1 md:aspect-4/1 lg:aspect-4/2 xl:aspect-1/1' textCenter={true}/>}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:grid-rows-5">
          {posts[3] && (
            <Card19
              ratio="aspect-4/3 sm:aspect-16/1"
              className="sm:col-span-2 sm:row-span-2"
              titleClass="text-lg sm:text-xl "
              post={posts[3]}
              verticalLine={true}
            />
          )}
          {posts
            .filter((_, i) => i < 3 && i >= 1)
            .map((item, index) => (
              <Card18 className="col-span-1 sm:row-span-3" key={index} post={item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine10
