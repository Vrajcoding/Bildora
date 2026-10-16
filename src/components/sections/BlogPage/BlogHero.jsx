import React from 'react'
import { motion } from 'framer-motion'
import WordReveal from '../../common/WordReveal'
import { blogHeroData } from '../../../data/blogData'

/**
 * BlogHero Component
 * - Background: #ff4b18
 * - Pill badge: FROM THE BLOG
 * - Cinematic WordReveal word-by-word animation for heading and paragraph
 */
export default function BlogHero() {
  return (
    <section className="relative bg-[#ff4b18] text-white pt-28 sm:pt-40 md:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Title / Badge: 14px */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white text-[#262525] shadow-sm mb-6 sm:mb-7 font-medium text-[14px] tracking-wide uppercase"
        >
          {blogHeroData.badge}
        </motion.div>

        {/* Heading (Word-by-word reveal: Mobile puts & on row 1) */}
        <div className="sm:hidden w-full">
          <WordReveal
            as="h1"
            text={"Ideas, Insights &\nInspiration for Better\nBuilding"}
            staggerDelay={0.06}
            initialDelay={0.15}
            className="text-[36px] font-normal tracking-tight text-white leading-[1.12] max-w-3xl mx-auto text-center"
          />
        </div>
        <div className="hidden sm:block w-full">
          <WordReveal
            as="h1"
            text={blogHeroData.title}
            staggerDelay={0.06}
            initialDelay={0.15}
            className="sm:text-[40px] md:text-[48px] font-normal tracking-tight text-white leading-[1.12] max-w-3xl mx-auto text-center"
          />
        </div>

        {/* Para (Word-by-word reveal: exactly 4 rows on mobile) */}
        <div className="sm:hidden w-full mt-5">
          <WordReveal
            as="p"
            text={"Discover expert advice, industry\ntrends, and practical insights to\nhelp you plan smarter, build better,\nand create spaces made to last."}
            staggerDelay={0.03}
            initialDelay={0.45}
            className="text-white/95 text-[16px] font-normal leading-relaxed max-w-2xl mx-auto text-center"
          />
        </div>
        <div className="hidden sm:block w-full mt-5">
          <WordReveal
            as="p"
            text={blogHeroData.subtitle}
            staggerDelay={0.03}
            initialDelay={0.45}
            className="text-white/95 text-[16px] font-normal leading-relaxed max-w-2xl mx-auto text-center"
          />
        </div>
      </div>
    </section>
  )
}
