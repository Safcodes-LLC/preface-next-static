import { getData } from './getData'

export async function getCustomFeaturedArticle(lang: string): Promise<any | undefined> {
  try {
    return await getData(`featured/all?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch featured data:', error)
    // throw notFound();
  }
}
export async function getHighlightedFeaturedArticle(lang: string): Promise<any | undefined> {
  try {
    return await getData(`featured/home-featured-posts?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch highlighted featured data:', error)
    // throw notFound();
  }
}
export async function getRandomFeaturedArticle(lang: string): Promise<any | undefined> {
  try {
    return await getData(`featured/random-featured-article?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch random featured data:', error)
    // throw notFound();
  }
}
export async function getFeaturedCategoryArticle(
  parentCategory: string,
  categories: string[],
  lang: string
): Promise<any | undefined> {
  try {
    return await getData(
      `featured/featured-posts?parentCategory=${parentCategory}${categories.length > 0 ? `&category=${categories.join(',')}` : ''}${lang ? `&lang=${lang}` : ''}`,
      '',
      0
    )
  } catch (error) {
    console.error('Failed to fetch featured category article data:', error)
    // throw notFound();
  }
}

export async function getCategoryFilterArticle(
  catogory: string,
  limit: number = 100,
  categories: string[]
): Promise<any | undefined> {
  try {
    return await getData(
      `frontend/postsbyparentcategory/${catogory}?limit=${limit}${categories.length > 0 ? `&categoryId=${categories.join(',')}` : ''}`,
      '',
      0
    )
  } catch (error) {
    console.error('Failed to fetch category filter article data:', error)
    // throw notFound();
  }
}
