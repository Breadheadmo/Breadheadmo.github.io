import Link from "next/link"
import { Image } from "@/components/ui/image"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/lib/types"

interface ArticleGridProps {
  articles: Article[]
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card key={article.slug} className="overflow-hidden group hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <Link href={`/articles/${article.slug}`}>
              {article.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{article.category.name}</Badge>
                  <span className="text-sm text-muted-foreground">{formatDate(article.publishedAt)}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                )}
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                    <AvatarFallback className="text-xs">{article.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{article.author.name}</span>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
