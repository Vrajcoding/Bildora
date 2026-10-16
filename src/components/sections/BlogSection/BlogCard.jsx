import React from 'react'

/**
 * Reusable BlogCard Component
 * - Square section image (aspect-square, rounded-none)
 * - Compact margins between elements
 * - Date, Title in #ff4b18, Author & Read Time with dot
 */
export default function BlogCard({ post, onClick }) {
  const { date, title, author, readTime, image, alt } = post

  return (
    <article
      onClick={onClick}
      className="group flex flex-col cursor-pointer"
    >
      {/* 1. Square Image Section (aspect-square, rounded-none) */}
      <div className="w-full aspect-square rounded-none overflow-hidden bg-neutral-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative">
        <img
          src={image}
          alt={alt || title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* 2. Metadata: Date with decreased margin */}
      <div className="pt-4 pb-1">
        <time className="text-xs sm:text-sm text-[#262525]/75 font-normal tracking-wide">
          {date}
        </time>
      </div>

      {/* 3. Post Title: 30px font size */}
      <h3 className="text-[26px] sm:text-[28px] lg:text-[30px] font-normal leading-[1.2] text-[#ff4b18] group-hover:text-[#e03d0d] transition-colors duration-200 tracking-tight text-balance mb-3">
        {title}
      </h3>

      {/* 4. Author & Read Time */}
      <div className="flex items-center justify-between pt-1 mt-auto text-xs sm:text-sm text-[#262525]">
        <span className="font-normal text-[#262525]">{author}</span>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-[#ff4b18] shrink-0 inline-block"
            aria-hidden="true"
          />
          <span className="text-[#262525]/80 font-normal">{readTime}</span>
        </div>
      </div>
    </article>
  )
}
