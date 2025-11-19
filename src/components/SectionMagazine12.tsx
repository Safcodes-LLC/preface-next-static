import { HeadingWithSubProps } from '@/shared/Heading'
import { getCustomFeaturedArticle, getHighlightedFeaturedArticle, getRandomFeaturedArticle } from '@/utils/getServices'
import clsx from 'clsx'
import { FC } from 'react'
import Card21 from './PostCards/Card21'

type Props = Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> & {
  className?: string
  lang?: string
  dict?: any
}

const SectionMagazine12: FC<Props> = async ({ className, lang, dict }) => {
  const customFeatured = await getCustomFeaturedArticle(lang || 'en')
  const highlightedFeatured = await getHighlightedFeaturedArticle(lang || 'en')
  const randomFeatured = await getRandomFeaturedArticle(lang || 'en')


  return (
    <div className={clsx('section-magazine-12 relative', className)}>
      {customFeatured?.data?.length > 0 && customFeatured?.data[0].status === 'Active' ? (
        <Card21
          post={customFeatured?.data[0]}
          dict={dict}
          content={{
            id: customFeatured?.data[0]?._id,
            link: customFeatured?.data[0]?.link,
            title: customFeatured?.data[0]?.title,
            content: customFeatured?.data[0]?.content,
            image: customFeatured?.data[0]?.featured_image,
            likeAndBookmark: false,
          }}
          lang={lang}
        />
      ) : highlightedFeatured?.data?.length > 0 ? (
        <Card21
          post={highlightedFeatured?.data[0]}
          dict={dict}
          content={{
            id: highlightedFeatured?.data[0]?._id,
            link: `/${highlightedFeatured?.data[0]?.categories[0]?.parentCategory?.slug}/${highlightedFeatured?.data[0]?.categories[0]?.slug}/${highlightedFeatured?.data[0]?.slug}`,
            title: highlightedFeatured?.data[0]?.title,
            content: highlightedFeatured?.data[0]?.content,
            image: highlightedFeatured?.data[0]?.featured_image,
            likeAndBookmark: true,
          }}
          lang={lang}
        />
      ) : randomFeatured?.data?.length > 0 ? (
        <Card21
          post={randomFeatured?.data[0]}
          dict={dict}
          content={{
            id: randomFeatured?.data[0]?._id,
            link: `/${randomFeatured?.data[0]?.categories[0]?.parentCategory?.slug}/${randomFeatured?.data[0]?.categories[0]?.slug}/${randomFeatured?.data[0]?.slug}`,
            title: randomFeatured?.data[0]?.title,
            content: randomFeatured?.data[0]?.content,
            image: randomFeatured?.data[0]?.featured_image,
            likeAndBookmark: true,
          }}
          lang={lang}
        />
      ) : null}
    </div>
  )
}

export default SectionMagazine12
