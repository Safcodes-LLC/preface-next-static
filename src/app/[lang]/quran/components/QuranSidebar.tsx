import Link from 'next/link'

type Props = {
  activeTab: 'surah' | 'verse' | 'juz'
  selectedId: number | null
  setSelectedId: (id: number) => void
  search?: string
  selectedSurahId?: number | null
  setSelectedSurahId?: (id: number) => void
  selectedVerseId?: number | null
  setSelectedVerseId?: (id: number) => void
  params: { lang: string; surah: string }
}

const surahs = [
  { id: 1, name: 'Al-Fatihah' },
  { id: 2, name: 'Al-Baqarah' },
  { id: 3, name: 'Al-Imran' },
  { id: 4, name: 'An-Nisa' },
  { id: 5, name: "Al-Ma'idah" },
  { id: 6, name: "Al-An'am" },
  { id: 7, name: "Al-A'raf" },
  { id: 8, name: 'Al-Anfal' },
  { id: 9, name: 'At-Tawbah' },
  { id: 10, name: 'Yunus' },
  { id: 11, name: 'Hud' },
  { id: 12, name: 'Yusuf' },
  { id: 13, name: "Ar-Ra'd" },
  { id: 14, name: 'Ibrahim' },
  { id: 15, name: 'Al-Hijr' },
  { id: 16, name: 'An-Nahl' },
  { id: 17, name: 'Al-Isra' },
  { id: 18, name: 'Al-Kahf' },
  { id: 19, name: 'Maryam' },
  { id: 20, name: 'Ta-Ha' },
  { id: 21, name: 'Al-Anbiya' },
  { id: 22, name: 'Al-Haj' },
  { id: 23, name: "Al-Mu'minun" },
  { id: 24, name: 'An-Nur' },
  { id: 25, name: 'Al-Furqan' },
  { id: 26, name: "Ash-Shu'ara" },
  // ... add more as needed
]

const juz = [
  { id: 1, name: 'Juz 1' },
  { id: 2, name: 'Juz 2' },
  { id: 3, name: 'Juz 3' },
  { id: 4, name: 'Juz 4' },
  { id: 5, name: 'Juz 5' },
  { id: 6, name: 'Juz 6' },
  { id: 7, name: 'Juz 7' },
  { id: 8, name: 'Juz 8' },
  { id: 9, name: 'Juz 9' },
  // ... add more as needed
]

// Example: number of verses per surah (partial, fill as needed)
const surahVerseCounts: Record<number, number> = {
  1: 7,
  2: 286,
  3: 200,
  4: 176,
  5: 120,
  6: 165,
  7: 206,
  8: 75,
  9: 129,
  10: 109,
  11: 123,
  12: 111,
  13: 43,
  14: 52,
  15: 99,
  16: 128,
  17: 111,
  18: 110,
  19: 98,
  20: 135,
  21: 112,
  22: 78,
  23: 118,
  24: 64,
  25: 77,
  26: 227,
  // ... add more as needed
}

const QuranSidebar: React.FC<Props> = ({
  activeTab,
  selectedId,
  setSelectedId,
  search = '',
  selectedSurahId,
  setSelectedSurahId,
  selectedVerseId,
  setSelectedVerseId,
  params,
}) => {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .replace(/--+/g, '-')

  const items = activeTab === 'juz' ? juz : surahs
  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  const currentSlug = params?.surah ? params.surah.toLowerCase() : ''
  const selectedFromSlug =
    activeTab !== 'juz' ? (surahs.find((s) => slugify(s.name) === currentSlug)?.id ?? null) : null

  if (activeTab === 'verse') {
    // Default to first surah if none selected
    const surahId = selectedSurahId || selectedFromSlug || filteredItems[0]?.id
    const verseCount = surahVerseCounts[surahId] || 0
    return (
      <div className="flex h-full flex-row">
        {/* Surah List */}
        <div className="max-h-[70vh] w-3/4 overflow-y-auto border-r border-neutral-200 pr-2">
          <ul className="space-y-2">
            {filteredItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/quran/${slugify(item.name)}`}
                  className={`block w-full rounded-lg px-4 py-2 text-left font-medium transition-colors duration-200 ${
                    surahId === item.id
                      ? 'bg-neutral-100 font-semibold text-neutral-700 shadow-sm'
                      : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                  onClick={() => setSelectedSurahId && setSelectedSurahId(item.id)}
                >
                  <span className={`mr-3 ${surahId === item.id ? 'font-semibold' : 'font-normal'}`}>{item.id}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Verse List */}
        <div className="max-h-[70vh] w-1/4 overflow-y-auto pl-2">
          <ul className="space-y-1">
            {Array.from({ length: verseCount }, (_, i) => (
              <li key={i + 1}>
                <button
                  className={`w-full rounded px-3 py-1 text-left text-[13px] transition-colors duration-200 ${
                    selectedVerseId === i + 1
                      ? 'bg-neutral-100 font-semibold text-neutral-700 shadow-sm'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setSelectedVerseId && setSelectedVerseId(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // Single column for surah/juz
  return (
    <aside className="scrollbar-thin scrollbar-track-[#E2E2E2] h-full max-h-[70vh] overflow-y-auto bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
      {/* <h3 className="text-lg font-semibold mb-4 text-[#00652E]">
        {activeTab === 'juz' ? 'Juz' : 'Surah'}
      </h3> */}
      <ul className="space-y-2">
        {filteredItems.map((item) => (
          <li key={item.id}>
            {activeTab === 'juz' ? (
              <button
                className={`w-full rounded-lg px-4 py-2 text-left font-medium transition-colors duration-200 ${
                  (selectedId ?? selectedFromSlug) === item.id
                    ? 'bg-neutral-100 font-semibold text-neutral-700 shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <span
                  className={`mr-3 ${(selectedId ?? selectedFromSlug) === item.id ? 'font-semibold' : 'font-normal'}`}
                >
                  {item.id}
                </span>
                {item.name}
              </button>
            ) : (
              <Link
                href={`/quran/${slugify(item.name)}`}
                className={`block w-full rounded-lg px-4 py-2 text-left font-medium transition-colors duration-200 ${
                  (selectedId ?? selectedFromSlug) === item.id
                    ? 'bg-neutral-100 font-semibold text-neutral-700 shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <span
                  className={`mr-3 ${(selectedId ?? selectedFromSlug) === item.id ? 'font-semibold' : 'font-normal'}`}
                >
                  {item.id}
                </span>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default QuranSidebar
