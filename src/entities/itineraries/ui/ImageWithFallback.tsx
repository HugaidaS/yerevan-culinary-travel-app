import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://placehold.co/600x400/png?text=No+Image',
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setCurrentSrc(fallbackSrc)
      setHasError(true)
    }
  }

  return <img src={currentSrc} alt={alt} className={className} onError={handleError} />
}
