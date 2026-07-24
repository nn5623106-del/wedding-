import React from 'react'
import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function ThankYou() {
  const { t } = useLanguage()

  return (
    <section className="relative flex flex-col items-center gap-6 px-6 py-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 90 }}
      >
        <FaHeart className="text-3xl text-gold-500" aria-hidden="true" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-3xl text-gold-gradient text-transparent sm:text-4xl"
      >
        {t.thankYouTitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-xl font-body text-sm leading-relaxed text-ink-soft sm:text-base"
      >
        {t.thankYouMessage}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="font-script text-xl text-gold-600 sm:text-2xl"
      >
        {t.thankYouSign}
      </motion.p>

      <div className="divider-gold mt-4 w-32" />
    </section>
  )
}
