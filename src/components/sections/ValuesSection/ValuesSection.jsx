import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Badge from '../../common/Badge'
import TimelineItem from './TimelineItem'
import { valuesData } from '../../../data/valuesData'

gsap.registerPlugin(ScrollTrigger)

/**
 * Our Values Section
 * Features:
 * 1. Orchestrated stagger reveal for the section header (badge, title words, description words)
 * 2. Scroll-driven timeline progress line that draws from top to bottom
 * 3. Sequentially activating milestone nodes
 * 4. Stagger reveal for each timeline box/card contents (step, title, description, image) as you scroll
 */
export default function ValuesSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineContainerRef = useRef(null)
  const desktopProgressLineRef = useRef(null)
  const mobileProgressLineRef = useRef(null)

  const headerTitle = "Built on Values. Driven by Quality."
  const headerDesc = "We combine honest communication, thoughtful planning, and dependable craftsmanship to deliver construction projects that stand strong and create lasting value."

  const titleWords = headerTitle.split(' ')
  const descWords = headerDesc.split(' ')

  useGSAP(() => {
    // 1. Header Stagger Animation (Badge -> Title Words -> Description Words)
    if (headerRef.current) {
      const badge = headerRef.current.querySelector('.header-badge')
      const titleWordEls = headerRef.current.querySelectorAll('.header-title-word')
      const descWordEls = headerRef.current.querySelectorAll('.header-desc-word')

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      headerTl
        .fromTo(
          badge,
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo(
          titleWordEls,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.045, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo(
          descWordEls,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.015, ease: 'power3.out' },
          '-=0.25'
        )
    }

    if (!timelineContainerRef.current) return

    const progressLines = [
      desktopProgressLineRef.current,
      mobileProgressLineRef.current
    ].filter(Boolean)

    // 2. Scrub the timeline line from top to bottom (scaleY 0 -> 1)
    gsap.fromTo(
      progressLines,
      { 
        scaleY: 0 
      },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainerRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.5,
        }
      }
    )

    // 3. Sequentially activate each milestone node as the line reaches it
    const nodes = timelineContainerRef.current.querySelectorAll('.timeline-node')
    nodes.forEach((node) => {
      gsap.fromTo(
        node,
        {
          scale: 0.5,
          opacity: 0,
          backgroundColor: '#ff4b18',
          boxShadow: 'none',
        },
        {
          scale: 1.25,
          opacity: 1,
          backgroundColor: '#ff4b18',
          boxShadow: '0 0 12px rgba(255, 75, 24, 0.6)',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 65%',
            toggleActions: 'play reverse play reverse',
          }
        }
      )
    })

    // 4. Stagger animation for all texts (step, heading words, paragraph, image) in each timeline card as you scroll
    const items = timelineContainerRef.current.querySelectorAll('.timeline-item')
    items.forEach((item) => {
      const card = item.querySelector('.timeline-card')
      if (!card) return

      const step = card.querySelector('.timeline-step')
      const titleWords = card.querySelectorAll('.timeline-title-word')
      const desc = card.querySelector('.timeline-desc')
      const img = card.querySelector('.timeline-img')

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      cardTl
        .fromTo(
          step,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        )
        .fromTo(
          titleWords,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          desc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
          '-=0.25'
        )
        .fromTo(
          img,
          { opacity: 0, y: 25, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.35'
        )
    })

    ScrollTrigger.refresh()
  }, { scope: sectionRef })

  return (
    <section 
      ref={sectionRef}
      id="values" 
      className="bg-[#f5f2f2] text-[#1f2d3d] pt-16 sm:pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-neutral-200/60 overflow-hidden"
    >
      {/* Orchestrated Stagger Header */}
      <div 
        ref={headerRef} 
        className="max-w-4xl mx-auto flex flex-col items-center text-center mb-20 sm:mb-28"
      >
        <div className="header-badge mb-6">
          <Badge variant="light">
            Our Values
          </Badge>
        </div>

        <h2 className="header-title text-[36px] sm:text-[40px] md:text-[48px] font-normal tracking-tight text-[#1F2D3D] leading-[1.12] mb-4 text-balance">
          {titleWords.map((word, idx) => (
            <span key={idx} className="header-title-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h2>

        <p className="header-desc text-[#262525] text-[16px] max-w-2xl font-normal leading-relaxed text-balance">
          {descWords.map((word, idx) => (
            <span key={idx} className="header-desc-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Timeline Container with GSAP Scroll-Triggered Progress Line & Staggered Cards */}
      <div 
        ref={timelineContainerRef}
        className="max-w-6xl mx-auto relative"
      >
        {/* Central Vertical Timeline Lines (Desktop) */}
        <div className="absolute left-1/2 top-3.5 bottom-24 w-[2px] -translate-x-1/2 hidden md:block pointer-events-none">
          {/* Animated Orange Progress Line Only (Draws Top to Bottom) */}
          <div 
            ref={desktopProgressLineRef}
            className="absolute top-0 left-0 w-full h-full bg-[#ff4b18] origin-top will-change-transform shadow-[0_0_8px_rgba(255,75,24,0.4)]"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>

        {/* Vertical Timeline Lines (Mobile) */}
        <div className="absolute left-4 top-3.5 bottom-24 w-[2px] md:hidden pointer-events-none">
          {/* Animated Orange Progress Line Only (Draws Top to Bottom) */}
          <div 
            ref={mobileProgressLineRef}
            className="absolute top-0 left-0 w-full h-full bg-[#ff4b18] origin-top will-change-transform shadow-[0_0_8px_rgba(255,75,24,0.4)]"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>

        {/* 6 Alternating Timeline Items */}
        <div className="space-y-16 sm:space-y-24 md:space-y-28">
          {valuesData.map((item, idx) => (
            <TimelineItem
              key={idx}
              step={item.step}
              title={item.title}
              desc={item.desc}
              img={item.img}
              alt={item.alt}
              isLeft={item.isLeft}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
