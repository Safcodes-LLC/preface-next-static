export default function SectionKeyFeatures() {
  const features = [
    "User-Friendly Quran Interface– A clean and intuitive reading experience on any device.",
    "Multiple Translations & Tafsir – Access to translations in multiple languages, along with tafsir.",
    "Audio Recitations – Listen to high-quality recitations from world-renowned Qaris, with the ability to follow along word by word.",
    "Advanced Search & Navigation – Find verses instantly by topic or keywords across the entire Quran.",
    "Ayah Bookmarking & Notes – Save verses and write personal reflections for later reference.",
    "QuranReflect Integration – Engage with a global community through reflections and insights shared by scholars and individuals.",
    "Reading Progress Tracking and Goals – Keep track of your daily goals and reading history",
    "APIs for Developers – Free access to content and features to power Islamic apps and R&D.",
    "And much more, Alhamdulillah."
  ];
  return (
    <div className="">
      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl lg:text-5xl">
          Key Features & Offerings
        </h2>
        <p className="mt-6 text-base/7 text-neutral-600 dark:text-neutral-400">
          Quran.com is designed to support every stage of engagement with the Quran—from reading and memorization to study and reflection. Our features include:
        </p>
      </div>
      {/* i need bullet point here like figma */}
      {/* <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
        <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
          <p className="flex-none text-3xl font-bold tracking-tight text-gray-900">250k</p>
          <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
            <p className="text-lg font-semibold tracking-tight text-gray-900">Users on the platform</p>
            <p className="mt-2 text-base/7 text-gray-600">Vel labore deleniti veniam consequuntur sunt nobis.</p>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44 dark:bg-neutral-800">
          <p className="flex-none text-3xl font-bold tracking-tight text-white">$8.9 billion</p>
          <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
            <p className="text-lg font-semibold tracking-tight text-white">
              We’re proud that our customers have made over $8 billion in total revenue.
            </p>
            <p className="mt-2 text-base/7 text-gray-400">
              Eu duis porta aliquam ornare. Elementum eget magna egestas.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-primary-600 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
          <p className="flex-none text-3xl font-bold tracking-tight text-white">401,093</p>
          <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
            <p className="text-lg font-semibold tracking-tight text-white">Transactions this year</p>
            <p className="mt-2 text-base/7 text-indigo-200">
              Eu duis porta aliquam ornare. Elementum eget magna egestas. Eu duis porta aliquam ornare.
            </p>
          </div>
        </div>
      </div> */}

      <ul className="mt-8 space-y-4 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-black dark:bg-white mr-3"></span>
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
