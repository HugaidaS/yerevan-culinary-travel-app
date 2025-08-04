const FeedbackSection = () => {
  return (
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
  )
}
export default FeedbackSection
