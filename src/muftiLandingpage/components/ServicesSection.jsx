import React, { useMemo } from 'react'
import * as Icons from 'lucide-react'
import useInView from '../hooks/useInView'
import { smoothScroll } from '../utils/helpers'

/**
 * Grid of 6 service cards with icons, descriptions,
 * and staggered scroll-reveal animations.
 */
const ServicesSection = React.memo(() => {
  const [ref, inView] = useInView()

  const services = useMemo(
    () => [
      { icon: 'Shirt', title: 'Wash & Fold', desc: 'Expert cleaning with premium detergents, perfectly folded and packaged.', bg: 'bg-mufti-blue-50', text: 'text-mufti-blue-500', border: 'border-mufti-blue-100' },
      { icon: 'Sparkles', title: 'Dry Cleaning', desc: 'Professional care for delicate fabrics, native wear, and designer pieces.', bg: 'bg-purple-50', text: 'text-purple-500', border: 'border-purple-100' },
      { icon: 'Flame', title: 'Steam & Press', desc: 'Crisp, wrinkle-free results with industrial-grade steam pressing.', bg: 'bg-amber-50', text: 'text-amber-500', border: 'border-amber-100' },
      { icon: 'Droplets', title: 'Stain Removal', desc: 'Advanced treatment for stubborn stains — palm oil, ink, wine, and more.', bg: 'bg-rose-50', text: 'text-rose-500', border: 'border-rose-100' },
      { icon: 'Home', title: 'Household Items', desc: 'Curtains, duvets, bedsheets, and upholstery cleaned to perfection.', bg: 'bg-green-50', text: 'text-green-500', border: 'border-green-100' },
      { icon: 'Crown', title: 'Premium Native', desc: 'Specialized care for Agbada, Aso Oke, Senator, and ceremonial outfits.', bg: 'bg-cyan-50', text: 'text-cyan-500', border: 'border-cyan-100' },
    ],
    []
  )

  return (
    <section id="services" ref={ref} className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? 'animate-slide-up' : 'opacity-0'}`}>
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-mufti-blue-100
                       bg-mufti-blue-50 px-4 py-1.5 text-sm font-semibold text-mufti-blue-600"
          >
            <Icons.Layers className="h-4 w-4" /> Our Services
          </span>
          <h2 className="mt-4 mb-4 text-3xl font-extrabold text-mufti-blue-950 sm:text-4xl lg:text-5xl">
            Everything Your Clothes{' '}
            <span className="gradient-text">Deserve</span>
          </h2>
          <p className="text-lg text-slate-500">
            From everyday casuals to your finest native wear — we treat every
            garment with expert care.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const IC = Icons[s.icon]
            return (
              <div
                key={s.title}
                className={`group rounded-2xl border border-white/40 bg-white/80 p-6 shadow-lg
                           backdrop-blur-md transition-all duration-300 hover:-translate-y-1
                           hover:border-mufti-blue-200/50 hover:bg-white/90 hover:shadow-xl sm:p-8
                           ${inView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border
                             ${s.bg} ${s.border} transition-transform duration-300 group-hover:scale-110`}
                >
                  {IC && <IC className={`h-7 w-7 ${s.text}`} />}
                </div>
                <h3 className="mb-2 text-xl font-bold text-mufti-blue-950">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault()
                    smoothScroll('#pricing')
                  }}
                  className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold
                             text-mufti-blue-500 transition-colors hover:text-mufti-blue-700"
                >
                  See Prices
                  <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
})

ServicesSection.displayName = 'ServicesSection'
export default ServicesSection