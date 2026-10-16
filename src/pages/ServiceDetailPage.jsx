import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { defaultServiceDetail } from '../data/serviceDetailData'
import CTASection from '../components/sections/CTASection/CTASection'

gsap.registerPlugin(ScrollTrigger)

/**
 * ServiceDetailPage Component
 * Detailed view when clicking any service card:
 * - Orange Hero (#ff4b18)
 * - Top sharp rectangular image (rounded-none)
 * - Narrative content blocks (#1F2D3D headings, #262525 text)
 * - Middle sharp rectangular image (rounded-none)
 * - Remaining in-depth architectural details & why choose section
 * - "Explore All Services →" navigation button
 * - Architectural CTA banner & Footer
 */
export default function ServiceDetailPage({
  service = defaultServiceDetail,
  onOpenModal,
  onBackToServices,
}) {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  // Use provided service or default to General Construction detail
  const title = service.title || defaultServiceDetail.title
  const subtitle = service.description || defaultServiceDetail.subtitle
  const topImage = service.image || defaultServiceDetail.heroImage
  const middleImage = defaultServiceDetail.middleImage

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Hero animation
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }

      // Content blocks entrance
      if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll('.service-block')
        headings.forEach((block) => {
          gsap.from(block, {
            y: 35,
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
          {/* Service Title */}
          <h1 className="text-[36px] sm:text-5xl md:text-6xl lg:text-[64px] font-medium tracking-tight text-white leading-[1.12] text-balance max-w-4xl">
            {title}
          </h1>

          {/* Service Subtitle */}
          <p className="mt-6 sm:mt-8 text-white/95 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-balance max-w-2xl sm:max-w-3xl">
            {subtitle}
          </p>
        </div>
      </section>

      {/* 2. Top Large Rectangular Image Banner (rounded-none) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20">
        <div className="w-full aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-neutral-200">
          <img
            src={topImage}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* 3. Main Narrative Body */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24"
      >
        {/* Sections Before Middle Image */}
        <div className="space-y-14 sm:space-y-18">
          {defaultServiceDetail.sectionsBeforeMiddleImage.map((sec, idx) => (
            <div key={idx} className="service-block flex flex-col items-start">
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal tracking-tight text-[#1F2D3D] leading-snug mb-5">
                {sec.title}
              </h2>
              <div className="space-y-4 sm:space-y-5 text-[#262525] text-base sm:text-lg leading-relaxed font-normal">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Middle Architectural Image Banner (rounded-none) */}
        <div className="my-16 sm:my-20 md:my-24">
          <div className="w-full aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-neutral-200">
            <img
              src={middleImage}
              alt="Architectural detailing and construction execution"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        {/* Sections After Middle Image */}
        <div className="space-y-14 sm:space-y-18">
          {defaultServiceDetail.sectionsAfterMiddleImage.map((sec, idx) => (
            <div key={idx} className="service-block flex flex-col items-start">
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal tracking-tight text-[#1F2D3D] leading-snug mb-5">
                {sec.title}
              </h2>
              <div className="space-y-4 sm:space-y-5 text-[#262525] text-base sm:text-lg leading-relaxed font-normal">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Services Action Pill */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-neutral-300/70 flex justify-center sm:justify-start">
          <button
            onClick={onBackToServices}
            className="group inline-flex items-center gap-3 bg-white text-[#000000] border border-neutral-300/80 shadow-sm hover:shadow-md px-8 py-3.5 rounded-full text-base font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore All Services</span>
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
