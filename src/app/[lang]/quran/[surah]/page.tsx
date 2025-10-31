import { quranData } from '@/data/quran'
import HeroSection from '../components/HeroSection'
import QuranTab from './components/quranTab'

type Props = {
  params: Promise<{
    surah: string
    lang: string
  }>
}

const page = async (props: Props) => {
  const params = await props.params
  const surahData = quranData.find((s) => s.link === params.surah)

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <HeroSection surahData={surahData} />
      <QuranTab surahData={surahData} params={params} />
    </div>
  )
}

export default page
