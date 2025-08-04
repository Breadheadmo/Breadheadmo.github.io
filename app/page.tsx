import { Suspense } from "react"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { FeaturedArticles } from "@/components/featured-articles"
import { LatestArticles } from "@/components/latest-articles"
import { TrendingTopics } from "@/components/trending-topics"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { StatsSection } from "@/components/stats-section"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Stay Ahead of the Tech Curve
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover the latest in technology, AI, development, and innovation. Join thousands of tech professionals
              who trust TechPulse for their daily dose of tech insights.
            </p>
            <Suspense fallback={<LoadingSpinner />}>
              <StatsSection />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedCarousel />
          </Suspense>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Latest Articles */}
            <div className="lg:col-span-2">
              <Suspense fallback={<LoadingSpinner />}>
                <LatestArticles />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <Suspense fallback={<LoadingSpinner />}>
                <FeaturedArticles />
              </Suspense>

              <Suspense fallback={<LoadingSpinner />}>
                <TrendingTopics />
              </Suspense>

              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
