import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTags, getArticlesByTag } from "@/lib/api"
import { TrendingUp, Hash } from "lucide-react"

export async function TrendingTopics() {
  const tags = await getTags()

  // Get article counts for each tag and sort by popularity
  const tagsWithCounts = await Promise.all(
    tags.map(async (tag) => {
      const articles = await getArticlesByTag(tag.slug)
      return {
        ...tag,
        articleCount: articles.length,
      }
    }),
  )

  const trendingTags = tagsWithCounts.sort((a, b) => b.articleCount - a.articleCount).slice(0, 8)

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingTags.map((tag, index) => (
          <Link key={tag.slug} href={`/tags/${tag.slug}`} className="block group">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium group-hover:text-primary transition-colors">{tag.name}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {tag.articleCount}
              </Badge>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
