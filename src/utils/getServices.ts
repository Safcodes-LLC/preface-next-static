import { getData } from './getData'

export async function getCustomFeaturedArticle(lang: string): Promise<any | undefined> {
  try {
    return await getData(`featured/all?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch general info data:', error)
    // throw notFound();
  }
}
export async function getHighlightedFeaturedArticle(lang: string): Promise<any | undefined> {
  try {
    return await getData(`featured/home-featured-posts?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch general info data:', error)
    // throw notFound();
  }
}
export async function getRandomFeaturedArticle(lang: string): Promise<any | undefined> {
  try {
    return await getData(`featured/random-featured-article?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch general info data:', error)
    // throw notFound();
  }
}
