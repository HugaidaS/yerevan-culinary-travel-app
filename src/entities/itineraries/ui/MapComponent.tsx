import type { MapLocation } from '@/shared/types'

interface MapComponentProps {
  locations: Array<MapLocation>
}

export default function MapComponent({ locations }: MapComponentProps) {
  if (locations.length === 0) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No locations to display</p>
      </div>
    )
  }

  // Simple placeholder map - you can integrate with actual map library later
  return (
    <div className="w-full h-full bg-muted rounded-lg relative overflow-hidden">
      {/* Simple map placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 2px, transparent 2px)`,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        {/* Location markers */}
        {locations.map((location, index) => (
          <div
            key={location.id}
            className="absolute w-8 h-8 bg-armenian-red rounded-full flex items-center justify-center text-white text-xs font-bold transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${30 + index * 10}%`, // Simple positioning logic
              top: `${30 + index * 15}%`,
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Map overlay text */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-600">
        Map view - {locations.length} location{locations.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
