import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

const SkillsShowcase = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollTimeoutRef = React.useRef(null)
  const canScrollRef = React.useRef(true)

  const skills = [
    {
      index: 0,
      label: t.skillsShowcase.design.label,
      title: t.skillsShowcase.design.title,
      description: t.skillsShowcase.design.description,
      bgColor: '#C8E3F5',
      accentColor: '#A3D5F0',
      icon: '🎨',
    },
    {
      index: 1,
      label: t.skillsShowcase.mobileDev.label,
      title: t.skillsShowcase.mobileDev.title,
      description: t.skillsShowcase.mobileDev.description,
      bgColor: '#FFF4D6',
      accentColor: '#FFE9A8',
      icon: '📱',
    },
    {
      index: 2,
      label: t.skillsShowcase.webDev.label,
      title: t.skillsShowcase.webDev.title,
      description: t.skillsShowcase.webDev.description,
      bgColor: '#E8E0F5',
      accentColor: '#D4C5E8',
      icon: '💻',
    },
  ]

  // Detect when section enters viewport and disable body scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'auto'
        }
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('skills-showcase-container')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
      document.body.style.overflow = 'auto'
    }
  }, [])

  // Handle mouse wheel scrolling within the section
  useEffect(() => {
    const handleWheel = (e) => {
      const section = document.getElementById('skills-showcase-container')
      if (!section) return

      const stickyDiv = section.querySelector('.sticky')
      const stickyRect = stickyDiv?.getBoundingClientRect()

      // Only intercept if the sticky div is in view
      if (
        !stickyRect ||
        stickyRect.top > window.innerHeight ||
        stickyRect.bottom < 0
      )
        return

      // Only prevent default and handle if we're not at the edges
      if (
        (activeIndex === 0 && e.deltaY < 0) ||
        (activeIndex === skills.length - 1 && e.deltaY > 0)
      ) {
        return
      }

      if (!canScrollRef.current) return

      e.preventDefault()
      canScrollRef.current = false

      const scrollDirection = e.deltaY > 0 ? 1 : -1
      setActiveIndex((prevIndex) => {
        let newIndex = prevIndex + scrollDirection
        newIndex = Math.max(0, Math.min(newIndex, skills.length - 1))
        return newIndex
      })

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        canScrollRef.current = true
      }, 800) // Slightly longer than animation duration
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills.length])

  return (
    <>
      {/* Main showcase section with fixed viewport panels */}
      <div
        id="skills-showcase-container"
        className="relative w-full"
        style={{ height: '400vh' }} // 4x viewport height for 3 panels + transitions
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Animated panel transitions */}
          <div className="relative w-full h-full">
            {skills.map((s, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  backgroundColor: s.bgColor,
                  opacity: activeIndex === idx ? 1 : 0,
                  transform:
                    activeIndex > idx
                      ? 'translateX(-100%)'
                      : activeIndex < idx
                      ? 'translateX(100%)'
                      : 'translateX(0)',
                  zIndex: activeIndex === idx ? 10 : 0,
                }}
              >
                {/* Content wrapper */}
                <div className="flex h-full w-full items-center justify-between relative">
                  {/* Left side - Vertical label and divider */}
                  <div className="flex items-center gap-0 relative">
                    {/* Vertical rotated label */}
                    <div
                      className="pl-6 flex items-center justify-center"
                      style={{ minWidth: '120px' }}
                    >
                      <div
                        className="text-black font-bold text-2xl tracking-widest"
                        style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                          whiteSpace: 'nowrap',
                          letterSpacing: '2px',
                          opacity: activeIndex === idx ? 1 : 0.3,
                          transition: 'opacity 0.7s ease-out',
                        }}
                      >
                        {s.label}
                      </div>
                    </div>

                    {/* Vertical double-line divider */}
                    <div
                      className="h-1/3 mx-8"
                      style={{
                        width: '2px',
                        background: 'black',
                        opacity: 0.3,
                        boxShadow: '4px 0 0 black',
                      }}
                    />
                  </div>

                  {/* Center - Main content */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center px-12">
                    {/* Icon */}
                    <div
                      className="text-9xl select-none"
                      style={{
                        opacity: activeIndex === idx ? 1 : 0,
                        transform:
                          activeIndex === idx ? 'scale(1)' : 'scale(0.5)',
                        transition: 'all 0.7s ease-out 0.1s',
                      }}
                    >
                      {s.icon}
                    </div>

                    {/* Title */}
                    <h2
                      className="font-bold text-black leading-tight"
                      style={{
                        fontSize: 'clamp(48px, 8vw, 90px)',
                        opacity: activeIndex === idx ? 1 : 0,
                        transform:
                          activeIndex === idx
                            ? 'translateY(0)'
                            : 'translateY(20px)',
                        transition: 'all 0.7s ease-out 0.2s',
                      }}
                    >
                      {s.title}
                    </h2>

                    {/* Description */}
                    <p
                      className="text-gray-800 leading-relaxed max-w-2xl"
                      style={{
                        fontSize: 'clamp(16px, 2vw, 20px)',
                        opacity: activeIndex === idx ? 1 : 0,
                        transform:
                          activeIndex === idx
                            ? 'translateY(0)'
                            : 'translateY(20px)',
                        transition: 'all 0.7s ease-out 0.3s',
                      }}
                    >
                      {s.description}
                    </p>
                  </div>

                  {/* Right side - Vertical divider */}
                  <div className="pr-8 flex items-center gap-8">
                    <div
                      className="h-1/3"
                      style={{
                        width: '2px',
                        background: 'black',
                        opacity: 0.3,
                        boxShadow: '4px 0 0 black',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom indicator dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
            {skills.map((_, idx) => (
              <div
                key={idx}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === idx ? '40px' : '12px',
                  height: '12px',
                  backgroundColor:
                    activeIndex === idx ? 'black' : 'rgba(0,0,0,0.4)',
                }}
              />
            ))}
          </div>

          {/* Scroll hint - shows on first panel */}
          {activeIndex === 0 && (
            <div
              className="absolute right-12 top-1/2 transform -translate-y-1/2 z-20 text-black font-semibold flex items-center gap-2"
              style={{
                animation: 'pulse 2s infinite',
                fontSize: '14px',
              }}
            >
              <span>Scroll to explore</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 4v8M10 16v-3M10 4l3 3M10 4l-3 3" />
              </svg>
            </div>
          )}

          {/* Progress bar at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-black opacity-20"
            style={{
              width: '100%',
              background: `linear-gradient(to right, black ${
                (activeIndex / (skills.length - 1)) * 100
              }%, rgba(0,0,0,0.1) ${
                (activeIndex / (skills.length - 1)) * 100
              }%)`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  )
}

export default SkillsShowcase
