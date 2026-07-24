import React from 'react'
import { motion } from 'framer-motion'
import { FaGlobe } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function LanguageSwitcher() {
  const { toggleLanguage, t, lang } = useLanguage()

  return (
    <motion.button
      type="button"
      onClick={toggleLanguage}
      aria-label={`${t.switchLang}`}
      lang={lang === 'en' ? 'ar' : 'en'}
      className="glass gold-border fixed top-6 end-6 z-40 flex items-center gap-2 rounded-full px-4 py-2 font-body text-xs font-medium text-ink shadow-luxury sm:text-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(240,214,140,0.55)' }}
      whileTap={{ scale: 0.95 }}
    >
      <FaGlobe className="text-gold-600" aria-hidden="true" />
      <span>{t.switchLang}</span>
    </motion.button>
  )
}
