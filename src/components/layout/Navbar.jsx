import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../../data/navigation'
import Button from '../common/Button'

/**
 * Reusable Bildora House + Stepped Bricks SVG Logo Icon
 * Exact recreation of the Bildora brand mark in Photo 1 & 2:
 * - Roof outline with right chimney
 * - Solid left wall
 * - Stepped brick courses creating the construction staircase
 */
function BildoraIcon({ className = "w-7 h-7 text-white shrink-0" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Chimney on the right slope */}
      <rect x="21" y="4" width="3.2" height="6.2" rx="0.5" />

      {/* Pitched Roof outline with overhang eaves */}
      <path d="M16 2.6L2 14.5H5.8L16 5.8L26.2 14.5H30L16 2.6Z" />

      {/* Solid vertical left wall */}
      <path d="M5.8 15.2H10.4V27.5H5.8Z" />

      {/* Stepped brick courses to the right */}
      {/* Row 1 (top): 1 brick */}
      <rect x="18" y="15.2" width="5.2" height="2.5" rx="0.3" />

      {/* Row 2: 2 bricks */}
      <rect x="14" y="18.3" width="4.5" height="2.5" rx="0.3" />
      <rect x="19.1" y="18.3" width="4.5" height="2.5" rx="0.3" />

      {/* Row 3: 3 bricks */}
      <rect x="11" y="21.4" width="3.8" height="2.5" rx="0.3" />
      <rect x="15.4" y="21.4" width="4" height="2.5" rx="0.3" />
      <rect x="20" y="21.4" width="4.2" height="2.5" rx="0.3" />

      {/* Row 4 (bottom): base bricks */}
      <rect x="11" y="24.5" width="3.8" height="2.5" rx="0.3" />
      <rect x="15.4" y="24.5" width="4.4" height="2.5" rx="0.3" />
      <rect x="20.4" y="24.5" width="4.6" height="2.5" rx="0.3" />
    </svg>
  )
}

/**
 * Top Navigation Bar
 * - Mobile (< md):
 *   - Solid vibrant orange bar (#ff4b18) across the top with white logo & white hamburger icon (Exact match to Photo 1)
 *   - Full-bleed solid black dropdown drawer when opened with white links: Home, About, Service, Blog, Contact (Exact match to Photo 2)
 *   - White 'X' close button inside the orange bar when opened
 * - Desktop (>= md):
 *   - Clean floating glass pill header
 */
export default function Navbar({ onNavigate, onOpenModal, activeSection = 'home' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const mobileNavItems = [
    { label: 'Home', id: 'home', href: '#home' },
    { label: 'About', id: 'about', href: '#about' },
    { label: 'Service', id: 'service', href: '#service' },
    { label: 'Blog', id: 'blog', href: '#blog' },
    { label: 'Contact', id: 'contact', href: '#contact' },
  ]

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate(id)
    }
  }

  return (
    <>
      {/* ========================================================
          1. MOBILE NAVBAR (< md): Exact match to Photo 1 & 2
          - Solid vibrant orange top bar (#ff4b18)
          - White logo + "Bildora."
          - White hamburger (Photo 1) / White X (Photo 2)
          ======================================================== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[100] w-full bg-[#ff4b18] h-[56px] px-4 flex items-center justify-between select-none shadow-md">
        {/* Mobile Logo: House with stepped bricks + Bildora. in White */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-2 cursor-pointer text-white"
        >
          <BildoraIcon className="w-6 h-6 text-white shrink-0" />
          <span className="text-[21px] font-bold tracking-tight text-white">
            Bildora.
          </span>
        </a>

        {/* Mobile Hamburger / Close Toggle Button (White, exact match to photos) */}
        <button 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-white cursor-pointer select-none focus:outline-none flex items-center justify-center transition-transform active:scale-95"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? (
            /* Crisp White 'X' Icon (Photo 2) */
            <svg 
              className="w-6 h-6 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* Crisp 3-Line White Hamburger Icon (Photo 1) */
            <svg 
              className="w-6 h-6 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="3.5" y1="6" x2="20.5" y2="6" />
              <line x1="3.5" y1="12" x2="20.5" y2="12" />
              <line x1="3.5" y1="18" x2="20.5" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE FULL-SCREEN DRAWER (Photo 2)
          - Solid black background (#000000)
          - Left-to-right slide transition
          - Left-aligned white text: Home, About, Service, Blog, Contact
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed top-[56px] left-0 right-0 bottom-0 bg-[#000000] z-[99] px-4 pt-5 pb-8 flex flex-col justify-start select-none overflow-y-auto"
          >
            <nav className="flex flex-col space-y-4">
              {mobileNavItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="text-[16px] font-normal tracking-normal text-white hover:text-white/80 active:text-[#ff4b18] transition-colors cursor-pointer text-left block py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          2. DESKTOP NAVBAR (md:flex and up)
          - Clean floating glass pill header
          ======================================================== */}
      <header className="hidden md:flex absolute top-0 left-0 right-0 z-50 pt-6 sm:pt-7 md:pt-8 px-6 sm:px-10 lg:px-16 w-full max-w-[1400px] mx-auto items-center justify-between bg-transparent select-none">
        {/* Desktop Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-2.5 cursor-pointer z-20 group select-none"
        >
          <BildoraIcon className="w-7 h-7 text-white shrink-0 group-hover:scale-105 transition-transform duration-200" />
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Bildora.
          </span>
        </a>

        {/* Desktop Glassy Navbar Pill */}
        <nav className="flex items-center">
          <div className="glass-nav-pill rounded-full px-6 lg:px-9 py-2.5 flex items-center gap-6 lg:gap-10 text-white text-[14px] lg:text-[15px] font-normal tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`transition-colors cursor-pointer ${
                  activeSection === link.id ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop "Let's Build" Button */}
        <div className="flex items-center z-20">
          <Button 
            variant="white"
            size="md"
            onClick={() => onNavigate ? onNavigate('contact') : (onOpenModal && onOpenModal())}
          >
            Let's Build
          </Button>
        </div>
      </header>
    </>
  )
}
