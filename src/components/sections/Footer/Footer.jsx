import React from 'react'

/**
 * Reusable Bildora House + Stepped Bricks SVG Logo Icon
 */
function BildoraIcon({ className = "w-7 h-7 text-white shrink-0" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="21" y="4" width="3.2" height="6.2" rx="0.5" />
      <path d="M16 2.6L2 14.5H5.8L16 5.8L26.2 14.5H30L16 2.6Z" />
      <path d="M5.8 15.2H10.4V27.5H5.8Z" />
      <rect x="18" y="15.2" width="5.2" height="2.5" rx="0.3" />
      <rect x="14" y="18.3" width="4.5" height="2.5" rx="0.3" />
      <rect x="19.1" y="18.3" width="4.5" height="2.5" rx="0.3" />
      <rect x="11" y="21.4" width="3.8" height="2.5" rx="0.3" />
      <rect x="15.4" y="21.4" width="4" height="2.5" rx="0.3" />
      <rect x="20" y="21.4" width="4.2" height="2.5" rx="0.3" />
      <rect x="11" y="24.5" width="3.8" height="2.5" rx="0.3" />
      <rect x="15.4" y="24.5" width="4.4" height="2.5" rx="0.3" />
    </svg>
  )
}

/**
 * Modern Bildora Full Footer Component
 * Matches the Framer layout:
 * 1. 4-Column Header:
 *    - Col 1: Brand logo mark + "Built to last. Delivered with precision."
 *    - Col 2: Quick Link (Home, About, Service, Single Service)
 *    - Col 3: Quick Link (Blog, Single Blog, Contact, 404)
 *    - Col 4: Contact Info (Email, Phone, Location pills + Social media icons)
 * 2. Giant full-width "Bildora" brand typography banner
 * 3. Bottom legal copyright bar
 */
export default function Footer({ onNavigate, onOpenModal }) {
  const handleLink = (e, id) => {
    e.preventDefault()
    if (id === 'contact') {
      onOpenModal?.()
      return
    }
    if (onNavigate) {
      onNavigate(id)
    }
  }

  return (
    <footer className="bg-black text-white pt-20 sm:pt-28 pb-12 px-4 sm:px-8 lg:px-14 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* TOP: 4-COLUMN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          {/* Column 1: Brand & Mission (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a
              href="#home"
              onClick={(e) => handleLink(e, 'home')}
              className="inline-flex items-center gap-2.5 group mb-4"
            >
              <BildoraIcon className="w-7 h-7 text-white shrink-0 group-hover:scale-105 transition-transform duration-200" />
              <span className="font-bold text-2xl tracking-tight text-white">
                Bildora.
              </span>
            </a>
            <p className="text-neutral-400 text-base sm:text-lg font-normal max-w-[290px] leading-relaxed">
              Built to last. Delivered with precision.
            </p>
          </div>

          {/* Column 2: Quick Link 1 (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-medium text-base mb-6 tracking-tight">
              Quick Link
            </h4>
            <ul className="space-y-3.5 text-[16px] sm:text-base">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLink(e, 'home')}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLink(e, 'about')}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#service"
                  onClick={(e) => handleLink(e, 'service')}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Service
                </a>
              </li>
              <li>
                <a
                  href="#service"
                  onClick={(e) => handleLink(e, 'service')}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Single Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Link 2 (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-medium text-base mb-6 tracking-tight">
              Quick Link
            </h4>
            <ul className="space-y-3.5 text-[16px] sm:text-base">
              <li>
                <a
                  href="#blog"
                  onClick={(e) => handleLink(e, 'blog')}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={(e) => handleLink(e, 'blog')}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Single Blog
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="text-neutral-400 hover:text-white transition-colors duration-200 text-left cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLink(e, 'home')}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  404
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-white font-medium text-base mb-6 tracking-tight">
              Contact Info
            </h4>

            <div className="flex flex-col gap-3 max-w-sm mb-6">
              {/* Email Pill */}
              <a
                href="mailto:Hello@bildora.com"
                className="flex items-center gap-3.5 p-1.5 pr-4 rounded-xl bg-neutral-900/90 border border-neutral-800/80 hover:border-neutral-700 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-neutral-800/90 flex items-center justify-center text-neutral-300 group-hover:text-white shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[16px] sm:text-base text-neutral-200 group-hover:text-white font-normal truncate">
                  Hello@bildora.com
                </span>
              </a>

              {/* Phone Pill */}
              <a
                href="tel:+14155550148"
                className="flex items-center gap-3.5 p-1.5 pr-4 rounded-xl bg-neutral-900/90 border border-neutral-800/80 hover:border-neutral-700 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-neutral-800/90 flex items-center justify-center text-neutral-300 group-hover:text-white shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-[16px] sm:text-base text-neutral-200 group-hover:text-white font-normal truncate">
                  +1 (415) 555-0148
                </span>
              </a>

              {/* Location Pill */}
              <a
                href="https://maps.google.com/?q=875+Broadway,+New+York,+NY"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-1.5 pr-4 rounded-xl bg-neutral-900/90 border border-neutral-800/80 hover:border-neutral-700 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-neutral-800/90 flex items-center justify-center text-neutral-300 group-hover:text-white shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[16px] sm:text-base text-neutral-200 group-hover:text-white font-normal truncate">
                  875 Broadway, NY.
                </span>
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              {/* X / Twitter */}
              <a
                href="https://x.com/home"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#ff4b18] text-white flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#ff4b18] text-white flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/login"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#ff4b18] text-white flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#ff4b18] text-white flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* GIANT "Bildora" BRAND WORDMARK BANNER */}
        <div className="w-full pt-10 sm:pt-16 pb-4 select-none">
          <img
            src="/images/bildora-footer-wordmark.webp"
            alt="Bildora"
            loading="lazy"
            className="w-full h-auto object-contain block mx-auto brightness-105"
          />
        </div>

        {/* BOTTOM COPYRIGHT ROW */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[16px] sm:text-sm text-neutral-400 gap-4">
          <p>© 2026 Bildora — Built with purpose. Built to last.</p>
          <p className="text-neutral-500">Powered by Framer</p>
        </div>
      </div>
    </footer>
  )
}
