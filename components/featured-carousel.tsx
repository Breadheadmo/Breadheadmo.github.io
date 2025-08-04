import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getTopArticles } from "@/lib/api"
import { formatRelativeDate } from "@/lib/utils"
import { Eye, Clock, User } from "lucide-react"

export async function FeaturedCarousel() {
  try {
    const topArticles = await getTopArticles(3)

    if (!topArticles.length) {
      return (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h2 className="text-3xl font-bold">Most Viewed This Week</h2>
          </div>
          <div className="text-center py-12 text-muted-foreground">
            <p>No featured articles available at the moment.</p>
          </div>
        </section>
      )
    }

    return (
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-primary rounded-full"></div>
          <h2 className="text-3xl font-bold">Most Viewed This Week</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article (Large) */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 h-full">
              <CardContent className="p-0">
                <Link href={`/articles/${topArticles[0].slug}`}>
                  <div className="relative">
                    {topArticles[0].image && (
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={topArticles[0].image || "/placeholder.svg?height=600&width=800&query=tech+news"}
                          alt={topArticles[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge variant="secondary" className="mb-3 bg-white/90 text-black">
                            {topArticles[0].category.name}
                          </Badge>
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                            {topArticles[0].title}
                          </h3>
                          {topArticles[0].excerpt && (
                            <p className="text-white/90 text-sm line-clamp-2 mb-3">{topArticles[0].excerpt}</p>
                          )}
                          <div className="flex items-center gap-4 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage
                                  src={
                                    topArticles[0].author.avatar || "/placeholder.svg?height=50&width=50&query=author"
                                  }
                                  alt={topArticles[0].author.name}
                                />
                                <AvatarFallback className="text-xs">
                                  {topArticles[0].author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{topArticles[0].author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatRelativeDate(topArticles[0].publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{topArticles[0].views.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            {topArticles.slice(1).map((article, index) => (
              <Card key={article.slug} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <Link href={`/articles/${article.slug}`}>
                    <div className="flex gap-4 p-4">
                      {article.image && (
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={article.image || "/placeholder.svg?height=200&width=200&query=tech+article"}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {article.category.name}
                        </Badge>
                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{article.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error loading featured carousel:", error)
    return (
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-primary rounded-full"></div>
          <h2 className="text-3xl font-bold">Most Viewed This Week</h2>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <p>Unable to load featured articles. Please try again later.</p>
        </div>
      </section>
    )
  }
}
