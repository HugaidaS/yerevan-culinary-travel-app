import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  Calendar,
  Coffee,
  Cookie,
  DollarSign,
  Info,
  Leaf,
  MapPin,
  Printer,
  Star,
  Utensils,
  Wine,
} from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import MapComponent from './MapComponent'
import type { ItineraryWithDetails, MapLocation } from '@/shared/types'
import { Badge, Button, Card, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui'

interface ItineraryPageProps {
  itinerary: ItineraryWithDetails
}

const getTagIcon = (tagName: string) => {
  const tag = tagName.toLowerCase()
  switch (tag) {
    case 'coffee':
      return Coffee
    case 'breakfast':
    case 'lunch':
    case 'dinner':
      return Utensils
    case 'sweets':
    case 'snack':
      return Cookie
    case 'lightmeal':
      return Leaf
    case 'heavyfood':
      return Utensils
    case 'streetfood':
      return Star
    case 'historic':
      return Calendar
    case 'evening':
    case 'bestatnight':
      return Wine
    default:
      return Star
  }
}

const getTagColor = (tagName: string) => {
  const tag = tagName.toLowerCase()
  switch (tag) {
    case 'coffee':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'breakfast':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'lunch':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'dinner':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'sweets':
    case 'snack':
      return 'bg-pink-100 text-pink-800 border-pink-200'
    case 'lightmeal':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'heavyfood':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'streetfood':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'historic':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'evening':
    case 'bestatnight':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    case 'veganfriendly':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'requiresbooking':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getMealTypeColor = (mealTypeName: string) => {
  const mealType = mealTypeName.toLowerCase()
  switch (mealType) {
    case 'breakfast':
      return 'text-yellow-600'
    case 'lunch':
      return 'text-orange-600'
    case 'dinner':
      return 'text-red-600'
    case 'snack':
      return 'text-pink-600'
    default:
      return 'text-gray-600'
  }
}

const getMealTypeBorderColor = (mealTypeName: string) => {
  const mealType = mealTypeName.toLowerCase()
  switch (mealType) {
    case 'breakfast':
      return 'border-yellow-400'
    case 'lunch':
      return 'border-orange-400'
    case 'dinner':
      return 'border-red-400'
    case 'snack':
      return 'border-pink-400'
    default:
      return 'border-gray-400'
  }
}

const getPriceTag = (price: number) => {
  if (price <= 8) return { label: 'Budget', color: 'bg-green-100 text-green-800 border-green-200' }
  if (price <= 15) return { label: 'Mid-range', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
  return { label: 'Premium', color: 'bg-red-100 text-red-800 border-red-200' }
}

export default function ItineraryPage({ itinerary }: ItineraryPageProps) {
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState(1)
  const [isPrintView, setIsPrintView] = useState(false)

  const currentDay = itinerary.schedule.find((day) => day.dayNumber === selectedDay)

  // Create map locations in the exact format your MapComponent expects
  const mapLocations = useMemo((): Array<MapLocation> => {
    const locations: Array<MapLocation> = []

    if (currentDay?.meals) {
      for (const meal of currentDay.meals) {
        const place = meal.place
        locations.push({
          id: place.id,
          name: place.name,
          lat: place.lat,
          lng: place.lng,
          description: place.shortDescription,
        })
      }
    }

    return locations
  }, [currentDay])

  const handlePrint = () => {
    setIsPrintView(true)
    setTimeout(() => {
      window.print()
      setIsPrintView(false)
    }, 100)
  }

  const handleBack = () => {
    navigate({ to: '/' })
  }

  const renderMealCard = (meal: any, index: number) => {
    const place = meal.place
    const mealType = meal.mealType
    const tags = meal.tags || []

    if (!place) return null

    const priceTag = getPriceTag(place.averageCheckUSD)

    return (
      <Card
        key={`${meal.placeId}-${index}`}
        className="mb-6 overflow-hidden bg-card border border-border/20 hover:border-border/40 transition-all duration-300 hover:shadow-lg animate-slide-in"
      >
        <div className="flex min-h-[200px]">
          {/* Image on the left - full height */}
          <div className="w-72 flex-shrink-0 overflow-hidden">
            <ImageWithFallback
              src={place.imageUrl || 'https://placehold.co/600x400/png?text=Placeholder+Image'}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content section on the right */}
          <div className="flex-1 flex flex-col">
            {/* Title section */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Meal type */}
                  <div className="mb-2">
                    <span className={`capitalize ${getMealTypeColor(mealType.name)} text-sm font-medium`}>
                      {mealType.name}
                    </span>
                  </div>

                  {/* Restaurant name */}
                  <h3 className="mb-2">{place.name}</h3>

                  {/* Short description */}
                  <p className="text-muted-foreground text-sm">{place.shortDescription}</p>
                </div>

                {/* Info button */}
                <div className="ml-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                            <Info className="h-4 w-4" />
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{place.factSnippet || 'No additional information available.'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            {/* Colored divider */}
            <div className={`border-t-2 ${getMealTypeBorderColor(mealType.name)} mx-6`}></div>

            {/* Content section */}
            <div className="p-6 pt-4 flex-1">
              {/* Long description */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {place.longDescription || place.shortDescription}
              </p>

              {/* Tags including budget tag */}
              <div className="flex flex-wrap gap-2 mb-4">
                {/* Budget tag first */}
                <Badge variant="outline" className={priceTag.color}>
                  {priceTag.label}
                </Badge>

                {/* Other tags */}
                {tags.map((tag: any) => {
                  const Icon = getTagIcon(tag.name)
                  return (
                    <Badge key={tag.id} variant="outline" className={`${getTagColor(tag.name)} text-xs`}>
                      <Icon className="w-3 h-3 mr-1" />
                      {tag.name.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-border/20 mt-auto">
                {/* Price and Fact Snippet */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>~${place.averageCheckUSD}</span>
                  </div>
                  {place.googleMapsUrl && (
                    <Button
                      variant="armenian"
                      size="sm"
                      onClick={() => window.open(place.googleMapsUrl, '_blank')}
                      className="gap-1"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Maps
                    </Button>
                  )}
                </div>

                {/* Fact Snippet */}
                {place.factSnippet && (
                  <div className="text-xs text-muted-foreground/80 italic bg-muted/30 p-2 rounded border-l-2 border-armenian-red/20">
                    <Info className="w-3 h-3 inline mr-1 opacity-60" />
                    {place.factSnippet}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const renderDay = (day: any) => (
    <div key={day.dayNumber} className="mb-8">
      <h3 className="mb-6 pb-2 border-b border-border/20">Day {day.dayNumber}</h3>

      {/* Group meals by type */}
      {['breakfast', 'lunch', 'snack', 'dinner'].map((mealType) => {
        const mealsOfType = day.meals.filter((meal: any) => meal.mealType.name.toLowerCase() === mealType)

        if (mealsOfType.length === 0) return null

        const getMealIcon = () => {
          switch (mealType) {
            case 'breakfast':
              return <Coffee className="w-5 h-5" />
            case 'lunch':
              return <Utensils className="w-5 h-5" />
            case 'snack':
              return <Cookie className="w-5 h-5" />
            case 'dinner':
              return <Wine className="w-5 h-5" />
            default:
              return <Utensils className="w-5 h-5" />
          }
        }

        const getMealColor = () => {
          switch (mealType) {
            case 'breakfast':
              return 'text-yellow-600'
            case 'lunch':
              return 'text-orange-600'
            case 'snack':
              return 'text-pink-600'
            case 'dinner':
              return 'text-red-600'
            default:
              return 'text-gray-600'
          }
        }

        return (
          <div key={mealType} className="mb-8">
            <h4 className={`mb-4 capitalize flex items-center gap-2 ${getMealColor()}`}>
              {getMealIcon()}
              {mealType}
            </h4>
            {mealsOfType.map((meal: any, index: number) => renderMealCard(meal, index))}
          </div>
        )
      })}
    </div>
  )

  if (isPrintView) {
    return (
      <div className="min-h-screen bg-white print:bg-white text-black print:text-black p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Armenian Food Itinerary</h1>
            <h2 className="text-xl text-gray-600">{itinerary.name}</h2>
            <p className="text-gray-500">
              {itinerary.days} Day{itinerary.days > 1 ? 's' : ''} Experience
            </p>
          </div>

          {itinerary.schedule.map((day) => renderDay(day))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="print:hidden">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Armenian Food Journey</h1>
              <p className="text-sm text-muted-foreground">
                {itinerary.name} • {itinerary.days} Day{itinerary.days > 1 ? 's' : ''} Itinerary
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handlePrint} className="print:hidden">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          {/* Main Content - 3 columns (60%) */}
          <div className="md:col-span-3">
            {/* Day selector for multi-day itineraries */}
            {itinerary.days > 1 && (
              <div className="mb-8 print:hidden">
                <div className="flex flex-wrap gap-2">
                  {itinerary.schedule.map((day) => (
                    <Button
                      key={day.dayNumber}
                      variant={selectedDay === day.dayNumber ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedDay(day.dayNumber)}
                      className="min-w-[80px]"
                    >
                      Day {day.dayNumber}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {itinerary.description && (
              <div className="mb-8">
                <p className="text-muted-foreground">{itinerary.description}</p>
              </div>
            )}

            {/* Day content */}
            {currentDay ? (
              renderDay(currentDay)
            ) : (
              <div className="text-center text-muted-foreground">No meals found for this day.</div>
            )}
          </div>

          {/* Map Sidebar - 2 columns (40%) */}
          <div className="md:col-span-2">
            <div className="sticky top-24 print:hidden">
              <Card className="p-0">
                <div className="p-4 pb-3">
                  <h3 className="text-lg">Today's Locations</h3>
                </div>
                <div className="h-96 bg-background">
                  <MapComponent locations={mapLocations} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
