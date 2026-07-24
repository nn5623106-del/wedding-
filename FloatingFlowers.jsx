import React from 'react'
import { motion } from 'framer-motion'

function GoldFlower({ size = 60, opacity = 0.5 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ opacity }}
    >
      <g stroke="url(#petalGrad)" strokeWidth="1.2" fill="rgba(240,214,140,0.12)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="30"
            rx="8"
            ry="18"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="6" fill="#C9A227" opacity="0.7" />
      <defs>
        <linearGradient id="petalGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3E1AE" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/**
 * A handful of oversized, softly blurred gold florals that drift slowly
 * behind the content to give the page depth without competing for attention.
 */
export default function FloatingFlowers({ variant = 'default' }) {
  const layouts = {
    default: [
      { top: '5%', left: '-4%', size: 140, duration: 22, opacity: 0.35 },
      { top: '60%', right: '-6%', size: 180, duration: 26, opacity: 0.3 },
      { top: '85%', left: '2%', size: 100, duration: 18, opacity: 0.25 }
    ],
    dense: [
      { top: '2%', left: '-5%', size: 160, duration: 20, opacity: 0.3 },
      { top: '30%', right: '-8%', size: 200, duration: 28, opacity: 0.25 },
      { top: '68%', left: '-6%', size: 150, duration: 24, opacity: 0.28 },
      { top: '90%', right: '-4%', size: 120, duration: 19, opacity: 0.22 }
    ]
  }

  const items = layouts[variant] || layouts.default

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="absolute blur-[1px]"
          style={{ top: item.top, left: item.left, right: item.right }}
          animate={{
            y: [0, -22, 0],
            rotate: [0, 6, -4, 0]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <GoldFlower size={item.size} opacity={item.opacity} />
        </motion.div>
      ))}
    </div>
  )
}
