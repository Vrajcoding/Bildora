import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import WordReveal from '../../common/WordReveal'
import { contactHeroData } from '../../../data/contactData'

/**
 * ContactHero Component
 * Matches Screenshot 1:
 * - Background: #ff4b18
 * - Pill badge: "GET IN TOUCH"
 * - Title: "Let's Build Something Great Together."
 * - Subtitle with 4 rows on mobile and stagger animation
 */
export default function ContactHero() {
  const containerRef = useRef(null)
  const badgeRef = useRef(null)

  useGSAP(
    () => {
      if (!badgeRef.current) return
      gsap.from(badgeRef.current, {
        y: -15,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative bg-[#ff4b18] text-white pt-28 sm:pt-40 md:pt-48 pb-16 sm:pb-24 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* White Pill Badge: 14px */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center justify-center px-5 py-1.5 rounded-full bg-white text-[#262525] shadow-sm mb-6 sm:mb-8 font-medium text-[14px] tracking-wide uppercase"
        >
          {contactHeroData.badge}
        </div>

        {/* Headline: Exactly two rows on mobile (36px), Desktop 48px */}
        <div className="sm:hidden w-full">
          <WordReveal
            as="h1"
            text={"Let's Build Something\nGreat Together."}
            staggerDelay={0.06}
            initialDelay={0.15}
            className="text-[36px] font-medium tracking-tight text-white leading-[1.12] max-w-4xl mx-auto text-center"
          />
        </div>
        <div className="hidden sm:block w-full">
          <WordReveal
            as="h1"
            text={contactHeroData.title}
            staggerDelay={0.06}
            initialDelay={0.15}
            className="sm:text-[42px] md:text-[48px] font-medium tracking-tight text-white leading-[1.14] max-w-4xl mx-auto text-center"
          />
        </div>

        {/* Subtitle: exactly 4 rows on mobile with WordReveal stagger */}
        <div className="sm:hidden w-full mt-5">
          <WordReveal
            as="p"
            text={"Have a project in mind? Tell us\nwhat you're planning, and our team\nwill help turn your vision into a\nwell-built space with confidence."}
            staggerDelay={0.03}
            initialDelay={0.45}
            className="text-white/95 text-[16px] font-normal leading-relaxed max-w-2xl mx-auto text-center"
          />
        </div>
        <div className="hidden sm:block w-full mt-6">
          <WordReveal
            as="p"
            text={contactHeroData.subtitle}
            staggerDelay={0.03}
            initialDelay={0.45}
            className="text-white/95 text-[16px] font-normal leading-relaxed max-w-2xl sm:max-w-3xl mx-auto text-center"
          />
        </div>
      </div>
    </section>
  )
}
