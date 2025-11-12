import SectionMagazine3 from '@/components/SectionMagazine3'

const Page = async ({ params }: any) => {
  const { lang } = await params
  return (
    <div className="">
      {/* saved read and favourite section */}
      <SectionMagazine3 lang={lang} gridClass="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" />
   
    </div>
  )
}

export default Page
