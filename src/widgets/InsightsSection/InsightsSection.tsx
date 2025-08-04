import { Button } from '@/shared/ui/button.tsx'

const InsightsSection = () => {
  return (
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
                Grape leaves stuffed with a savory mixture of rice, minced meat,
                and aromatic herbs.
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
  )
}
export default InsightsSection
