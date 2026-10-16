import React, { useEffect, useRef, useCallback, useState } from 'react'
import { carouselImages } from '../../../data/aboutData'

/**
 * 3D Concave Theater Carousel
 * - Substantially increased image height (420px desktop) for a towering architectural presence.
 * - Removed bottom button container completely for an uninterrupted, clean aesthetic.
 * - 60fps/120fps continuous automatic infinite scrolling with mouse drag, touch gestures, and card click.
 * - Deep concave cylinder curve: each card has rotateY(index * angleStep) translateZ(-radius).
 */

// 12 architectural project items for an exact 30-degree step around 360 degrees
const CAROUSEL_ITEMS = [
  ...carouselImages,
  ...carouselImages.slice(0, 5),
].map((item, idx) => ({
  id: idx,
  src: item.src,
  alt: item.alt || `Architectural space ${idx + 1}`,
  title: `Project ${String(idx + 1).padStart(2, '0')}`,
}))

export default function CurvedCarousel({
  items = CAROUSEL_ITEMS,
}) {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  // Responsive dimensions & radius with increased image heights
  const [dims, setDims] = useState(() => {
    if (typeof window === 'undefined') return { width: 260, height: 420, radius: 620, perspective: 700 }
    const w = window.innerWidth
    if (w < 640) return { width: 175, height: 295, radius: 400, perspective: 540 }
    if (w < 1024) return { width: 220, height: 360, radius: 520, perspective: 620 }
    return { width: 260, height: 420, radius: 620, perspective: 700 }
  })

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 640) {
        setDims({ width: 175, height: 295, radius: 400, perspective: 540 })
      } else if (w < 1024) {
        setDims({ width: 220, height: 360, radius: 520, perspective: 620 })
      } else {
        setDims({ width: 260, height: 420, radius: 620, perspective: 700 })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 60fps / 120fps continuous rotation state refs
  const rotationRef = useRef(0)
  const targetRotationRef = useRef(null)
  const isDraggingRef = useRef(false)
  const isHoveredRef = useRef(false)
  const mouseRatioRef = useRef(0)
  const startXRef = useRef(0)
  const lastXRef = useRef(0)
  const dragStartRotationRef = useRef(0)
  const velocityRef = useRef(0)
  const hasMovedRef = useRef(false)

  const totalItems = items.length
  const angleStep = 360 / totalItems

  // Main 60fps/120fps RAF loop: continuous automatic infinite scrolling
  useEffect(() => {
    let animId

    const render = () => {
      // 1. Click-to-center smooth interpolation
      if (targetRotationRef.current !== null) {
        const diff = targetRotationRef.current - rotationRef.current
        if (Math.abs(diff) < 0.1) {
          rotationRef.current = targetRotationRef.current
          targetRotationRef.current = null
        } else {
          rotationRef.current += diff * 0.08
        }
      } else if (!isDraggingRef.current) {
        // 2. Drag inertia coasting
        if (Math.abs(velocityRef.current) > 0.02) {
          rotationRef.current += velocityRef.current
          velocityRef.current *= 0.94
        } else if (isHoveredRef.current) {
          // Interactive cursor steering (reversed direction)
          const ratio = mouseRatioRef.current
          if (Math.abs(ratio) > 0.12) {
            const speed = ratio * 0.45
            rotationRef.current += speed
          } else {
            rotationRef.current += 0.12
          }
        } else {
          // 3. Default continuous automatic infinite rotation (REVERSED: +0.16)
          rotationRef.current += 0.16
        }
      }

      // Direct GPU transform update on the 3D rotating cylinder wrapper
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `rotateY(${rotationRef.current.toFixed(3)}deg)`
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [])

  // Click card to rotate directly to center
  const handleCardClick = (index) => {
    if (hasMovedRef.current) return
    const cardAngle = index * angleStep
    const current = rotationRef.current
    const currentModulo = ((-current % 360) + 360) % 360
    let diff = (cardAngle - currentModulo) % 360
    if (diff > 180) diff -= 360
    if (diff < -180) diff += 360
    targetRotationRef.current = current - diff
    velocityRef.current = 0
  }

  // Mouse move steering
  const handleContainerMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const width = rect.width
    const ratio = (mouseX - width / 2) / (width / 2)
    mouseRatioRef.current = Math.max(-1, Math.min(1, ratio))
    isHoveredRef.current = true
  }, [])

  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    isDraggingRef.current = true
    targetRotationRef.current = null
    startXRef.current = e.clientX
    lastXRef.current = e.clientX
    dragStartRotationRef.current = rotationRef.current
    velocityRef.current = 0
    hasMovedRef.current = false
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return
      const dx = e.clientX - startXRef.current
      if (Math.abs(dx) > 4) {
        hasMovedRef.current = true
      }
      const degDelta = dx * 0.28
      rotationRef.current = dragStartRotationRef.current + degDelta
      velocityRef.current = (e.clientX - lastXRef.current) * 0.24
      lastXRef.current = e.clientX
    }

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Touch drag handlers
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length !== 1) return
    isDraggingRef.current = true
    targetRotationRef.current = null
    startXRef.current = e.touches[0].clientX
    lastXRef.current = e.touches[0].clientX
    dragStartRotationRef.current = rotationRef.current
    velocityRef.current = 0
    hasMovedRef.current = false
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return
    const clientX = e.touches[0].clientX
    const dx = clientX - startXRef.current
    if (Math.abs(dx) > 4) {
      hasMovedRef.current = true
    }
    const degDelta = dx * 0.32
    rotationRef.current = dragStartRotationRef.current + degDelta
    velocityRef.current = (clientX - lastXRef.current) * 0.28
    lastXRef.current = clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full relative -mt-3 sm:-mt-6 mb-12 sm:mb-16 md:mb-20 select-none"
      onMouseMove={handleContainerMouseMove}
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => {
        isHoveredRef.current = false
        mouseRatioRef.current = 0
      }}
    >
      {/* 1. Parent Perspective Viewport with tight height framing cards without dead space */}
      <div
        className="relative w-full h-[320px] sm:h-[390px] md:h-[460px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: `${dims.perspective}px`,
          perspectiveOrigin: '50% 50%',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 2. 3D Rotating Wrapper Container (transform-style: preserve-3d) */}
        <div
          ref={wrapperRef}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * angleStep

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(index)}
                className="absolute top-1/2 left-1/2 rounded-[24px] overflow-hidden bg-[#f5f2f2] border-0 outline-none pointer-events-auto cursor-pointer shadow-none transition-[filter] duration-300 hover:brightness-105"
                style={{
                  width: `${dims.width}px`,
                  height: `${dims.height}px`,
                  // Concave Cylinder: rotateY first, then negative translateZ(-radius) pushing backwards
                  transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(-${dims.radius}px)`,
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center select-none pointer-events-none rounded-[24px]"
                  draggable={false}
                  loading="eager"
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
