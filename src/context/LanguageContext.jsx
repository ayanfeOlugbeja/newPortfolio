import { useState } from 'react'
import { LanguageContext } from './languageContext'

/** @param {{ children: import('react').ReactNode }} props */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(/** @type {'en' | 'fr'} */ ('en'))

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'))
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
