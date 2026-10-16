import React from 'react'
import AboutHero from '../components/sections/AboutPage/AboutHero'
import AboutStory from '../components/sections/AboutPage/AboutStory'
import AboutStats from '../components/sections/AboutPage/AboutStats'
import AboutApproach from '../components/sections/AboutPage/AboutApproach'
import AboutExpertise from '../components/sections/AboutPage/AboutExpertise'
import AboutTeam from '../components/sections/AboutPage/AboutTeam'
import CTASection from '../components/sections/CTASection/CTASection'

/**
 * AboutPage Orchestrator
 * Fully responsive, high-fidelity implementation of the Bildora About Page:
 * 1. About Hero Section (Orange Header with pill badge and centered typography)
 * 2. Our Story Section (Image + 2 paragraphs + Discover button)
 * 3. Key Metrics Bar (12+ Years, 250+ Projects, 4.8/5 Satisfaction, 98% On-Time)
 * 4. Our Approach Section (4-Step Process 01-04 + Architectural Showcase)
 * 5. Our Expertise Section (3-Column Interactive Grid: Construction, Renovation, PM)
 * 6. Meet The Team Section (4-Column Team Member Showcase)
 * 7. CTA Section (Architectural banner triggering consultation modal)
 */
export default function AboutPage({ onOpenModal, scrollTo, onSelectService }) {
  const handleDiscoverClick = () => {
    const approachElem = document.getElementById('our-approach')
    if (approachElem) {
      if (scrollTo) {
        scrollTo('#our-approach')
      } else {
        approachElem.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="w-full bg-[#f5f2f2]">
      {/* 1. Orange About Hero */}
      <AboutHero />

      {/* 2. Our Story */}
      <AboutStory onDiscoverClick={handleDiscoverClick} />

      {/* 3. Key Statistics Bar */}
      <AboutStats />

      {/* 4. Our Approach */}
      <AboutApproach />

      {/* 5. Our Expertise */}
      <AboutExpertise onSelectService={onSelectService} />

      {/* 6. Meet The Team */}
      <AboutTeam />

      {/* 7. High-Impact CTA Section */}
      <CTASection onOpenModal={onOpenModal} />
    </div>
  )
}
