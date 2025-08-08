import type { Article, Author, Category, Tag, StrapiArticle, ApiResponse } from "./types"

const API_BASE_URL = "https://memburb-api-eunbs.ondigitalocean.app/api"

//const API_BASE_URL = "http://localhost:3001/api"

// Helper function to get image URL from Strapi cover
function getImage(coverUrl?: string): string | undefined {
  if (!coverUrl) return undefined
  
  // Extract filename from the cover URL
  const filename = coverUrl.split('/').pop()
  if (!filename) return undefined
  
  // Construct CloudFront URL
  return `https://d393bihxdnepv7.cloudfront.net/${filename}`
}

// Helper function to get author avatar URL from Strapi avatar
function getAuthorAvatar(avatarUrl?: string): string | undefined {
  if (!avatarUrl) return undefined
  
  // The avatar URL is already in CloudFront format
  return `https://${avatarUrl}`
}

// Helper function to map Strapi article to frontend Article type
function mapStrapiArticleToArticle(strapiArticle: StrapiArticle): Article {
  // Convert plain text content with newlines to HTML
  const contentToHtml = (content: string): string => {
    return content
      .split('\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('\n')
  }

  // Generate slug from title if slug is null
  const generateSlug = (title: string, documentId: string): string => {
    // Use documentId as the slug for API compatibility
    return documentId
  }

  return {
    id: strapiArticle.documentId,
    title: strapiArticle.title,
    slug: generateSlug(strapiArticle.title, strapiArticle.documentId),
    excerpt: strapiArticle.description,
    content: contentToHtml(strapiArticle.content),
    image: getImage(strapiArticle.cover?.url),
    category: strapiArticle.category ? {
      id: strapiArticle.category.slug,
      name: strapiArticle.category.name,
      slug: strapiArticle.category.slug,
    } : {
      id: "uncategorized",
      name: "Uncategorized",
      slug: "uncategorized",
    },
    tags: [], // Strapi doesn't seem to have tags in the current structure
    author: strapiArticle.author ? {
      id: strapiArticle.author.slug || strapiArticle.author.email,
      name: strapiArticle.author.name,
      bio: strapiArticle.author.bio?.[0]?.children?.[0]?.text || "",
      avatar: getAuthorAvatar(strapiArticle.author.avatar?.url),
      slug: strapiArticle.author.slug || strapiArticle.author.email,
    } : {
      id: "anonymous",
      name: "Anonymous",
      bio: "",
      avatar: undefined,
      slug: "anonymous",
    },
    publishedAt: strapiArticle.publishedAt,
    featured: strapiArticle.featured || false,
    views: strapiArticle.views || 0,
  }
}

// Generic fetch function with error handling
async function fetchAPI(endpoint: string): Promise<any> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error)
    
    // If it's a network error, return empty data instead of throwing
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      console.log(`Network error for ${endpoint}, returning empty data`)
      return { articles: [], data: null }
    }
    
    throw error
  }
}

// Article API functions
export async function getArticles(): Promise<Article[]> {
  try {
    const data = await fetchAPI("/articles/posts")
    const articles: StrapiArticle[] = data.articles || []
    return articles.map(mapStrapiArticleToArticle)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    // Since we're using documentId as slug, we can use it directly
    const data = await fetchAPI(`/articles/post/${slug}`)
    if (data.success && data.data?.article) {
      return mapStrapiArticleToArticle(data.data.article)
    }
    return null
  } catch (error) {
    console.error("Error fetching article by slug:", error)
    return null
  }
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  try {
    const data = await fetchAPI("/articles/posts")
    const articles: StrapiArticle[] = data.articles || []
    const featuredArticles = articles.filter((article: StrapiArticle) => article.featured === true)
    return featuredArticles.slice(0, limit).map(mapStrapiArticleToArticle)
  } catch (error) {
    console.error("Error fetching featured articles:", error)
    return []
  }
}

export async function getLatestArticles(limit = 10): Promise<Article[]> {
  try {
    const data = await fetchAPI("/articles/posts")
    const articles: StrapiArticle[] = data.articles || []
    // Sort by publishedAt in descending order
    const sortedArticles = articles.sort((a: StrapiArticle, b: StrapiArticle) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    return sortedArticles.slice(0, limit).map(mapStrapiArticleToArticle)
  } catch (error) {
    console.error("Error fetching latest articles:", error)
    return []
  }
}

export async function getTopArticles(limit = 3): Promise<Article[]> {
  try {
    const data = await fetchAPI("/articles/posts")
    const articles: StrapiArticle[] = data.articles || []
    // Sort by views in descending order
    const sortedArticles = articles.sort((a: StrapiArticle, b: StrapiArticle) => (b.views || 0) - (a.views || 0))
    return sortedArticles.slice(0, limit).map(mapStrapiArticleToArticle)
  } catch (error) {
    console.error("Error fetching top articles:", error)
    return []
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    const data = await fetchAPI("/articles/posts")
    const articles: StrapiArticle[] = data.articles || []
    const filteredArticles = articles.filter((article: StrapiArticle) => 
      article.category?.slug === categorySlug
    )
    return filteredArticles.map(mapStrapiArticleToArticle)
  } catch (error) {
    console.error("Error fetching articles by category:", error)
    return []
  }
}

export async function getArticlesByTag(tagSlug: string): Promise<Article[]> {
  // Since Strapi doesn't seem to have tags in the current structure,
  // we'll return an empty array for now
  return []
}

export async function getArticlesByAuthor(authorSlug: string): Promise<Article[]> {
  try {
    const data = await fetchAPI("/articles/posts")
    const articles: StrapiArticle[] = data.articles || []
    const filteredArticles = articles.filter((article: StrapiArticle) => 
      article.author?.slug === authorSlug || article.author?.email === authorSlug
    )
    return filteredArticles.map(mapStrapiArticleToArticle)
  } catch (error) {
    console.error("Error fetching articles by author:", error)
    return []
  }
}

export async function getRelatedArticles(
  currentArticleId: string,
  category: Category,
  tags: Tag[],
  limit = 3,
): Promise<Article[]> {
  try {
    const data = await fetchAPI("/articles/posts")
    const articles: StrapiArticle[] = data.articles || []
    
    // Filter out the current article and get articles from the same category
    const relatedArticles = articles
      .filter((article: StrapiArticle) => 
        article.documentId !== currentArticleId && 
        article.category?.slug === category.slug
      )
      .slice(0, limit)
    
    return relatedArticles.map(mapStrapiArticleToArticle)
  } catch (error) {
    console.error("Error fetching related articles:", error)
    return []
  }
}

// Author API functions - using data from articles
export async function getAuthors(): Promise<Author[]> {
  try {
    const data = await fetchAPI("/articles/posts")
    const articles: StrapiArticle[] = data.articles || []
    
    // Extract unique authors from articles
    const authorMap = new Map<string, Author>()
    
    articles.forEach((article: StrapiArticle) => {
      if (article.author) {
        const authorId = article.author.slug || article.author.email
        if (!authorMap.has(authorId)) {
          authorMap.set(authorId, {
            id: authorId,
            name: article.author.name,
            bio: article.author.bio?.[0]?.children?.[0]?.text || "",
            avatar: getAuthorAvatar(article.author.avatar?.url),
            slug: authorId,
          })
        }
      }
    })
    
    return Array.from(authorMap.values())
  } catch (error) {
    console.error("Error fetching authors:", error)
    return []
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const authors = await getAuthors()
    return authors.find(author => author.slug === slug) || null
  } catch (error) {
    console.error("Error fetching author by slug:", error)
    return null
  }
}

// Category API functions - using data from articles
export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchAPI("/articles/posts")
    const articles: StrapiArticle[] = data.articles || []
    
    // Extract unique categories from articles
    const categoryMap = new Map<string, Category>()
    
    articles.forEach((article: StrapiArticle) => {
      if (article.category) {
        if (!categoryMap.has(article.category.slug)) {
          categoryMap.set(article.category.slug, {
            id: article.category.slug,
            name: article.category.name,
            slug: article.category.slug,
          })
        }
      }
    })
    
    return Array.from(categoryMap.values())
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await getCategories()
    return categories.find(category => category.slug === slug) || null
  } catch (error) {
    console.error("Error fetching category by slug:", error)
    return null
  }
}

// Tag API functions - returning empty for now since Strapi doesn't have tags
export async function getTags(): Promise<Tag[]> {
  return []
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  return null
}
