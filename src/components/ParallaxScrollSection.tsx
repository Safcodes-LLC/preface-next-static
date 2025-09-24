'use client'

import React from 'react'
import Parallax from './Parallax'
import Reveal from './Reveal'
import SectionMagazine10 from './SectionMagazine10'
import VideoHeroBanner from './VideoHeroBanner'

interface ParallaxScrollSectionProps {
  magazinePosts: any[]
  videoPosts: any[]
  lang: string
}

/**
 * A hero + content block with subtle parallax separation.
 * - Background video layer scrolls slightly slower (positive speed)
 * - Foreground content scrolls slightly with the page (small negative speed)
 */
const ParallaxScrollSection: React.FC<ParallaxScrollSectionProps> = ({ magazinePosts, videoPosts, lang }) => {
  return (
    <section className="relative">
      {/* Background hero video: slower movement for depth */}
      <Parallax speed={0.15} className="relative z-0">
        <VideoHeroBanner />
      </Parallax>

      {/* Foreground content: tiny move with scroll to enhance separation */}
      <Parallax speed={-0.05} className="relative z-10">
        <Reveal delay={100}>
          <div className="container pt-10 md:pt-14 lg:pt-20">
            <SectionMagazine10 posts={magazinePosts} videoPosts={videoPosts} lang={lang} />
          </div>
        </Reveal>
      </Parallax>
    </section>
  )
}

export default ParallaxScrollSection
