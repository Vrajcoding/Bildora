import React from 'react'
import { motion } from 'framer-motion'
import WordReveal from '../../common/WordReveal'

/**
 * CTASection Component
 * Recreates the dramatic red architectural perspective CTA banner:
 * - Full-height architectural perspective background image (cta-bg.webp)
 * - Deep gradient fade into black for seamless transition to Footer
 * - Centered bold headline: "Ready to Build Something Exceptional?"
 * - Elegant divider line
 * - "Start Your Project →" pill button triggering consultation modal
 */
export default function CTASection({ onOpenModal }) {
  return (
    <section
      className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white px-4 sm:px-6"
    >
      {/* 1. Architectural Perspective Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/cta-bg.webp"
          alt="Architectural red structural beams perspective"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Vignette & Seamless Bottom Blend to Black Footer */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.5) 50%, #000000 100%)',
          }}
        />
      </div>

      {/* 2. Centered Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center py-20 sm:py-28"
      >
        {/* Headline */}
        <WordReveal
          as="h2"
          text={"Ready to Build\nSomething Exceptional?"}
          staggerDelay={0.06}
          initialDelay={0.1}
          className="text-[36px] sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-tight text-white leading-[1.12] max-w-4xl mx-auto text-center"
        />

        {/* Thin Divider Line */}
        <div className="w-full max-w-md sm:max-w-xl h-[1px] bg-white/40 my-8 sm:my-10" />

        {/* Capsule Action Button */}
        <button
          onClick={onOpenModal}
          className="group inline-flex items-center gap-3.5 bg-white text-black hover:bg-neutral-100 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-medium text-base sm:text-lg shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
        >
          <span>Start Your Project</span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
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
        </button>
      </motion.div>
    </section>
  )
}
