import { getData } from './getData'
import { postData } from './postData'
import { putData } from './putData'

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

export async function getContinuosRead(userId: string): Promise<any | undefined> {
  try {
    return await getData(`user/read-posts/${userId}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch continuos read data:', error)
    // throw notFound();
  }
}

export async function getContinuosReadByCategory(
  userId: string,
  lang: string,
  postType: string
): Promise<any | undefined> {
  try {
    return await getData(`user/read-posts-by-category/${userId}?lang=${lang}&postType=${postType}`, '', 60)
  } catch (error) {
    console.error('Failed to fetch continuos read by category data:', error)
    // throw notFound();
  }
}

export async function getSavedList(userId: string, lang: string): Promise<any | undefined> {
  try {
    return await getData(`savedlist/${userId}?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch saved list data:', error)
    // throw notFound();
  }
}

export async function getFavouriteList(userId: string, postType: string, lang: string): Promise<any | undefined> {
  try {
    return await getData(`favourites/users/${userId}?postType=${postType}&lang=${lang}`, '', 60)
  } catch (error) {
    console.error('Failed to fetch favourite list data:', error)
    // throw notFound();
  }
}

export async function getCustomBannerArticle(id: string): Promise<any | undefined> {
  try {
    return await getData(`banner/posts/custom-banner/${id}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch custom banner article data:', error)
    // throw notFound();
  }
}
export async function getVisualBannerList(lang: string): Promise<any | undefined> {
  try {
    return await getData(`visuals?lang=${lang}&page=1&limit=10`, '', 0)
  } catch (error) {
    console.error('Failed to fetch visual banner list data:', error)
    // throw notFound();
  }
}

export async function getContinuosReadList(userId: string, lang: string): Promise<any | undefined> {
  try {
    return await getData(`user/read-posts/${userId}?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch continuos read list data:', error)
    // throw notFound();
  }
}

export async function getLoggedUser(authToken: string): Promise<any | undefined> {
  try {
    return await getData(`authentication/loggedin_user`, authToken || '', 600)
  } catch (error) {
    console.error('Failed to fetch logged user data:', error)
    // throw notFound();
  }
}

export async function postGuestTicket(data: any): Promise<any | undefined> {
  try {
    return await postData(`scholar-questions/guest`, data, '', 0)
  } catch (error) {
    console.error('Failed to post guest ticket data:', error)
    // throw notFound();
  }
}

export async function putProfileUpdate(userId: string, data: any): Promise<any | undefined> {
  try {
    return await putData(`authentication/update-profile/${userId}`, data, '', 0)
  } catch (error) {
    console.error('Failed to update profile data:', error)
    // throw notFound();
  }
}

export async function postAskTheScolarQuestion(data: any, authToken: string): Promise<any | undefined> {
  try {
    return await postData(`scholar-questions/user`, data, authToken || '', 0)
  } catch (error) {
    console.error('Failed to post ask the scholar question data:', error)
    // throw notFound();
  }
}
export async function postAskTheScolarReplay(
  questionId: string,
  data: any,
  authToken: string
): Promise<any | undefined> {
  try {
    return await postData(`scholar-questions/user-reply/${questionId}`, data, authToken || '', 0)
  } catch (error) {
    console.error('Failed to post ask the scholar reply data:', error)
    // throw notFound();
  }
}

export async function getAskTheScholarAllQuestions(authToken: string): Promise<any | undefined> {
  try {
    return await getData(`scholar-questions/userAllQuestions`, authToken || '', 120)
  } catch (error) {
    console.error('Failed to fetch ask the scholar all questions data:', error)
    // throw notFound();
  }
}

export async function getAskTheScholarSingleQuestionsById(
  questionId: string,
  authToken: string
): Promise<any | undefined> {
  try {
    return await getData(`scholar-questions/${questionId}`, authToken || '', 300)
  } catch (error) {
    console.error('Failed to fetch ask the scholar single question data:', error)
    // throw notFound();
  }
}

export async function getCompletedReadByCategory(userId: string): Promise<any | undefined> {
  try {
    return await getData(`user/completed-read-posts-by-category/${userId}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch completed read by category data:', error)
    // throw notFound();
  }
}

export async function postSavedArticle(postId: string, authToken: string): Promise<any | undefined> {
  try {
    return await postData(
      `savedlist/toggle/${postId}`,
      {
        postType: '66d9d564987787d3e3ff1312', // Article post type ID
      },
      authToken || '',
      0
    )
  } catch (error) {
    console.error('Failed to post saved article data:', error)
    // throw notFound();
  }
}

export async function getSavedArticlesList(
  postType: string,
  lang: string,
  authToken: string
): Promise<any | undefined> {
  try {
    return await getData(`savedlist/all?postType=${postType}&lang=${lang}`, authToken || '', 180)
  } catch (error) {
    console.error('Failed to fetch saved articles list data:', error)
    // throw notFound();
  }
}

export async function getSavedArticleStatus(postId: string, authToken: string): Promise<any | undefined> {
  try {
    return await getData(`savedlist/status/${postId}`, authToken || '', 300)
  } catch (error) {
    console.error('Failed to fetch saved article status data:', error)
    // throw notFound();
  }
}

export async function getLatestArticles(lang: string): Promise<any | undefined> {
  try {
    return await getData(`frontend/latest-articles?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch latest articles:', error)
    // throw notFound();
  }
}
export async function getPopularArticles(lang: string): Promise<any | undefined> {
  try {
    return await getData(`frontend/popular-articles?lang=${lang}`, '', 0)
  } catch (error) {
    console.error('Failed to fetch popular articles:', error)
    // throw notFound();
  }
}



export async function searchPosts(searchTerm: string, lang: string): Promise<any | undefined> {
  try {
    const encodedSearch = encodeURIComponent(searchTerm);
    return await getData(`frontend/search-posts?search=${encodedSearch}&lang=${lang}`, '', 0);
  } catch (error) {
    console.error('Failed to fetch search results:', error);
    // throw notFound();
  }
}
