import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook to initialize Lenis Smooth Scrolling integrated with GSAP ScrollTrigger
 * @returns {{ lenisRef: React.MutableRefObject<Lenis | null>, scrollTo: (target: string | HTMLElement, options?: object) => void }}
 */
export function useLenisScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // 1. Initialize Lenis smooth scroller
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    // 2. Synchronize ScrollTrigger with Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update)

    // 3. Drive Lenis via GSAP ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // 4. Ensure ScrollTrigger recalibrates positions after mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /**
   * Helper function for smooth scrolling to an element or selector or numeric scroll position
   */
  const scrollTo = (target, options = {}) => {
    if (target === undefined || target === null) return

    if (typeof target === 'number') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { immediate: true, ...options })
      }
      window.scrollTo(0, target)
      return
    }

    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -20, duration: 1.3, ...options })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return { lenisRef, scrollTo }
}
