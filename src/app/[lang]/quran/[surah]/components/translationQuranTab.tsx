import React from 'react'

type Props = {
  surahData: any
}

const TranslationQuranTab = (props: Props) => {
  const { surahData } = props
  return (
    <React.Fragment>
      {surahData?.ayah?.map((ayah: any) => (
        <div key={ayah.ayah} className="w-full border-t border-[#E4E4E4] py-[20px]">
          <div className="flex w-full items-start justify-between gap-[20px]">
            <div className="h-[20px] w-1/5 bg-red-300"></div>
            <div className="ms-auto flex w-4/5 items-center justify-start gap-[6px]" dir="rtl">
              <p className="quran-ayah text-[26px] font-normal" data-ayah={ayah.ayah}>
                {ayah.quran}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[6px]">
            <h6 className="text-[14px] font-semibold text-[#222]">Explanation</h6>
            <p className="line-clamp-2 text-[15px] font-light text-[#2C2C2C]">{ayah.explanation}</p>
            <button className="cursor-pointer text-[11px] font-normal text-[#7D7D7D]">Read More</button>
          </div>
        </div>
      ))}
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

export default TranslationQuranTab
