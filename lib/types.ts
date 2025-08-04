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
