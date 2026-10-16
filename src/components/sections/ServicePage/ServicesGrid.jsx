import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { servicesData } from '../../../data/servicesData'

gsap.registerPlugin(ScrollTrigger)

/**
 * ServicesGrid Component for Dedicated Service Page
 * Matches Screenshots 2, 3, 4:
 * - 2-Column Grid layout of all 6 services
 * - Background: #f5f2f2
 * - Crisp rectangular images (no rounded corners / rounded-none)
 * - Service Titles: #ff4b18
 * - Descriptions: #262525
 */
export default function ServicesGrid({ onSelectService }) {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useGSAP(
    () => {
      if (!sectionRef.current || !cardsRef.current) return

      gsap.from(cardsRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="services-list"
      className="bg-[#f5f2f2] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 xl:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* 2-Column Responsive Services Grid with decreased margin */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 lg:gap-y-12"
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService?.(service)}
              className="group flex flex-col items-start cursor-pointer"
            >
              {/* Image Container with Sharp Rectangular Framing (rounded-none) */}
              <div className="w-full aspect-[16/11] rounded-none overflow-hidden bg-neutral-200 mb-4 relative">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Service Title (25px, #ff4b18) */}
              <h2 className="text-[25px] font-medium text-[#ff4b18] tracking-tight mb-2 transition-colors group-hover:text-[#e03d0d]">
                {service.title}
              </h2>

              {/* Service Description (16px, #262525) */}
              <p className="text-[#262525] text-[16px] leading-relaxed font-normal">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
