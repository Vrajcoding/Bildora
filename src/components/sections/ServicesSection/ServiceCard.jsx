import React from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable ServiceCard component
 * Crisp rectangular framing (no rounded corners) matching Framer aesthetic
 */
export default function ServiceCard({ title, description, image, alt, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col group cursor-pointer"
    >
      <div className="w-full aspect-[16/10] rounded-none overflow-hidden bg-neutral-200">
        <img 
          src={image} 
          alt={alt || title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>
      <h3 className="text-[25px] font-medium text-[#ff4b18] mt-5 mb-2 tracking-tight group-hover:opacity-90 transition-opacity">
        {title}
      </h3>
      <p className="text-[#262525] text-[16px] leading-relaxed font-normal max-w-lg">
        {description}
      </p>
    </motion.div>
  )
}
