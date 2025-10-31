import localFont from 'next/font/local'

const quranReadingFont = localFont({
  src: [
    {
      path: '../../../../../../public/fonts/KFGQPC UTHMANIC SCRIPT HAFS REGULAR.otf',
    },
  ],
  variable: '--font-quran-reading',
})

type AyahData = {
  ayah: number
  quran?: string
  arabic_ayah?: string
  meaning?: string
  explanation?: string
}

type QuranModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedAyah: AyahData | null
}

const QuranModal: React.FC<QuranModalProps> = ({ isOpen, onClose, selectedAyah }) => {
  if (!isOpen || !selectedAyah) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white px-[50px] pt-8 pb-[50px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Ayah {selectedAyah.ayah}</h3>
          <button
            aria-label="Close"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-bold text-[#000000] transition-colors duration-200 hover:bg-gray-100"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {(selectedAyah.quran || selectedAyah.arabic_ayah) && (
          <p
            className="mb-4 text-[22px] leading-relaxed text-[#111]"
            dir="rtl"
            style={{ fontFamily: quranReadingFont.style.fontFamily }}
          >
            {selectedAyah.quran} {selectedAyah.arabic_ayah}
          </p>
        )}
        {selectedAyah.meaning && (
          <div className="">
            <p className="text-[18px] leading-relaxed text-[#000000]">{selectedAyah.meaning}</p>
          </div>
        )}
        <div className="my-6 border-b border-[#E4E4E4]"></div>
        {selectedAyah.explanation && (
          <div>
            <h4 className="mb-1 text-sm font-semibold text-[#222222]">Explanation</h4>
            <p className="text-[15px] leading-relaxed font-light text-[#2C2C2C]">{selectedAyah.explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuranModal
