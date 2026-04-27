import React from 'react'
import { Github } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function Projects() {
  const { language } = useLanguage()
  const t = translations[language]

  const projects = [
    {
      title: 'SLOTLY',
      subtitle: 'Hotel Booking & Reservation Platform',
      icon: (
        <svg viewBox="0 0 200 200" className="w-32 h-32">
          <rect
            x="60"
            y="80"
            width="80"
            height="60"
            fill="#8B5CF6"
            stroke="#1F2937"
            strokeWidth="3"
            rx="5"
          />
          <circle
            cx="100"
            cy="110"
            r="15"
            fill="#FCD34D"
            stroke="#1F2937"
            strokeWidth="2"
          />
          <path
            d="M100 95 L100 125 M85 110 L115 110"
            stroke="#1F2937"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect
            x="70"
            y="60"
            width="60"
            height="15"
            fill="#10B981"
            stroke="#1F2937"
            strokeWidth="2"
            rx="3"
          />
        </svg>
      ),
      color: 'from-purple-100 to-purple-50',
      details: [
        'Hotel landing page redesign focused on improving user engagement and booking conversions',
        'User onboarding flow for seamless registration and reservation access',
        'Booking and reservation system for checking availability and managing room bookings',
        'Admin dashboard for managing bookings, guests, and reservation data',
        'SEO optimization and performance improvements to enhance search visibility',
      ],
      technologies: ['React', 'TypeScript', 'MUI', 'Redux'],
    },
    {
      title: 'EXPLORA',
      subtitle: 'Travel Agency Platform Redesign & Management System',
      icon: (
        <svg viewBox="0 0 200 200" className="w-32 h-32">
          <circle
            cx="100"
            cy="70"
            r="25"
            fill="#F59E0B"
            stroke="#1F2937"
            strokeWidth="3"
          />
          <path
            d="M100 95 Q70 110 70 140 L130 140 Q130 110 100 95 Z"
            fill="#3B82F6"
            stroke="#1F2937"
            strokeWidth="3"
          />
          <rect
            x="50"
            y="145"
            width="100"
            height="40"
            fill="#8B5CF6"
            stroke="#1F2937"
            strokeWidth="3"
            rx="5"
          />
          <line
            x1="70"
            y1="155"
            x2="130"
            y2="155"
            stroke="#FCD34D"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="70"
            y1="170"
            x2="110"
            y2="170"
            stroke="#FCD34D"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      ),
      color: 'from-orange-100 to-orange-50',
      details: [
        'Travel agency landing page redesign focused on user engagement and conversion improvement',
        'User onboarding flow to streamline account creation and booking access',
        'Email notification system for booking updates and user communication',
        'Admin dashboard for managing users, bookings, and platform operations',
        'Dashboard metrics for tracking platform activity and usage insights',
        'SEO optimization to improve visibility and organic traffic',
      ],
      technologies: ['React', 'TypeScript', 'MUI', 'Redux'],
    },
  ]
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl font-black italic tracking-tight text-black dark:text-white">
            {t.projects.title}
          </h2>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
        </div> */}

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="perspective-1000 h-96 group">
              <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d">
                {/* Front */}
                <div
                  className={`absolute inset-0 backface-hidden bg-gradient-to-br ${project.color} border-4 border-gray-900 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg`}
                >
                  {project.icon}
                  <h3 className="text-2xl font-black mt-4 text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {project.subtitle}
                  </p>
                  <p className="text-xs mt-4 italic text-gray-600 dark:text-gray-400">
                    {t.projects.hoverHint}
                  </p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-900 dark:bg-gray-800 border-4 border-gray-900 dark:border-gray-700 rounded-2xl p-8 shadow-lg flex flex-col">
                  <h3 className="text-2xl font-bold text-white dark:text-gray-100">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 dark:text-gray-400 mb-4">
                    {project.subtitle}
                  </p>

                  <div className="space-y-2 flex-1">
                    {project.details.map((detail, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-yellow-400 dark:text-yellow-300">
                          •
                        </span>
                        <p className="text-sm text-gray-200 dark:text-gray-300">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="pt-4 mt-4 border-t border-gray-700 dark:border-gray-600">
                    <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                      {t.projects.technologies}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-800 dark:bg-gray-700 text-gray-200 dark:text-gray-300 border border-gray-700 dark:border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .flip-card-inner {
          transform: rotateY(0deg);
          transition: transform 700ms ease;
          will-change: transform;
        }

        /* ✅ THIS is what actually triggers the flip */
        .group:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          pointer-events: none;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
