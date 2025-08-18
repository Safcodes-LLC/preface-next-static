import Banner2 from '@/components/Banner2'
import { getPostByHandle } from '@/data/posts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Generate static params for all articles
export async function generateStaticParams() {
  // In a real app, you would fetch all posts and generate params
  // For now, we'll return some example articles
  return [
    { category: 'faith', subcategory: 'religion-and-reason', article: 'wisdom-and-worship' },
    { category: 'muhammad', subcategory: 'life-and-message', article: 'the-message-of-mohammad-pbuhs-life' },
    // Add more as needed
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; subcategory: string; article: string }
}): Promise<Metadata> {
  // Format article name for display
  const articleName = params.article
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  const subcategoryName = params.subcategory
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: articleName,
    description: `${articleName} - ${subcategoryName}`,
  }
}

const Page = async ({ params }: { params: { category: string; subcategory: string; article: string } }) => {
  // Get the specific article by its handle (slug)
  const article = await getPostByHandle(params.article)

  // If article not found, return 404
  if (!article) {
    return notFound()
  }

  // Format article and category names for display
  const formatName = (name: string) => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const articleName = formatName(params.article)
  const categoryName = formatName(params.category)
  const subcategoryName = formatName(params.subcategory)

  return (
    <div className={`article-page article-${params.article}`}>
      <div className="mt-6 sm:mt-8">
        <Banner2 image={'/images/banner/article-banner.png'} title={articleName} alt={`${articleName} banner`} likeCount={200}/>
      </div>

      <div className="container py-10 lg:py-20"></div>
    </div>
  )
}

export default Page
