import { useState } from 'react'
import { Calendar, Mountain, Utensils, Wheat } from 'lucide-react'
import { Badge, Card } from '@/shared/ui'

export default function CuisineHighlights() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const highlights = [
    {
      title: 'Ancient Heritage',
      subtitle: '2000+ Years',
      description:
        "Armenian cuisine represents one of the world's oldest culinary traditions, with recipes passed down through millennia of rich cultural heritage.",
      image: '/heritage.webp',
      icon: Calendar,
      color: 'bg-armenian-red',
      textColor: 'text-armenian-red',
    },
    {
      title: 'Mountain Fresh',
      subtitle: 'Highland Ingredients',
      description:
        "Sourced from the pristine highlands of Armenia, capturing the pure essence of Ararat's fertile valleys and mountain springs.",
      image: '/fresh-herbs.webp',
      icon: Mountain,
      color: 'bg-armenian-gold',
      textColor: 'text-armenian-gold',
    },
    {
      title: 'Artisan Breads',
      subtitle: 'Sacred Traditions',
      description:
        'From paper-thin lavash to festive gata, Armenian breads tell stories of celebration, spirituality, and daily life through time-honored techniques.',
      image: 'armenian-food-lavash.webp',
      icon: Wheat,
      color: 'bg-armenian-brown',
      textColor: 'text-armenian-brown',
    },
    {
      title: 'Fire & Feast',
      subtitle: 'Khorovats Culture',
      description:
        'Master the art of Armenian barbecue, where fire becomes poetry and meat transforms into communal celebration under open skies.',
      image: 'kebab.webp',
      icon: Utensils,
      color: 'bg-armenian-orange',
      textColor: 'text-armenian-orange',
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Clean header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-armenian-red mb-4">Armenian Cuisine</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience authentic flavors that have survived empires and united families for over two millennia.
          </p>
        </div>

        {/* Static grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="cuisine-highlights-grid">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon

            return (
              <div key={index} onMouseEnter={() => setHoveredCard(index)} onMouseLeave={() => setHoveredCard(null)}>
                <Card
                  className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-0 bg-card py-0"
                  id="cuisine-highlight-card"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Clean image section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        hoveredCard === index ? 'scale-105' : ''
                      }`}
                    />

                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Simple icon */}
                    <div className={`absolute top-4 right-4 ${highlight.color} p-2 rounded-lg shadow-md animate-glow`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>

                    {/* Clean subtitle */}
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800 border-0 animate-glow">
                        {highlight.subtitle}
                      </Badge>
                    </div>
                  </div>

                  {/* Clean content section */}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold ${highlight.textColor} mb-3`}>{highlight.title}</h3>

                    <p className="text-muted-foreground leading-relaxed text-sm">{highlight.description}</p>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
