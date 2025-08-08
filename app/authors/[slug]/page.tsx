import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArticleGrid } from "@/components/article-grid"
import { getAuthorBySlug, getArticlesByAuthor, getAuthors } from "@/lib/api"
import { Breadcrumb } from "@/components/breadcrumb"

interface AuthorPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const [author, articles] = await Promise.all([getAuthorBySlug(params.slug), getArticlesByAuthor(params.slug)])

  if (!author) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Authors", href: "/authors" }, { label: author.name }]} />
      <header className="mb-8">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
            <AvatarFallback className="text-2xl">{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold mb-2">{author.name}</h1>
            {author.bio && <p className="text-xl text-muted-foreground">{author.bio}</p>}
          </div>
        </div>
      </header>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Articles by {author.name} ({articles.length})
        </h2>
      </div>

      <ArticleGrid articles={articles} />
    </div>
  )
}
