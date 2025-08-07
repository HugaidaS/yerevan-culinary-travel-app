import { Bitcoin, Facebook, Instagram, Shield, Twitter, Wallet } from 'lucide-react'
import { Button } from '@/shared/ui'

const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <footer className="bg-[#2d1810] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-armenian-gold">Taste of Armenia</h3>
            <p className="text-white/80 text-sm">
              Authentic Armenian culinary experiences that connect you with centuries of rich food culture and
              tradition.
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-armenian-gold rounded-full flex items-center justify-center hover:bg-armenian-gold/80 transition-colors cursor-pointer">
                <Facebook className="w-4 h-4 text-armenian-brown" />
              </div>
              <div className="w-8 h-8 bg-armenian-gold rounded-full flex items-center justify-center hover:bg-armenian-gold/80 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4 text-armenian-brown" />
              </div>
              <div className="w-8 h-8 bg-armenian-gold rounded-full flex items-center justify-center hover:bg-armenian-gold/80 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4 text-armenian-brown" />
              </div>
            </div>
          </div>

          {/* Itineraries */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-armenian-gold">Itineraries</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-white/80 hover:text-armenian-gold transition-colors">1-Day Quick Taste</button>
              </li>
              <li>
                <button className="text-white/80 hover:text-armenian-gold transition-colors">
                  3-Day Cultural Experience
                </button>
              </li>
              <li>
                <button className="text-white/80 hover:text-armenian-gold transition-colors">
                  7-Day Complete Journey
                </button>
              </li>
            </ul>
          </div>

          {/* Crypto Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-armenian-gold">Support Us</h4>
            <p className="text-white/80 text-sm mb-4">Help preserve Armenian culinary heritage with crypto donations</p>

            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-armenian-gold text-armenian-gold hover:bg-armenian-gold hover:text-armenian-brown transition-all"
              >
                <Bitcoin className="w-4 h-4 mr-2" />
                Bitcoin Wallet
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-armenian-gold text-armenian-gold hover:bg-armenian-gold hover:text-armenian-brown transition-all"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Ethereum Wallet
              </Button>

              <div className="flex items-center gap-2 text-xs text-white/60 mt-2">
                <Shield className="w-3 h-3" />
                Secure & Anonymous
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; {date} Taste of Armenia. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-armenian-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-armenian-gold transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-armenian-gold transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
