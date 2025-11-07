import { getLoggedUser } from '@/utils/getServices'
import Image from 'next/image'

const Page = async () => {
  
  return (
    <>
      <div className="mb-[24px] flex justify-end">
        <button className="rounded-[6px] bg-[#00652E] px-4 py-1 text-sm font-semibold text-[#FFFFFF]">
          Reset Password
        </button>
      </div>

      <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-xl bg-white px-8 pt-10 pb-8 dark:bg-[#0D0D0D]">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                alt="Profile picture of user"
                src="/images/fallbackImg.webp"
                fill
                className="rounded-full object-cover"
              />
            </div>
            {/* upload button and delete button */}
            <div className="mb-8 flex gap-3">
              <button className="cursor-pointer rounded-[8px] bg-[#00652E] px-3 py-[2px] text-[11px] font-medium text-white transition-colors hover:bg-[#004d24] hover:text-white/90">
                Upload new image
              </button>
              <button className="cursor-pointer rounded-[8px] bg-[#DDDDDD] px-3 py-[2px] text-[11px] font-medium text-[#222222] transition-colors hover:bg-[#CCCCCC] hover:text-[#111111]">
                Delete
              </button>
            </div>
          </div>
          {/* Form Fields */}
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="text-xs text-[#808080] dark:text-[#838383]">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                defaultValue="Muhammed Ajmal"
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs text-[#808080] dark:text-[#838383]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue="ajmal1muhammed@gmail.com"
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="mobile" className="text-xs text-[#808080] dark:text-[#838383]">
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                defaultValue="+971 55 666 7777"
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>
          </form>
        </section>

        <section className="rounded-xl bg-white p-8 dark:bg-[#0D0D0D]">
          {/* Form Fields */}
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="address1" className="text-xs text-[#808080] dark:text-[#838383]">
                Address 1
              </label>
              <input
                id="address1"
                name="address1"
                type="text"
                defaultValue="Villa No 25"
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="address2" className="text-xs text-[#808080] dark:text-[#838383]">
                Address 2
              </label>
              <input
                id="address2"
                name="address2"
                type="text"
                defaultValue="Rashidiyya"
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-xs text-[#808080] dark:text-[#838383]">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                defaultValue="Dubai"
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="state" className="text-xs text-[#808080] dark:text-[#838383]">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                defaultValue="Dubai"
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-xs text-[#808080] dark:text-[#838383]">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                defaultValue="United Arab Emirates"
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>
          </form>
        </section>
      </main>

      <div className="mt-[24px] flex sm:justify-end">
        <button className="rounded-[6px] bg-[#00652E] px-8 py-1 text-sm font-semibold text-[#FFFFFF]">Update</button>
      </div>
    </>
  )
}

export default Page
