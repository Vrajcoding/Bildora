import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react'

/**
 * Reusable Consultation / Project Inquiry Modal
 */
export default function ProjectModal({ isOpen, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-[#14161f] border border-white/20 rounded-3xl p-6 sm:p-8 z-10 overflow-hidden text-white shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-normal text-white mb-2">Request Received!</h3>
                <p className="text-neutral-400 text-sm max-w-xs">
                  Our lead architect will contact you within 24 hours to schedule a preliminary consultation.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ff4b18] mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Start Your Project
                  </div>
                  <h3 className="text-[32px] sm:text-3xl font-normal text-white">Let's Build Together</h3>
                  <p className="text-neutral-400 text-[16px] mt-1">
                    Tell us about your upcoming architectural or construction project.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Eleanor Vance" 
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white focus:bg-white/10 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="vance@example.com" 
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                        Project Type
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl bg-[#1d202d] border border-white/15 text-white text-sm focus:outline-none focus:border-white transition-colors">
                        <option>General Construction</option>
                        <option>Renovation & Remodeling</option>
                        <option>Project Management</option>
                        <option>Design & Planning</option>
                        <option>Commercial Complex</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                      Project Overview
                    </label>
                    <textarea 
                      rows={3} 
                      required
                      placeholder="Location, estimated square footage, timeline, or key objectives..." 
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white focus:bg-white/10 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-neutral-900 font-medium py-3.5 rounded-full text-base flex items-center justify-center gap-2 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer mt-6"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
