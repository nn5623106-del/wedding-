import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Slow-moving golden sparkle particles used as ambient luxury texture.
 * Purely decorative — hidden from assistive tech.
 */
export default function Particles({ count = 28 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.5 + 0.3
    }))
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold-glow"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            boxShadow: '0 0 8px 2px rgba(240,214,140,0.8)'
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            y: [-10, -60, -10],
            x: [0, 8, -8, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}
