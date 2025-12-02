import { AboutPage } from '@/utils/getServices'
import { Metadata } from 'next'
import SectionOurMission from './components/SectionOurMission'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About US - Preface Islam',
    description: `Preface Islam is a platform for Muslims to learn about Islam and its teachings`,
  }
}

const PageAbout = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const aboutData = await AboutPage(lang || 'en')

  console.log(aboutData, 'about data')

  return (
    <div className={`nc-PageAbout relative`}>
      <div className="relative container space-y-8 py-10 md:py-14 lg:space-y-10 lg:py-20">
        <h1 className="text-3xl font-semibold md:text-4xl">{aboutData?.title}</h1>
        {/* <Divider /> */}
        <SectionOurMission content={aboutData?.content} />
      </div>
    </div>
  )
}

export default PageAbout
