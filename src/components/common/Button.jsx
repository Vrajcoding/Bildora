import React from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * Reusable Button Component
 * @param {'white' | 'primary' | 'glass'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {boolean} showArrow
 */
export default function Button({
  children,
  variant = 'white',
  size = 'md',
  showArrow = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer select-none"
  
  const sizeStyles = {
    sm: "text-[14px] px-5 py-2",
    md: "text-[15px] sm:text-[16px] px-6 sm:px-7 py-2.5 sm:py-3",
    lg: "text-[16px] px-8 py-3.5",
  }

  const variantStyles = {
    white: "bg-white text-neutral-900 hover:bg-[#ff4b18] hover:text-white active:bg-[#e03f10] active:text-white hover:scale-[1.02] active:scale-[0.98] transition-colors duration-300",
    primary: "bg-[#ff4b18] text-white hover:bg-[#e03f10] active:scale-[0.98]",
    glass: "glass-nav-pill text-white hover:bg-white/20",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.white} ${className} group`}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </button>
  )
}
