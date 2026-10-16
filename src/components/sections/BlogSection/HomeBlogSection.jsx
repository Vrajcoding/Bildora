import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionHeader from '../../common/SectionHeader'
import BlogCard from './BlogCard'
import { blogPosts } from '../../../data/blogData'

gsap.registerPlugin(ScrollTrigger)

/**
 * HomeBlogSection Component
 * Displays the top 2 blog cards on the Home page for both mobile & large screens
 */
export default function HomeBlogSection({ onSelectPost, onNavigate }) {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const homePosts = blogPosts.slice(0, 2)

  useGSAP(
    () => {
      if (!sectionRef.current || !cardsRef.current) return

      gsap.from(cardsRef.current.children, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="home-blog"
      ref={sectionRef}
      className="bg-[#f5f2f2] text-[#1F2D3D] pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 border-t border-neutral-200/60"
    >
      <SectionHeader
        badgeText="From the Blog"
        title="Ideas, Insights & Inspiration for Better Building"
        mobileTitle={"Ideas, Insights &\nInspiration for Better\nBuilding"}
        description="Discover our latest perspectives on construction craft, architecture innovation, and sustainable design."
        mobileDescription={"Discover our latest perspectives\non construction craft, architecture\ninnovation, and sustainable design."}
        className="mb-12 sm:mb-16"
      />

      {/* 2-Card Responsive Grid on Home Page */}
      <div className="max-w-6xl mx-auto">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
        >
          {homePosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => onSelectPost?.(post)}
            />
          ))}
        </div>

        {/* View All Articles Action */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => onNavigate?.('blog')}
            className="group inline-flex items-center gap-3 bg-white text-black border border-neutral-300 shadow-sm hover:shadow-md px-7 sm:px-8 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 cursor-pointer select-none active:scale-95"
          >
            <span>View All Articles</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
