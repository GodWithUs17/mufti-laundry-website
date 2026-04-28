import { useRef, useState, useEffect } from 'react'

/**
 * IntersectionObserver hook for scroll-triggered animations.
 * Once the element enters the viewport, it stays marked as visible
 * (one-shot observation).
 *
 * @param {IntersectionObserverInit} options
 * @returns {[React.RefObject, boolean]}
 */
export default function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, ...options }
    )

    const current = ref.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, isInView]
}