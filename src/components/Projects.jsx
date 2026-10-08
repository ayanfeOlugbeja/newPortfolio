import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'
import Divider from './Divider'

/*
  How it works
  - Left: a sticky stage. Cards PILE UP: each new project's card slides in from below
    and lands on top, straight, while the earlier cards stay underneath, slightly tilted.
  - Right: each project's story scrolls normally. No scroll hijacking.
*/

const svgBox = 'h-full w-full'

const projects = [
  {
    title: 'Multimodal RAG Chatbot',
    subtitle: 'Chat with your own documents and images',
    context: 'Personal project · June 2026',
    bg: '#6A0DFF',
    tilt: -5,
    icon: (
      <svg viewBox="0 0 200 200" className={svgBox}>
        <rect
          x="35"
          y="45"
          width="95"
          height="70"
          fill="#FCD34D"
          stroke="#1F2937"
          strokeWidth="3"
          rx="10"
        />
        <path
          d="M60 115 L55 140 L82 115 Z"
          fill="#FCD34D"
          stroke="#1F2937"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="62" cy="80" r="6" fill="#1F2937" />
        <circle cx="82" cy="80" r="6" fill="#1F2937" />
        <circle cx="102" cy="80" r="6" fill="#1F2937" />
        <rect
          x="118"
          y="95"
          width="55"
          height="70"
          fill="#FFFFFF"
          stroke="#1F2937"
          strokeWidth="3"
          rx="5"
        />
        <rect x="127" y="108" width="37" height="6" fill="#8B5CF6" rx="1" />
        <rect x="127" y="121" width="37" height="6" fill="#8B5CF6" rx="1" />
        <rect x="127" y="134" width="24" height="6" fill="#8B5CF6" rx="1" />
        <ellipse
          cx="150"
          cy="40"
          rx="24"
          ry="9"
          fill="#10B981"
          stroke="#1F2937"
          strokeWidth="3"
        />
        <path
          d="M126 40 L126 62 Q150 74 174 62 L174 40"
          fill="#10B981"
          stroke="#1F2937"
          strokeWidth="3"
        />
        <path
          d="M126 51 Q150 63 174 51"
          fill="none"
          stroke="#1F2937"
          strokeWidth="2"
        />
      </svg>
    ),
    story: [
      'Most chatbots only know what they were trained on. I wanted one that could read your own files and answer questions about them.',
      'So I built a chatbot that takes in documents and images and stores what it learns in a ChromaDB vector database. Instead of matching keywords, it searches by meaning, and because the index is saved, your knowledge is still there after you close the tab. A FastAPI backend does the heavy lifting, a React interface keeps it simple to use, and you can choose between OpenAI and Anthropic models for each conversation.',
    ],
    technologies: ['React', 'FastAPI', 'ChromaDB', 'OpenAI', 'Anthropic'],
  },
  {
    title: 'Project Monitoring System',
    subtitle: 'Student project reviews, from submission to approval',
    context: 'Personal project · May 2026',
    bg: '#FF4F00',
    tilt: 6,
    icon: (
      <svg viewBox="0 0 200 200" className={svgBox}>
        <rect
          x="45"
          y="40"
          width="110"
          height="135"
          fill="#FFFFFF"
          stroke="#1F2937"
          strokeWidth="3"
          rx="8"
        />
        <rect
          x="75"
          y="28"
          width="50"
          height="24"
          fill="#FCD34D"
          stroke="#1F2937"
          strokeWidth="3"
          rx="5"
        />
        <path
          d="M60 78 L68 86 L82 70"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="92" y="75" width="48" height="6" fill="#1F2937" rx="1" />
        <path
          d="M60 108 L68 116 L82 100"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="92" y="105" width="38" height="6" fill="#1F2937" rx="1" />
        <circle
          cx="70"
          cy="138"
          r="7"
          fill="none"
          stroke="#EF4444"
          strokeWidth="3"
        />
        <rect x="92" y="135" width="44" height="6" fill="#1F2937" rx="1" />
        <rect
          x="60"
          y="154"
          width="80"
          height="8"
          fill="#E5E7EB"
          stroke="#1F2937"
          strokeWidth="2"
          rx="4"
        />
        <rect
          x="60"
          y="154"
          width="52"
          height="8"
          fill="#8B5CF6"
          stroke="#1F2937"
          strokeWidth="2"
          rx="4"
        />
      </svg>
    ),
    live: 'https://project-monitoring-system-new.vercel.app/',
    story: [
      'Following many student projects through submissions, feedback and sign-off is hard when nobody can see where each one stands.',
      'I built a single place where the whole journey happens. Students submit their work and upload files, supervisors review it, leave comments and approve it, and admins oversee everyone. Each role sees only what it needs, an activity log records every step, and notifications tell people when something is waiting on them. It runs on React and RTK Query at the front, with FastAPI and PostgreSQL behind it.',
    ],
    technologies: ['React', 'RTK Query', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'Inventory Management System',
    subtitle: 'Stock and sales across multiple stores',
    context: 'Personal project · January 2026',
    bg: '#2F2F3A',
    tilt: -6,
    icon: (
      <svg viewBox="0 0 200 200" className={svgBox}>
        <rect
          x="30"
          y="110"
          width="70"
          height="60"
          fill="#FCD34D"
          stroke="#1F2937"
          strokeWidth="3"
          rx="3"
        />
        <rect
          x="100"
          y="110"
          width="70"
          height="60"
          fill="#F59E0B"
          stroke="#1F2937"
          strokeWidth="3"
          rx="3"
        />
        <rect
          x="65"
          y="50"
          width="70"
          height="60"
          fill="#8B5CF6"
          stroke="#1F2937"
          strokeWidth="3"
          rx="3"
        />
        <line
          x1="30"
          y1="130"
          x2="100"
          y2="130"
          stroke="#1F2937"
          strokeWidth="3"
        />
        <line
          x1="100"
          y1="130"
          x2="170"
          y2="130"
          stroke="#1F2937"
          strokeWidth="3"
        />
        <line
          x1="65"
          y1="70"
          x2="135"
          y2="70"
          stroke="#1F2937"
          strokeWidth="3"
        />
        <rect
          x="108"
          y="140"
          width="30"
          height="20"
          fill="#FFFFFF"
          stroke="#1F2937"
          strokeWidth="2"
          rx="2"
        />
        <line
          x1="114"
          y1="145"
          x2="114"
          y2="155"
          stroke="#1F2937"
          strokeWidth="2"
        />
        <line
          x1="120"
          y1="145"
          x2="120"
          y2="155"
          stroke="#1F2937"
          strokeWidth="3"
        />
        <line
          x1="127"
          y1="145"
          x2="127"
          y2="155"
          stroke="#1F2937"
          strokeWidth="2"
        />
        <line
          x1="132"
          y1="145"
          x2="132"
          y2="155"
          stroke="#1F2937"
          strokeWidth="3"
        />
        <path
          d="M150 30 L150 48 M141 40 L159 40"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
    live: 'https://bookstest-aiyedogbonabraham.vercel.app',
    story: [
      'A business with more than one store has to answer a simple question again and again: what do we have, and where is it?',
      'I built a system that keeps that answer accurate. It tracks stock, purchases, sales and payments, and moves goods between locations with a clear record of each transfer. Owners get reports, staff get role-based access, and audit logs and notifications make sure nothing changes without a trace. The interface is built in React and TypeScript, backed by FastAPI and PostgreSQL.',
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'HCMS',
    subtitle: 'Human Capital Management',
    context: 'Enterprise work at Sidmach Technologies · 2025',
    bg: '#E11D74',
    tilt: 5,
    icon: (
      <svg viewBox="0 0 200 200" className={svgBox}>
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
    story: [
      'HR work runs on rules: who is away, who owes what, and how much tax each person pays. The HCMS team needed those rules to be clear on screen for the people who manage them.',
      'I started with the leave calendar, making it easier to see who is available and fixing the date-handling issues that made it unreliable. In loans, I built the guarantor verification screen, the admin settings for interest rates and repayment rules, and the form employees use to apply. In payroll, I built the screens for tax regimes, income-based tax brackets, and the reliefs and deductions employees are entitled to. I also added company cost charts and the screens for positions and career progression.',
    ],
    technologies: ['React', 'TypeScript', 'MUI', 'Redux'],
  },
  {
    title: 'JAMB Newsletter',
    subtitle: 'Content management for Nigeria’s national exam board',
    context: 'Enterprise work at Sidmach Technologies · 2025',
    bg: '#0B7A75',
    tilt: -4,
    icon: (
      <svg viewBox="0 0 200 200" className={svgBox}>
        <rect
          x="50"
          y="50"
          width="100"
          height="120"
          fill="#EF4444"
          stroke="#1F2937"
          strokeWidth="3"
          rx="8"
        />
        <rect x="65" y="70" width="70" height="8" fill="#FCD34D" rx="2" />
        <rect x="65" y="85" width="70" height="8" fill="#FCD34D" rx="2" />
        <rect x="65" y="100" width="50" height="8" fill="#FCD34D" rx="2" />
        <circle
          cx="100"
          cy="135"
          r="20"
          fill="#8B5CF6"
          stroke="#1F2937"
          strokeWidth="2"
        />
        <path
          d="M100 125 L100 145 M90 135 L110 135"
          stroke="#FFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
    story: [
      'The Joint Admissions and Matriculation Board coordinates university entrance exams for the whole country. A platform that handles its content has to be both easy to use and accountable.',
      'I built the way people get in: sign in, recover a forgotten password, and verify with a one-time code, with clear feedback at every step. Then I built the audit trail, which lets administrators see who did what on the platform. Records appear as a table on desktop and as cards on mobile, and sorting and filtering help admins find what they are looking for quickly.',
    ],
    technologies: ['React', 'TypeScript', 'MUI', 'Redux'],
  },
  {
    title: 'NYSC SAED',
    subtitle: 'Training and funding for young entrepreneurs',
    context: 'Enterprise work at Sidmach Technologies · 2025',
    bg: '#3B3BFF',
    tilt: 6,
    icon: (
      <svg viewBox="0 0 200 200" className={svgBox}>
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
    story: [
      'The SAED programme trains recent graduates to start businesses and helps fund them. Behind it sit trainers, loans, supervisors and a lot of decisions that need a paper trail.',
      'I built the tools administrators use to run it. They can suspend and reinstate trainers while keeping a record of why. Corps members can apply for loans and follow their status, and administrators can approve or reject each request. I created the dashboard that shows training activity, loan payouts and trainer participation, and the screens for reassigning regional supervisors and shifting responsibilities between departments. Role-based access keeps each user to what they are allowed to do, and I tested and fixed UI issues by hand before release.',
    ],
    technologies: ['React', 'TypeScript', 'MUI', 'Redux'],
  },
  {
    title: 'Exeat System',
    subtitle: 'Student leave requests, made digital',
    context: 'Final-year research project · Glorious Vision University',
    bg: '#0E9F6E',
    tilt: -5,
    live: 'https://gvuexeat.vercel.app/',
    icon: (
      <svg viewBox="0 0 200 200" className={svgBox}>
        <rect
          x="60"
          y="50"
          width="80"
          height="100"
          fill="#10B981"
          stroke="#1F2937"
          strokeWidth="3"
          rx="5"
        />
        <circle
          cx="100"
          cy="85"
          r="15"
          fill="#FCD34D"
          stroke="#1F2937"
          strokeWidth="2"
        />
        <rect x="75" y="110" width="50" height="6" fill="#8B5CF6" rx="1" />
        <rect x="75" y="122" width="50" height="6" fill="#8B5CF6" rx="1" />
        <path
          d="M85 135 L95 143 L115 125"
          stroke="#EF4444"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    story: [
      'Getting permission to leave campus meant paper forms, waiting for signatures and no way to know where a request had got to.',
      'For my final-year research I studied how exeats were handled, found where the process slowed down, and built a web app to replace it. Students submit a request, approvers respond, and everyone can see its status as it changes. EmailJS sends notifications so nobody has to chase, and Firebase stores the records. The result is a faster process that is easier to hold to account and easier to trust.',
    ],
    technologies: ['React', 'Node.js', 'Firebase', 'EmailJS', 'Tailwind'],
  },
]

/*
  Mobile notes
  - The stage is a plain block on mobile (a grid item can only stick inside its own
    grid row, so the old one-column grid let the stage scroll away). From md up it is
    a two-column grid again.
  - Card typography scales with the card itself (cqw units), so the pile stays
    readable at any size.
*/

/* One card in the pile. offset = this card's index minus the active index. */
function StackCard({ project, index, offset, reduceMotion }) {
  let animate
  if (offset > 0) {
    // not here yet: waiting below the stage
    animate = {
      y: '115%',
      rotate: project.tilt * 1.5,
      scale: 1,
      x: 0,
      opacity: 0,
    }
  } else if (offset === 0) {
    // newest card lands on top, straight
    animate = { y: 0, rotate: 0, scale: 1, x: 0, opacity: 1 }
  } else {
    // earlier cards stay underneath, tilted and slightly smaller
    const depth = Math.min(-offset, 3)
    animate = {
      y: 0,
      rotate: project.tilt,
      scale: 1 - depth * 0.025,
      x: depth * 6,
      opacity: 1,
    }
  }

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-[22px] text-white shadow-xl will-change-transform [container-type:inline-size] sm:rounded-[28px] md:shadow-2xl"
      style={{ backgroundColor: project.bg, zIndex: index }}
      initial={false}
      animate={animate}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 110, damping: 20 }
      }
    >
      <div className="flex h-full flex-col justify-between p-[clamp(1rem,6cqw,2rem)]">
        {/* Hidden on small phones: the subtitle appears under the title in the story instead */}
        <p className="hidden max-w-[80%] text-[clamp(0.8rem,4.2cqw,1rem)] font-medium opacity-80 sm:block">
          {project.subtitle}
        </p>

        <div className="mx-auto h-[38%] w-[38%] sm:h-[42%] sm:w-[42%]">
          {project.icon}
        </div>

        <h3 className="break-words text-[clamp(1.15rem,10cqw,3rem)] font-bold leading-none tracking-tighter [text-wrap:balance]">
          {project.title}
        </h3>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { language } = useLanguage()
  const t = translations[language]
  const reduceMotion = useReducedMotion()

  const [active, setActive] = useState(0)
  const blocks = useRef([])

  // The project whose text crosses the middle of the screen is the active one
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(Number(entry.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    blocks.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      className="bg-white text-black dark:bg-gray-900 dark:text-white"
    >
      <div className="mx-auto flex max-w-[1840px] flex-row items-center justify-between gap-4 px-5 pb-8 pt-14 sm:items-end sm:px-6 md:px-10 md:pb-10 md:pt-24">
        <h2 className="whitespace-nowrap text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
          {t.projects.title}
        </h2>
        <a
          href="https://github.com/ayanfeOlugbeja"
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-black px-4 py-2.5 text-sm font-semibold !text-white transition active:opacity-70 dark:bg-white dark:!text-black sm:px-6 sm:py-3 sm:text-base md:hover:opacity-80"
        >
          <FaGithub size={20} className="shrink-0" aria-hidden="true" />
          GitHub
        </a>
      </div>

      {/* Block on mobile (so the stage can stick), two columns from md up */}
      <div className="mx-auto max-w-[1840px] px-5 sm:px-6 md:grid md:grid-cols-2 md:items-start md:gap-10 md:px-10">
        {/* Sticky stage: stays in frame while the stories scroll. Decorative, the stories carry the content. */}
        <div aria-hidden="true" className="sticky top-0 z-10 md:h-screen">
          <div className="relative flex h-[36svh] items-center justify-center overflow-hidden bg-white dark:bg-gray-900 md:h-full">
            <div className="relative aspect-square h-[27svh] md:h-auto md:w-[min(80%,34rem)]">
              {projects.map((project, i) => (
                <StackCard
                  key={project.title}
                  project={project}
                  index={i}
                  offset={i - active}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
          {/* Soft edge so the text doesn't get cut off hard under the stage (mobile only) */}
          <div className="pointer-events-none absolute inset-x-0 top-full h-8 bg-gradient-to-b from-white to-transparent dark:from-gray-900 md:hidden" />
        </div>

        {/* Scrolling stories */}
        <div>
          {projects.map((project, i) => (
            <article
              key={project.title}
              ref={(el) => {
                blocks.current[i] = el
              }}
              data-index={i}
              className="flex flex-col py-12 md:min-h-screen md:justify-center md:py-16"
            >
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {project.context}
              </p>

              <h3 className="mt-3 text-[clamp(2rem,9vw,2.6rem)] font-bold leading-none tracking-tighter md:text-[clamp(2.4rem,5vw,5rem)] md:leading-[0.98]">
                {project.title}
              </h3>

              {/* Small phones only: the card on the stage is too small to carry it */}
              <p className="mt-2 text-base font-medium text-gray-600 dark:text-gray-300 sm:hidden">
                {project.subtitle}
              </p>

              <div className="mt-6 max-w-xl space-y-4 md:mt-8 md:space-y-5">
                <p className="text-xl font-medium leading-snug tracking-tight md:text-2xl">
                  {project.story[0]}
                </p>
                {project.story.slice(1).map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2 md:mt-10 md:gap-2.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-4 py-2.5 text-[13px] font-semibold leading-none text-black md:px-5 md:py-3 md:text-sm"
                    style={{ backgroundColor: '#fbaf78' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 py-2 text-lg font-medium tracking-tight transition-opacity active:opacity-60 md:mt-8 md:text-xl md:hover:opacity-60"
                >
                  View live
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
      <Divider />
    </section>
  )
}
