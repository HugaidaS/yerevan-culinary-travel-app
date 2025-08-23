export function parseCoordsFromGoogleUrl(url?: string | null): { lat: number; lng: number } | null {
  if (!url) return null
  try {
    const u = new URL(url)
    // Pattern 1: .../@lat,lng,zoom...
    const atMatch = u.pathname.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
    if (atMatch) {
      const lat = Number(atMatch[1])
      const lng = Number(atMatch[2])
      if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng }
    }
    // Pattern 2: q=lat,lng
    const q = u.searchParams.get('q')
    if (q) {
      const parts = q.split(',').map((p) => p.trim())
      if (parts.length >= 2) {
        const lat = Number(parts[0])
        const lng = Number(parts[1])
        if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng }
      }
    }
    return null
  } catch {
    return null
  }
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'string') {
    const cleaned = value.trim().replace(',', '.')
    const n = Number(cleaned)
    return Number.isFinite(n) ? n : null
  }
  return null
}

export function normalizeLatLng(latIn: unknown, lngIn: unknown): { lat: number; lng: number } | null {
  let lat = toNumber(latIn)
  let lng = toNumber(lngIn)
  if (lat == null || lng == null) return null
  const latValid = lat >= -90 && lat <= 90
  const lngValid = lng >= -180 && lng <= 180
  if (!latValid && lngValid && Math.abs(lat) <= 180 && Math.abs(lng) <= 90) {
    // Swap if it looks like lon,lat order
    const tmp = lat
    lat = lng
    lng = tmp
  }
  if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
    return { lat, lng }
  }
  return null
}

export interface Bounds {
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}

export function normalizeLatLngWithRegion(
  latIn: unknown,
  lngIn: unknown,
  region?: Bounds,
): { lat: number; lng: number } | null {
  const normalized = normalizeLatLng(latIn, lngIn)
  if (!normalized) return null
  if (!region) return normalized

  const inRegion =
    normalized.lat >= region.minLat &&
    normalized.lat <= region.maxLat &&
    normalized.lng >= region.minLng &&
    normalized.lng <= region.maxLng

  if (inRegion) return normalized

  // Try swapped order against region if initial not in region
  const swapped = { lat: normalized.lng, lng: normalized.lat }
  const swappedInRegion =
    swapped.lat >= region.minLat &&
    swapped.lat <= region.maxLat &&
    swapped.lng >= region.minLng &&
    swapped.lng <= region.maxLng

  return swappedInRegion ? swapped : normalized
}
