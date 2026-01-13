import React, { useState } from 'react'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function Topbar() {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  const navigationLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#blog', label: t.nav.blog },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <>
      {/* Closed State Header */}
      <header className="bg-transparent absolute top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-6 md:px-8 lg:px-12">
        {/* Language Switcher - Far Left */}
        <button
          onClick={toggleLanguage}
          aria-label="Toggle language between English and French"
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 bg-gray-100 dark:bg-gray-100 text-black dark:text-black shadow-lg hover:shadow-xl"
        >
          <Globe className="w-4 h-4" />
          <span>{language === 'en' ? 'FR' : 'EN'}</span>
        </button>

        {/* Hamburger Menu - Far Right */}
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
          className="p-3 rounded-full transition-all duration-300 bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110"
        >
          <Menu
            className="w-7 h-7 text-black dark:text-white"
            strokeWidth={2}
          />
        </button>
      </header>

      {/* Full-Page Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white dark:bg-black z-[100] transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="w-full h-full flex flex-col items-center justify-center px-6 relative">
          {/* Close Button (X) - Top Right */}
          <button
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="absolute top-6 right-6 md:top-8 md:right-8 p-3 rounded-full transition-all duration-300 bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 hover:rotate-90"
          >
            <X
              className="w-8 h-8 md:w-10 md:h-10 text-black dark:text-white"
              strokeWidth={2}
            />
          </button>

          {/* Menu Links */}
          <nav aria-label="Primary navigation" className="w-full max-w-4xl">
            <ul className="flex flex-col gap-6 md:gap-8 lg:gap-10 items-center justify-center">
              {navigationLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={`w-full transition-all duration-500 ${
                    isMenuOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-5'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
                  }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    aria-label={link.label}
                    className="group flex items-center justify-center gap-4 md:gap-6 text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white transition-all duration-300 hover:tracking-wider"
                  >
                    <span className="transition-all duration-300 group-hover:scale-110">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
