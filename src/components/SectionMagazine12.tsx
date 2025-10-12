import { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { FC } from 'react'
import Card21 from './PostCards/Card21'

type Props = Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> & {
  posts: any[]
  className?: string
  heading?: string
  lang?: string
}

const SectionMagazine12: FC<Props> = ({ posts, className, heading, subHeading, dimHeading, lang }) => {
  return (
    <div className={clsx('section-magazine-12 relative', className)}>
      <Card21 post={posts} />
    </div>
  )
}

export default SectionMagazine12
