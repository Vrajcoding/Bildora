import React, { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { contactFormData } from '../../../data/contactData'

gsap.registerPlugin(ScrollTrigger)

/**
 * ContactFormSection Component
 * Matches Screenshot 2:
 * - 2-Column layout
 * - Left: Modern twisted timber building image
 * - Right: Orange container card with light input fields and black submit button
 */
export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'General Construction',
    budget: 'Under $50K',
    details: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const formCardRef = useRef(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        })
      }

      if (formCardRef.current) {
        gsap.from(formCardRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        })
      }
    },
    { scope: sectionRef }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        projectType: 'General Construction',
        budget: 'Under $50K',
        details: '',
      })
    }, 4000)
  }

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="bg-[#f5f2f2] py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
        {/* Left Column: Architectural Photo (Normal rounded, no hover scale) */}
        <div ref={imageRef} className="lg:col-span-5 flex items-center">
          <div className="w-full h-full min-h-[420px] lg:min-h-[580px] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] bg-neutral-200 relative">
            <img
              src={contactFormData.image}
              alt={contactFormData.imageAlt}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Orange Form Card (Normal rounded-2xl) */}
        <div ref={formCardRef} className="lg:col-span-7 flex flex-col justify-center">
          <div className="bg-[#ff4b18] text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white text-[#ff4b18] flex items-center justify-center mb-6 shadow-md">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-white/90 text-base max-w-md font-normal leading-relaxed">
                  Your project details have been received. A senior construction manager from Bildora will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col items-start">
                    <label className="text-[16px] font-medium text-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full bg-[#f5f2f2] text-[#262525] placeholder:text-[#262525]/50 px-4 py-3.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-black text-[16px] transition-shadow"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <label className="text-[16px] font-medium text-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email address"
                      className="w-full bg-[#f5f2f2] text-[#262525] placeholder:text-[#262525]/50 px-4 py-3.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-black text-[16px] transition-shadow"
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col items-start">
                    <label className="text-[16px] font-medium text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      className="w-full bg-[#f5f2f2] text-[#262525] placeholder:text-[#262525]/50 px-4 py-3.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-black text-[16px] transition-shadow"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <label className="text-[16px] font-medium text-white mb-2">
                      Project Type
                    </label>
                    <div className="relative w-full">
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full appearance-none bg-[#f5f2f2] text-[#262525] px-4 py-3.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-black text-[16px] transition-shadow pr-10 cursor-pointer"
                      >
                        {contactFormData.projectTypes.map((type, idx) => (
                          <option key={idx} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="w-4 h-4 text-[#262525] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 3: Project Budget */}
                <div className="flex flex-col items-start">
                  <label className="text-[16px] font-medium text-white mb-2">
                    Project Budget
                  </label>
                  <div className="relative w-full">
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full appearance-none bg-[#f5f2f2] text-[#262525] px-4 py-3.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-black text-[16px] transition-shadow pr-10 cursor-pointer"
                    >
                      {contactFormData.budgetOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="w-4 h-4 text-[#262525] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </div>
                </div>

                {/* Row 4: Project Details */}
                <div className="flex flex-col items-start">
                  <label className="text-[16px] font-medium text-white mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Tell us a little about your project..."
                    className="w-full bg-[#f5f2f2] text-[#262525] placeholder:text-[#262525]/50 px-4 py-3.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-black text-[16px] transition-shadow resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#000000] text-white hover:bg-neutral-900 rounded-lg py-4 px-6 font-medium text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.99] text-center"
                >
                  Request Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
