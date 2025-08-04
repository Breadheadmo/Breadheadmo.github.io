import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTags, getArticlesByTag } from "@/lib/api"
import { Tag, FileText } from "lucide-react"

export default async function TagsPage() {
  const tags = await getTags()

  // Get article counts for each tag
  const tagsWithCounts = await Promise.all(
    tags.map(async (tag) => {
      const articles = await getArticlesByTag(tag.slug)
      return {
        ...tag,
        articleCount: articles.length,
      }
    }),
  )

  // Sort tags by article count (most popular first)
  const sortedTags = tagsWithCounts.sort((a, b) => b.articleCount - a.articleCount)

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Tags</h1>
        <p className="text-xl text-muted-foreground">
          Browse articles by tags to find content on specific topics and technologies.
        </p>
      </header>

      {/* Popular Tags Section */}
      {sortedTags.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Popular Tags</h2>
          <div className="flex flex-wrap gap-3">
            {sortedTags.slice(0, 10).map((tag) => (
              <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                <Badge
                  variant="outline"
                  className="text-lg py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  #{tag.name}
                  <span className="ml-2 text-xs opacity-70">({tag.articleCount})</span>
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Tags Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">All Tags</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedTags.map((tag) => (
            <Link key={tag.slug} href={`/tags/${tag.slug}`}>
              <Card className="hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Tag className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">#{tag.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {tag.articleCount} articles
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <FileText className="w-3 h-3" />
                      <span>View articles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {sortedTags.length === 0 && (
        <div className="text-center py-12">
          <Tag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Tags Found</h2>
          <p className="text-muted-foreground">Tags will appear here once articles are tagged.</p>
        </div>
      )}
    </div>
  )
}
