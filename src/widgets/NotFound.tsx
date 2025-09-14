import { Link } from '@tanstack/react-router'
import { Clock, MapPin, Star } from 'lucide-react'
import { Button, Card } from '@/shared/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/Cascade.webp')] bg-no-repeat bg-cover 
        bg-[position:center_40%] sm:bg-[position:center_45%] md:bg-[position:center_50%] lg:bg-center"
      />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <Card className="max-w-2xl w-full p-8 md:p-12 text-center bg-card/95 backdrop-blur-sm border-border/50 shadow-2xl">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-black text-primary/20 leading-none">404</h1>
          </div>

          {/* Main message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              {"Oops! We couldn't find that page."}
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              {"It seems the page you are looking for doesn't exist. "}
              {'Try exploring our guide to discover the hedonistic delights of Yerevan.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" variant="armenian">
              <Link to="/">Go to Home</Link>
            </Button>
          </div>

          {/* Popular links */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Or check out the following itineraries:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                to="/itineraries/$id"
                params={{
                  id: 'yerevan-1day',
                }}
              >
                <Button size="lg" variant="armenian">
                  <Clock className="w-5 h-5 mr-2" />
                  1-Day Journey
                </Button>
              </Link>
              <Link to={'/itineraries/$id'} params={{ id: 'yerevan-3day' }}>
                <Button size="lg" variant="armenianGold">
                  <MapPin className="w-5 h-5 mr-2" />
                  3-Day Adventure
                </Button>
              </Link>
              <Link to={'/itineraries/$id'} params={{ id: 'yerevan-7day' }}>
                <Button size="lg" variant="armenianBrown">
                  <Star className="w-5 h-5 mr-2" />
                  7-Day Experience
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-60"></div>
    </div>
  )
}
