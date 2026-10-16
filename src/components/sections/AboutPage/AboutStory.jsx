import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import WordReveal from '../../common/WordReveal'
import { ourStoryData } from '../../../data/aboutData'

gsap.registerPlugin(ScrollTrigger)

/**
 * AboutStory Component
 * Matches Screenshot 2:
 * - Background: #f5f2f2
 * - Title: #1F2D3D with cinematic WordReveal stagger
 * - Paragraphs: #262525
 * - Button text: #000000 ("Discover our approach") guaranteed visible and interactive
 * - Accent: #ff4b18
 */
export default function AboutStory({ onDiscoverClick }) {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Left Image reveal
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
      id="our-story"
      className="bg-[#f5f2f2] text-[#1F2D3D] py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Architectural Photo */}
        <div ref={imageRef} className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[500px] aspect-[4/4.5] sm:aspect-square overflow-hidden rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-neutral-200">
            <img
              src={ourStoryData.image}
              alt={ourStoryData.imageAlt}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Narrative Content */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Badge: Our Story (14px) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-black/[0.08] mb-6 shadow-sm"
          >
            <span className="text-[14px] font-medium text-[#ff4b18] tracking-wide">
              {ourStoryData.badge}
            </span>
          </motion.div>

          {/* Heading with WordReveal Stagger (48px) */}
          <WordReveal
            as="h2"
            text={ourStoryData.heading}
            staggerDelay={0.05}
            initialDelay={0.1}
            className="text-left text-[36px] sm:text-[40px] md:text-[48px] font-normal tracking-tight text-[#1F2D3D] leading-[1.22] mb-7 sm:mb-9"
          />

          {/* Paragraphs (16px) with increased line and element spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 sm:space-y-7 text-[#262525] text-[16px] leading-[1.8] mb-10 sm:mb-12 font-normal"
          >
            {ourStoryData.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </motion.div>

          {/* Action Button: Discover our approach -> (Guaranteed visible and interactive) */}
          <motion.button
            type="button"
            onClick={onDiscoverClick}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="group relative z-20 inline-flex items-center gap-3 bg-white text-[#000000] border border-neutral-300/80 shadow-sm hover:shadow-md px-6 sm:px-7 py-3.5 rounded-full text-[15px] sm:text-[16px] font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer select-none active:scale-98"
          >
            <span className="text-[#000000]">Discover our approach</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#000000]"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
