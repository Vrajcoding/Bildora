import React from 'react'
import { motion } from 'framer-motion'
import Badge from '../common/Badge'
import Button from '../common/Button'

import WordReveal from '../common/WordReveal'

/**
 * Home Hero Section
 * Preserves the exact design requested:
 * - Background: /images/homeimage.webp
 * - Exact Font Sizes: 14px (Badge), 72px (Heading), 18px (Subtext), 16px (CTA)
 * - Cinematic WordReveal word-by-word animation for heading and subtitle
 */
export default function HeroSection({ onOpenModal, _onScrollDown }) {
  return (
    <section 
      id="home" 
      className="relative w-full min-h-[580px] sm:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 select-none"
    >
      {/* BACKGROUND IMAGE: D:\cns3\public\images\homeimage.webp */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.img 
          src="/images/homeimage.webp" 
          alt="Courtyard Architectural Perspective looking up to blue sky" 
          initial={{ scale: 1.3, filter: 'blur(4px)', opacity: 0.85 }}
          animate={{ scale: 1.05, filter: 'blur(0px)', opacity: 1 }}
          transition={{
            scale: {
              type: 'spring',
              stiffness: 55,
              damping: 14,
              mass: 1.1,
            },
            filter: {
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            },
            opacity: {
              duration: 0.8,
              ease: 'easeOut',
            },
          }}
          className="w-full h-full object-cover object-center will-change-transform"
        />
        {/* Subtle lighting overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-[#0b0c10]/95 pointer-events-none" />
      </div>

      {/* FRONT / CENTER HERO CONTENT:
          Mobile font sizes: 14px (Badge), 46px (Heading), 18px (Subtext), 16px (CTA)
          Desktop font sizes preserved: 14px, 72px, 18px, 16px
      */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center px-4 pt-28 sm:pt-48 md:pt-52 lg:pt-56 pb-14 sm:pb-20 my-auto">
        
        {/* 1. Pill Badge: 14px */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-5 sm:mb-7"
        >
          <Badge variant="glass" showDot={true} className="text-[14px]">
            YOUR VISION. OUR CRAFT.
          </Badge>
        </motion.div>

        {/* 2. Main Heading: Mobile first row has only "We Build", Desktop keeps "We Build What / Moves You Forward." */}
        <div className="sm:hidden w-full">
          <WordReveal
            as="h1"
            text={"We Build\nWhat Moves You\nForward."}
            staggerDelay={0.06}
            initialDelay={0.15}
            className="text-[36px] font-normal leading-[1.08] tracking-[-0.02em] text-white max-w-4xl mx-auto text-center"
          />
        </div>
        <div className="hidden sm:block w-full">
          <WordReveal
            as="h1"
            text={"We Build What\nMoves You Forward."}
            staggerDelay={0.06}
            initialDelay={0.15}
            className="sm:text-[46px] md:text-[60px] lg:text-[72px] font-normal leading-[1.06] tracking-[-0.02em] text-white max-w-4xl mx-auto text-center"
          />
        </div>

        {/* 3. Subtext: Mobile exactly 4 rows starting with "reliable" on row 3; Desktop natural flow */}
        <div className="sm:hidden w-full mt-5">
          <WordReveal
            as="p"
            text={"Bildora brings together expert\ncraftsmanship, thoughtful planning, and\nreliable execution to create spaces\nmade to perform, endure, and inspire."}
            staggerDelay={0.03}
            initialDelay={0.55}
            className="text-[16px] font-normal text-white/95 leading-relaxed max-w-2xl mx-auto text-center"
          />
        </div>
        <div className="hidden sm:block w-full mt-5 sm:mt-6">
          <WordReveal
            as="p"
            text="Bildora brings together expert craftsmanship, thoughtful planning, and reliable execution to create spaces made to perform, endure, and inspire."
            staggerDelay={0.03}
            initialDelay={0.55}
            className="text-[18px] font-normal text-white/95 leading-relaxed max-w-2xl mx-auto text-center"
          />
        </div>

        {/* 4. CTA Button: 16px */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-6 sm:mt-8"
        >
          <Button
            variant="white"
            size="lg"
            showArrow={true}
            onClick={onOpenModal}
            className="text-[16px] shadow-lg hover:shadow-xl"
          >
            Build With Us
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
