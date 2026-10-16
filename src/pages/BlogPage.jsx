import React from 'react'
import BlogHero from '../components/sections/BlogPage/BlogHero'
import BlogSection from '../components/sections/BlogSection/BlogSection'
import CTASection from '../components/sections/CTASection/CTASection'

/**
 * BlogPage Orchestrator
 * High-fidelity implementation matching Framer template:
 * 1. Orange Blog Hero (#ff4b18) with "FROM THE BLOG" badge & typography
 * 2. 2-Column Responsive Blog Grid (#f5f2f2 background, #ff4b18 titles, #262525 text, rounded-none images)
 * 3. High-Impact CTA Section with consultation modal trigger
 */
export default function BlogPage({ onOpenModal, onSelectPost }) {
  return (
    <div className="w-full bg-[#f5f2f2]">
      {/* 1. Orange Blog Hero */}
      <BlogHero />

      {/* 2. 6-Card Blog Grid */}
      <BlogSection onSelectPost={onSelectPost} />

      {/* 3. CTA Banner */}
      <CTASection onOpenModal={onOpenModal} />
    </div>
  )
}
