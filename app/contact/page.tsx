import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have a story tip, feedback, or just want to say hello? We'd love to hear from you.
          </p>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="w-5 h-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>editorial@techpulse.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="w-5 h-5" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  123 Tech Street
                  <br />
                  San Francisco, CA 94105
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Editorial Guidelines</h2>
          <div className="prose dark:prose-invert">
            <p>
              We welcome story tips and press releases. Please note that we receive a high volume of submissions and may
              not be able to respond to every inquiry.
            </p>

            <h3>For Press Releases:</h3>
            <ul>
              <li>Send to: press@techpulse.com</li>
              <li>Include relevant images and assets</li>
              <li>Provide clear contact information</li>
            </ul>

            <h3>For Story Tips:</h3>
            <ul>
              <li>Send to: tips@techpulse.com</li>
              <li>Include as much detail as possible</li>
              <li>Provide sources when available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
