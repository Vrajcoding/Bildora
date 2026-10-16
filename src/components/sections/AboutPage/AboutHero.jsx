import React from 'react'
import { motion } from 'framer-motion'
import WordReveal from '../../common/WordReveal'
import { aboutHeroData } from '../../../data/aboutData'

/**
 * AboutHero Component
 * - Vibrant orange background (#ff4b18)
 * - Complete orchestrated stagger animation across all header elements:
 *   1. Pill Badge ("About Bildora") drops down and scales smoothly
 *   2. Main Headline words cascade in with WordReveal cinematic stagger
 *   3. Subtitle paragraph words cascade in with WordReveal subtle stagger
 */
export default function AboutHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.08,
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, y: -22, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="relative bg-[#ff4b18] text-white pt-28 sm:pt-40 md:pt-48 pb-16 sm:pb-24 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Subtle ambient light gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30" 
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0) 70%)'
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center"
      >
        {/* 1. White Pill Badge: About Bildora (14px) */}
        <motion.div
          variants={badgeVariants}
          className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 rounded-full bg-white text-[#262525] shadow-sm mb-6 sm:mb-8 font-medium text-[14px] tracking-wide"
        >
          {aboutHeroData.badge}
        </motion.div>

        {/* 2. Hero Headline (Word-by-word stagger reveal) */}
        {/* Mobile View: "Than" on first row */}
        <div className="sm:hidden w-full">
          <WordReveal
            as="h1"
            text={"Building More Than\nStructures.\nBuilding Trust."}
            staggerDelay={0.06}
            initialDelay={0.12}
            className="text-[36px] font-normal tracking-tight text-white leading-[1.12] max-w-3xl mx-auto text-center"
          />
        </div>
        {/* Desktop View */}
        <div className="hidden sm:block w-full">
          <WordReveal
            as="h1"
            text={"Building More Than Structures.\nBuilding Trust."}
            staggerDelay={0.06}
            initialDelay={0.12}
            className="sm:text-[40px] md:text-[48px] font-normal tracking-tight text-white leading-[1.14] max-w-3xl mx-auto text-center"
          />
        </div>

        {/* 3. Hero Subtitle (Word-by-word stagger reveal, exactly 4 rows on mobile) */}
        <div className="sm:hidden w-full mt-5">
          <WordReveal
            as="p"
            text={"We bring together thoughtful planning,\nskilled craftsmanship, and dependable\nproject management to create spaces\nbuilt for today and designed to last."}
            staggerDelay={0.03}
            initialDelay={0.45}
            className="text-[16px] font-normal text-white/95 leading-relaxed max-w-2xl mx-auto text-center"
          />
        </div>
        <div className="hidden sm:block w-full mt-6">
          <WordReveal
            as="p"
            text={aboutHeroData.description}
            staggerDelay={0.03}
            initialDelay={0.45}
            className="text-[16px] sm:text-[17px] font-normal text-white/95 leading-relaxed max-w-2xl mx-auto text-center"
          />
        </div>
      </motion.div>
    </section>
  )
}
