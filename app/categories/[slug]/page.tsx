import { notFound } from "next/navigation"
import { ArticleGrid } from "@/components/article-grid"
import { getCategoryBySlug, getArticlesByCategory } from "@/lib/api"
import { Breadcrumb } from "@/components/breadcrumb"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, articles] = await Promise.all([getCategoryBySlug(params.slug), getArticlesByCategory(params.slug)])

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Categories", href: "/categories" }, { label: category.name }]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && <p className="text-xl text-muted-foreground">{category.description}</p>}
      </header>

      <ArticleGrid articles={articles} />
    </div>
  )
}
