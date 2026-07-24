import React from 'react'
import { motion } from 'framer-motion'

/**
 * Soft glowing circles and a slowly rotating light-ray halo used to add
 * cinematic depth behind the invitation content.
 */
export default function LightRays() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Rotating ray halo */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        style={{
          background:
            'repeating-conic-gradient(from 0deg, #C9A227 0deg 4deg, transparent 4deg 20deg)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      />

      {/* Glowing soft circles */}
      <motion.div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-radial-glow blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-radial-glow blur-3xl"
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.2, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-radial-glow blur-3xl"
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}
