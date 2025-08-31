import { Suspense, lazy, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Coffee, Cookie, Info, MapPin, Printer, Utensils, Wine } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import type { api } from '../../../../convex/_generated/api'
import type { MapLocation } from '@/shared/types'
import type { FunctionReturnType } from 'convex/server'
import { Badge, Button, Card } from '@/shared/ui'
import {
  getMealTypeBorderColor,
  getMealTypeColor,
  getPriceTag,
  getTagColor,
  getTagIcon,
  normalizeLatLngWithRegion,
  parseCoordsFromGoogleUrl,
} from '@/entities/itineraries/utils'

const GoogleMap = lazy(() => import('./GoogleMap'))

type ConvexItineraryWithDetails = FunctionReturnType<typeof api.itineraries.getById>

interface ItineraryPageProps {
  itinerary: ConvexItineraryWithDetails
}

export default function ItineraryPage({ itinerary }: ItineraryPageProps) {
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState(1)

  if (!itinerary) return <div className="p-6">Itinerary not found.</div>
  const currentDay = itinerary.schedule.find((day) => day.dayNumber === selectedDay)

  // Create map locations in the exact format your MapComponent expects
  const mapLocations = useMemo((): Array<MapLocation> => {
    const locations: Array<MapLocation> = []

    if (currentDay?.meals) {
      // Yerevan bounding box as a sanity region (approx)
      const yerevanBounds = { minLat: 40.08, maxLat: 40.25, minLng: 44.4, maxLng: 44.63 }
      for (const meal of currentDay.meals) {
        const place = meal.place

        if (!place) continue

        // Prefer parsed coords from Google URL if present; else normalize stored lat/lng
        const parsed = parseCoordsFromGoogleUrl(place.googleMapsUrl)
        const normalized = parsed ?? normalizeLatLngWithRegion(place.lat, place.lng, yerevanBounds)
        if (!normalized) continue
        locations.push({
          id: place.id,
          name: place.name,
          lat: normalized.lat,
          lng: normalized.lng,
          description: place.shortDescription,
          googleMapsUrl: place.googleMapsUrl,
        })
      }
    }

    return locations
  }, [currentDay])

  const handlePrint = async () => {
    const htmlContent = `
      <div style="font-family:Arial,sans-serif;padding:24px;max-width:700px;">
        <h1 style="margin-bottom:8px;">${itinerary.name}</h1>
        ${itinerary.description ? `<p style='margin-bottom:16px;'>${itinerary.description}</p>` : ''}
        ${itinerary.schedule
          .map(
            (day) => `
          <div style='margin-bottom:18px;'>
            <h1 style='font-size:2rem;margin-bottom:16px;'>Day ${day.dayNumber}</h1>
            ${day.meals
              .map(
                (meal) => `
              <div style='margin-bottom:18px;'> 
                <div style="font-size:1.15rem; font-weight: bold;"> 
                 ${meal.mealType?.name}: ${meal.place?.name || 'Unknown Place'} ${meal.place?.shortDescription ? `<span> — ${meal.place.shortDescription}</span>` : ''}
                </div>
                
                <div style="margin-top: 8px; font-style: italic; font-weight: bold">${meal.place?.address}</div>
                
                <div style="margin-top: 8px">${meal.place?.longDescription}</div>
                
                 <div style="margin-top: 8px">${meal.place?.factSnippet}</div>
              </div>
            `,
              )
              .join('')}
          </div>
        `,
          )
          .join('')}
      </div>
    `

    const response = await fetch('/api/pdf', {
      method: 'POST',
      body: JSON.stringify({ htmlContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Itinerary.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log('PDF downloaded successfully')
    } else {
      console.error('Failed to generate PDF')
    }
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
        className="mb-6 overflow-hidden bg-card border border-border/20 hover:border-border/40 transition-all duration-300 hover:shadow-lg animate-slide-in p-0"
      >
        <div className="flex items-stretch min-h-[200px]">
          {/* Image on the left - full height */}
          <div className="w-72 flex-shrink-0 overflow-hidden self-stretch">
            <ImageWithFallback
              src={place.imageUrl || 'https://placehold.co/600x400/png?text=Placeholder+Image'}
              alt={place.name}
              className="w-full h-full object-cover object-center"
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
                  const Icon = getTagIcon(tag.id)
                  return (
                    <Badge key={tag.id} variant="outline" className={`${getTagColor(tag.id)} text-xs`}>
                      <Icon className="w-3 h-3 mr-1" />
                      {tag.name.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-border/20 mt-auto">
                {/* Price and Fact Snippet */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <span>Average check: ~${place.averageCheckUSD} USD</span>
                  </div>
                  {place.googleMapsUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(place.googleMapsUrl, '_blank')}
                      className="gap-1 text-muted-foreground hover:text-foreground"
                      aria-label={`Open ${place.name} in Google Maps`}
                    >
                      <MapPin className="w-4 h-4" />
                      Open in Maps
                    </Button>
                  )}
                </div>

                {/* Fact Snippet */}
                {place.factSnippet && (
                  <div className="text-sm md:text-base text-muted-foreground bg-muted/50 p-3 rounded border-l-4 border-armenian-red/30 leading-relaxed">
                    <Info className="w-4 h-4 inline mr-2 opacity-70 align-text-top" />
                    {place.factSnippet}
                  </div>
                )}

                {/*  Address */}
                {place.address && (
                  <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 opacity-70" />
                    <span>{place.address}</span>
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="armenianOutline" size="sm" onClick={handleBack} className="print:hidden">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold leading-tight">{itinerary.name}</h1>
              <p className="text-sm text-muted-foreground">
                {itinerary.days} Day{itinerary.days > 1 ? 's' : ''} Culinary Journey
              </p>
            </div>
          </div>

          <Button variant="armenian" size="sm" onClick={handlePrint} className="print:hidden">
            <Printer className="w-4 h-4 mr-2" />
            Save as PDF
          </Button>
        </div>
      </header>

      <div className="w-full px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 min-[1120px]:grid-cols-12 gap-4 md:gap-8">
          {/* Main Content - 3 columns (60%) */}
          <div className="col-span-1 min-[1120px]:col-span-7">
            {/* Day selector for multi-day itineraries */}
            {itinerary.days > 1 && (
              <div className="mb-8 print:hidden">
                <div className="flex flex-wrap gap-2">
                  {itinerary.schedule.map((day) => (
                    <Button
                      key={day.dayNumber}
                      variant={selectedDay === day.dayNumber ? 'armenian' : 'armenianOutline'}
                      size="sm"
                      onClick={() => setSelectedDay(day.dayNumber)}
                      className="min-w-[80px] rounded-full shadow-sm"
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
          <div className="col-span-1 min-[1120px]:col-span-5">
            <div className="min-[1120px]:sticky min-[1120px]:top-24 print:hidden">
              <Card className="p-0 overflow-hidden">
                <div className="p-4 border-b border-border/20">
                  <h3 className="text-lg">Today's Locations</h3>
                </div>
                <div className="bg-background h-[82dvh]">
                  {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
                    <Suspense fallback={<div className="w-full h-full bg-muted" />}>
                      <GoogleMap locations={mapLocations} />
                    </Suspense>
                  ) : (
                    <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center text-center p-4 text-sm text-muted-foreground">
                      Google Maps API key not configured or SSR. Add VITE_GOOGLE_MAPS_API_KEY to use the map.
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
