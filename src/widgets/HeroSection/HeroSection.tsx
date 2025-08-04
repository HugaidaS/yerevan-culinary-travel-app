import { Clock, MapPin, Star } from 'lucide-react'
import { Button } from '@/shared/ui'

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="h-[100dvh] bg-[url('/Ararat.jpg')] bg-cover bg-center flex items-center justify-center relative"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div
        className="container mx-auto px-4 z-10 text-center"
        id="hero-content"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Taste of Armenia
        </h1>
        <p className="text-xl text-white/90 mb-18 max-w-2xl mx-auto animate-slide-in">
          Experience the timeless charm of Yerevan — <br />
          where ancient history meets vibrant Armenian flavors.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-fade-in">
          <Button size="lg" variant="armenian">
            <Clock className="w-5 h-5 mr-2" />
            1-Day Journey
          </Button>
          <Button size="lg" variant="armenianGold">
            <MapPin className="w-5 h-5 mr-2" />
            3-Day Adventure
          </Button>
          <Button size="lg" variant="armenianBrown">
            <Star className="w-5 h-5 mr-2" />
            7-Day Experience
          </Button>
        </div>
      </div>
    </section>
  )
}
export default HeroSection
