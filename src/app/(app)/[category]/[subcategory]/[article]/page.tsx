import SingleContentContainer from '../../../post/SingleContentContainer'
import SingleHeaderContainer from '../../../post/SingleHeaderContainer'
import SingleRelatedPosts from '../../../post/SingleRelatedPosts'
import WidgetAuthors from '@/components/WidgetAuthors'
import WidgetCategories from '@/components/WidgetCategories'
import WidgetPosts from '@/components/WidgetPosts'
import WidgetTags from '@/components/WidgetTags'
import { getAuthors } from '@/data/authors'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts, getCommentsByPostId, getPostByHandle } from '@/data/posts'
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
  const post = await getPostByHandle(params.article)
  
  if (!post) {
    return {
      title: 'Article not found',
      description: 'The requested article could not be found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

const Page = async ({ params }: { params: { category: string; subcategory: string; article: string } }) => {
  // Get the specific article by its handle (slug)
  const post = await getPostByHandle(params.article)
  const comments = await getCommentsByPostId(post.id)
  const relatedPosts = (await getAllPosts()).slice(0, 6)
  const moreFromAuthorPosts = (await getAllPosts()).slice(1, 7)

  const widgetPosts = (await getAllPosts()).slice(0, 6)
  const widgetCategories = (await getCategories()).slice(0, 6)
  const widgetTags = (await getTags()).slice(0, 6)
  const widgetAuthors = (await getAuthors()).slice(0, 6)

  // If article not found, return 404
  if (!post) {
    return notFound()
  }

  return (
    <div className="single-post-page pt-8">
      <SingleHeaderContainer post={post} />

      <div className="container mt-12 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
          <SingleContentContainer post={post} comments={comments} />
        </div>
        <div className="mt-12 w-full lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
          <div className="space-y-7 lg:sticky lg:top-7">
            {/* <WidgetAuthors authors={widgetAuthors} />
            <WidgetTags tags={widgetTags} /> */}
            <WidgetCategories categories={widgetCategories} />
            <WidgetPosts posts={widgetPosts} />
          </div>
        </div>
      </div>

      <SingleRelatedPosts relatedPosts={relatedPosts} moreFromAuthorPosts={moreFromAuthorPosts} />
    </div>
  )
}

export default Page
