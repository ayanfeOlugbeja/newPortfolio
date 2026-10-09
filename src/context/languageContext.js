import { createContext } from 'react'

/** @typedef {'en' | 'fr'} Language */
/** @typedef {{ language: Language, toggleLanguage: () => void }} LanguageContextValue */

/** @type {import('react').Context<LanguageContextValue | null>} */
export const LanguageContext = createContext(null)
