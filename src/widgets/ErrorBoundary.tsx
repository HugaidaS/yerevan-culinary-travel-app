import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Button, Card } from '@/shared/ui'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
          {/* Error icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-destructive/20 leading-none">Error</h1>
          </div>

          {/* Main message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">{'Something went wrong!'}</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              {'We encountered an unexpected error while loading this page. '}
              {"Don't worry, our team has been notified and we're working to fix it."}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 p-4 bg-muted rounded-lg text-left">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground mb-2">
                  Error Details
                </summary>
                <pre className="text-xs text-destructive overflow-auto">{error.message}</pre>
              </details>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={reset}
              size="lg"
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Try Again
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-secondary text-armenian-brown hover:bg-secondary hover:text-secondary-foreground bg-transparent"
            >
              <Link to="/">Go to Home</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
