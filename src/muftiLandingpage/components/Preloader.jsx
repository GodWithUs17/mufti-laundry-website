import React, { useState, useEffect } from 'react'
import * as Icons from 'lucide-react'

/**
 * Full-screen preloader with a CSS-animated washing machine
 * and a progress bar. Fades out when loading is complete.
 */
const Preloader = React.memo(({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(iv)
          setExiting(true)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(iv)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
                   bg-mufti-blue-950 transition-all duration-500
                   ${exiting ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      {/* Machine */}
      <div className="relative mb-8 h-32 w-32">
        <div className="absolute inset-0 rounded-full border-4 border-mufti-blue-700" />
        <div className="absolute inset-2 animate-spin-slow rounded-full border-4 border-dashed border-mufti-lime" />
        <div className="absolute inset-6 flex items-center justify-center overflow-hidden rounded-full bg-mufti-blue-800">
          <div
            className="absolute bottom-0 left-0 right-0 animate-water-wave bg-mufti-blue-500/30 transition-all duration-300"
            style={{ height: `${progress}%` }}
          />
          <div className="animate-spin-slower">
            <Icons.Shirt className="h-6 w-6 text-mufti-lime/70" />
          </div>
        </div>
        <div className="absolute inset-0 animate-pulse-glow rounded-full" />
      </div>

      {/* Brand */}
      <h2 className="mb-2 text-2xl font-bold tracking-wide text-white">
        MUFTI <span className="text-mufti-lime">SPOT</span>
      </h2>

      {/* Progress */}
      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-mufti-blue-800">
        <div
          className="h-full rounded-full bg-linear-to-r from-mufti-lime to-mufti-lime-300 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm font-medium text-mufti-blue-300">
        Loading freshness... {progress}%
      </p>
    </div>
  )
})

Preloader.displayName = 'Preloader'
export default Preloader