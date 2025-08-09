import BackgroundSection from '@/components/BackgroundSection'
import CategoryLinks from '@/components/CategoryLinks'
import ParallaxScrollSection from '@/components/ParallaxScrollSection '
import SectionMagazine4 from '@/components/SectionMagazine4'
import SectionMagazine7 from '@/components/SectionMagazine7'
import SectionSlider from '@/components/SectionSlider'

import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionTrending from '@/components/SectionTrending'
import SwipableSliderPosts from '@/components/SwipableSliderPosts'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import { getAllPosts, getPostsAudio, getPostsDefault, getPostsGallery, getPostsVideo } from '@/data/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page of the application showcasing various sections and posts.',
}

const Page = async () => {
  // Get specific data instead of random posts
  const posts = await getAllPosts()
  const defaultPosts = await getPostsDefault()
  const videoPosts = await getPostsVideo()
  const audioPosts = await getPostsAudio()
  const galleryPosts = await getPostsGallery()
  const authors = await getAuthors()
  const categories = await getCategories()

  // Create specific data for SectionMagazine10
  const magazine10Data = [
    videoPosts[3], // 1st Card19 - Video data
    defaultPosts[0], // 2nd Card19 - Article data
    defaultPosts[1], // 1st Card18 - Article data
    defaultPosts[2], // 2nd Card18 - Article data
    defaultPosts[3], // 3rd Card18 - Article data
    defaultPosts[4], // 4th Card18 - Article data
    defaultPosts[5], // 5th Card18 - Article data
    defaultPosts[6], // 6th Card18 - Article data
  ]

  return (
    <div className="relative pb-28 lg:pb-32">
      {/* Video Hero Banner */}
      {/* <VideoHeroBanner /> */}
      {/* <div className="relative">
        <HeroWithMagazine posts={magazine10Data} />
      </div> */}
      {/* <div className=''> */}
      {/* <VideoHeroBanner /> */}
      {/* </div> */}
      {/* Parallax Scroll Section - VideoHeroBanner + SectionMagazine10 */}
      <ParallaxScrollSection magazine10Data={magazine10Data} />
      <div className="relative container mt-28 space-y-28 lg:space-y-40">
        {/* <SectionMagazine10 posts={magazine10Data} /> */}

        <SectionSliderNewCategories
          heading="STORYTELLING ISLAM"
          subHeading="Understanding Islam through 1001 stories"
          categories={categories.slice(0, 10)}
          categoryCardType="card3"
        />

        <SectionMagazine7
          posts={galleryPosts.slice(0, 8)}
          heading="HOLY QUR’AN"
          subHeading="Explore the lessons from Holy Quran"
        />
      </div>

      <div className="relative py-16 lg:py-24">
        {/* <SectionSliderNewCategories   heading="STORYTELLING ISLAM"
          subHeading="Understanding Islam through 1001 stories" categories={categories.slice(0, 10)} categoryCardType="card2" /> */}
        <SectionSlider
          heading="TRENDING CATEGORIES"
          subHeading="Discover over 100 Popular topics"
          categories={categories.slice(0, 10)}
          categoryCardType="card2"
          config={{
            autoSlide: true,
            autoSlideInterval: 5000,
            showButtons: false,
            loop: true,
          }}
        />
      </div>

      <div className="relative container space-y-28 lg:space-y-32">
        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          {/* <SectionSliderPosts
            postCardName="card10V2"
            heading="ISLAM FOR BEGINNERS"
            subHeading="Over 100 Articles for beginners"
            posts={defaultPosts.slice(0, 6)}
          /> */}
          <SwipableSliderPosts
            heading="ISLAM FOR BEGINNERS"
            subHeading="Over 100 Articles for beginners"
            posts={defaultPosts.slice(0, 8)}
            postCardName="card10V2"
            config={{
              autoSlide: false,
              autoSlideInterval: 4000,
              showButtons: false,
              loop: false,
            }}
          />
        </div>

        <SectionTrending
          posts={posts.slice(0, 8)}
          heading="LATEST ARTICLES"
          subHeading="Discover the most outstanding articles in all topics of life"
        />

        {/* Dynamic Category Routing Demo */}
        {/* <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <CategoryLinks className="container" />
        </div> */}
      </div>

      <div className="mt-28 bg-[#000000] py-16 lg:py-20 dark:bg-[#0D0D0D]">
        <div className="relative container">
          <SectionMagazine4
            heading="VISUALS"
            subHeading="Hover on the post card and preview video"
            posts={videoPosts.slice(1, 8)}
            headingColor="light"
          />
        </div>
      </div>


    </div>
  )
}

export default Page
