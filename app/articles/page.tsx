"use client"

import { useState, useEffect, useMemo } from "react"
import { getArticles, getCategories } from "@/lib/api"
import { ArticleGrid } from "@/components/article-grid"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import Link from "next/link"
import { Article, Category } from "@/lib/types"



export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [articlesData, categoriesData] = await Promise.all([
          getArticles(),
          getCategories()
        ])
        setArticles(articlesData)
        setCategories(categoriesData)
      } catch (err) {
        console.error("Error loading articles page:", err)
        setError("Failed to load articles. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(query) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(query)) ||
        article.author.name.toLowerCase().includes(query) ||
        article.category.name.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((article) => article.category.slug === selectedCategory)
    }

    // Sort articles
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
        break
      case "popular":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [articles, searchQuery, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("newest")
  }

  const hasActiveFilters = searchQuery.trim() || selectedCategory !== "all" || sortBy !== "newest"

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <LoadingSpinner />
          <p className="text-muted-foreground mt-4">Loading articles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Articles</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Articles</h1>
        <p className="text-lg text-muted-foreground">
          Explore our complete collection of African tech news and innovation insights.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                {[searchQuery.trim() && "search", selectedCategory !== "all" && "category", sortBy !== "newest" && "sort"].filter(Boolean).length}
              </Badge>
            )}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-muted/30 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort articles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={selectedCategory === "all" ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setSelectedCategory("all")}
          >
            All Categories
          </Badge>
          {categories.map((category) => (
            <Badge 
              key={category.slug}
              variant={selectedCategory === category.slug ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredArticles.length} of {articles.length} articles
              {hasActiveFilters && " (filtered)"}
            </p>
          </div>
          <ArticleGrid articles={filteredArticles} />
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters 
                ? "No articles match your current filters. Try adjusting your search criteria."
                : "No articles are available at the moment."
              }
            </p>
            {hasActiveFilters ? (
              <Button onClick={clearFilters}>Clear Filters</Button>
            ) : (
              <Button asChild>
                <Link href="/">Return Home</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
