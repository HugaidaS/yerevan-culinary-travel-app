import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import type { MapLocation } from '@/shared/types'
import { env } from '@/env'

interface GoogleMapProps {
  locations: Array<MapLocation>
}

export default function GoogleMap({ locations }: GoogleMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<Array<google.maps.Marker>>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    const apiKey = env.VITE_GOOGLE_MAPS_API_KEY

    if (!apiKey) return

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      language: 'en',
      region: 'AM',
    })

    let isMounted = true
    loader.load().then(() => {
      if (!isMounted || !containerRef.current) return

      // Create map once
      if (!mapRef.current) {
        const center = locations.length
          ? { lat: Number(locations[0].lat), lng: Number(locations[0].lng) }
          : { lat: 40.1777, lng: 44.5126 }

        mapRef.current = new google.maps.Map(containerRef.current, {
          center,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: 'cooperative',
          zoomControl: true,
          draggable: true,
        })
        infoWindowRef.current = new google.maps.InfoWindow()
      }

      // Update markers
      markersRef.current.forEach((m) => m.setMap(null))
      markersRef.current = []

      const bounds = new google.maps.LatLngBounds()
      for (let index = 0; index < locations.length; index++) {
        const loc = locations[index]
        let lat = Number(loc.lat)
        let lng = Number(loc.lng)

        // Coordinates must be valid; no Plus Code resolution

        // Attempt to fix swapped lat/lng
        const latValid = Number.isFinite(lat) && lat >= -90 && lat <= 90
        if (!latValid && Number.isFinite(lng) && Math.abs(lng) <= 90 && Number.isFinite(lat) && Math.abs(lat) <= 180) {
          const tmp = lat
          lat = lng
          lng = tmp
        }
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: mapRef.current,
          animation: google.maps.Animation.DROP,
          optimized: true,
          title: loc.name,
          label: { text: String(index + 1), color: '#ffffff', fontWeight: '700' },
        })
        marker.addListener('click', () => {
          if (!infoWindowRef.current) return
          const content = `
						<div style="max-width:240px">
							<div style="font-size:15px;color:#555;margin-bottom:10px">${loc.description || ''}</div>
							${loc.googleMapsUrl ? `<a href="${loc.googleMapsUrl}" target="_blank" rel="noopener" style="color:#c14242;font-weight:600">Open in Google Maps</a>` : ''}
						</div>
					`

          const header: Element = document.createElement('article')
          header.className = 'font-semibold mb-1'
          header.textContent = loc.name

          infoWindowRef.current.setContent(content)
          infoWindowRef.current.setHeaderContent(header)
          infoWindowRef.current.open({ map: mapRef.current!, anchor: marker })
        })
        markersRef.current.push(marker)
        bounds.extend({ lat, lng })
      }

      if (!bounds.isEmpty() && locations.length > 1) {
        mapRef.current.fitBounds(bounds, 20)
      } else if (!bounds.isEmpty()) {
        mapRef.current.setCenter(bounds.getCenter())
        mapRef.current.setZoom(15)
      }

      // Ensure google map updates tiles after container resize/show
      if (!resizeObserverRef.current) {
        resizeObserverRef.current = new ResizeObserver(() => {
          if (!mapRef.current) return
          google.maps.event.trigger(mapRef.current, 'resize')
          // Re-apply center after resize to avoid blank tiles
          const center = mapRef.current.getCenter()
          if (center) {
            mapRef.current.setCenter(center)
          }
        })
        resizeObserverRef.current.observe(containerRef.current)
      }
    })

    return () => {
      isMounted = false
      if (resizeObserverRef.current && containerRef.current) {
        resizeObserverRef.current.unobserve(containerRef.current)
      }
    }
    // Track id and numeric coordinate changes
  }, [
    env.VITE_GOOGLE_MAPS_API_KEY,
    ...locations.map((l) => `${l.id}:${Number(l.lat).toFixed(6)},${Number(l.lng).toFixed(6)}`),
  ])

  return <div ref={containerRef} className="w-full h-full" />
}
