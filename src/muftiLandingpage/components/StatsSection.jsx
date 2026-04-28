import React, { useMemo } from 'react'
import useInView from '../hooks/useInView'
import StatCard from './StatCard'

/**
 * Animated statistics counter band.
 */
const StatsSection = React.memo(() => {
  const [ref, inView] = useInView()

  const stats = useMemo(
    () => [
      { icon: 'Users', end: 2847, suffix: '+', label: 'Happy Customers' },
      { icon: 'Shirt', end: 45000, suffix: '+', label: 'Clothes Cleaned' },
      { icon: 'Star', end: 4.9, suffix: '/5', label: 'Average Rating', isDecimal: true },
      { icon: 'Clock', end: 3, suffix: '', label: 'Years of Service' },
    ],
    []
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-mufti-blue-500 py-16">
      <div
        className="bg-dot-pattern-md pointer-events-none absolute inset-0 text-white opacity-10"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} startCounting={inView} />
          ))}
        </div>
      </div>
    </section>
  )
})

StatsSection.displayName = 'StatsSection'
export default StatsSection