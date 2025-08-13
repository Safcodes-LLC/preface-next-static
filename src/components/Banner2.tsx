import Image from 'next/image'

interface Banner2Props {
  image: string
  title: string
  alt?: string
  className?: string
}

const Banner2 = ({ image, title, alt, className = '' }: Banner2Props) => {
  return (
    <div className={`relative aspect-16/9 lg:aspect-16/5 ${className}`}>
      <Image
        alt={alt || title}
        fill
        src={image}
        className="object-cover md:rounded-2xl"
        sizes="(max-width: 1600px) 100vw, 95vw"
        priority
      />
      {/* Linear gradient overlay - left to right fade */}
      <div
        className="absolute inset-y-0 left-0 w-3/5 md:rounded-l-2xl"
        style={{
          background: 'linear-gradient(90deg, rgba(20, 20, 20, 0.76) 0%, rgba(97, 97, 97, 0) 100%)',
        }}
      ></div>

      {/* Title */}
      <div className="absolute bottom-0 flex items-center p-10">
        <h1 className="text-2xl font-bold text-white md:text-3xl">{title}</h1>
      </div>
    </div>
  )
}

export default Banner2