import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCategories, getArticlesByCategory } from "@/lib/api"
import { Folder, FileText, TrendingUp, Users, Calendar } from "lucide-react"

export default async function CategoriesPage() {
  const categories = await getCategories()

  // Get article counts and additional stats for each category
  const categoriesWithStats = await Promise.all(
    categories.map(async (category) => {
      const articles = await getArticlesByCategory(category.slug)
      const totalViews = articles.reduce((sum, article) => sum + article.views, 0)
      const latestArticle = articles.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )[0]

      return {
        ...category,
        articleCount: articles.length,
        totalViews,
        latestArticle,
        authors: [...new Set(articles.map((a) => a.author.name))].length,
      }
    }),
  )

  // Sort by article count
  const sortedCategories = categoriesWithStats.sort((a, b) => b.articleCount - a.articleCount)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Folder className="w-4 h-4" />
            Explore by Category
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Discover Your Interests
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Dive deep into specific technology domains. From AI and machine learning to web development and startups,
            find expertly curated content that matches your interests.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{categories.length}</div>
              <div className="text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {categoriesWithStats.reduce((sum, cat) => sum + cat.articleCount, 0)}
              </div>
              <div className="text-muted-foreground">Total Articles</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {categoriesWithStats.reduce((sum, cat) => sum + cat.authors, 0)}
              </div>
              <div className="text-muted-foreground">Expert Authors</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCategories.map((category, index) => (
            <Card
              key={category.slug}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <Folder className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    {index < 3 && (
                      <Badge variant="default" className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {category.articleCount} articles
                    </Badge>
                  </div>
                </div>

                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                  {category.name}
                </CardTitle>

                {category.description && (
                  <CardDescription className="text-sm leading-relaxed">{category.description}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="relative space-y-4">
                {/* Category Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <FileText className="w-3 h-3" />
                      Articles
                    </div>
                    <div className="font-semibold">{category.articleCount}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <Users className="w-3 h-3" />
                      Authors
                    </div>
                    <div className="font-semibold">{category.authors}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <TrendingUp className="w-3 h-3" />
                      Views
                    </div>
                    <div className="font-semibold">{(category.totalViews / 1000).toFixed(1)}K</div>
                  </div>
                </div>

                {/* Latest Article */}
                {category.latestArticle && (
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      Latest Article
                    </div>
                    <Link
                      href={`/articles/${category.latestArticle.slug}`}
                      className="text-sm font-medium hover:text-primary transition-colors line-clamp-1"
                    >
                      {category.latestArticle.title}
                    </Link>
                  </div>
                )}

                <Button
                  asChild
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  <Link href={`/categories/${category.slug}`}>Explore {category.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedCategories.length === 0 && (
          <div className="text-center py-16">
            <Folder className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h2 className="text-3xl font-semibold mb-4">No Categories Found</h2>
            <p className="text-muted-foreground text-lg">Categories will appear here once they are created.</p>
          </div>
        )}
      </div>
    </div>
  )
}
