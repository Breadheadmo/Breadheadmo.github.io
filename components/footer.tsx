import Link from "next/link"
import Image from "next/image"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/memeburn.png" 
                alt="Memeburn" 
                width={120} 
                height={40} 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Your premier destination for African technology news and innovation insights.
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
                <Link href="/categories/african" className="text-muted-foreground hover:text-primary">
                  African Tech
                </Link>
              </li>
              <li>
                <Link href="/categories/mobile" className="text-muted-foreground hover:text-primary">
                  Mobile & Fintech
                </Link>
              </li>
              <li>
                <Link href="/categories/startups" className="text-muted-foreground hover:text-primary">
                  Startups & Innovation
                </Link>
              </li>
            </ul>
          </div>


        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Memeburn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
