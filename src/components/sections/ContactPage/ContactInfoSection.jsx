import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { contactInfoCards } from '../../../data/contactData'

gsap.registerPlugin(ScrollTrigger)

/**
 * ContactInfoSection Component
 * Matches Screenshot 3:
 * - 3 Contact Information Cards with subtle #ff4b18 borders
 * - Embedded Interactive Map with location pin and floating card
 */
export default function ContactInfoSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const mapRef = useRef(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          },
        })
      }

      if (mapRef.current) {
        gsap.from(mapRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 85%',
          },
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="bg-[#f5f2f2] pb-24 sm:pb-32 px-4 sm:px-6 lg:px-12 xl:px-16"
    >
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* 1. 3 Contact Info Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {contactInfoCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#F0EAE0] border border-[#ff4b18]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-start justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#ff4b18] transition-colors duration-300 min-h-[160px]"
            >
              <h3 className="text-2xl sm:text-[26px] font-normal tracking-tight text-[#1F2D3D] mb-3">
                {card.title}
              </h3>
              <p className="text-[#262525] text-base sm:text-[17px] leading-relaxed font-normal">
                {card.line1}
              </p>
              <p className="text-[#262525]/80 text-[16px] sm:text-base leading-relaxed font-normal">
                {card.line2}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Interactive Map Container with Floating Card */}
        <div
          ref={mapRef}
          className="relative w-full h-[260px] sm:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-300/80 shadow-md bg-neutral-100"
        >
          {/* Real Google Map Embed */}
          <iframe
            title="Bildora Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841334960395!2d-73.979681!3d40.752375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25901968840a1%3A0xc3f58e44ebf928e1!2s125%20Park%20Ave%2C%20New%20York%2C%20NY%2010017!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            className="w-full h-full border-0 grayscale-[25%] contrast-[1.05]"
            loading="lazy"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Location Card Overlay (matches Framer screenshot design) */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-5 shadow-xl border border-black/10 max-w-[230px] sm:max-w-[320px]">
            <div className="flex items-start justify-between gap-3 mb-1">
              <div>
                <h4 className="font-medium text-[#1F2D3D] text-base sm:text-lg">
                  Bildora HQ
                </h4>
                <p className="text-xs sm:text-sm text-[#262525]/80 leading-relaxed mt-0.5">
                  125 Park Avenue, New York, NY 10017
                </p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-neutral-100 text-[#ff4b18] hover:bg-[#ff4b18] hover:text-white transition-colors shrink-0"
                aria-label="Open in Google Maps"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-neutral-200/80 text-xs text-[#262525]">
              <span className="font-semibold text-neutral-900">4.9 ★</span>
              <span className="text-neutral-500">(120+ Verified Reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
