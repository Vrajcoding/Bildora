import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * PageTransition Component (Slider Type)
 *
 * Silky-smooth 2-phase full-screen slider transition:
 * 1. 'covering': Solid Bildora Orange (#ff4b18) panel slides in from Left (-100%) to Center (0%).
 * 2. On full coverage: Triggers `onSwapPage()` to mount the new page and reset scroll to top (0, 0).
 * 3. 'uncovering': Orange panel slides smoothly out from Center (0%) to Right (100%).
 * 4. On finish: Triggers `onFinish()` to unmount the transition curtain.
 */
export default function PageTransition({ onSwapPage, onFinish }) {
  const [phase, setPhase] = useState('covering')   // 'covering' | 'uncovering'

  const handleCoverComplete = () => {
    // 1. Perform page swap & scroll reset when scree n is 100% covered
    onSwapPage?.()

    // 2. Small RAF pause then slide out to the right
    requestAnimationFrame(() => {
      setPhase('uncovering')
    })
  }

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'covering' && (
          <motion.div
            key="slider-covering"
            className="fixed inset-0 w-screen h-screen bg-[#ff4b18] flex items-center justify-center shadow-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{
              duration: 0.36,
              ease: [0.76, 0, 0.24, 1], // Snappy cubic bezier curve
            }}
            onAnimationComplete={handleCoverComplete}
          >
            {/* Minimal brand hallmark */}
            <div className="flex items-center gap-3 text-white opacity-90 select-none">
              <svg 
                className="w-8 h-8 text-white shrink-0" 
                viewBox="0 0 32 32" 
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="22" y="4" width="3.2" height="6.5" rx="0.5" />
                <path d="M16 2.8L2 14.5H5.8L16 6L26.2 14.5H30L16 2.8Z" />
                <rect x="9.5" y="14" width="5.8" height="3" rx="0.3" />
                <rect x="16.5" y="14" width="5.8" height="3" rx="0.3" />
                <rect x="6.5" y="18" width="5.5" height="3" rx="0.3" />
                <rect x="13" y="18" width="6" height="3" rx="0.3" />
                <rect x="20" y="18" width="5.5" height="3" rx="0.3" />
                <rect x="4" y="22" width="5" height="3" rx="0.3" />
                <rect x="10" y="22" width="5.2" height="3" rx="0.3" />
                <rect x="16.2" y="22" width="5.2" height="3" rx="0.3" />
                <rect x="22.4" y="22" width="5" height="3" rx="0.3" />
              </svg>
              <span className="text-3xl font-bold tracking-tight">Bildora.</span>
            </div>
          </motion.div>
        )}

        {phase === 'uncovering' && (
          <motion.div
            key="slider-uncovering"
            className="fixed inset-0 w-screen h-screen bg-[#ff4b18] flex items-center justify-center shadow-2xl"
            initial={{ x: '0%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 0.36,
              ease: [0.76, 0, 0.24, 1], // Snappy cubic bezier curve
            }}
            onAnimationComplete={() => onFinish?.()}
          >
            <div className="flex items-center gap-3 text-white opacity-90 select-none">
              <svg 
                className="w-8 h-8 text-white shrink-0" 
                viewBox="0 0 32 32" 
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="22" y="4" width="3.2" height="6.5" rx="0.5" />
                <path d="M16 2.8L2 14.5H5.8L16 6L26.2 14.5H30L16 2.8Z" />
                <rect x="9.5" y="14" width="5.8" height="3" rx="0.3" />
                <rect x="16.5" y="14" width="5.8" height="3" rx="0.3" />
                <rect x="6.5" y="18" width="5.5" height="3" rx="0.3" />
                <rect x="13" y="18" width="6" height="3" rx="0.3" />
                <rect x="20" y="18" width="5.5" height="3" rx="0.3" />
                <rect x="4" y="22" width="5" height="3" rx="0.3" />
                <rect x="10" y="22" width="5.2" height="3" rx="0.3" />
                <rect x="16.2" y="22" width="5.2" height="3" rx="0.3" />
                <rect x="22.4" y="22" width="5" height="3" rx="0.3" />
              </svg>
              <span className="text-3xl font-bold tracking-tight">Bildora.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { PageTransition as PageTransitionSlider }
