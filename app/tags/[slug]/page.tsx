import { notFound } from "next/navigation"
import { ArticleGrid } from "@/components/article-grid"
import { getTagBySlug, getArticlesByTag } from "@/lib/api"
import { Breadcrumb } from "@/components/breadcrumb"

interface TagPageProps {
  params: {
    slug: string
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const [tag, articles] = await Promise.all([getTagBySlug(params.slug), getArticlesByTag(params.slug)])

  if (!tag) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Tags", href: "/tags" }, { label: `#${tag.name}` }]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">#{tag.name}</h1>
        <p className="text-xl text-muted-foreground">Articles tagged with "{tag.name}"</p>
      </header>

      <ArticleGrid articles={articles} />
    </div>
  )
}
