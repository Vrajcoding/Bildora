import React from 'react'
import Badge from './Badge'
import WordReveal from './WordReveal'

/**
 * Reusable Section Header Component
 * Enhanced with cinematic WordReveal word-by-word animation for both title and description.
 *
 * @param {string} badgeText
 * @param {string} title
 * @param {string} description
 * @param {string} className
 */
export default function SectionHeader({
  badgeText,
  title,
  mobileTitle,
  description,
  mobileDescription,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  return (
    <div className={`max-w-4xl mx-auto flex flex-col items-center text-center ${className}`}>
      {badgeText && (
        <Badge variant="light" className="mb-6">
          {badgeText}
        </Badge>
      )}

      {title && (
        <>
          {mobileTitle ? (
            <>
              <div className="sm:hidden w-full">
                <WordReveal
                  as="h2"
                  text={mobileTitle}
                  staggerDelay={0.05}
                  initialDelay={0.1}
                  className={`text-[36px] font-normal tracking-tight text-[#1F2D3D] leading-[1.12] mb-4 max-w-3xl mx-auto text-center ${titleClassName}`}
                />
              </div>
              <div className="hidden sm:block w-full">
                <WordReveal
                  as="h2"
                  text={title}
                  staggerDelay={0.05}
                  initialDelay={0.1}
                  className={`sm:text-[40px] md:text-[48px] font-normal tracking-tight text-[#1F2D3D] leading-[1.12] mb-4 max-w-3xl mx-auto text-center ${titleClassName}`}
                />
              </div>
            </>
          ) : (
            <WordReveal
              as="h2"
              text={title}
              staggerDelay={0.05}
              initialDelay={0.1}
              className={`text-[36px] sm:text-[40px] md:text-[48px] font-normal tracking-tight text-[#1F2D3D] leading-[1.12] mb-4 max-w-3xl mx-auto text-center ${titleClassName}`}
            />
          )}
        </>
      )}

      {description && (
        <>
          {mobileDescription ? (
            <>
              {/* Mobile 4-row version */}
              <div className="sm:hidden w-full">
                <WordReveal
                  as="p"
                  text={mobileDescription}
                  staggerDelay={0.03}
                  initialDelay={0.35}
                  className={`text-[#262525] text-[16px] max-w-2xl mx-auto text-center font-normal leading-relaxed ${descriptionClassName}`}
                />
              </div>
              {/* Desktop standard natural flow */}
              <div className="hidden sm:block w-full">
                <WordReveal
                  as="p"
                  text={description}
                  staggerDelay={0.03}
                  initialDelay={0.35}
                  className={`text-[#262525] text-[16px] max-w-2xl mx-auto text-center font-normal leading-relaxed ${descriptionClassName}`}
                />
              </div>
            </>
          ) : (
            <WordReveal
              as="p"
              text={description}
              staggerDelay={0.03}
              initialDelay={0.35}
              className={`text-[#262525] text-[16px] max-w-2xl mx-auto text-center font-normal leading-relaxed ${descriptionClassName}`}
            />
          )}
        </>
      )}
    </div>
  )
}
