import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import WordReveal from '../../common/WordReveal'
import { projectsData } from '../../../data/projectsData'

gsap.registerPlugin(ScrollTrigger)

/**
 * Our Projects Section
 * Implements clean, simple page appear on scroll (no up-and-down movement):
 * 1. As user scrolls down, each page simply appears smoothly (crossfade & fade-in reveal).
 * 2. No vertical up-and-down sliding or curtain clipping.
 * 3. Identical smooth, dependable appear transition for all four project pages.
 */
export default function ProjectsSection() {
  const containerRef = useRef(null)
  const pinnedStageRef = useRef(null)
  const numberReelRef = useRef(null)
  const imageContainersRef = useRef([])
  const titlesRef = useRef([])
  const descriptionsRef = useRef([])

  useGSAP(() => {
    if (!pinnedStageRef.current || !numberReelRef.current) return

    const totalProjects = projectsData.length
    const numTransitions = totalProjects - 1

    // Ensure explicit initial state for containers
    gsap.set(numberReelRef.current, { yPercent: 0 })
    imageContainersRef.current.forEach((el, idx) => {
      if (el) gsap.set(el, { opacity: idx === 0 ? 1 : 0 })
    })
    titlesRef.current.forEach((el, idx) => {
      if (el) gsap.set(el, { opacity: idx === 0 ? 1 : 0 })
    })
    descriptionsRef.current.forEach((el, idx) => {
      if (el) gsap.set(el, { opacity: idx === 0 ? 1 : 0 })
    })

    // First page inner elements for clean, unscrambled entrance stagger
    const firstImg = imageContainersRef.current[0]?.querySelector('img')
    const firstNumber = numberReelRef.current?.children[0]
    const firstTitleH3 = titlesRef.current[0]?.querySelector('h3')
    const firstDescP = descriptionsRef.current[0]?.querySelector('p')

    if (firstImg) gsap.set(firstImg, { scale: 1.08, opacity: 0 })
    if (firstNumber) gsap.set(firstNumber, { y: 35, opacity: 0 })
    if (firstTitleH3) gsap.set(firstTitleH3, { y: 35, opacity: 0 })
    if (firstDescP) gsap.set(firstDescP, { y: 25, opacity: 0 })

    // 1. Entrance Stagger Animation for First Project Page (Runs once without timeline collision)
    const firstPageTl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedStageRef.current,
        start: 'top 75%',
        once: true,
      }
    })

    firstPageTl
      .to(firstImg, {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: 'power2.out',
      })
      .to(
        firstNumber,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
        },
        '-=0.75'
      )
      .to(
        firstTitleH3,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
        },
        '-=0.55'
      )
      .to(
        firstDescP,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
        },
        '-=0.55'
      )

    // Master scrubbed timeline across pinned stage
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedStageRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * numTransitions}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      }
    })

    // Transitions between project pages:
    // Only the number reel moves vertically up-and-down with scroll.
    // The image, title, and description transition smoothly in place with crossfade.
    for (let i = 0; i < numTransitions; i++) {
      const nextIdx = i + 1
      const label = `step-${nextIdx}`

      tl.addLabel(label)

      // 1. VERTICAL NUMBER REEL: Translates vertically up on scroll down, and down on scroll up
      tl.to(
        numberReelRef.current,
        {
          yPercent: -((nextIdx * 100) / totalProjects),
          duration: 0.6,
          ease: 'power2.inOut',
        },
        label
      )

      // 2. Outgoing title and description fade out in place
      if (titlesRef.current[i]) {
        tl.to(
          titlesRef.current[i],
          { opacity: 0, duration: 0.35, ease: 'power2.inOut' },
          label
        )
      }
      if (descriptionsRef.current[i]) {
        tl.to(
          descriptionsRef.current[i],
          { opacity: 0, duration: 0.35, ease: 'power2.inOut' },
          label
        )
      }

      // 3. Incoming image crossfades cleanly in place
      if (imageContainersRef.current[nextIdx]) {
        tl.to(
          imageContainersRef.current[nextIdx],
          {
            opacity: 1,
            ease: 'power2.inOut',
            duration: 0.75,
          },
          label
        )
      }

      // 4. Incoming title and description fade in place
      if (titlesRef.current[nextIdx]) {
        tl.to(
          titlesRef.current[nextIdx],
          {
            opacity: 1,
            ease: 'power2.out',
            duration: 0.45,
          },
          `${label}+=0.15`
        )
      }

      if (descriptionsRef.current[nextIdx]) {
        tl.to(
          descriptionsRef.current[nextIdx],
          {
            opacity: 1,
            ease: 'power2.out',
            duration: 0.45,
          },
          `${label}+=0.15`
        )
      }

      // Settle time for current page before starting next transition
      tl.to({}, { duration: 0.35 })
    }

    ScrollTrigger.refresh()
  }, { scope: containerRef })

  return (
    <div id="projects" ref={containerRef} className="relative bg-[#08090d] text-white">
      {/* 1. SECTION HEADER */}
      <section className="pt-16 sm:pt-36 pb-8 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center mt-2 sm:mt-6 pr-4 sm:pr-8">
        {/* Orange Pill Badge with White Text */}
        <div className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 rounded-full bg-[#ff4b18] text-white font-medium text-xs sm:text-sm tracking-wide shadow-sm mb-6 sm:mb-8 select-none">
          Our Projects
        </div>

        {/* Heading */}
        <WordReveal
          as="h2"
          text="Built with Purpose. Made to Last."
          staggerDelay={0.06}
          initialDelay={0.1}
          className="text-[36px] sm:text-[40px] md:text-[48px] font-normal tracking-tight text-white mb-4 sm:mb-5 leading-[1.12] text-balance"
        />

        {/* Subtitle */}
        <WordReveal
          as="p"
          text="Explore a selection of projects where thoughtful planning, skilled craftsmanship, and dependable execution come together to create spaces built for the future."
          staggerDelay={0.03}
          initialDelay={0.35}
          className="text-neutral-300 text-[16px] max-w-2xl font-normal leading-relaxed text-balance"
        />
      </section>

      {/* 2. PINNED SHOWCASE STAGE (Generous, full-impact height) */}
      <div
        ref={pinnedStageRef}
        className="w-full h-screen h-[100dvh] min-h-screen relative overflow-hidden bg-black select-none"
      >
        {/* Layered Background Images (Clean Page Appear) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {projectsData.map((project, idx) => (
            <div
              key={project.number}
              ref={(el) => (imageContainersRef.current[idx] = el)}
              className="absolute inset-0 w-full h-full overflow-hidden will-change-[opacity]"
              style={{
                zIndex: idx + 1,
                opacity: idx === 0 ? 1 : 0,
              }}
            >
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover object-center will-change-transform"
              />
              {/* Subtle Contrast Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Foreground Content Layout */}
        <div className="relative z-20 w-full h-full p-5 sm:p-8 md:p-14 lg:p-20 flex flex-col justify-between pointer-events-none">

          {/* TOP-LEFT: Project Number Reel (Moves vertically up-to-down and down-to-up on scroll) */}
          <div className="relative h-14 sm:h-20 md:h-24 overflow-hidden mt-1 sm:mt-2">
            <div
              ref={numberReelRef}
              className="flex flex-col will-change-transform"
            >
              {projectsData.map((project) => (
                <div
                  key={project.number}
                  className="h-14 sm:h-20 md:h-24 flex items-center text-4xl sm:text-6xl md:text-7xl font-normal text-white/95 tracking-tight drop-shadow-md select-none will-change-[opacity,transform]"
                >
                  {project.number}
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE-LEFT: Project Titles (Font size 48px, slight top & right margin) */}
          <div className="relative max-w-3xl my-auto py-4 sm:py-6 min-h-[90px] sm:min-h-[140px] flex items-center mt-3 sm:mt-4 mr-4 sm:mr-6">
            {projectsData.map((project, idx) => (
              <div
                key={project.number}
                ref={(el) => (titlesRef.current[idx] = el)}
                className="absolute left-0 top-0 bottom-0 flex items-center will-change-[opacity,transform]"
                style={{
                  opacity: idx === 0 ? 1 : 0,
                }}
              >
                <h3 className="text-[22px] xs:text-[26px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-normal text-white leading-[1.12] tracking-tight drop-shadow-lg text-balance">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>

          {/* BOTTOM-RIGHT: Project Descriptions (Paragraph size 20px) */}
          <div className="relative flex justify-end w-full">
            <div className="relative w-full max-w-md min-h-[70px] sm:min-h-[110px]">
              {projectsData.map((project, idx) => (
                <div
                  key={project.number}
                  ref={(el) => (descriptionsRef.current[idx] = el)}
                  className="absolute right-0 bottom-0 will-change-[opacity,transform]"
                  style={{
                    opacity: idx === 0 ? 1 : 0,
                  }}
                >
                  <p className="text-white/95 text-[16px] sm:text-[17px] md:text-[20px] font-normal leading-relaxed text-balance drop-shadow-md text-right md:text-left">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
