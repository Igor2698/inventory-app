'use client'

import { createContext, useContext, useState } from 'react'
import { translations } from './translations'

const STORAGE_KEY = 'inventory.language'

const I18nContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
})

export const I18nProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'uk' ? 'uk' : 'en'
  })

  const setLanguage = (value) => {
    setLanguageState(value)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value)
    }
  }

  const t = (key) => translations[language]?.[key] || key

  const contextValue = { language, setLanguage, t }

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
