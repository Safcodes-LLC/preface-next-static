import BackgroundSection from '@/components/BackgroundSection'
import ParallaxScrollSection from '@/components/ParallaxScrollSection '
import SectionMagazine4 from '@/components/SectionMagazine4'
import SectionMagazine7 from '@/components/SectionMagazine7'
import SectionSlider from '@/components/SectionSlider'

import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionTrending from '@/components/SectionTrending'
import SwipableSliderPosts from '@/components/SwipableSliderPosts'
import InteractivePostsSection from '@/components/InteractivePostsSection'
import TestReactQuery from '@/components/TestReactQuery'
import { getIslamForBeginners, getLatestArticles, getQuranLatestArticles } from '@/data/api/posts'
import { getCategory, getQuranSubcategories, getTopTrendingTopics } from '@/data/api/category'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import { getAllPosts, getPostsAudio, getPostsDefault, getPostsGallery, getPostsVideo } from '@/data/posts'
import { Metadata } from 'next'
import { getBannerHighlightedArticles, getBannerHighlightedVideos } from '@/data/api/banner'
import ClientSideVisuals from '@/components/ClientSideVisuals'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page of the application showcasing various sections and posts.',
}

const Page = async () => {
  // Get all data in parallel using Promise.all for better performance
  const [
    posts,
    defaultPosts,
    videoPosts,
    audioPosts,
    galleryPosts,
    authors,
    categories,
    latestArticles,
    storyTellingIslam,
    topTrendingTopics,
    islamForBeginners,
    quranSubCategories,
    quranLatestArticles,
    bannerHighlightedVideos,
    bannerHighlightedArticles
  ] = await Promise.all([
    getAllPosts(),
    getPostsDefault(),
    getPostsVideo(),
    getPostsAudio(),
    getPostsGallery(),
    getAuthors(),
    getCategories(),
    getLatestArticles(),
    getCategory(),
    getTopTrendingTopics(),
    getIslamForBeginners(),
    getQuranSubcategories({limit:6}),
    getQuranLatestArticles({limit:2}),
    getBannerHighlightedVideos(),
    getBannerHighlightedArticles()
  ]);

  // Extract the actual data arrays from the API responses
  const videoPostsArray = Array.isArray(bannerHighlightedVideos) ? bannerHighlightedVideos : bannerHighlightedVideos?.data || [];
  const articlesArray = Array.isArray(bannerHighlightedArticles) ? bannerHighlightedArticles : bannerHighlightedArticles?.data || [];

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
      <ParallaxScrollSection magazine10Data={articlesArray} videoPosts={videoPostsArray}/>
      <div className="relative container mt-28 space-y-28 lg:space-y-40">
        {/* <SectionMagazine10 posts={magazine10Data} /> */}

        <SectionSliderNewCategories
          heading="STORYTELLING ISLAM"
          subHeading="Understanding Islam through 1001 stories"
          // categories={categories.slice(0, 10)}
          categories={Array.isArray(storyTellingIslam) ? storyTellingIslam.slice(0, 10) : storyTellingIslam.data?.slice(0, 10) || []}
          categoryCardType="card3"
        />

        <SectionMagazine7
          posts={quranSubCategories.slice(0, 8)}
          posts2={quranLatestArticles.slice(0, 8)}
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
          categories={Array.isArray(topTrendingTopics) ? topTrendingTopics.slice(0, 10) : topTrendingTopics.data?.slice(0, 10) || []}
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
            posts={islamForBeginners.slice(0, 8)}
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
          posts={Array.isArray(latestArticles) ? latestArticles.slice(0, 8) : latestArticles.data?.slice(0, 8) || []}
          heading="LATEST ARTICLES"
          subHeading="Discover the most outstanding articles in all topics of life"
        />

         {/* React Query Test Component */}
        {/* <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <div className="container">
            <TestReactQuery />
          </div>
        </div> */}

        {/* Interactive Posts Section with React Query */}
        {/* <InteractivePostsSection
          initialPosts={Array.isArray(latestArticles) ? latestArticles.slice(0, 8) : latestArticles.data?.slice(0, 8) || []}
          initialVideos={Array.isArray(bannerHighlightedVideos) ? bannerHighlightedVideos.slice(0, 8) : bannerHighlightedVideos?.data || []}
          heading="INTERACTIVE CONTENT"
          subHeading="Like, bookmark, and interact with posts and videos in real-time using React Query"
          contentType="mixed"
          limit={8}
        /> */}

        {/* Interactive Videos Section - Video Only */}
        {/* <InteractivePostsSection
          initialVideos={[]} // We'll use React Query to fetch latest videos
          heading="INTERACTIVE VIDEOS"
          subHeading="Like, bookmark, and interact with videos in real-time using React Query"
          contentType="videos"
          limit={6}
        /> */}

        {/* Dynamic Category Routing Demo */}
        {/* <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <CategoryLinks className="container" />
        </div> */}
      </div>

      <div className="mt-28 bg-[#000000] py-16 lg:py-20 dark:bg-[#0D0D0D]">
        <div className="relative container">
          {/* <SectionMagazine4
            heading="VISUALS"
            subHeading="Hover on the post card and preview video"
            posts={videoPosts.slice(1, 8)}
            headingColor="light"
          /> */}
          <ClientSideVisuals />
        </div>
      </div>
    </div>
  )
}

export default Page
