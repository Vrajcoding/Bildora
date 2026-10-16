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
      className={`bg-[#ff4b18] text-white p-6 sm:p-7 md:p-8 rounded-none min-h-[440px] sm:min-h-[460px] lg:min-h-[450px] max-w-[400px] w-full shadow-[0_22px_55px_rgba(0,0,0,0.4)] flex flex-col justify-between select-none ${className}`}
    >
      {/* Testimonial Quote: Balanced sizing to fit neatly inside card */}
      <p className="text-[20px] sm:text-[21px] md:text-[22px] font-normal leading-[1.36] text-white tracking-[-0.01em]">
        {quote}
      </p>

      {/* Author Info: Single column with 3 rows (Row 1: Photo 56x56, Row 2: Name 16px, Row 3: Role 15px) */}
      <div className="flex flex-col items-start gap-1 mt-auto pt-5 shrink-0">
        <img
          src={avatar}
          alt={name}
          className="w-[54px] h-[54px] rounded-full object-cover shrink-0 select-none pointer-events-none mb-1"
          loading="lazy"
        />
        <div className="text-white font-medium text-[16px] leading-tight">
          {name}
        </div>
        <div className="text-white/85 text-[15px] font-normal leading-snug">
          {role}
        </div>
      </div>
    </div>
  )
}
