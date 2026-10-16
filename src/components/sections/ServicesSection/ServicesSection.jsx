import React from 'react'
import SectionHeader from '../../common/SectionHeader'
import ServiceCard from './ServiceCard'
import { servicesData } from '../../../data/servicesData'

/**
 * Our Services Section for Home Page
 * Displays ONLY the top 2 services with clean sharp rectangular images
 */
export default function ServicesSection() {
  const homeServices = servicesData.slice(0, 2)

  return (
    <section 
      id="service" 
      className="bg-[#f5f2f2] text-[#1F2D3D] pt-16 sm:pt-24 pb-28 px-4 sm:px-6 lg:px-8 relative z-10"
    >
      <SectionHeader
        badgeText="Our Services"
        title="Built Around Your Vision."
        titleClassName="lg:whitespace-nowrap"
        description="From planning and construction to the final details, Bildora delivers reliable solutions built around quality, precision, and lasting performance."
        mobileDescription={"From planning and construction\nto the final details, Bildora delivers\nreliable solutions built around\nquality, precision, and lasting performance."}
        className="mb-16 sm:mb-20"
      />

      {/* Grid of ONLY 2 Service Cards on Home Page */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {homeServices.map((service, idx) => (
          <ServiceCard
            key={service.id || idx}
            title={service.title}
            description={service.description}
            image={service.image}
            alt={service.alt}
            delay={idx * 0.15}
          />
        ))}
      </div>
    </section>
  )
}
