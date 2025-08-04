import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TechPulse</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your premier destination for the latest technology news and insights.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-muted-foreground hover:text-primary">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/tags" className="text-muted-foreground hover:text-primary">
                  Tags
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/ai" className="text-muted-foreground hover:text-primary">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/categories/web-development" className="text-muted-foreground hover:text-primary">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/categories/mobile" className="text-muted-foreground hover:text-primary">
                  Mobile
                </Link>
              </li>
              <li>
                <Link href="/categories/startups" className="text-muted-foreground hover:text-primary">
                  Startups
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Popular Tags</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tags/react" className="text-muted-foreground hover:text-primary">
                  #React
                </Link>
              </li>
              <li>
                <Link href="/tags/typescript" className="text-muted-foreground hover:text-primary">
                  #TypeScript
                </Link>
              </li>
              <li>
                <Link href="/tags/nextjs" className="text-muted-foreground hover:text-primary">
                  #Next.js
                </Link>
              </li>
              <li>
                <Link href="/tags/ai" className="text-muted-foreground hover:text-primary">
                  #AI
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TechPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
