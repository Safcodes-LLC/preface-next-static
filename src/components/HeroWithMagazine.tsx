// components/HeroWithMagazine.tsx
'use client'

import VideoHeroBanner from '@/components/VideoHeroBanner'
import SectionMagazine10 from '@/components/SectionMagazine10'
import type { TPost } from '@/data/posts'

interface HeroWithMagazineProps {
    posts: TPost[]
}

const HeroWithMagazine: React.FC<HeroWithMagazineProps> = ({ posts }) => {
  return (
    <div className="relative">
      {/* Full-screen hero */}
      <div className="h-screen relative z-10">
        <VideoHeroBanner />
      </div>

      {/* SectionMagazine10 starts at 90vh, overlaps the hero */}
      <div className="relative container -mt-[10vh] z-20">
        <SectionMagazine10 posts={posts} />
      </div>
    </div>
  )
}

export default HeroWithMagazine
