import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      {/* edit button start here */}
      <Link
        href="/dashboard/profile/edit"
        className="flex items-center justify-end gap-2 pb-2 text-sm font-semibold text-[#00652E]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        Edit
      </Link>
      {/* edit button end here  */}
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-xl bg-white px-8 pt-10 pb-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                alt="Profile picture of user"
                src="/images/fallbackImg.webp"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">Muhammed Ajmal</h2>
          </div>
          <hr className="my-7 border border-[#DFDFDF]" />
          <dl className="flex flex-col gap-5" aria-label="User contact information">
            <div>
              <dt className="text-sm text-[#4D4D4D]">Email Address</dt>
              <dd className="text-[15px] font-medium text-black">ajmal1muhammed@gmail.com</dd>
            </div>
            <div>
              <dt className="text-sm text-[#4D4D4D]">Mobile Number</dt>
              <dd className="text-[15px] font-medium text-black">+971 55 666 7777</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl bg-white p-8">
          <dl className="flex flex-col gap-5 divide-y divide-[#EEEEEE]">
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D]">Address 1</dt>
              <dd className="text-[15px] font-medium text-black">Villa No. 25</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D]">Address 2</dt>
              <dd className="text-[15px] font-medium text-black">Rashidiyya</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D]">City</dt>
              <dd className="text-[15px] font-medium text-black">Dubai</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D]">State</dt>
              <dd className="text-[15px] font-medium text-black">Dubai</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D]">Country</dt>
              <dd className="text-[15px] font-medium text-black">United Arab Emirates</dd>
            </div>
          </dl>
        </section>
      </main>
    </>
  )
}

export default Page
