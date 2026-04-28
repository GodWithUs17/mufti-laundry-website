import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as Icons from 'lucide-react'
import useInView from '../hooks/useInView'
import { TESTIMONIALS } from '../data/testimonials'

/**
 * Touch-enabled testimonial carousel with auto-play,
 * dot navigation, and prev/next buttons.
 */
const TestimonialsSection = React.memo(() => {
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(true)
  const touchX = useRef(0)
  const [sRef, inView] = useInView()
  const len = TESTIMONIALS.length

  // Auto-play
  useEffect(() => {
    if (!auto) return
    const iv = setInterval(() => setIdx((p) => (p + 1) % len), 5000)
    return () => clearInterval(iv)
  }, [auto, len])

  const goTo = useCallback((i) => {
    setIdx(i)
    setAuto(false)
    setTimeout(() => setAuto(true), 10000)
  }, [])

  const next = useCallback(() => goTo((idx + 1) % len), [idx, len, goTo])
  const prev = useCallback(() => goTo((idx - 1 + len) % len), [idx, len, goTo])

  return (
    <section id="reviews" ref={sRef} className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2
                    rounded-full bg-mufti-blue-100/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-mufti-blue-100 bg-mufti-blue-50 px-4 py-1.5 text-sm font-semibold text-mufti-blue-600">
            <Icons.MessageCircle className="h-4 w-4" /> Customer Reviews
          </span>
          <h2 className="mt-4 mb-4 text-3xl font-extrabold text-mufti-blue-950 sm:text-4xl lg:text-5xl">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-lg text-slate-500">Hear from our happy customers.</p>
        </div>

        {/* Slider */}
        <div
          className="mx-auto max-w-3xl"
          onTouchStart={(e) => { touchX.current = e.changedTouches[0].screenX }}
          onTouchEnd={(e) => {
            const d = touchX.current - e.changedTouches[0].screenX
            if (Math.abs(d) > 50) d > 0 ? next() : prev()
          }}
        >
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="w-full shrink-0 px-2">
                  <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-lg sm:p-10">
                    {/* Stars */}
                    <div className="mb-6 flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icons.Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < t.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    <blockquote className="mb-8 text-lg italic leading-relaxed text-slate-700 sm:text-xl">
                      &ldquo;{t.content}&rdquo;
                    </blockquote>

                    <div className="flex items-center justify-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full
                                   bg-linear-to-br ${t.color} text-sm font-bold text-white shadow-lg`}
                      >
                        {t.avatar}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-mufti-blue-950">{t.name}</p>
                        <p className="text-sm text-slate-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-mufti-blue-200 hover:text-mufti-blue-600 hover:shadow-md"
            >
              <Icons.ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300
                             ${i === idx ? 'w-8 bg-mufti-blue-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-mufti-blue-200 hover:text-mufti-blue-600 hover:shadow-md"
            >
              <Icons.ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
})

TestimonialsSection.displayName = 'TestimonialsSection'
export default TestimonialsSection