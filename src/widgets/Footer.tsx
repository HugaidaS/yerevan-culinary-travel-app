import { Shield, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'
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
          </div>

          {/* Itineraries */}
          <div className="space-y-4 text-sm">
            <h4 className="text-lg font-semibold text-armenian-gold">Itineraries</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/itineraries/$id" params={{ id: 'yerevan-1day' }} className="hover:text-armenian-gold">
                  1-Day Journey
                </Link>
              </li>
              <li>
                <Link to="/itineraries/$id" params={{ id: 'yerevan-3day' }} className="hover:text-armenian-gold">
                  3-Day Adventure
                </Link>
              </li>
              <li>
                <Link to="/itineraries/$id" params={{ id: 'yerevan-7day' }} className="hover:text-armenian-gold">
                  7-Day Experience
                </Link>
              </li>
            </ul>
          </div>

          {/* Ethereum Copy Button */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-armenian-gold">Support Us</h4>
            <p className="text-white/80 text-sm mb-4">Help preserve Armenian culinary heritage</p>

            <div className="space-y-3">
              <Button
                onClick={async () => {
                  const wallet = import.meta.env.VITE_ETHEREUM_WALLET
                  if (!wallet) {
                    toast.error('Wallet not configured')
                    return
                  }
                  try {
                    await navigator.clipboard.writeText(wallet)
                    toast.success('Ethereum wallet copied')
                  } catch {
                    toast.error('Failed to copy wallet')
                  }
                }}
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
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col items-center text-sm text-white/60 text-center">
          <p>&copy; {date} Taste of Armenia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
