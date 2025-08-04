import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getLatestArticles } from "@/lib/api"
import { formatRelativeDate } from "@/lib/utils"
import { Clock, Eye } from "lucide-react"

export async function LatestArticles() {
  try {
    const latestArticles = await getLatestArticles(8)

    return (
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h2 className="text-3xl font-bold">Latest Articles</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/articles">View All Articles</Link>
          </Button>
        </div>

        {latestArticles.length > 0 ? (
          <div className="space-y-8">
            {latestArticles.map((article, index) => (
              <Card
                key={article.slug}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Article Image */}
                    {article.image && (
                      <div className="relative w-full md:w-64 h-48 md:h-40 flex-shrink-0 rounded-lg overflow-hidden">
                        <Link href={`/articles/${article.slug}`}>
                          <Image
                            src={article.image || "/placeholder.svg?height=400&width=600&query=tech+news+article"}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      </div>
                    )}

                    {/* Article Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {article.category.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{formatRelativeDate(article.publishedAt)}</span>
                        {article.featured && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <Badge variant="default" className="text-xs">
                              Featured
                            </Badge>
                          </>
                        )}
                      </div>

                      <Link href={`/articles/${article.slug}`}>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>

                      {article.excerpt && (
                        <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                      )}

                      {/* Article Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/authors/${article.author.slug}`}
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={article.author.avatar || "/placeholder.svg?height=50&width=50&query=author"}
                                alt={article.author.name}
                              />
                              <AvatarFallback className="text-xs">{article.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="text-sm font-medium">{article.author.name}</span>
                              {article.author.bio && (
                                <p className="text-xs text-muted-foreground">{article.author.bio}</p>
                              )}
                            </div>
                          </Link>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {article.tags.slice(0, 3).map((tag) => (
                            <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                              <Badge
                                variant="outline"
                                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                #{tag.name}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No articles available at the moment.</p>
          </div>
        )}
      </section>
    )
  } catch (error) {
    console.error("Error loading latest articles:", error)
    return (
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-primary rounded-full"></div>
          <h2 className="text-3xl font-bold">Latest Articles</h2>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <p>Unable to load articles. Please try again later.</p>
        </div>
      </section>
    )
  }
}
