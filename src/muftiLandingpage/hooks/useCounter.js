import { useState, useEffect } from 'react'

/**
 * Animates a number from 0 to `end` over `duration` ms.
 *
 * @param {number} end - target value
 * @param {number} duration - animation length in ms
 * @param {boolean} start - whether to begin counting
 * @returns {number} current animated value
 */
export default function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let t0 = null
    let raf

    const step = (timestamp) => {
      if (!t0) t0 = timestamp
      const progress = Math.min((timestamp - t0) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, start])

  return count
}