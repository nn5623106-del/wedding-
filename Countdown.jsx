import React from 'react'
import { motion } from 'framer-motion'
import useCountdown from '../hooks/useCountdown.js'
import { useLanguage } from '../hooks/useLanguage.jsx'

function TimeUnit({ value, label, delay }) {
  const padded = String(value).padStart(2, '0')
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="glass gold-border relative flex h-16 w-16 items-center justify-center rounded-xl shadow-card sm:h-24 sm:w-24">
        <motion.span
          key={padded}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-2xl font-semibold text-ink sm:text-4xl"
          aria-live="off"
        >
          {padded}
        </motion.span>
      </div>
      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-ink-soft sm:text-xs">
        {label}
      </span>
    </motion.div>
  )
}

export default function Countdown() {
  const { days, hours, minutes, seconds, isComplete } = useCountdown()
  const { t } = useLanguage()

  return (
    <section
      className="relative flex flex-col items-center gap-8 px-6 py-4"
      aria-label={t.countdownTitle}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center font-display text-2xl text-ink sm:text-3xl"
      >
        {t.countdownTitle}
      </motion.h2>

      {isComplete ? (
        <p
          className="font-script text-xl text-gold-600 sm:text-2xl"
          role="status"
          aria-live="polite"
        >
          {t.liveEvent}
        </p>
      ) : (
        <div
          className="flex items-center gap-3 sm:gap-6"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`${days} ${t.days}, ${hours} ${t.hours}, ${minutes} ${t.minutes}, ${seconds} ${t.seconds}`}
        >
          <TimeUnit value={days} label={t.days} delay={0} />
          <TimeUnit value={hours} label={t.hours} delay={0.08} />
          <TimeUnit value={minutes} label={t.minutes} delay={0.16} />
          <TimeUnit value={seconds} label={t.seconds} delay={0.24} />
        </div>
      )}
    </section>
  )
}
