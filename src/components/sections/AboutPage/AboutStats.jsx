import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { statsData } from '../../../data/aboutData'

gsap.registerPlugin(ScrollTrigger)

/**
 * AboutStats Component
 * Matches Screenshot 3:
 * - Background: #f5f2f2
 * - Title/Values: #1F2D3D
 * - Labels: #262525
 */
export default function AboutStats() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      gsap.from(containerRef.current.children, {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="bg-[#f5f2f2] text-[#1F2D3D] pt-6 sm:pt-10 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto border-t border-neutral-300/70 pt-12 sm:pt-16">
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center"
        >
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl md:text-[54px] font-normal tracking-tight text-[#1F2D3D] leading-none mb-3">
                {stat.value}
              </span>
              <span className="text-[16px] sm:text-sm md:text-[15px] font-normal text-[#262525] tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
