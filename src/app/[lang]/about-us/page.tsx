import SectionHero1 from '@/components/SectionHero1'
import rightImg from '@/images/about-hero-right.png'
import { Divider } from '@/shared/divider'
import { Metadata } from 'next'
import SectionOurMission from './components/SectionOurMission'
import { AboutPage } from '@/utils/getServices'

export async function generateMetadata({}: {}): Promise<Metadata> {
  return {
    title: 'About US - Preface Islam',
    description: `Preface Islam is a platform for Muslims to learn about Islam and its teachings`,
  }
}

interface AboutPageProps {
  params: Promise<{ lang: string }>
  dict: any // You might want to replace 'any' with a proper type for your dictionary
}

const PageAbout = async ({params}: AboutPageProps) => {
  const { lang } = await params
  const aboutData = await AboutPage(lang || 'en')

  console.log(aboutData,"about data");
  
  return (
    <div className={`nc-PageAbout relative`}>
      <div className="relative container space-y-8 py-10 md:py-14 lg:py-20 lg:space-y-10 ">
     
        <h1 className='text-3xl font-semibold md:text-4xl'>{aboutData?.title}</h1>
        {/* <Divider /> */}
        <SectionOurMission content={aboutData?.content}/>
       
      </div>
    </div>
  )
}

export default PageAbout
