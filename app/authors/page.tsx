import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAuthors, getArticlesByAuthor } from "@/lib/api"
import { User, FileText, TrendingUp, Calendar, Award } from "lucide-react"
import { formatRelativeDate } from "@/lib/utils"

export default async function AuthorsPage() {
  const authors = await getAuthors()

  // Get article counts and stats for each author
  const authorsWithStats = await Promise.all(
    authors.map(async (author) => {
      const articles = await getArticlesByAuthor(author.slug)
      const totalViews = articles.reduce((sum, article) => sum + article.views, 0)
      const latestArticle = articles.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )[0]
      const featuredCount = articles.filter((a) => a.featured).length

      return {
        ...author,
        articleCount: articles.length,
        totalViews,
        latestArticle,
        featuredCount,
        avgViews: articles.length > 0 ? Math.round(totalViews / articles.length) : 0,
      }
    }),
  )

  // Sort by article count
  const sortedAuthors = authorsWithStats.sort((a, b) => b.articleCount - a.articleCount)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <User className="w-4 h-4" />
            Meet Our Authors
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Expert Tech Writers
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Get to know the brilliant minds behind our content. Our authors are industry experts, developers, and
            thought leaders sharing their insights and expertise.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{authors.length}</div>
              <div className="text-muted-foreground">Expert Authors</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {authorsWithStats.reduce((sum, author) => sum + author.articleCount, 0)}
              </div>
              <div className="text-muted-foreground">Articles Published</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round(authorsWithStats.reduce((sum, author) => sum + author.totalViews, 0) / 1000)}K
              </div>
              <div className="text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {authorsWithStats.reduce((sum, author) => sum + author.featuredCount, 0)}
              </div>
              <div className="text-muted-foreground">Featured Articles</div>
            </CardContent>
          </Card>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedAuthors.map((author, index) => (
            <Card
              key={author.slug}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="text-center relative">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <AvatarImage
                        src={author.avatar || "/placeholder.svg?height=150&width=150&query=author"}
                        alt={author.name}
                      />
                      <AvatarFallback className="text-2xl font-bold">{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {index < 3 && (
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Award className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                  {author.name}
                </CardTitle>

                {author.bio && <CardDescription className="text-sm leading-relaxed">{author.bio}</CardDescription>}

                <div className="flex justify-center gap-2 mt-4">
                  <Badge variant="secondary" className="text-xs">
                    {author.articleCount} articles
                  </Badge>
                  {author.featuredCount > 0 && (
                    <Badge variant="default" className="text-xs">
                      {author.featuredCount} featured
                    </Badge>
                  )}
                  {index < 3 && (
                    <Badge variant="outline" className="text-xs border-primary text-primary">
                      Top Author
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="relative space-y-4">
                {/* Author Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <TrendingUp className="w-3 h-3" />
                      Total Views
                    </div>
                    <div className="font-semibold">{(author.totalViews / 1000).toFixed(1)}K</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <FileText className="w-3 h-3" />
                      Avg Views
                    </div>
                    <div className="font-semibold">{author.avgViews}</div>
                  </div>
                </div>

                {/* Latest Article */}
                {author.latestArticle && (
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      Latest Article • {formatRelativeDate(author.latestArticle.publishedAt)}
                    </div>
                    <Link
                      href={`/articles/${author.latestArticle.slug}`}
                      className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                    >
                      {author.latestArticle.title}
                    </Link>
                  </div>
                )}

                <Button
                  asChild
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  <Link href={`/authors/${author.slug}`}>View {author.name}'s Articles</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedAuthors.length === 0 && (
          <div className="text-center py-16">
            <User className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h2 className="text-3xl font-semibold mb-4">No Authors Found</h2>
            <p className="text-muted-foreground text-lg">Authors will appear here once they are added.</p>
          </div>
        )}
      </div>
    </div>
  )
}
