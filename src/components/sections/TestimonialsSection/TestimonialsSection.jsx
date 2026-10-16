import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { testimonialsData } from '../../../data/testimonialsData'
import TestimonialCard from './TestimonialCard'

gsap.registerPlugin(ScrollTrigger)

/**
 * TestimonialsSection Component
 * Exact 1:1 reconstruction of bildora.framer.website using GSAP ScrollTrigger:
 *
 * Architecture:
 * 1. Pinned Title Block (z-0 layer in front of dark background, behind cards):
 *    - Pinned at top of viewport while scrolling the section
 *    - Centered "Client Stories" badge, large heading, and subtitle
 *    - Smoothly scales down (1.0 -> 0.65), blurs (0px -> 14px), and fades (1.0 -> 0.1) as cards arrive
 * 2. Testimonial Wrapper (z-10 layer in front of Title Block):
 *    - Cards stream in the exact 5-row Framer Bildora layout:
 *      Row 1: Daniel Carter (Left, offset by 100px) & Sophia Bennett (Right), gap 240px
 *      Row 2: Michael Anderson (Right, justify-end)
 *      Row 3: Emma Richardson (Left, justify-start pl-[200px])
 *      Row 4: James Wilson (Right, justify-end)
 *      Row 5: Olivia Parker (Left, justify-start pl-[200px])
 * 3. Cards reveal smoothly from bottom to up (y: 90 -> 0) with power3 ease as user scrolls.
 */
export default function TestimonialsSection() {
  const containerRef = useRef(null)
  const titleBlockRef = useRef(null)
  const titleContentRef = useRef(null)
  const wrapperRef = useRef(null)
  const firstRowRef = useRef(null)

  // Get individual testimonial data items
  const daniel = testimonialsData.find((t) => t.id === 1)
  const sophia = testimonialsData.find((t) => t.id === 2)
  const michael = testimonialsData.find((t) => t.id === 3)
  const emma = testimonialsData.find((t) => t.id === 4)
  const james = testimonialsData.find((t) => t.id === 5)
  const olivia = testimonialsData.find((t) => t.id === 6)

  useGSAP(
    () => {
      if (!containerRef.current || !titleBlockRef.current || !wrapperRef.current) return

      const mm = gsap.matchMedia()

      // Large Screens (lg and up)
      mm.add('(min-width: 1024px)', () => {
        // 1. Pin the Title Block throughout the entire section scroll
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: titleBlockRef.current,
          pinSpacing: false,
        })

        // Ensure title starts fully visible, crisp, and unblurred
        if (titleContentRef.current) {
          gsap.set(titleContentRef.current, {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
          })

          // 2. Continuous smooth scrub: text smoothly goes back -> back -> back in 3D depth as user scrolls
          gsap.to(titleContentRef.current, {
            scale: 0.76,
            opacity: 0.2,
            filter: 'blur(8px)',
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom 50%',
              scrub: 1.2,
            },
          })

          // 3. Fade completely out as the wrapper finishes scrolling
          gsap.to(titleContentRef.current, {
            opacity: 0,
            ease: 'power1.in',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'bottom 60%',
              end: 'bottom 20%',
              scrub: 1,
            },
          })
        }

        // 4. Testimonial boxes smoothly rise up at the exact same time as you scroll
        const allRows = wrapperRef.current.querySelectorAll('.testimonial-row')
        allRows.forEach((row) => {
          gsap.fromTo(
            row,
            {
              y: 130,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 92%',
                end: 'top 52%',
                scrub: 1.2,
              },
            }
          )
        })
      })

      // Mobile & Tablet (<1024px)
      mm.add('(max-width: 1023px)', () => {
        const mobileCards = containerRef.current.querySelectorAll('.mobile-card-item')
        if (mobileCards.length > 0) {
          gsap.from(mobileCards, {
            y: 45,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mobileCards[0],
              start: 'top 85%',
            },
          })
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="stories"
      ref={containerRef}
      className="relative bg-[#08090d] text-white selection:bg-[#ff4b18] selection:text-white"
    >
      {/* DESKTOP VIEW (lg and up): GSAP ScrollTrigger pinned scroll animation with blur & scale */}
      <div className="hidden lg:block relative">
        {/* 1. Pinned Title Block (z-0: behind cards) */}
        <div
          ref={titleBlockRef}
          className="absolute top-0 left-0 h-screen w-full flex items-center justify-center pointer-events-none z-0"
        >
          <div
            ref={titleContentRef}
            className="max-w-5xl mx-auto flex flex-col items-center text-center px-6 pointer-events-auto transform-gpu will-change-[filter,opacity,transform]"
          >
            {/* Pill Badge: 14px, orange background and white text */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[14px] font-medium bg-[#ff4b18] text-white shadow-sm mb-6 select-none">
              Client Stories
            </div>

            {/* Headline: 48px on desktop in a single line */}
            <h2 className="text-[38px] md:text-[44px] lg:text-[48px] font-normal tracking-tight text-white mb-5 leading-[1.15] whitespace-nowrap text-balance">
              Trusted by Clients. Built on Results.
            </h2>

            {/* Subtitle: 16px */}
            <p className="text-neutral-300 text-[16px] max-w-2xl font-normal leading-relaxed text-balance px-2">
              Hear from the people and businesses who trusted Bildora to bring their construction projects to life with quality, care, and dependable service.
            </p>
          </div>
        </div>

        {/* 2. Testimonial Wrapper (z-10 layer in front of Title Block) */}
        <div
          id="testimonial-wrapper"
          ref={wrapperRef}
          className="relative z-10 pt-[70vh] pb-52 px-8 lg:px-12 max-w-[1390px] mx-auto pointer-events-auto"
        >
          {/* Desktop Layout: Exact 5-Row Bildora Flow */}
          <div className="flex flex-col gap-[73px] w-full">

            {/* Row 1: "1 & 2" (Daniel Carter on left with pt-[100px], Sophia Bennett on right with pt-0, gap 240px) */}
            <div
              ref={firstRowRef}
              className="testimonial-row flex flex-row justify-center items-start gap-[160px] xl:gap-[240px] w-full"
            >
              <div className="pt-[100px]">
                <TestimonialCard
                  quote={daniel.quote}
                  name={daniel.name}
                  role={daniel.role}
                  avatar={daniel.avatar}
                />
              </div>

              <div className="pt-0">
                <TestimonialCard
                  quote={sophia.quote}
                  name={sophia.name}
                  role={sophia.role}
                  avatar={sophia.avatar}
                />
              </div>
            </div>

            {/* Row 2: "3" (Michael Anderson aligned to the right edge) */}
            <div className="testimonial-row flex flex-row justify-end items-center w-full">
              <TestimonialCard
                quote={michael.quote}
                name={michael.name}
                role={michael.role}
                avatar={michael.avatar}
              />
            </div>

            {/* Row 3: "4" (Emma Richardson aligned to left with 200px padding) */}
            <div className="testimonial-row flex flex-row justify-start items-center w-full pl-[120px] xl:pl-[200px]">
              <TestimonialCard
                quote={emma.quote}
                name={emma.name}
                role={emma.role}
                avatar={emma.avatar}
              />
            </div>

            {/* Row 4: "5" (James Wilson aligned to the right edge) */}
            <div className="testimonial-row flex flex-row justify-end items-center w-full">
              <TestimonialCard
                quote={james.quote}
                name={james.name}
                role={james.role}
                avatar={james.avatar}
              />
            </div>

            {/* Row 5: "6" (Olivia Parker aligned to left with 200px padding) */}
            <div className="testimonial-row flex flex-row justify-start items-center w-full pl-[120px] xl:pl-[200px]">
              <TestimonialCard
                quote={olivia.quote}
                name={olivia.name}
                role={olivia.role}
                avatar={olivia.avatar}
              />
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE & TABLET VIEW (< lg): Clean stacked layout with staggered entrance */}
      <div className="block lg:hidden pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[14px] font-medium bg-[#ff4b18] text-white shadow-sm mb-5 select-none">
            Client Stories
          </div>
          <h2 className="text-[36px] sm:text-[40px] md:text-[48px] font-normal tracking-tight text-white mb-4 leading-[1.12] text-balance">
            Trusted by Clients. Built on Results.
          </h2>
          <p className="text-neutral-300 text-[16px] font-normal leading-relaxed text-balance">
            Hear from the people and businesses who trusted Bildora to bring their construction projects to life with quality, care, and dependable service.
          </p>
        </div>

        {/* 1-Column Stacked Cards fitting the mobile screen cleanly */}
        <div className="flex flex-col items-center gap-7 w-full max-w-md mx-auto">
          {testimonialsData.map((item) => (
            <div key={item.id} className="mobile-card-item w-full flex justify-center">
              <TestimonialCard
                quote={item.quote}
                name={item.name}
                role={item.role}
                avatar={item.avatar}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
