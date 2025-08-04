import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getFeaturedArticles } from "@/lib/api"
import { formatRelativeDate } from "@/lib/utils"
import { Star, Eye } from "lucide-react"

export async function FeaturedArticles() {
  try {
    const featuredArticles = await getFeaturedArticles(6)

    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Editor's Picks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {featuredArticles.length > 0 ? (
            featuredArticles.map((article, index) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="block group">
                <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>

                  {article.image && (
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg?height=100&width=100&query=tech+article"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {article.category.name}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatRelativeDate(article.publishedAt)}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No featured articles available.</p>
          )}
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error("Error loading featured articles:", error)
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Editor's Picks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Unable to load featured articles.</p>
        </CardContent>
      </Card>
    )
  }
}
