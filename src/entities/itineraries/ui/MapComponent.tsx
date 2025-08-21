import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { MapLocation } from '@/shared/types'

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom marker icon for Armenian theme
const customIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.596 19.404 0 12.5 0z" fill="#c14242"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  shadowSize: [41, 41],
})

interface MapComponentProps {
  locations: Array<MapLocation>
}

export default function MapComponent({ locations }: MapComponentProps) {
  // Yerevan center coordinates
  const yerevanCenter: [number, number] = [40.1777, 44.5126]

  if (locations.length === 0) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No locations to display</p>
      </div>
    )
  }

  // Calculate bounds to fit all locations
  const bounds = locations.length > 1 ? L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng])) : undefined

  return (
    <div className="w-full h-full">
      <MapContainer
        center={bounds ? bounds.getCenter() : yerevanCenter}
        zoom={bounds ? undefined : 14}
        bounds={bounds}
        boundsOptions={{ padding: [20, 20] }}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Attribution overlay */}
        <div className="absolute bottom-1 right-1 z-[1000] text-xs text-gray-500 bg-white/80 px-1 rounded">
          © OpenStreetMap
        </div>
        {locations.map((location, index) => (
          <Marker key={location.id} position={[location.lat, location.lng]} icon={customIcon}>
            <Popup>
              <div className="text-center">
                <h4 className="font-semibold text-sm mb-1">{location.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{location.description}</p>
                <div className="text-xs font-medium text-armenian-red">Location #{index + 1}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
