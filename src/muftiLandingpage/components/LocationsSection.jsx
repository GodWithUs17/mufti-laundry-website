import React from 'react'
import * as Icons from 'lucide-react'
import useInView from '../hooks/useInView'
import { BRANCHES } from '../data/branches'

/**
 * Branch location cards with map placeholders,
 * feature tags, and "Open in Maps" deep links.
 */
const LocationsSection = React.memo(() => {
  const [ref, inView] = useInView()

  return (
    <section id="locations" ref={ref} className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-mufti-blue-100 bg-mufti-blue-50 px-4 py-1.5 text-sm font-semibold text-mufti-blue-600">
            <Icons.MapPin className="h-4 w-4" /> Our Branches
          </span>
          <h2 className="mt-4 mb-4 text-3xl font-extrabold text-mufti-blue-950 sm:text-4xl lg:text-5xl">
            Find Us in <span className="gradient-text">Ibadan</span>
          </h2>
          <p className="text-lg text-slate-500">Conveniently located across Ibadan.</p>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {BRANCHES.map((b, i) => (
            <div
              key={b.id}
              className={`group relative overflow-hidden rounded-2xl border border-white/40 bg-white/80
                         shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1
                         hover:border-mufti-blue-200/50 hover:bg-white/90 hover:shadow-xl
                         ${inView ? 'animate-slide-up' : 'opacity-0'}
                         ${b.isMain ? 'border-2 border-mufti-blue-200 ring-2 ring-mufti-blue-100' : ''}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {b.isMain && (
                <div className="absolute top-4 right-4 z-10 rounded-full bg-mufti-blue-500 px-3 py-1 text-xs font-bold text-white">
                  Main Branch
                </div>
              )}

              {/* Map placeholder */}
              <div className="relative h-40 overflow-hidden bg-linear-to-br from-mufti-blue-100 to-mufti-blue-50">
                <div className="bg-dot-pattern-sm absolute inset-0 text-mufti-blue-500 opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Icons.MapPin className="h-12 w-12 text-mufti-blue-500 drop-shadow-lg" />
                    <div className="absolute bottom-0 left-1/2 h-2 w-6 -translate-x-1/2 rounded-full bg-mufti-blue-500/20 blur-sm" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-mufti-blue-300/50" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-1 text-lg font-bold text-mufti-blue-950">{b.name}</h3>
                <p className="mb-4 text-sm text-slate-500">{b.address}</p>

                <div className="mb-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Icons.Phone className="h-4 w-4 text-mufti-blue-400" />
                    <span className="text-slate-600">{b.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icons.Clock className="h-4 w-4 text-mufti-blue-400" />
                    <span className="text-slate-600">{b.hours}</span>
                  </div>
                </div>

                <div className="mb-5 flex flex-wrap gap-1.5">
                  {b.features.map((f) => (
                    <span key={f} className="rounded-lg border border-mufti-blue-100 bg-mufti-blue-50 px-2.5 py-1 text-xs font-medium text-mufti-blue-600">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={`https://www.google.com/maps?q=${b.lat},${b.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-mufti-blue-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-mufti-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-mufti-blue-600"
                  >
                    <Icons.Navigation className="h-3.5 w-3.5" /> Open in Maps
                  </a>
                  <a
                    href={`tel:${b.phone}`}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-mufti-blue-500 bg-transparent px-3 py-2.5 text-xs font-semibold text-mufti-blue-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-mufti-blue-500 hover:text-white"
                  >
                    <Icons.Phone className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

LocationsSection.displayName = 'LocationsSection'
export default LocationsSection