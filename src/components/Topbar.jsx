import React, { useEffect, useRef, useState } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '../context/useLanguage'
import { translations } from '../data/translations'

export default function Topbar() {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openButtonRef = useRef(null)
  const closeButtonRef = useRef(null)

  const closeMenu = () => setIsMenuOpen(false)

  const navigationLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#blog', label: t.nav.blog },
    { href: '#contact', label: t.nav.contact },
  ]

  // While the menu is open: stop the page scrolling behind it, close on Escape,
  // and move focus into the menu. On close, hand focus back to the menu button.
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    const openButton = openButtonRef.current
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      openButton?.focus({ preventScroll: true })
    }
  }, [isMenuOpen])

  // Shared look for the round buttons so the open and close buttons sit in the same spot
  const roundButton =
    'flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black shadow-lg transition-transform duration-300 active:scale-95'

  return (
    <>
      {/* Header: fixed so the menu is always reachable, and padded for phone notches */}
      <header
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 md:px-8 lg:px-12"
        style={{
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
          paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
        }}
      >
        <button
          onClick={toggleLanguage}
          aria-label={t.nav.toggleLanguage}
          className="flex h-12 items-center gap-2 rounded-full bg-gray-100 px-5 text-sm font-semibold text-black shadow-lg transition-transform duration-300 active:scale-95 md:hover:scale-105"
        >
          <Globe className="h-4 w-4" />
          <span>{language === 'en' ? 'FR' : 'EN'}</span>
        </button>

        <button
          ref={openButtonRef}
          onClick={() => setIsMenuOpen(true)}
          aria-label={t.nav.openMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className={roundButton}
        >
          <Menu className="h-6 w-6" strokeWidth={2} />
        </button>
      </header>

      {/* Full-page menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menuLabel}
        className={`fixed inset-0 z-[100] bg-white transition-opacity duration-500 motion-reduce:transition-none ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        style={{ height: '100dvh' }}
      >
        {/* Close button sits exactly where the open button was */}
        <button
          ref={closeButtonRef}
          onClick={closeMenu}
          aria-label={t.nav.closeMenu}
          className={`${roundButton} absolute`}
          style={{
            top: 'max(1rem, env(safe-area-inset-top))',
            right: 'max(1.25rem, env(safe-area-inset-right))',
          }}
        >
          <X className="h-6 w-6" strokeWidth={2} />
        </button>

        <div
          className="flex h-full flex-col justify-center px-6"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <nav
            aria-label="Primary navigation"
            className="mx-auto w-full max-w-4xl"
          >
            <ul className="flex flex-col items-center">
              {navigationLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={`w-full transition-all duration-500 motion-reduce:transition-none ${
                    isMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-5 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 80}ms` : '0ms',
                  }}
                >
                  {/* Big tap area: the whole row is the link */}
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-3 text-center text-[clamp(2.5rem,12vw,4.5rem)] font-bold leading-tight tracking-tighter text-black transition-opacity active:opacity-50 md:hover:opacity-60"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* The language switch is covered by the menu, so offer it here too */}
          <button
            onClick={toggleLanguage}
            className="mx-auto mt-10 flex h-12 items-center gap-2 rounded-full bg-gray-100 px-6 text-sm font-semibold text-black active:scale-95"
          >
            <Globe className="h-4 w-4" />
            {t.nav.languageName}
          </button>
        </div>
      </div>
    </>
  )
}
