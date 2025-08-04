import { createFileRoute } from '@tanstack/react-router'
import {
  FeaturesSection,
  FeedbackSection,
  Footer,
  HeroSection,
  InsightsSection,
} from '@/widgets'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <InsightsSection />
      <FeedbackSection />
      <Footer />
    </div>
  )
}
