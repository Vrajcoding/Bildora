import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ourApproachData } from '../../../data/aboutData'

gsap.registerPlugin(ScrollTrigger)

/**
 * AboutApproach Component
 * Matches Screenshots 3 & 4:
 * - Background: #f5f2f2
 * - Title/Step Titles: #1F2D3D
 * - Descriptions: #262525
 * - Badge text: #ff4b18
 */
export default function AboutApproach() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)
  const imageRef = useRef(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        })
      }

      if (listRef.current) {
        gsap.from(listRef.current.children, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
          },
        })
      }

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          y: 40,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="our-approach"
      className="bg-[#f5f2f2] text-[#1F2D3D] py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        {/* Left Column: Approach Steps */}
        <div className="lg:col-span-6 flex flex-col items-start justify-between">
          <div ref={headerRef} className="flex flex-col items-start w-full">
            {/* Badge: Our Approach */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-black/[0.08] mb-6 shadow-sm">
              <span className="text-xs sm:text-sm font-medium text-[#ff4b18] tracking-wide">
                {ourApproachData.badge}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[36px] sm:text-4xl md:text-[44px] lg:text-[48px] font-normal tracking-tight text-[#1F2D3D] leading-[1.15] text-balance mb-10 sm:mb-12">
              {ourApproachData.heading}
            </h2>
          </div>

          {/* 4 Steps List */}
          <div ref={listRef} className="space-y-7 sm:space-y-9 w-full">
            {ourApproachData.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-start group">
                <h3 className="text-[25px] font-medium tracking-tight text-[#1F2D3D] mb-3">
                  {step.number} — {step.title}
                </h3>
                <p className="text-[#262525] text-[16px] leading-[1.7] max-w-lg font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Architectural Photo spanning full height of 4 steps */}
        <div ref={imageRef} className="lg:col-span-6 flex w-full">
          <div className="relative w-full h-full min-h-[460px] lg:min-h-full overflow-hidden rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-neutral-200">
            <img
              src={ourApproachData.image}
              alt={ourApproachData.imageAlt}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
