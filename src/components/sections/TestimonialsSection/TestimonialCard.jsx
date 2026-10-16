import React from 'react'

/**
 * Reusable TestimonialCard Component
 * Exact 1:1 recreation of bildora.framer.website:
 * - Color: #ff4b18 (Signature Bildora coral-orange)
 * - Dimensions: 400px width, 389px height (crisp square proportions)
 * - Padding: 32px-36px (p-8 sm:p-9)
 * - Typography: Inter font, 21px-22px quote, 16px name, 13px role
 * - Corners: Crisp 90-degree square edges (rounded-none)
 */
export default function TestimonialCard({ quote, name, role, avatar, className = '' }) {
  return (
    <div
      className={`bg-[#ff4b18] text-white p-6 sm:p-7 md:p-8 rounded-none min-h-[420px] sm:min-h-[440px] md:min-h-[450px] max-w-[400px] w-full shadow-[0_22px_55px_rgba(0,0,0,0.4)] flex flex-col justify-between overflow-hidden select-none ${className}`}
    >
      {/* Testimonial Quote: Neatly proportioned so it never goes outside the box */}
      <p className="text-[18px] sm:text-[19px] md:text-[20px] font-normal leading-[1.4] text-white tracking-[-0.01em] break-words">
        {quote}
      </p>

      {/* Author Info: Cleanly anchored at the bottom inside the card */}
      <div className="flex flex-col items-start gap-1 mt-auto pt-4 shrink-0">
        <img
          src={avatar}
          alt={name}
          className="w-[50px] h-[50px] rounded-full object-cover shrink-0 select-none pointer-events-none mb-1"
          loading="lazy"
        />
        <div className="text-white font-medium text-[16px] leading-tight">
          {name}
        </div>
        <div className="text-white/85 text-[14px] sm:text-[15px] font-normal leading-snug">
          {role}
        </div>
      </div>
    </div>
  )
}
