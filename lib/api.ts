import type { Article, Author, Category, Tag } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://memburb-api-eunbs.ondigitalocean.app/api"

// Mock data for development/preview
const mockCategories: Category[] = [
  { id: "1", name: "AI & Machine Learning", slug: "ai", description: "Latest in artificial intelligence" },
  { id: "2", name: "Web Development", slug: "web-development", description: "Frontend and backend development" },
  { id: "3", name: "Mobile", slug: "mobile", description: "Mobile app development" },
  { id: "4", name: "Startups", slug: "startups", description: "Startup news and insights" },
]

const mockAuthors: Author[] = [
  {
    id: "1",
    name: "Sarah Chen",
    slug: "sarah-chen",
    bio: "Senior Tech Writer",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Mike Johnson",
    slug: "mike-johnson",
    bio: "AI Researcher",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    slug: "emily-rodriguez",
    bio: "Frontend Developer",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

const mockTags: Tag[] = [
  { id: "1", name: "React", slug: "react" },
  { id: "2", name: "TypeScript", slug: "typescript" },
  { id: "3", name: "Next.js", slug: "nextjs" },
  { id: "4", name: "AI", slug: "ai" },
  { id: "5", name: "Machine Learning", slug: "machine-learning" },
]

const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Future of AI in Web Development",
    slug: "future-ai-web-development",
    excerpt: "Exploring how artificial intelligence is revolutionizing the way we build web applications.",
    content:
      "<p>Artificial intelligence is transforming web development in unprecedented ways. From automated code generation to intelligent user interfaces, AI is becoming an integral part of the development process.</p><p>In this comprehensive guide, we'll explore the latest AI tools and techniques that are reshaping how developers approach web development projects.</p>",
    image: "/placeholder.svg?height=400&width=800",
    category: mockCategories[0],
    tags: [mockTags[3], mockTags[4]],
    author: mockAuthors[0],
    publishedAt: "2024-01-15T10:00:00Z",
    featured: true,
    views: 1250,
  },
  {
    id: "2",
    title: "Building Scalable React Applications with TypeScript",
    slug: "scalable-react-typescript",
    excerpt: "Learn best practices for building large-scale React applications using TypeScript.",
    content:
      "<p>TypeScript has become the go-to choice for building robust React applications. In this article, we'll dive deep into advanced patterns and best practices.</p><p>We'll cover everything from proper type definitions to advanced component patterns that will help you build maintainable applications.</p>",
    image: "/placeholder.svg?height=400&width=800",
    category: mockCategories[1],
    tags: [mockTags[0], mockTags[1]],
    author: mockAuthors[2],
    publishedAt: "2024-01-14T14:30:00Z",
    featured: true,
    views: 980,
  },
  {
    id: "3",
    title: "Next.js 15: What's New and Exciting",
    slug: "nextjs-15-whats-new",
    excerpt: "A comprehensive overview of the latest features and improvements in Next.js 15.",
    content:
      "<p>Next.js 15 brings exciting new features that will enhance your development experience. From improved performance to new APIs, there's a lot to explore.</p><p>Let's dive into the most significant updates and how they can benefit your projects.</p>",
    image: "/placeholder.svg?height=400&width=800",
    category: mockCategories[1],
    tags: [mockTags[2], mockTags[0]],
    author: mockAuthors[1],
    publishedAt: "2024-01-13T09:15:00Z",
    featured: false,
    views: 750,
  },
  {
    id: "4",
    title: "Mobile App Development Trends in 2024",
    slug: "mobile-app-trends-2024",
    excerpt: "Discover the latest trends shaping mobile app development this year.",
    content:
      "<p>Mobile app development continues to evolve rapidly. This year brings new frameworks, design patterns, and user experience innovations.</p><p>Stay ahead of the curve with these emerging trends and technologies.</p>",
    image: "/placeholder.svg?height=400&width=800",
    category: mockCategories[2],
    tags: [mockTags[0]],
    author: mockAuthors[0],
    publishedAt: "2024-01-12T16:45:00Z",
    featured: true,
    views: 1100,
  },
  {
    id: "5",
    title: "Startup Success Stories: Tech Unicorns of 2024",
    slug: "startup-success-stories-2024",
    excerpt: "Learn from the most successful tech startups that achieved unicorn status this year.",
    content:
      "<p>2024 has been an incredible year for tech startups. Several companies have achieved unicorn status, disrupting traditional industries.</p><p>Let's examine their strategies and what made them successful.</p>",
    image: "/placeholder.svg?height=400&width=800",
    category: mockCategories[3],
    tags: [mockTags[3]],
    author: mockAuthors[1],
    publishedAt: "2024-01-11T11:20:00Z",
    featured: false,
    views: 650,
  },
  {
    id: "6",
    title: "Machine Learning for Frontend Developers",
    slug: "machine-learning-frontend-developers",
    excerpt: "How frontend developers can leverage machine learning in their applications.",
    content:
      "<p>Machine learning isn't just for data scientists anymore. Frontend developers can now integrate ML capabilities directly into web applications.</p><p>Discover the tools and techniques that make this possible.</p>",
    image: "/placeholder.svg?height=400&width=800",
    category: mockCategories[0],
    tags: [mockTags[4], mockTags[0]],
    author: mockAuthors[2],
    publishedAt: "2024-01-10T13:10:00Z",
    featured: true,
    views: 890,
  },
]

// Generic fetch function with error handling and fallbacks
// Update the API_BASE_URL to point to the new backend
// API_BASE_URL is already declared at the top of the file

// Update the fetchAPI function to match the new API structure
async function fetchAPI(endpoint: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error)
    console.log("Falling back to mock data")
    return getMockData(endpoint)
  }
}

// Update the article API functions to match the new endpoints
async function getArticlesData(): Promise<Article[]> {
  const data = await fetchAPI("/articles/posts")
  return data?.articles || []
}

async function getArticleBySlugOld(slug: string): Promise<Article | null> {
  const articles = await getArticles()
  return articles.find(article => article.slug === slug) || null
}

async function getFeaturedArticlesOld(limit = 5): Promise<Article[]> {
  const articles = await getArticles()
  return articles
    .filter(article => article.featured)
    .slice(0, limit)
}

async function getLatestArticlesOld(limit = 10): Promise<Article[]> {
  const articles = await getArticles()
  return articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

async function getTopArticlesOld(limit = 3): Promise<Article[]> {
  const articles = await getArticles()
  return articles
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit)
}

async function getArticlesByCategoryOld(categorySlug: string): Promise<Article[]> {
  const articles = await getArticles()
  return articles.filter(article => article.category?.slug === categorySlug)
}

async function getArticlesByTagOld(tagSlug: string): Promise<Article[]> {
  const articles = await getArticles()
  return articles.filter(article => article.tags?.some(tag => tag.slug === tagSlug))
}

async function getArticlesByAuthorOld(authorSlug: string): Promise<Article[]> {
  const articles = await getArticles()
  return articles.filter(article => article.author?.slug === authorSlug)
}

export async function getRelatedArticles(
  currentArticleId: string,
  category: Category,
  tags: Tag[],
  limit = 3,
): Promise<Article[]> {
  // First try to get articles from the same category
  const data = await fetchAPI(
    `/articles?filters[category][slug][$eq]=${category.slug}&filters[id][$ne]=${currentArticleId}&populate=*&pagination[limit]=${limit}`,
  )

  let articles = data?.data || []

  if (articles.length < limit && tags.length > 0) {
    // If not enough articles, get articles with similar tags
    const tagSlugs = tags.map((tag) => tag.slug).join(",")
    const tagData = await fetchAPI(
      `/articles?filters[tags][slug][$in]=${tagSlugs}&filters[id][$ne]=${currentArticleId}&populate=*&pagination[limit]=${limit}`,
    )

    // Combine and deduplicate results
    const combined = [...articles, ...(tagData?.data || [])]
    const unique = combined.filter((article, index, self) => index === self.findIndex((a) => a.id === article.id))
    articles = unique
  }

  return articles.slice(0, limit)
}

// Author API functions


// Category API functions


// Tag API functions

// Remove duplicate implementation since getTagBySlug already exists
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const data = await fetchAPI(`/tags?filters[slug][$eq]=${slug}`)
  return data?.data?.[0] || null
}

// Mock data provider based on endpoint
function getMockData(endpoint: string): any {
  if (endpoint.includes("/articles")) {
    if (endpoint.includes("featured")) {
      return { data: mockArticles.filter((a) => a.featured) }
    }
    if (endpoint.includes("views:desc")) {
      return { data: [...mockArticles].sort((a, b) => b.views - a.views) }
    }
    if (endpoint.includes("publishedAt:desc")) {
      return {
        data: [...mockArticles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
      }
    }
    if (endpoint.includes("category")) {
      const categorySlug = endpoint.match(/category\]\[slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockArticles.filter((a) => a.category.slug === categorySlug) }
    }
    if (endpoint.includes("tags")) {
      const tagSlug = endpoint.match(/tags\]\[slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockArticles.filter((a) => a.tags.some((t) => t.slug === tagSlug)) }
    }
    if (endpoint.includes("author")) {
      const authorSlug = endpoint.match(/author\]\[slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockArticles.filter((a) => a.author.slug === authorSlug) }
    }
    if (endpoint.includes("slug")) {
      const slug = endpoint.match(/slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockArticles.filter((a) => a.slug === slug) }
    }
    return { data: mockArticles }
  }

  if (endpoint.includes("/authors")) {
    if (endpoint.includes("slug")) {
      const slug = endpoint.match(/slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockAuthors.filter((a) => a.slug === slug) }
    }
    return { data: mockAuthors }
  }

  if (endpoint.includes("/categories")) {
    if (endpoint.includes("slug")) {
      const slug = endpoint.match(/slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockCategories.filter((c) => c.slug === slug) }
    }
    return { data: mockCategories }
  }

  if (endpoint.includes("/tags")) {
    if (endpoint.includes("slug")) {
      const slug = endpoint.match(/slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockTags.filter((t) => t.slug === slug) }
    }
    return { data: mockTags }
  }

  return { data: [] }
}

// Article API functions
// Removed duplicate getArticlesData function since it's already defined
  const data = await fetchAPI("/articles?populate=*")
  return data?.data || []
}

async function getArticleBySlugData(slug: string): Promise<Article | null> {
  const data = await fetchAPI(`/articles?filters[slug][$eq]=${slug}&populate=*`)
  return data?.data?.[0] || null
}

async function getFeaturedArticlesData(limit = 5): Promise<Article[]> {
  const data = await fetchAPI(`/articles?filters[featured][$eq]=true&populate=*&pagination[limit]=${limit}`)
  return (data?.data || []).slice(0, limit)
}

async function getLatestArticlesData(limit = 10): Promise<Article[]> {
  const data = await fetchAPI(`/articles?sort[0]=publishedAt:desc&populate=*&pagination[limit]=${limit}`)
  return (data?.data || []).slice(0, limit)
}

async function getTopArticlesData(limit = 3): Promise<Article[]> {
  const data = await fetchAPI(`/articles?sort[0]=views:desc&populate=*&pagination[limit]=${limit}`)
  return (data?.data || []).slice(0, limit)
}

async function getArticlesByCategoryData(categorySlug: string): Promise<Article[]> {
  const data = await fetchAPI(`/articles?filters[category][slug][$eq]=${categorySlug}&populate=*`)
  return data?.data || []
}

async function getArticlesByTagData(tagSlug: string): Promise<Article[]> {
  const data = await fetchAPI(`/articles?filters[tags][slug][$eq]=${tagSlug}&populate=*`)
  return data?.data || []
}

async function getArticlesByAuthorData(authorSlug: string): Promise<Article[]> {
  const data = await fetchAPI(`/articles?filters[author][slug][$eq]=${authorSlug}&populate=*`)
  return data?.data || []
}


// Author API functions


// Category API functions


// Tag API functions


// Mock data provider based on endpoint
function getMockData(endpoint: string): any {
  if (endpoint.includes("/articles")) {
    if (endpoint.includes("featured")) {
      return { data: mockArticles.filter((a) => a.featured) }
    }
    if (endpoint.includes("views:desc")) {
      return { data: [...mockArticles].sort((a, b) => b.views - a.views) }
    }
    if (endpoint.includes("publishedAt:desc")) {
      return {
        data: [...mockArticles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
      }
    }
    if (endpoint.includes("category")) {
      const categorySlug = endpoint.match(/category\]\[slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockArticles.filter((a) => a.category.slug === categorySlug) }
    }
    if (endpoint.includes("tags")) {
      const tagSlug = endpoint.match(/tags\]\[slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockArticles.filter((a) => a.tags.some((t) => t.slug === tagSlug)) }
    }
    if (endpoint.includes("author")) {
      const authorSlug = endpoint.match(/author\]\[slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockArticles.filter((a) => a.author.slug === authorSlug) }
    }
    if (endpoint.includes("slug")) {
      const slug = endpoint.match(/slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockArticles.filter((a) => a.slug === slug) }
    }
    return { data: mockArticles }
  }

  if (endpoint.includes("/authors")) {
    if (endpoint.includes("slug")) {
      const slug = endpoint.match(/slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockAuthors.filter((a) => a.slug === slug) }
    }
    return { data: mockAuthors }
  }

  if (endpoint.includes("/categories")) {
    if (endpoint.includes("slug")) {
      const slug = endpoint.match(/slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockCategories.filter((c) => c.slug === slug) }
    }
    return { data: mockCategories }
  }

  if (endpoint.includes("/tags")) {
    if (endpoint.includes("slug")) {
      const slug = endpoint.match(/slug\]\[\$eq\]=([^&]+)/)?.[1]
      return { data: mockTags.filter((t) => t.slug === slug) }
    }
    return { data: mockTags }
  }

  return { data: [] }
}

// Article API functions
export async function getArticles(): Promise<Article[]> {
  const data = await fetchAPI("/articles?populate=*")
  return data?.data || []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await fetchAPI(`/articles?filters[slug][$eq]=${slug}&populate=*`)
  return data?.data?.[0] || null
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  const data = await fetchAPI(`/articles?filters[featured][$eq]=true&populate=*&pagination[limit]=${limit}`)
  return (data?.data || []).slice(0, limit)
}

export async function getLatestArticles(limit = 10): Promise<Article[]> {
  const data = await fetchAPI(`/articles?sort[0]=publishedAt:desc&populate=*&pagination[limit]=${limit}`)
  return (data?.data || []).slice(0, limit)
}

export async function getTopArticles(limit = 3): Promise<Article[]> {
  const data = await fetchAPI(`/articles?sort[0]=views:desc&populate=*&pagination[limit]=${limit}`)
  return (data?.data || []).slice(0, limit)
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const data = await fetchAPI(`/articles?filters[category][slug][$eq]=${categorySlug}&populate=*`)
  return data?.data || []
}

export async function getArticlesByTag(tagSlug: string): Promise<Article[]> {
  const data = await fetchAPI(`/articles?filters[tags][slug][$eq]=${tagSlug}&populate=*`)
  return data?.data || []
}

export async function getArticlesByAuthor(authorSlug: string): Promise<Article[]> {
  const data = await fetchAPI(`/articles?filters[author][slug][$eq]=${authorSlug}&populate=*`)
  return data?.data || []
}


// Author API functions
export async function getAuthors(): Promise<Author[]> {
  const data = await fetchAPI("/authors")
  return data?.data || []
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const data = await fetchAPI(`/authors?filters[slug][$eq]=${slug}`)
  return data?.data?.[0] || null
}

// Category API functions
export async function getCategories(): Promise<Category[]> {
  const data = await fetchAPI("/categories")
  return data?.data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchAPI(`/categories?filters[slug][$eq]=${slug}`)
  return data?.data?.[0] || null
}

// Tag API functions
export async function getTags(): Promise<Tag[]> {
  const data = await fetchAPI("/tags")
  return data?.data || []
}


