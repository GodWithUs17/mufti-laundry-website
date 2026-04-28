import React, { useState, useCallback } from 'react'
import { smoothScroll } from './utils/helpers'

// Components
import SEOHead from './components/SEOHead.jsx'
import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import StatsSection from './components/StatsSection.jsx'
import PricingSection from './components/PricingSection.jsx'
import LocationsSection from './components/LocationsSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import AppMockupSection from './components/AppMockupSection.jsx'
import BookingSection from './components/BookingSection.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import WhatsAppFAB from './components/WhatsAppFAB.jsx'

/**
 * ============================================================
 * MUFTI SPOT LAUNDRY — App Root
 * ============================================================
 *
 * Orchestrates all sections and floating utilities.
 * Each component is self-contained and independently
 * testable — ready for backend integration via
 * PostgreSQL + Prisma + Express.
 *
 * Page flow:
 *   Preloader → Navbar → Hero → Services → Stats →
 *   Pricing → Locations → Testimonials → App Mockup →
 *   Booking → Footer + FABs
 *
 * ============================================================
 */
export default function MuftiLandingPage() {
  const [loading, setLoading] = useState(true)

  const handlePreloadComplete = useCallback(() => {
    setLoading(false)
  }, [])

  const handleBookClick = useCallback(() => {
    smoothScroll('#booking')
  }, [])

  return (
    <>
      {/* ── SEO Meta & Structured Data ── */}
      <SEOHead />

      {/* ── Preloader ── */}
      {loading && <Preloader onComplete={handlePreloadComplete} />}

      {/* ── Main Shell ── */}
      <div className={loading ? 'h-screen overflow-hidden' : ''}>
        {/* Navigation */}
        <Navbar onBookClick={handleBookClick} />

        {/* Page Sections */}
        <main>
          <HeroSection />
          <ServicesSection />
          <StatsSection />
          <PricingSection />
          <LocationsSection />
          <TestimonialsSection />
          <AppMockupSection />
          <BookingSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Utilities */}
        <ScrollToTop />
        <WhatsAppFAB />
      </div>
    </>
  )
}
