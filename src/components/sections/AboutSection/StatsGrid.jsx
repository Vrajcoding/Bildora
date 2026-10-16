import React from 'react'
import { statsData } from '../../../data/aboutData'

/**
 * 4 Milestone Statistics Counters for About section
 */
export default function StatsGrid() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 pt-8 sm:pt-12 pb-16 sm:pb-24 text-center px-4 sm:px-6">
      {statsData.map((stat, idx) => (
        <div key={idx}>
          <div className="text-4xl sm:text-5xl md:text-[56px] font-normal text-[#1f2d3d] tracking-tight mb-2">
            {stat.value}
          </div>
          <div className="text-[#626262] text-[16px] font-normal">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
