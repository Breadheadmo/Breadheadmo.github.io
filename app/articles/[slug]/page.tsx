import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RelatedArticles } from "@/components/related-articles"
import { formatDate } from "@/lib/utils"
import { getArticleBySlug, getArticles } from "@/lib/api"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Image */}
      {article.image && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href={`/categories/${article.category.slug}`}>
            <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
              {article.category.name}
            </Badge>
          </Link>
          <span className="text-muted-foreground">•</span>
          <time className="text-muted-foreground">{formatDate(article.publishedAt)}</time>
        </div>

        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

        {article.excerpt && <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>}

        {/* Author Info */}
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <Link href={`/authors/${article.author.slug}`}>
            <Avatar className="w-12 h-12">
              <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
              <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href={`/authors/${article.author.slug}`} className="font-semibold hover:underline">
              {article.author.name}
            </Link>
            {article.author.bio && <p className="text-sm text-muted-foreground">{article.author.bio}</p>}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div
        className="prose prose-lg max-w-none dark:prose-invert mb-8"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                  #{tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      <RelatedArticles currentArticleId={article.id} category={article.category} tags={article.tags} />
    </article>
  )
}
