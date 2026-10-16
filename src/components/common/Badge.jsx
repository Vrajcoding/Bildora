import React from 'react'

/**
 * Reusable Badge Component
 * @param {'glass' | 'light'} variant
 * @param {string} children
 * @param {string} className
 * @param {boolean} showDot
 */
export default function Badge({ 
  children, 
  variant = 'light', 
  className = '', 
  showDot = false 
}) {
  if (variant === 'glass') {
    return (
      <div className={`glass-pill inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full text-white text-[14px] font-medium tracking-[0.14em] uppercase ${className}`}>
        {showDot && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        <span>{children}</span>
      </div>
    )
  }

  // Default light badge for sections (About Us, Our Services, Our Values)
  return (
    <div className={`pill-light-badge inline-flex items-center px-4 sm:px-5 py-1.5 rounded-full text-[14px] font-medium text-[#ff4b18] shadow-md select-none ${className}`}>
      {children}
    </div>
  )
}
