import React from 'react'
import * as Icons from 'lucide-react'

/**
 * Floating WhatsApp action button with ping animation.
 */
const WhatsAppFAB = React.memo(() => (
  <a
    href="https://wa.me/2348123456789?text=Hello%20Mufti%20Spot!%20I'd%20like%20to%20book%20a%20laundry%20pickup."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="group fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full
               bg-green-500 text-white shadow-lg shadow-green-500/30 transition-all duration-300
               hover:-translate-y-1 hover:scale-110 hover:bg-green-600 hover:shadow-xl"
  >
    <Icons.MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
    <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20" />
  </a>
))

WhatsAppFAB.displayName = 'WhatsAppFAB'
export default WhatsAppFAB