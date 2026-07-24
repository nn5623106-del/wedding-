import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import translations from '../i18n/translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return localStorage.getItem('invitation-lang') || 'en'
  })

  const isRTL = lang === 'ar'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('invitation-lang', lang)
    } catch (e) {
      /* localStorage unavailable, ignore silently */
    }
  }, [lang, isRTL])

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }, [])

  const t = useMemo(() => translations[lang], [lang])

  const value = useMemo(
    () => ({ lang, isRTL, toggleLanguage, t }),
    [lang, isRTL, toggleLanguage, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
