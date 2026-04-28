import React, { useState, useEffect } from 'react'
import * as Icons from 'lucide-react'

/**
 * Floating "scroll to top" button that appears after 500px of scroll.
 */
const ScrollToTop = React.memo(() => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full
                 bg-mufti-blue-500 text-white shadow-lg shadow-mufti-blue-500/30 transition-all duration-300
                 hover:-translate-y-1 hover:bg-mufti-blue-600 hover:shadow-xl
                 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <Icons.ChevronUp className="h-5 w-5" />
    </button>
  )
})

ScrollToTop.displayName = 'ScrollToTop'
export default ScrollToTop