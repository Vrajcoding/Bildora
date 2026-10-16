import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollRevealText
 * Formatted strictly into 3 lines as requested:
 * Line 1: "With decades of experience, we specialize"
 * Line 2: "in turning ideas into well-designed structures"
 * Line 3: "that stand the test of time."
 *
 * Implements CHARACTER-BY-CHARACTER (letter-wise) color scrub animation
 * transitioning from light gray rgb(215, 215, 210) to active deep slate/black rgb(31, 45, 61)
 */
export default function ScrollRevealText() {
  const containerRef = useRef(null)

  const desktopLines = [
    "With decades of experience, we specialize in",
    "turning ideas into well-designed structures",
    "that stand the test of time."
  ]

  const mobileLines = [
    "With decades of experience,",
    "we specialize in turning ideas",
    "into well-designed structures",
    "that stand the test of time."
  ]

  useGSAP(() => {
    if (!containerRef.current) return

    const charElements = containerRef.current.querySelectorAll('.about-char')

    gsap.fromTo(
      charElements,
      {
        color: '#c5c9d1',
        opacity: 0.22,
      },
      {
        color: '#000000',
        opacity: 1,
        duration: 0.03,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          end: 'bottom 48%',
          scrub: 0.4,
        },
      }
    )

    ScrollTrigger.refresh()
  }, { scope: containerRef })

  return (
    <h2
      ref={containerRef}
      className="text-[28px] sm:text-3xl md:text-[38px] lg:text-[44px] xl:text-[48px] font-normal leading-[1.25] tracking-tight max-w-5xl mx-auto mb-4 sm:mb-6 text-black select-none text-center"
    >
      {/* Mobile view: Exactly 4 rows */}
      <div className="sm:hidden flex flex-col items-center">
        {mobileLines.map((line, lineIdx) => (
          <span key={lineIdx} className="block mt-1 first:mt-0">
            {line.split(' ').map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block whitespace-nowrap mr-[0.22em]"
              >
                {word.split('').map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="about-char will-change-[color,opacity]"
                    style={{ color: '#c5c9d1', opacity: 0.22 }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        ))}
      </div>

      {/* Desktop view: Exactly 3 rows */}
      <div className="hidden sm:block">
        {desktopLines.map((line, lineIdx) => (
          <span key={lineIdx} className="block mt-1.5 first:mt-0">
            {line.split(' ').map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block whitespace-nowrap mr-[0.28em]"
              >
                {word.split('').map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="about-char will-change-[color,opacity]"
                    style={{ color: '#c5c9d1', opacity: 0.22 }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        ))}
      </div>
    </h2>
  )
}
