// API Response Types
export interface ApiResponse<T> {
  success?: boolean
  data?: T
  articles?: T[]
}

export interface StrapiArticle {
  documentId: string
  title: string
  content: string
  description: string
  featured: boolean | null
  author: StrapiAuthor | null
  category: StrapiCategory | null
  publishedAt: string
  slug: string | null
  views: number | null
  cover: StrapiCover | null
}

export interface StrapiAuthor {
  name: string
  email: string
  bio: StrapiBio[]
  slug: string | null
  avatar?: StrapiAvatar | null
}

export interface StrapiAvatar {
  documentId: string
  url: string
}

export interface StrapiBio {
  type: string
  children: StrapiBioChild[]
}

export interface StrapiBioChild {
  type: string
  text: string
}

export interface StrapiCategory {
  name: string
  slug: string
}

export interface StrapiCover {
  url: string
}

// Frontend Types (mapped from Strapi)
export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  image?: string
  category: Category
  tags: Tag[]
  author: Author
  publishedAt: string
  featured: boolean
  views: number
}

export interface Author {
  id: string
  name: string
  bio?: string
  avatar?: string
  slug: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}
