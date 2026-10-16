import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { blogPosts } from '../../../data/blogData'
import BlogCard from './BlogCard'

gsap.registerPlugin(ScrollTrigger)

/**
 * BlogSection Component
 * 2-Column Responsive Grid of all 6 Blog Posts
 * Decreased grid gap and clean square card layout
 * Background: #f5f2f2
 */
export default function BlogSection({ onSelectPost }) {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useGSAP(
    () => {
      if (!sectionRef.current || !cardsRef.current) return

      gsap.from(cardsRef.current.children, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
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
      id="blog-posts"
      ref={sectionRef}
      className="bg-[#f5f2f2] text-[#1F2D3D] py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 xl:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* 2-Column Responsive Blog Articles Grid with Decreased Gap */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10"
        >
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => onSelectPost?.(post)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
