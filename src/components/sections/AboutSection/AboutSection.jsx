import React from 'react'
import Badge from '../../common/Badge'
import ScrollRevealText from './ScrollRevealText'
import CurvedCarousel from './CurvedCarousel'
import StatsGrid from './StatsGrid'

/**
 * AboutSection Component
 * Recreates the exact Bildora About Us section:
 * - Light pill badge
 * - GSAP ScrollTrigger word-by-word reveal headline
 * - 3D Curved Perspective Carousel with 7 architectural images
 * - 4 Stat Counters
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#f5f2f2] text-[#1f2d3d] pt-24 sm:pt-28 pb-20 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Pill Badge: About Us */}
        <Badge variant="light" className="mb-8">
          About Us
        </Badge>

        {/* Heading with GSAP ScrollTrigger word-by-word gray-to-black reveal */}
        <ScrollRevealText />
      </div>

      {/* 3D Curved Perspective Carousel */}
      <CurvedCarousel />

      {/* 4 Stats Counters */}
      <StatsGrid />
    </section>
  )
}
