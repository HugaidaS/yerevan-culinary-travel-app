import { FeedbackForm } from '@/features/feedback/ui'

const FeedbackSection = () => {
  return (
    <section className="py-20 bg-[url('/Bagramyan.jpg')] bg-fixed bg-cover relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-armenian-cream mb-4">Share Your Experience</h2>
          <p className="text-lg text-armenian-cream max-w-2xl mx-auto">
            Have you tried Armenian cuisine? We'd love to hear about your experience or receive suggestions for our food
            tours.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </section>
  )
}
export default FeedbackSection
