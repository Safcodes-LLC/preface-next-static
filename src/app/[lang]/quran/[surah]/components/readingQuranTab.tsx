import React from 'react'

type Props = {
  surahData: {
    title: string
    ayah: {
      ayah: number
      quran: string
    }[]
  }
}

const ReadingQuranTab = (props: Props) => {
  const { surahData } = props
  return (
    <React.Fragment>
      <div className="w-full rounded-2xl bg-[#F3F4F6] py-8">
        <div className="mx-auto w-4/6">
          <div className="flex flex-wrap justify-center gap-[10px_6px]" dir="rtl">
            {surahData.ayah.map((ayah: any) => (
              <p
                key={ayah.ayah} // Add this line
                className="quran-ayah w-fit text-center text-[26px] font-medium"
                data-ayah={ayah.ayah}
              >
                {ayah.quran}
              </p>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .quran-ayah {
          position: relative;
        }
        .quran-ayah::after {
          content: attr(data-ayah);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          margin-right: 8px;
          border-radius: 9999px;
          background-color: #d1d5db; /* gray-300 */
          color: #111827; /* gray-900 */
          font-size: 14px;
          // line-height: 1;
        }
      `}</style>
    </React.Fragment>
  )
}

export default ReadingQuranTab
