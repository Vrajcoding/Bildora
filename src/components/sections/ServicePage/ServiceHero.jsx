import React from 'react'
import { motion } from 'framer-motion'
import WordReveal from '../../common/WordReveal'
import { serviceHeroData } from '../../../data/servicesData'

/**
 * ServiceHero Component
 * - Background: #ff4b18
 * - White pill badge: "WHAT WE DO"
 * - Cinematic WordReveal word-by-word animation for heading and subtitle
 */
export default function ServiceHero() {
  return (
    <section className="relative bg-[#ff4b18] text-white pt-28 sm:pt-40 md:pt-48 pb-16 sm:pb-24 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Subtle ambient light gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* White Pill Badge: WHAT WE DO (14px) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 rounded-full bg-white text-[#262525] shadow-sm mb-6 sm:mb-8 font-medium text-[14px] tracking-wider uppercase"
        >
          {serviceHeroData.badge}
        </motion.div>

        {/* Hero Headline (Word-by-word reveal: Mobile puts Around on row 2) */}
        <div className="sm:hidden w-full">
          <WordReveal
            as="h1"
            text={"Construction Solutions Built\nAround Your Needs"}
            staggerDelay={0.06}
            initialDelay={0.15}
            className="text-[36px] font-normal tracking-tight text-white leading-[1.12] max-w-3xl mx-auto text-center"
          />
        </div>
        <div className="hidden sm:block w-full">
          <WordReveal
            as="h1"
            text={serviceHeroData.title}
            staggerDelay={0.06}
            initialDelay={0.15}
            className="sm:text-[40px] md:text-[48px] font-normal tracking-tight text-white leading-[1.12] max-w-3xl mx-auto text-center"
          />
        </div>

        {/* Hero Subtitle (Word-by-word reveal: exactly 4 rows on mobile) */}
        <div className="sm:hidden w-full mt-5">
          <WordReveal
            as="p"
            text={"From new builds and renovations to\ncomplete project management, we\ndeliver thoughtful solutions with\nquality craftsmanship and service."}
            staggerDelay={0.03}
            initialDelay={0.45}
            className="text-white/95 text-[16px] font-normal leading-relaxed max-w-2xl mx-auto text-center"
          />
        </div>
        <div className="hidden sm:block w-full mt-5">
          <WordReveal
            as="p"
            text={serviceHeroData.description}
            staggerDelay={0.03}
            initialDelay={0.45}
            className="text-white/95 text-[16px] font-normal leading-relaxed max-w-2xl mx-auto text-center"
          />
        </div>
      </div>
    </section>
  )
}
