import { Card, CardContent } from "@/components/ui/card"
import { getArticles, getAuthors, getCategories } from "@/lib/api"
import { FileText, Users, Folder, TrendingUp } from "lucide-react"

export async function StatsSection() {
  const [articles, authors, categories] = await Promise.all([getArticles(), getAuthors(), getCategories()])

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0)

  const stats = [
    {
      label: "Articles Published",
      value: articles.length.toLocaleString(),
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      label: "Expert Authors",
      value: authors.length.toLocaleString(),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: "Categories",
      value: categories.length.toLocaleString(),
      icon: Folder,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      label: "Total Views",
      value: `${(totalViews / 1000).toFixed(1)}K`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <CardContent className="p-6 text-center">
            <div className={`inline-flex p-3 rounded-full ${stat.bgColor} mb-3`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
