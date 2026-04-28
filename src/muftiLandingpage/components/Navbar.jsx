import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { NAV_LINKS } from '../data/navigation'
import useScrollPosition from '../hooks/useScrollPosition'
import { smoothScroll } from '../utils/helpers'

/**
 * Glassmorphism sticky navbar with:
 * - Scroll-aware background
 * - Active section highlighting
 * - Mobile hamburger menu
 * - Track Order quick-link
 */
const Navbar = React.memo(({ onBookClick }) => {
  const navigate = useNavigate()
  const { scrolled, activeSection } = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = useCallback(
    (e, href) => {
      e.preventDefault()
      setMobileOpen(false)
      smoothScroll(href)
    },
    []
  )

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500
                  ${
                    scrolled
                      ? 'border-b border-slate-200/50 bg-white/80 py-2 shadow-lg shadow-slate-200/50 backdrop-blur-xl'
                      : 'bg-transparent py-4'
                  }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={(e) => go(e, '#home')}
            className="group flex items-center gap-2.5"
            aria-label="Home"
          >
            <div
              className="relative flex h-10 w-10 items-center justify-center rounded-xl
                          bg-mufti-blue-500 shadow-lg shadow-mufti-blue-500/20
                          transition-all duration-300 group-hover:scale-105
                          group-hover:shadow-mufti-blue-500/40"
            >
              <Icons.Sparkles className="h-5 w-5 text-mufti-lime" />
              <div className="absolute inset-0 animate-spin-slower rounded-xl border-2 border-dashed border-mufti-lime/30" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold leading-none tracking-tight text-mufti-blue-900">
                MUFTI<span className="text-mufti-blue-500">SPOT</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-mufti-blue-400">
                Premium Laundry
              </span>
            </div>
          </a>

          {/* ── Desktop Links ── */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-300
                           ${
                             activeSection === link.id
                               ? 'bg-mufti-blue-50 text-mufti-blue-600'
                               : 'text-slate-600 hover:bg-slate-50 hover:text-mufti-blue-600'
                           }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/track')}
              className={`hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium
                         transition-all duration-300 sm:inline-flex
                         ${
                           scrolled
                             ? 'text-mufti-blue-600 hover:bg-mufti-blue-50'
                             : 'text-mufti-blue-700 hover:bg-white/50'
                         }`}
            >
              <Icons.Search className="h-4 w-4" />
              Track Order
            </button>

            <button
              onClick={onBookClick}
              className="hidden items-center gap-2 rounded-xl bg-mufti-lime px-4 py-2
                         text-sm font-bold text-mufti-blue-900 shadow-lg shadow-mufti-lime/25
                         transition-all duration-300 hover:-translate-y-0.5 hover:bg-mufti-lime-300
                         hover:shadow-xl sm:inline-flex"
            >
              <Icons.CalendarPlus className="h-4 w-4" />
              Book Pickup
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <Icons.X className="h-6 w-6" />
              ) : (
                <Icons.Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out lg:hidden
                     ${mobileOpen ? 'mt-2 max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="space-y-1 rounded-2xl border border-slate-200/50 bg-white/90 p-4 shadow-xl backdrop-blur-xl">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
                           transition-all duration-200
                           ${
                             activeSection === link.id
                               ? 'bg-mufti-blue-50 text-mufti-blue-600'
                               : 'text-slate-600 hover:bg-slate-50 hover:text-mufti-blue-600'
                           }`}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-slate-100 pt-2">
              <button
                onClick={() => {
                  onBookClick()
                  setMobileOpen(false)
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-mufti-lime
                           px-6 py-3 text-sm font-bold text-mufti-blue-900 shadow-lg"
              >
                <Icons.CalendarPlus className="h-4 w-4" />
                Book Pickup Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'
export default Navbar