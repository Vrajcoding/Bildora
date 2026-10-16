import React from 'react'
import { motion } from 'framer-motion'

/**
 * WordReveal Component
 * Cinematic "Word by Word" text reveal animation using Framer Motion and Tailwind CSS.
 *
 * @param {Object} props
 * @param {string} props.text - Text string to animate word-by-word
 * @param {string} [props.className=''] - Tailwind CSS classes for styling
 * @param {number} [props.staggerDelay=0.05] - Time delay between each consecutive word animation
 * @param {number} [props.initialDelay=0] - Delay before starting the container animation
 * @param {string} [props.as='div'] - Semantic HTML tag ('h1' | 'h2' | 'h3' | 'p' | 'span' | 'div')
 * @param {boolean} [props.once=true] - Trigger reveal once when scrolling into view
 */
export default function WordReveal({
  text = '',
  className = '',
  staggerDelay = 0.05,
  initialDelay = 0,
  as = 'div',
  once = true,
  ...props
}) {
  if (!text) return null

  // Support multiline strings formatted with \n
  const lines = text.split('\n')

  // Container variants with staggerChildren & delayChildren
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  }

  // Child variants for individual words: opacity: 0, y: 20, blur(4px) -> visible
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1], // Smooth ease-out curve for cinematic feel
      },
    },
  }

  const MotionComponent = motion[as] || motion.div

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      className={`${className.includes('text-left') || className.includes('text-start') || className.includes('text-right') ? '' : 'text-center'} ${className}`}
      {...props}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ').filter(Boolean)

        return (
          <span key={lineIndex} className={lines.length > 1 ? 'block' : 'inline'}>
            {words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                <motion.span
                  variants={wordVariants}
                  className="inline-block will-change-[transform,opacity,filter]"
                >
                  {word}
                </motion.span>
                {wordIndex < words.length - 1 && ' '}
              </React.Fragment>
            ))}
          </span>
        )
      })}
    </MotionComponent>
  )
}
