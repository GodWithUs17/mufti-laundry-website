import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import useInView from '../hooks/useInView'
import { smoothScroll } from '../utils/helpers'
import WashingMachineAnimation from './WashingMachineAnimation'
import TrustMetric from './TrustMetric'

/**
 * Hero section with:
 * - Headline + CTA
 * - Order tracking search bar
 * - CSS-animated washing machine
 * - Trust metrics
 */
const HeroSection = React.memo(() => {
  const navigate = useNavigate()
  const [trackingCode, setTrackingCode] = useState('')
  const [heroRef, heroInView] = useInView()

  const handleTrack = useCallback(
    (e) => {
      e.preventDefault()
      const trimmedCode = trackingCode.trim().toUpperCase()
      if (trimmedCode) {
        navigate(`/track?code=${encodeURIComponent(trimmedCode)}`)
      }
    },
    [navigate, trackingCode]
  )

  return (
    <section
      id="home"
      ref={heroRef}
      className="gradient-hero relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-dot-pattern absolute inset-0 text-mufti-blue-500 opacity-[0.03]" />
        <div className="absolute -left-40 top-20 h-96 w-96 animate-float rounded-full bg-mufti-blue-400/10 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 animate-float-delayed rounded-full bg-mufti-lime/10 blur-3xl" />
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2
                      rounded-full bg-mufti-blue-100/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left Content ── */}
          <div className={heroInView ? 'animate-slide-up' : 'opacity-0'}>
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-mufti-blue-100
                          bg-mufti-blue-50 px-4 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-mufti-blue-700">
                #1 Rated Laundry in Ibadan
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl font-extrabold leading-[1.05] tracking-tight text-mufti-blue-950
                         sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              EXPERIENCE
              <br />
              <span className="relative inline-block">
                <span className="gradient-text">MUFTI</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4"
                    stroke="#d7f707"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              CLEAN
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
              Premium laundry &amp; dry cleaning in Ibadan. We handle your{' '}
              <span className="font-semibold text-mufti-blue-600">
                native wear
              </span>
              ,{' '}
              <span className="font-semibold text-mufti-blue-600">suits</span>,
              and{' '}
              <span className="font-semibold text-mufti-blue-600">
                everyday clothes
              </span>{' '}
              with expert care.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScroll('#booking')
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-mufti-lime
                           px-8 py-4 text-base font-bold text-mufti-blue-900 shadow-lg shadow-mufti-lime/25
                           transition-all duration-300 hover:-translate-y-0.5 hover:bg-mufti-lime-300 hover:shadow-xl"
              >
                <Icons.Zap className="h-5 w-5" />
                Book Free Pickup
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScroll('#pricing')
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-mufti-blue-500
                           bg-transparent px-8 py-4 text-base font-semibold text-mufti-blue-500
                           transition-all duration-300 hover:-translate-y-0.5 hover:bg-mufti-blue-500 hover:text-white"
              >
                <Icons.ListChecks className="h-5 w-5" />
                View Price List
              </a>
            </div>

            {/* Tracking Bar */}
            <form
              onSubmit={handleTrack}
              className="mt-8 flex max-w-md gap-2"
              id="tracking"
            >
              <div className="relative flex-1">
                <Icons.Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="Enter tracking code (e.g. MFT-2024-001)"
                  className="w-full rounded-xl border border-slate-200 bg-white/60 py-3 pr-4 pl-10
                             text-sm font-medium text-slate-800 placeholder-slate-400 backdrop-blur-sm
                             transition-all duration-300 focus:border-mufti-blue-500 focus:bg-white
                             focus:ring-2 focus:ring-mufti-blue-500/50 focus:outline-none"
                  aria-label="Tracking code"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-mufti-blue-500
                           px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-mufti-blue-500/25
                           transition-all duration-300 hover:-translate-y-0.5 hover:bg-mufti-blue-600 hover:shadow-xl"
              >
                Track
              </button>
            </form>

            {/* Trust Metrics */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <TrustMetric icon="Users" value="2,847+" label="Happy Customers" />
              <TrustMetric icon="Star" value="4.9/5" label="Average Rating" />
              <TrustMetric icon="Clock" value="24hr" label="Express Service" />
            </div>
          </div>

          {/* ── Right — Washing Machine ── */}
          <div
            className={`flex items-center justify-center
                       ${heroInView ? 'animation-delay-400 animate-fade-in' : 'opacity-0'}`}
          >
            <WashingMachineAnimation />
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute right-0 bottom-0 left-0" aria-hidden="true">
        <svg viewBox="0 0 1440 100" fill="none" className="h-auto w-full">
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 20 1440 50V100H0V40Z"
            fill="white"
            fillOpacity="0.5"
          />
          <path
            d="M0 60C360 100 720 20 1080 60C1260 80 1380 70 1440 60V100H0V60Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'
export default HeroSection