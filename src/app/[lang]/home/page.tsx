import { Metadata } from 'next' 
import { getBannerHighlightedArticles, getBannerHighlightedVideos } from '@/data/api/banner'
import { getCategory, getQuranSubcategories, getTopTrendingTopics } from '@/data/api/category'
import { getIslamForBeginners, getLatestArticles, getLatestVideos, getQuranLatestArticles } from '@/data/api/posts'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import { getAllPosts, getPostsAudio, getPostsDefault, getPostsGallery, getPostsVideo } from '@/data/posts'
import HomeHeader from './components/homeHeader'
import BackgroundSection from '@/components/BackgroundSection'
import SectionMagazine7 from '@/components/SectionMagazine7'
import SectionSlider from '@/components/SectionSlider'
import ClientSideVisuals from '@/components/ClientSideVisuals'
import SectionMagazine10 from '@/components/SectionMagazine10'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionTrending from '@/components/SectionTrending'
import SwipableSliderPosts from '@/components/SwipableSliderPosts'
import VideoHeroBanner from '@/components/VideoHeroBanner'
import { ApplicationLayout } from '../application-layout'

export const metadata: Metadata = {
  title: 'Preface Islam',
  description: 'Preface Islam is a platform for Muslims to learn about Islam and its teachings.',
}

 
const HomePage = async ({ params, dict }: { params: Promise<{ lang: string }>, dict: any }) => {
  const { lang } = await params 
  const [
    posts,
    defaultPosts,
    videoPosts,
    audioPosts,
    galleryPosts,
    authors,
    categories,
    latestArticles,
    latestVideos,
    storyTellingIslam,
    topTrendingTopics,
    islamForBeginners,
    quranSubCategories,
    quranLatestArticles,
    bannerHighlightedVideos,
    bannerHighlightedArticles,
  ] = await Promise.all([
    getAllPosts(),
    getPostsDefault(),
    getPostsVideo(),
    getPostsAudio(),
    getPostsGallery(),
    getAuthors(),
    getCategories(),
    getLatestArticles(lang || 'en'),
    getLatestVideos(lang || 'en'),
    getCategory(lang || 'en'),
    getTopTrendingTopics(lang || 'en'),
    getIslamForBeginners(lang || 'en'),
    getQuranSubcategories(lang || 'en', { limit: 6 }),
    getQuranLatestArticles(lang || 'en', { limit: 2 }),
    getBannerHighlightedVideos(lang || 'en'),
    getBannerHighlightedArticles(lang || 'en'),
  ])

  // Extract the actual data arrays from the API responses
  const videoPostsArray = Array.isArray(bannerHighlightedVideos)
    ? bannerHighlightedVideos
    : bannerHighlightedVideos?.data || []
  const articlesArray = Array.isArray(bannerHighlightedArticles)
    ? bannerHighlightedArticles
    : bannerHighlightedArticles?.data || []

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
    <ApplicationLayout home={true} headerHasBorder={true} params={params}>
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative overflow-hidden pb-10 md:pb-14 lg:pb-20">
      {/* Video Hero Banner */}
      {/* <VideoHeroBanner /> */}
      {/* <div className="relative">
        <HeroWithMagazine posts={magazine10Data} />
      </div> */}
      {/* <div className=''> */}
      {/* <VideoHeroBanner /> */}
      {/* </div> */}
      {/* Parallax Scroll Section - VideoHeroBanner + SectionMagazine10 */}
      <HomeHeader lang={lang} />
      <VideoHeroBanner />
      <div className="container pt-10 md:pt-14 lg:pt-20">
        <SectionMagazine10 posts={articlesArray} videoPosts={videoPostsArray} lang={lang} />
      </div>
      {/* <ParallaxScrollSection magazine10Data={articlesArray} videoPosts={videoPostsArray} /> */}
      <div className="relative container space-y-8 md:space-y-12 lg:space-y-16 pt-10 md:pt-14 lg:pt-20">
        {/* <SectionMagazine10 posts={magazine10Data} /> */}
        <SectionSliderNewCategories
          heading={dict.sections.storytelling.heading}
          subHeading={dict.sections.storytelling.description}
          // categories={categories.slice(0, 10)}
          categories={
            Array.isArray(storyTellingIslam)
              ? storyTellingIslam.slice(0, 10)
              : storyTellingIslam.data?.slice(0, 10) || []
          }
          categoryCardType="card3"
          lang={lang}
        />

        <SectionMagazine7
          posts={quranSubCategories.slice(0, 8)}
          posts2={quranLatestArticles.slice(0, 8)}
          heading={dict.sections.holyquran.heading}
          subHeading={dict.sections.holyquran.description}
          lang={lang}
        />
      </div>

      <div className="relative py-10 md:py-14 lg:py-20">
        {/* <SectionSliderNewCategories   heading="STORYTELLING ISLAM"
          subHeading="Understanding Islam through 1001 stories" categories={categories.slice(0, 10)} categoryCardType="card2" /> */}
        <SectionSlider
          heading={dict.sections.trendingcategories.heading}
          subHeading={dict.sections.trendingcategories.description}
          lang={lang}
          categories={
            Array.isArray(topTrendingTopics)
              ? topTrendingTopics.slice(0, 10)
              : topTrendingTopics.data?.slice(0, 10) || []
          }
          categoryCardType="card2"
          config={{
            autoSlide: true,
            autoSlideInterval: 5000,
            showButtons: false,
            loop: true,
          }}
        />
      </div>
      <div className="relative py-10 md:py-14 lg:py-20">
        <BackgroundSection />
        <div className="container">
          <SwipableSliderPosts
            heading={dict.sections.islamforbeginners.heading}
            subHeading={dict.sections.islamforbeginners.description}
            posts={islamForBeginners.slice(0, 8)}
            postCardName="card10V2"
            lang={lang}
            config={{
              autoSlide: false,
              autoSlideInterval: 4000,
              showButtons: false,
              loop: false,
            }}
          />
        </div>
      </div>

      <div className="relative container py-10 md:py-14 lg:py-20">
        <SectionTrending
          posts={Array.isArray(latestArticles) ? latestArticles.slice(0, 8) : latestArticles.data?.slice(0, 8) || []}
          heading={dict.sections.latestarticles.heading}
          subHeading={dict.sections.latestarticles.description}
          lang={lang}
        />
      </div>

      <ClientSideVisuals dict={dict} posts={latestVideos} lang={lang} />
    </div>
    </ApplicationLayout>
  )
}

export default HomePage
