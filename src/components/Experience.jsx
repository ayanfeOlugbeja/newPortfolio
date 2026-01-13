import { useEffect, useRef, useState } from 'react'
import Divider from './Divider'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

/* ----------------------------------
   DATA
----------------------------------- */
const items = [
  {
    id: 1,
    category: 'work',
    name: 'Sidmach',
    logo: 'https://www.sidmach.com/assets/images/sidmach-logo.png',
    duration: 'Feb 2025 – Present',
    title: 'Software Engineer',
    description:
      'Built enterprise frontend modules for HCMS, NYSC SAED and internal dashboards using React, TypeScript and Tailwind.',
    skills: ['React', 'TypeScript', 'RBAC', 'Tailwind'],
  },
  {
    id: 2,
    category: 'work',
    name: 'TechClub NG',
    logo: 'https://techclub.com.ng/wp-content/uploads/2023/03/logo.png',
    duration: 'Mar 2023 – Apr 2024',
    title: 'Software Engineer',
    description:
      'Developed products across fintech and edtech, mentored junior developers and led frontend architecture.',
    skills: ['React', 'Mentorship', 'UI/UX'],
  },
  {
    id: 3,
    category: 'education',
    name: 'Glorious Vision University',
    logo: null,
    duration: '2020 – 2024',
    title: 'BSc Information & Communication Technology',
    description:
      'Graduated with a 4.53 GPA. Built a Student Exeat Management System as final year project.',
    skills: ['Software Engineering', 'Databases', 'Networks'],
  },
  {
    id: 4,
    category: 'certification',
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    duration: 'Professional Certificate',
    title: 'Meta Front-End Developer',
    description:
      'Professional certification covering React, accessibility, performance optimisation and modern frontend architecture.',
    skills: ['React', 'Accessibility', 'Web Performance'],
  },
  {
    id: 5,
    category: 'certification',
    name: 'Jobberman',
    logo: 'https://jobberman.com/images/jobberman_logo.svg',
    duration: 'Professional Training',
    title: 'Soft Skills Training',
    description:
      'Training focused on communication, teamwork, leadership and workplace professionalism.',
    skills: ['Communication', 'Leadership'],
  },
]

/* ----------------------------------
   RAF MARQUEE TRACK
----------------------------------- */
function MarqueeTrack({ items, onHover }) {
  const trackRef = useRef(null)
  const pos = useRef(0)
  const isPaused = useRef(false)

  useEffect(() => {
    let rafId

    const animate = () => {
      if (!trackRef.current) return

      if (!isPaused.current) {
        pos.current -= 0.35
      }

      const halfWidth = trackRef.current.scrollWidth / 2

      if (-pos.current >= halfWidth) {
        pos.current += halfWidth
      }

      trackRef.current.style.transform = `translate3d(${pos.current}px,0,0)`
      rafId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      className="flex gap-12 w-max"
      ref={trackRef}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      {[...items, ...items].map((item, i) => (
        <MarqueeCard key={`${item.id}-${i}`} item={item} onHover={onHover} />
      ))}
    </div>
  )
}

/* ----------------------------------
   MAIN COMPONENT
----------------------------------- */
export default function ExperienceMarquee() {
  const [activeItem, setActiveItem] = useState(null)
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="relative w-full py-20 overflow-hidden bg-white dark:bg-gray-900">
      <Divider className="mt-10 mb-12" />

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="inline-flex items-baseline gap-3 text-[56px] font-light tracking-[-0.015em] text-gray-300 dark:text-gray-400">
          <span>{t.experience.title}</span>
          <svg
            viewBox="0 0 16 28"
            className="h-[1em] w-auto opacity-70 translate-y-[0.15em]"
            fill="none"
          >
            <path
              d="M8 2v20m0 0l6-6m-6 6l-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </h2>
      </div>

      {/* Marquee */}
      <div
        className="relative overflow-hidden"
        onMouseLeave={() => setActiveItem(null)}
      >
        <MarqueeTrack
          items={items}
          paused={!!activeItem}
          onHover={setActiveItem}
        />
      </div>

      {/* Popup */}
      {activeItem && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[380px] rounded-2xl bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-xl shadow-2xl p-6 animate-fade-in border border-gray-200 dark:border-gray-700">
          <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
            {activeItem.category}
          </p>

          <h3 className="text-xl font-bold text-black dark:text-white">
            {activeItem.name}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
            {activeItem.title} • {activeItem.duration}
          </p>

          <p className="text-sm leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
            {activeItem.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {activeItem.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Fade animation */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------
   CARD
----------------------------------- */
function MarqueeCard({ item, onHover }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      className={`
        h-28 w-48 flex items-center justify-center rounded-xl cursor-pointer
        transition-transform duration-300 hover:scale-105
        ${
          item.category === 'work' &&
          'bg-purple-200 dark:bg-purple-900/50 dark:border dark:border-purple-700'
        }
        ${
          item.category === 'education' &&
          'bg-orange-100 dark:bg-orange-900/50 dark:border dark:border-orange-700'
        }
        ${
          item.category === 'certification' &&
          'bg-blue-100 dark:bg-blue-900/50 dark:border dark:border-blue-700'
        }
      `}
    >
      {item.logo && !imgError ? (
        <img
          src={item.logo}
          alt={item.name}
          className="max-h-12 max-w-[120px] object-contain opacity-80 hover:opacity-100 pointer-events-none"
          draggable={false}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="text-sm font-medium text-center px-4 text-gray-800 dark:text-gray-200">
          {item.name}
        </div>
      )}
    </div>
  )
}
