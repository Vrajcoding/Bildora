import React from 'react'
import ContactHero from '../components/sections/ContactPage/ContactHero'
import ContactFormSection from '../components/sections/ContactPage/ContactFormSection'
import ContactInfoSection from '../components/sections/ContactPage/ContactInfoSection'
import CTASection from '../components/sections/CTASection/CTASection'

/**
 * ContactPage Orchestrator
 * Matches Framer Contact Page:
 * 1. Orange Contact Hero (#ff4b18) with "GET IN TOUCH" badge & typography
 * 2. 2-Column Contact Section with Architectural showcase image & Orange consultation form
 * 3. 3 Info Cards (Office, Phone, Email) & Interactive Location Map
 * 4. High-Impact CTA Section before Footer
 */
export default function ContactPage({ onOpenModal }) {
  return (
    <div className="w-full bg-[#f5f2f2]">
      {/* 1. Orange Contact Hero */}
      <ContactHero />

      {/* 2. 2-Column Showcase & Form */}
      <ContactFormSection />

      {/* 3. Contact Info Cards & Map */}
      <ContactInfoSection />

      {/* 4. High-Impact CTA Section */}
      <CTASection onOpenModal={onOpenModal} />
    </div>
  )
}
