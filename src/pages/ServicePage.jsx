import React from 'react'
import ServiceHero from '../components/sections/ServicePage/ServiceHero'
import ServicesGrid from '../components/sections/ServicePage/ServicesGrid'
import CTASection from '../components/sections/CTASection/CTASection'

/**
 * ServicePage Orchestrator
 * High-fidelity implementation matching Framer template:
 * 1. Orange Service Hero (#ff4b18) with "WHAT WE DO" badge & centered typography
 * 2. 2-Column Services Grid (#f5f2f2 background, #ff4b18 titles, #262525 text)
 * 3. Architectural CTA Section with consultation modal trigger
 */
export default function ServicePage({ onOpenModal, onSelectService }) {
  return (
    <div className="w-full bg-[#f5f2f2]">
      {/* 1. Orange Service Hero */}
      <ServiceHero />

      {/* 2. 6-Card 2-Column Services Grid */}
      <ServicesGrid onSelectService={onSelectService} />

      {/* 3. High-Impact CTA Section */}
      <CTASection onOpenModal={onOpenModal} />
    </div>
  )
}
