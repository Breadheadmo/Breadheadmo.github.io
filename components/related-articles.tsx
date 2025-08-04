import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRelatedArticles } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import type { Category, Tag } from "@/lib/types"

interface RelatedArticlesProps {
  currentArticleId: string
  category: Category
  tags: Tag[]
}

export async function RelatedArticles({ currentArticleId, category, tags }: RelatedArticlesProps) {
  const relatedArticles = await getRelatedArticles(currentArticleId, category, tags, 3)

  if (!relatedArticles.length) return null

  return (
    <section className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle>Related Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {relatedArticles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="block group">
              <div className="flex gap-4">
                {article.image && (
                  <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
