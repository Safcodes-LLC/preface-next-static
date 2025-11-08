import Link from 'next/link'

interface TableRow {
  date: string
  subject: string
  status: 'Pending' | 'Answered' | 'User Replied'
  lastUpdated: string
}

const Page = () => {
  const data: TableRow[] = [
    {
      date: '21 Apr 2025',
      subject:
        'is simply dummy text of the printing and typesetting? is simply dummy text of the printing and typesetting? is simply dummy text of the printing and typesetting? is simply dummy text of the printing and typesetting?',
      status: 'Pending',
      lastUpdated: '21 Apr 2025',
    },
    {
      date: '18 Apr 2025',
      subject: 'is simply dummy text of the printing and typesetting?',
      status: 'Answered',
      lastUpdated: '19 Apr 2025',
    },
    {
      date: '15 Apr 2025',
      subject: 'is simply dummy text of the printing and typesetting?',
      status: 'User Replied',
      lastUpdated: '16 Apr 2025',
    },
    {
      date: '21 Apr 2025',
      subject: 'is simply dummy text of the printing and typesetting?',
      status: 'Pending',
      lastUpdated: '21 Apr 2025',
    },
    {
      date: '18 Apr 2025',
      subject: 'is simply dummy text of the printing and typesetting?',
      status: 'Answered',
      lastUpdated: '19 Apr 2025',
    },
  ]

  const statusColors = {
    Pending: 'bg-[#F4CDB1] text-[#FF7700]',
    Answered: 'bg-[#DCEDC8] text-[#52AD0D]',
    'User Replied': 'bg-[#D6D1F5] text-[#4E259E]', // Changed from 'UserReplied' to 'User Replied'
  }
  return (
    <>
      <div className="mb-[24px] flex justify-end">
        <button
          type="button"
          className="cursor-pointer rounded-[6px] bg-[#00652E] px-4 py-1 text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 hover:bg-[#004d24]"
        >
          Ask New Question
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-[10px] border border-[#EAEAEA]">
          <thead className="">
            <tr className="bg-[#F2FAF6] text-left">
              <th className="px-5 py-[10px] text-xs font-medium text-[#4A4A4A]">Date</th>
              <th className="px-5 py-[10px] text-xs font-medium text-[#4A4A4A]">Subject</th>
              <th className="px-5 py-[10px] text-xs font-medium text-[#4A4A4A]">Status</th>
              <th className="px-5 py-[10px] text-xs font-medium text-[#4A4A4A]">Last Updated</th>
              <th className="px-5 py-[10px] text-right"></th>
            </tr>
          </thead>
          <tbody className="bg-[#FFFFFF]">
            {data.map((row, i) => (
              <tr
                key={i}
                className={`border-t border-gray-100 text-sm text-gray-600 transition-colors hover:bg-gray-50 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'
                }`}
              >
                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-[14px] whitespace-nowrap`}>
                  {row.date}
                </td>
                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-[14px]`}>
                  <div className="line-clamp-2 max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap md:whitespace-normal">
                    {row.subject}
                  </div>
                </td>
                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-[14px]`}>
                  <span
                    className={`inline-flex items-center rounded-[6px] px-6 py-1 text-xs font-medium whitespace-nowrap ${statusColors[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-[14px] whitespace-nowrap`}>
                  {row.lastUpdated}
                </td>
                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-right`}>
                  <Link
                    href="/dashboard/qa/view"
                    className="inline-block rounded-md bg-[#CBDB2A] px-3 py-1 text-xs font-medium text-[#00652E] transition hover:bg-[#A7B81D]"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Page
