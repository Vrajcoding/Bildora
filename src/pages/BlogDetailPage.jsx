import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { defaultBlogDetail } from '../data/blogDetailData'
import CTASection from '../components/sections/CTASection/CTASection'

gsap.registerPlugin(ScrollTrigger)

/**
 * BlogDetailPage Component
 * Detailed article view matching the Bildora Framer blog layout:
 * - Orange Hero (#ff4b18) with Title and Author/Reading Time/Date metadata
 * - Top large rectangular image (rounded-none)
 * - Structured 7-step guide (#1F2D3D headings, #262525 text)
 * - Final thoughts section
 * - "Explore All Blogs →" pill navigation button
 * - Architectural CTA banner & Footer
 */
export default function BlogDetailPage({
  post = defaultBlogDetail,
  onOpenModal,
  onBackToBlogs,
}) {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  const title = post.title || defaultBlogDetail.title
  const author = post.author || defaultBlogDetail.author
  const readTime = post.readTime || defaultBlogDetail.readTime
  const date = post.date || defaultBlogDetail.date
  const image = post.image || defaultBlogDetail.image

  useGSAP(
    () => {
      if (!containerRef.current) return

      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }

      if (contentRef.current) {
        const blocks = contentRef.current.querySelectorAll('.blog-step-block')
        blocks.forEach((block) => {
          gsap.from(block, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
            },
          })
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="w-full bg-[#f5f2f2]">
      {/* 1. Orange Header / Hero (#ff4b18) */}
      <section className="relative bg-[#ff4b18] text-white pt-28 sm:pt-40 md:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0) 70%)',
          }}
        />

        <div
          ref={heroRef}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center"
        >
          {/* Blog Title */}
          <h1 className="text-[36px] sm:text-[40px] md:text-[48px] font-medium tracking-tight text-white leading-[1.14] text-balance max-w-4xl">
            {title}
          </h1>

          {/* Metadata Row: Guaranteed single row on mobile and desktop */}
          <div className="w-full mt-6 sm:mt-8 flex items-center justify-between gap-2 sm:gap-6 text-[13px] sm:text-base text-white/90 font-normal whitespace-nowrap">
            <span className="truncate">{author}</span>
            <span className="shrink-0">{readTime}</span>
            <span className="shrink-0">{date}</span>
          </div>
        </div>
      </section>

      {/* 2. Top Large Rectangular Image Banner (rounded-none) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20">
        <div className="w-full aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-neutral-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* 3. Main Article Body */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24"
      >
        {/* Intro Paragraph */}
        <div className="text-lg sm:text-xl text-[#262525] leading-relaxed mb-14 sm:mb-16 font-normal">
          <p>{defaultBlogDetail.intro}</p>
        </div>

        {/* 7 Numbered Step Sections */}
        <div className="space-y-12 sm:space-y-16">
          {defaultBlogDetail.steps.map((step) => (
            <div key={step.number} className="blog-step-block flex flex-col items-start">
              {/* Step Title */}
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal tracking-tight text-[#1F2D3D] leading-snug mb-4">
                {step.number} — {step.title}
              </h2>

              {/* Step Lead */}
              {step.lead && (
                <p className="text-[#262525] text-base sm:text-lg leading-relaxed mb-4 font-normal">
                  {step.lead}
                </p>
              )}

              {/* List Header & Items */}
              {step.listHeader && (
                <p className="text-[#262525] text-base sm:text-lg font-medium mb-3">
                  {step.listHeader}
                </p>
              )}
              {step.items && step.items.length > 0 && (
                <ul className="space-y-2 mb-4 text-[#262525] text-base sm:text-lg font-normal pl-4 list-disc">
                  {step.items.map((item, iIdx) => (
                    <li key={iIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Closing Note */}
              {step.closing && (
                <p className="text-[#262525] text-base sm:text-lg leading-relaxed font-normal">
                  {step.closing}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Final Thoughts Section */}
        <div className="blog-step-block mt-16 sm:mt-20 pt-12 border-t border-neutral-300/70">
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal tracking-tight text-[#1F2D3D] leading-snug mb-5">
            {defaultBlogDetail.finalThoughts.title}
          </h2>
          <div className="space-y-4 sm:space-y-5 text-[#262525] text-base sm:text-lg leading-relaxed font-normal">
            {defaultBlogDetail.finalThoughts.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* Explore All Blogs Action Pill */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-neutral-300/70 flex justify-center sm:justify-start">
          <button
            onClick={onBackToBlogs}
            className="group inline-flex items-center gap-3 bg-white text-[#000000] border border-neutral-300/80 shadow-sm hover:shadow-md px-8 py-3.5 rounded-full text-base font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore All Blogs</span>
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
          </button>
        </div>
      </div>

      {/* 4. High-Impact CTA Section */}
      <CTASection onOpenModal={onOpenModal} />
    </div>
  )
}
