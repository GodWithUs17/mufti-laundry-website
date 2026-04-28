import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../data/navigation'

/**
 * Tracks scroll position for:
 * - Navbar background toggle
 * - Active section highlighting
 */
export default function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine which section is currently in viewport
      const ids = NAV_LINKS.map((l) => l.id)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(ids[i])
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, activeSection }
}