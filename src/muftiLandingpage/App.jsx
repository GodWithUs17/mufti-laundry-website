import React, { useState, useCallback } from 'react'
import { smoothScroll } from './utils/helpers'

// Components
import SEOHead from './components/SEOHead'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import StatsSection from './components/StatsSection'
import PricingSection from './components/PricingSection'
import LocationsSection from './components/LocationsSection'
import TestimonialsSection from './components/TestimonialsSection'
import AppMockupSection from './components/AppMockupSection'
import BookingSection from './components/BookingSection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppFAB from './components/WhatsAppFAB'

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