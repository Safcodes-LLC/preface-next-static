'use client'
import { TPost } from '@/data/posts'
import { motion, Variants } from 'framer-motion'
import { FC } from 'react'
import Card18 from './PostCards/Card18'
import Card19 from './PostCards/Card19'

interface Props {
  posts: TPost[]
  videoPosts?: any
  className?: string
  lang?: string
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
    },
  },
}

const viewportOptions = {
  once: false, // Trigger animation every time the element comes into view
  amount: 0.2, // Percentage of the item that needs to be visible
  margin: '-50px', // Start the animation a bit before the element is in view
}

const SectionMagazine10: FC<Props> = ({ posts, videoPosts, className, lang }) => {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={viewportOptions} variants={container}>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {videoPosts[0] && (
          <motion.div variants={item} className="h-full" viewport={viewportOptions}>
            <Card19
              post={videoPosts[0]}
              titleClass="text-lg sm:text-xl"
              ratio="aspect-4/3 sm:aspect-1/1 md:aspect-4/1 lg:aspect-4/2 xl:aspect-1/1"
              textCenter={true}
              verticalLine={true}
              lang={lang}
            />
          </motion.div>
        )}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:grid-rows-5"
          variants={container}
          viewport={viewportOptions}
        >
          {posts[0] && (
            <motion.div variants={item} className="sm:col-span-2 sm:row-span-2" viewport={viewportOptions}>
              <Card19
                ratio="aspect-4/3 sm:aspect-16/1"
                className="h-full"
                titleClass="text-lg sm:text-xl"
                post={posts[0]}
                verticalLine={true}
                lang={lang}
              />
            </motion.div>
          )}
          {posts
            .filter((_, i) => i < 3 && i >= 1)
            .map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                className="col-span-1 h-full sm:row-span-3"
                viewport={viewportOptions}
              >
                <Card18 post={post} lang={lang} className="h-full" />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SectionMagazine10
