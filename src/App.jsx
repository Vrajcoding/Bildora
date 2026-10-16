import React, { useState, useEffect } from 'react'
import { useLenisScroll } from './hooks/useLenisScroll'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection/AboutSection'
import ServicesSection from './components/sections/ServicesSection/ServicesSection'
import ValuesSection from './components/sections/ValuesSection/ValuesSection'
import ProjectsSection from './components/sections/ProjectsSection/ProjectsSection'
import TestimonialsSection from './components/sections/TestimonialsSection/TestimonialsSection'
import CTASection from './components/sections/CTASection/CTASection'
import HomeBlogSection from './components/sections/BlogSection/HomeBlogSection'
import AboutPage from './pages/AboutPage'
import ServicePage from './pages/ServicePage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ContactPage from './pages/ContactPage'
import ProjectModal from './components/common/ProjectModal'
import { defaultServiceDetail } from './data/serviceDetailData'
import { defaultBlogDetail } from './data/blogDetailData'
import { Agentation } from 'agentation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Main Application Orchestrator
 * Supports full-page dedicated views:
 * - About Page (#about)
 * - Service Page (#service)
 * - Service Detail Page (#service-detail)
 * - Blog Page (#blog)
 * - Blog Detail Page (#blog-detail)
 * - Contact Page (#contact) triggered by "Let's Build" CTA
 * - Home Page (#home)
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '')
      if (['about', 'blog', 'service', 'contact'].includes(hash)) return hash
      if (hash.startsWith('service-')) return 'service-detail'
      if (hash.startsWith('blog-')) return 'blog-detail'
    }
    return 'home'
  })

  const [selectedService, setSelectedService] = useState(defaultServiceDetail)
  const [selectedPost, setSelectedPost] = useState(defaultBlogDetail)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Initialize Lenis smooth scroll and get scrollTo helper
  const { scrollTo } = useLenisScroll()

  // Hash change listener for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      let target = 'home'
      if (['about', 'blog', 'service', 'contact'].includes(hash)) {
        target = hash
      } else if (hash.startsWith('service-')) {
        target = 'service-detail'
      } else if (hash.startsWith('blog-')) {
        target = 'blog-detail'
      } else if (hash === 'home' || !hash) {
        target = 'home'
      }

      setCurrentPage(target)
      if (scrollTo) {
        scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [scrollTo])

  // Automatically scroll to top and refresh ScrollTrigger whenever currentPage changes
  useEffect(() => {
    window.scrollTo(0, 0)
    if (scrollTo) {
      scrollTo(0, { immediate: true })
    }
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      if (scrollTo) {
        scrollTo(0, { immediate: true })
      }
      ScrollTrigger.refresh()
    }, 60)
    return () => clearTimeout(timer)
  }, [currentPage, scrollTo])

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId)
    window.location.hash = pageId

    if (scrollTo) {
      scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }

  const handleSelectService = (service) => {
    setSelectedService(service || defaultServiceDetail)
    setCurrentPage('service-detail')
    window.location.hash = `service-${service?.id || 'detail'}`

    if (scrollTo) {
      scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }

  const handleSelectPost = (post) => {
    setSelectedPost(post || defaultBlogDetail)
    setCurrentPage('blog-detail')
    window.location.hash = `blog-${post?.id || 'detail'}`

    if (scrollTo) {
      scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }

  const getActiveNavSection = () => {
    if (currentPage === 'service-detail') return 'service'
    if (currentPage === 'blog-detail') return 'blog'
    if (currentPage === 'contact') return '' // Contact is not in navbar pill
    return currentPage
  }

  const handleOpenConsultation = () => {
    handleNavigate('contact')
  }

  // Render individual page views
  const renderPage = (pageId) => {
    switch (pageId) {
      case 'contact':
        return <ContactPage onOpenModal={handleOpenConsultation} />

      case 'about':
        return (
          <AboutPage
            onOpenModal={handleOpenConsultation}
            scrollTo={scrollTo}
            onSelectService={handleSelectService}
          />
        )

      case 'home':
        return (
          <>
            <HeroSection
              onOpenModal={handleOpenConsultation}
              _onScrollDown={() => handleNavigate('about')}
            />
            <AboutSection />
            <ServicesSection />
            <ValuesSection />
            <ProjectsSection />
            <TestimonialsSection />
            <HomeBlogSection
              onSelectPost={handleSelectPost}
              onNavigate={handleNavigate}
            />
            <CTASection onOpenModal={handleOpenConsultation} />
          </>
        )

      case 'service':
        return (
          <ServicePage
            onOpenModal={handleOpenConsultation}
            onSelectService={handleSelectService}
          />
        )

      case 'service-detail':
        return (
          <ServiceDetailPage
            service={selectedService}
            onOpenModal={handleOpenConsultation}
            onBackToServices={() => handleNavigate('service')}
          />
        )

      case 'blog':
        return (
          <BlogPage
            onOpenModal={handleOpenConsultation}
            onSelectPost={handleSelectPost}
          />
        )

      case 'blog-detail':
        return (
          <BlogDetailPage
            post={selectedPost}
            onOpenModal={handleOpenConsultation}
            onBackToBlogs={() => handleNavigate('blog')}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0b0c10] text-white font-['Inter',sans-serif] selection:bg-white selection:text-neutral-900 relative">
      {/* Top Floating Glass Header */}
      <Navbar
        activeSection={getActiveNavSection()}
        onNavigate={handleNavigate}
        onOpenModal={handleOpenConsultation}
      />

      {/* Main Page View Flow */}
      <main className="w-full overflow-x-hidden">
        {renderPage(currentPage)}
      </main>

      {/* Dark Minimal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenModal={handleOpenConsultation}
      />

      {/* Optional Quick Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Agentation Toolbar for AI Web Page Annotations (Dev only) */}
      {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
    </div>
  )
}
