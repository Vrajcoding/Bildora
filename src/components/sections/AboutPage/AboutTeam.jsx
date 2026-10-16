import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { teamData } from '../../../data/aboutData'

gsap.registerPlugin(ScrollTrigger)

/**
 * AboutTeam Component
 * Matches the Framer About Page "Meet The Team" Section:
 * - Badge: Meet The Team (14px)
 * - Heading: The People Behind Every Build. (48px)
 * - Subtitle: 16px
 * - 4-Column Team Member Grid with square/portrait images, name & role
 */
export default function AboutTeam() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

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
            trigger: headerRef.current,
            start: 'top 85%',
          },
        })
      }

      if (cardsRef.current) {
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
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="our-team"
      className="bg-[#f5f2f2] text-[#1F2D3D] py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden border-t border-neutral-300/70"
    >
      <div className="max-w-6xl mx-auto">
        {/* Centered Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-12 sm:mb-16">
          {/* Badge: Meet The Team (14px) */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-black/[0.08] mb-6 shadow-sm">
            <span className="text-[14px] font-medium text-[#ff4b18] tracking-wide">
              {teamData.badge}
            </span>
          </div>

          {/* Heading (48px) */}
          <h2 className="text-[36px] sm:text-[40px] md:text-[48px] font-normal tracking-tight text-[#1F2D3D] leading-[1.12] text-balance max-w-3xl">
            {teamData.heading}
          </h2>

          {/* Subtitle (16px) */}
          <p className="text-[#262525] text-[16px] max-w-2xl font-normal leading-relaxed text-balance mt-4 sm:mt-5">
            {teamData.subtitle}
          </p>
        </div>

        {/* 4-Card Team Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {teamData.members.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col items-start bg-transparent"
            >
              {/* Image Container with Crisp Sharp Corners (rounded-none) */}
              <div className="w-full aspect-[4/4.5] overflow-hidden rounded-none bg-neutral-200 mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative">
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Member Name */}
              <h3 className="text-xl sm:text-[22px] font-medium text-[#1F2D3D] tracking-tight mb-1">
                {member.name}
              </h3>

              {/* Member Role */}
              <p className="text-[#262525]/80 text-[16px] sm:text-[15px] font-normal leading-snug">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
