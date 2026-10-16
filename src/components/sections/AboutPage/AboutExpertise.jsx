import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import WordReveal from '../../common/WordReveal'
import { ourExpertiseData } from '../../../data/aboutData'

gsap.registerPlugin(ScrollTrigger)

/**
 * AboutExpertise Component
 * Matches Screenshot 5:
 * - Background: #f5f2f2
 * - Title: #1F2D3D
 * - Subtitle & Card descriptions: #262525
 * - Card titles & Badge text: #ff4b18
 */
export default function AboutExpertise({ onSelectService }) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.2,
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
      id="our-expertise"
      className="bg-[#f5f2f2] text-[#1F2D3D] py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden border-t border-neutral-300/70"
    >
      <div className="max-w-6xl mx-auto">
        {/* Centered Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-20">
          {/* Badge: Our Expertise (14px) */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-black/[0.08] mb-6 shadow-sm">
            <span className="text-[14px] font-medium text-[#ff4b18] tracking-wide">
              {ourExpertiseData.badge}
            </span>
          </div>

          {/* Heading: Centered on the page */}
          <h2 className="text-[36px] sm:text-[40px] md:text-[48px] font-normal tracking-tight text-[#1F2D3D] leading-[1.12] text-balance max-w-3xl mx-auto text-center">
            {ourExpertiseData.heading}
          </h2>

          {/* Subtitle Paragraph (16px) - Always visible and centered */}
          <p className="text-[#262525] text-[16px] max-w-2xl mx-auto font-normal leading-relaxed text-balance mt-4 sm:mt-5 text-center">
            {ourExpertiseData.subtitle}
          </p>
        </div>

        {/* 3-Card Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {ourExpertiseData.cards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectService?.(card)}
              className="group flex flex-col items-start bg-transparent cursor-pointer"
            >
              {/* Card Image Container */}
              <div className="w-full aspect-[4/4.8] overflow-hidden rounded-none bg-neutral-200 mb-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Title (25px, #ff4b18) */}
              <h3 className="text-[25px] font-medium text-[#ff4b18] tracking-tight mb-2 transition-colors group-hover:text-[#e03d0d]">
                {card.title}
              </h3>

              {/* Card Description (#262525 - exactly 2 lines) */}
              <p className="text-[#262525] text-[16px] leading-relaxed font-normal line-clamp-2">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
