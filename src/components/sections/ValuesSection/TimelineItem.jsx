import React from 'react'

/**
 * Reusable TimelineItem for alternating milestone entries
 * Features structured text elements (.timeline-step, .timeline-title-word, .timeline-desc, .timeline-img)
 * so GSAP ScrollTrigger in ValuesSection coordinates an orchestrated text stagger animation.
 */
export default function TimelineItem({
  step,
  title,
  desc,
  img,
  alt,
  isLeft = true,
}) {
  const titleWords = (title || '').split(' ').filter(Boolean)

  const contentNode = (
    <div className="timeline-card w-full md:w-[44%] flex flex-col will-change-[transform,opacity]">
      <div className="timeline-step text-[14px] font-normal text-[#626262] uppercase tracking-wider mb-2">
        {step}
      </div>
      <h3 className="timeline-title text-[25px] font-medium text-[#1F2D3D] leading-snug mb-3 tracking-tight">
        {titleWords.map((word, idx) => (
          <span key={idx} className="timeline-title-word inline-block mr-[0.22em]">
            {word}
          </span>
        ))}
      </h3>
      <p className="timeline-desc text-[#262525] text-[16px] leading-relaxed mb-6 font-normal">
        {desc}
      </p>
      <div className="timeline-img w-full aspect-[4/3] rounded-none overflow-hidden bg-neutral-200 shadow-md group">
        <img
          src={img}
          alt={alt || title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </div>
  )

  const emptySpace = <div className="hidden md:block w-[44%]" />

  return (
    <div className="timeline-item relative flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0 pl-10 md:pl-0">
      {/* Central Timeline Node (Desktop) */}
      <div
        className="timeline-node absolute left-1/2 top-3.5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#ff4b18] ring-4 ring-[#f5f2f2] z-20 hidden md:block shadow-sm transition-opacity duration-200 opacity-0"
      />

      {/* Timeline Node (Mobile) */}
      <div
        className="timeline-node absolute left-4 top-3.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#ff4b18] ring-4 ring-[#f5f2f2] z-20 md:hidden shadow-sm transition-opacity duration-200 opacity-0"
      />

      {/* Left Column */}
      {isLeft ? contentNode : emptySpace}

      {/* Right Column */}
      {!isLeft ? contentNode : emptySpace}
    </div>
  )
}
