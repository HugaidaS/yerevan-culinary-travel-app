import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/shared/ui/button'
import Header from '@/widgets/Header'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section - 100dvh with Yerevan background */}
      <section
        id="hero"
        className="h-[100dvh] bg-[url('/Yerevan_at_night_2560.jpg')] bg-cover bg-center flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Discover Armenian Cuisine
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-in">
            Explore the rich flavors and ancient traditions of Armenia's
            culinary heritage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in">
            <Button variant="armenian" size="lg">
              Explore Recipes
            </Button>
            <Button variant="armenianOutline" size="lg">
              Learn More
            </Button>
            <Button variant="armenianGold" size="lg">
              Watch Videos
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#faf9f7]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold mb-4 text-foreground">
                Our Culinary Heritage
              </h2>
              <p className="text-muted-foreground mb-6">
                Armenian cuisine is one of the oldest in the world, with
                traditions dating back thousands of years. Our dishes showcase
                the rich agricultural heritage and cultural influences of the
                region.
              </p>
              <p className="text-muted-foreground mb-6">
                From aromatic herbs to hearty stews, delicate pastries to robust
                grilled meats, Armenian food captures the essence of our
                mountainous homeland and warm hospitality.
              </p>
              <Button variant="armenian">Read Our Story</Button>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://placehold.co/600x400/f4e4b8/c14242?text=Armenian+Food+Heritage"
                alt="Armenian Food Heritage"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section id="recipes" className="py-20 bg-[#f0ebe2]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Featured Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Recipe Card 1 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px]">
              <img
                src="https://placehold.co/400x300/f4e4b8/c14242?text=Dolma"
                alt="Dolma"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Stuffed Dolma</h3>
                <p className="text-muted-foreground mb-4">
                  Grape leaves stuffed with a savory mixture of rice, minced
                  meat, and aromatic herbs.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-armenian-red">
                    Prep time: 45 mins
                  </span>
                  <Button variant="outline" size="sm">
                    View Recipe
                  </Button>
                </div>
              </div>
            </div>

            {/* Recipe Card 2 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px]">
              <img
                src="https://placehold.co/400x300/f4e4b8/c14242?text=Khorovats"
                alt="Khorovats"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Khorovats (Armenian BBQ)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Marinated and grilled meat skewers, a staple of Armenian
                  gatherings and celebrations.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-armenian-red">
                    Prep time: 30 mins
                  </span>
                  <Button variant="outline" size="sm">
                    View Recipe
                  </Button>
                </div>
              </div>
            </div>

            {/* Recipe Card 3 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px]">
              <img
                src="https://placehold.co/400x300/f4e4b8/c14242?text=Gata"
                alt="Gata"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sweet Gata</h3>
                <p className="text-muted-foreground mb-4">
                  Traditional Armenian sweet bread with a buttery filling, often
                  enjoyed with tea or coffee.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-armenian-red">
                    Prep time: 60 mins
                  </span>
                  <Button variant="outline" size="sm">
                    View Recipe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button variant="armenian" size="lg">
              View All Recipes
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[url('/Yerevan_at_night_330.jpg')] bg-fixed bg-cover relative">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-semibold mb-10 text-center text-white">
            What People Say
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
              <p className="text-white/90 text-lg italic mb-4">
                "The Armenian recipes I discovered on this site brought back
                memories of my grandmother's cooking. The flavors are authentic
                and the instructions are easy to follow. I've made the Khorovats
                three times already!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-armenian-gold flex items-center justify-center text-white font-bold">
                  MH
                </div>
                <div className="ml-4">
                  <p className="text-white font-medium">Maria Hakobyan</p>
                  <p className="text-white/70 text-sm">
                    Home Cook from Los Angeles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="contact" className="py-20 bg-[#faf9f7]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Join Our Culinary Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter and receive new recipes, cooking tips,
              and stories about Armenian cuisine.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="armenian">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d1810] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Armenian Cuisine</h3>
              <p className="text-white/70">
                Preserving and sharing the rich culinary traditions of Armenia
                with food lovers around the world.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-armenian-cream"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-white/70 hover:text-armenian-cream"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#recipes"
                    className="text-white/70 hover:text-armenian-cream"
                  >
                    Recipes
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-white/70 hover:text-armenian-cream"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Recipe Categories</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-armenian-cream"
                  >
                    Main Dishes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-armenian-cream"
                  >
                    Appetizers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-armenian-cream"
                  >
                    Breads & Pastries
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-armenian-cream"
                  >
                    Desserts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-armenian-red transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-armenian-red transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-armenian-red transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-armenian-red transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/50">
            <p>
              &copy; {new Date().getFullYear()} Armenian Cuisine. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
