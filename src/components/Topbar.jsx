import React from 'react'
import logo from '../assets/images/logo.png'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function Topbar() {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  return (
    <header className="absolute top-5 left-0 right-0 z-50 flex items-center justify-center py-3 px-4 w-full gap-4">
      {/* Language Switcher - Left Pill */}
      <button
        onClick={toggleLanguage}
        aria-label="Toggle language between English and French"
        className="flex-shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors hover:opacity-80"
        style={{
          backgroundColor: '#a8a8a8',
          color: '#000',
        }}
      >
        {language === 'en' ? 'FR' : 'EN'}
      </button>

      {/* Main Navigation Pill - Center */}
      <nav
        className="rounded-full px-6 py-4 shadow-lg w-11/12 max-w-7xl flex items-center justify-between"
        aria-label="Primary navigation"
        style={{ backgroundColor: '#a8a8a8' }}
      >
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <img src={logo} alt="Portfolio Logo" className="h-6 w-auto" />
        </div>

        {/* Links - Middle */}
        <ul className="flex gap-6 items-center flex-1 justify-center">
          <li>
            <a
              href="#about"
              aria-label={`${t.nav.about} section`}
              className="text-black text-xs font-medium hover:text-gray-700 transition-colors"
            >
              {t.nav.about}
            </a>
          </li>
          <li>
            <a
              href="#skills"
              aria-label={`${t.nav.skills} section`}
              className="text-black text-xs font-medium hover:text-gray-700 transition-colors"
            >
              {t.nav.skills}
            </a>
          </li>
          <li>
            <a
              href="#projects"
              aria-label={t.nav.projects}
              className="text-black text-xs font-medium hover:text-gray-700 transition-colors"
            >
              {t.nav.projects}
            </a>
          </li>
          <li>
            <a
              href="#blog"
              aria-label={t.nav.blog}
              className="text-black text-xs font-medium hover:text-gray-700 transition-colors"
            >
              {t.nav.blog}
            </a>
          </li>
        </ul>

        {/* Get in touch button - Right */}
        <div className="flex-shrink-0">
          <a
            href="#contact"
            aria-label={t.nav.contact}
            className="border-[0.5px] border-black text-black text-xs font-medium px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          >
            {t.nav.contact}
          </a>
        </div>
      </nav>
    </header>
  )
}
