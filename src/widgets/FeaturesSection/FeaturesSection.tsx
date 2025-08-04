import { Clock, MapPin, Star, Utensils } from 'lucide-react'
import { Card } from '@/shared/ui'

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-background" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-5xl font-bold text-armenian-red mb-8">
            Discover Yerevan: <br /> A Hedonist’s Culinary & Cultural Guide
          </h2>
          <div className="space-y-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            <p>
              ✨{' '}
              <span className="font-semibold">
                Ditch the tour bus, grab a fork.
              </span>
              <br />
              Tired of travel apps that drag you through cathedrals and
              monuments like you're on a school trip? We feel you. Welcome to
              hedonistic tourism 2.0 — a flavorful journey through Yerevan’s
              culinary soul.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Food Itineraries */}
          <Card className="flex flex-col items-center text-center p-8 group overflow-hidden border-armenian-red/20 hover:border-armenian-red/40 transition-all duration-300 hover:shadow-lg animate-slide-in-left">
            <div className="w-16 h-16 mb-4 bg-armenian-red rounded-full flex items-center justify-center text-white text-3xl shadow-md">
              <Utensils className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-armenian-red mb-2">
              Curated Food Itineraries
            </h3>
            <p className="text-base text-muted-foreground">
              Handpicked breakfast, lunch, dinner, and snack stops for 1, 3, or
              7 days — no tourist traps, just pure flavor.
            </p>
          </Card>
          {/* Feature 2: Interactive Map & Local Secrets */}
          <Card
            className="flex flex-col items-center text-center p-8 group overflow-hidden border-armenian-gold/20 hover:border-armenian-gold/40 transition-all duration-300 hover:shadow-lg animate-slide-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-16 h-16 mb-4 bg-armenian-gold rounded-full flex items-center justify-center text-white text-3xl shadow-md">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-armenian-gold mb-2">
              Interactive Maps & Local Secrets
            </h3>
            <p className="text-base text-muted-foreground">
              Explore Yerevan with juicy animations, interactive maps, and
              insider tips you won’t find in any guidebook.
            </p>
          </Card>
          {/* Feature 3: Printable Guide */}
          <Card
            className="flex flex-col items-center text-center p-8 group overflow-hidden border-armenian-brown/20 hover:border-armenian-brown/40 transition-all duration-300 hover:shadow-lg animate-slide-in-right"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="w-16 h-16 mb-4 bg-armenian-brown rounded-full flex items-center justify-center text-white text-3xl shadow-md">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-armenian-brown mb-2">
              Printable Guide
            </h3>
            <p className="text-base text-muted-foreground">
              Print your personalized guide and roam the city offline — perfect
              for analog rebels and paper lovers.
            </p>
          </Card>
        </div>
        <div className="flex justify-center mt-14">
          <div className="rounded-xl bg-armenian-orange text-white px-8 py-6 shadow-lg max-w-2xl w-full">
            <p className="text-2xl font-semibold text-center">
              This isn’t about “seeing the sights.”
              <br />
              It’s about tasting the city — and falling in love with it, one
              bite at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default FeaturesSection
