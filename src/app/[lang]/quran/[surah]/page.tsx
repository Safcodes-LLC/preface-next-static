import HeroSection from '../components/HeroSection'

type Props = {
  params: {
    surah: string
  }
}

const page = (props: Props) => {
  return (
    <div>
      <HeroSection />
    </div>
  )
}

export default page
