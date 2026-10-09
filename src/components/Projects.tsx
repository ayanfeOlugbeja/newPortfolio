import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import {
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  ClipboardCheck,
  GraduationCap,
  Mail,
  Users,
  WalletCards,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { useLanguage } from '../context/useLanguage'
import { translations } from '../data/translations'
import { contentTranslations } from '../data/contentTranslations'
import Divider from './Divider'

type ProjectId =
  | 'multimodalRag'
  | 'projectMonitoring'
  | 'inventoryManagement'
  | 'hcms'
  | 'jambNewsletter'
  | 'nyscSaed'
  | 'exeat'

type ProjectCopy = {
  title: string
  subtitle: string
  context: string
  story: readonly string[]
}

type ProjectConfig = {
  id: ProjectId
  bg: string
  tilt: number
  icon: LucideIcon
  technologies: string[]
  live?: string
}

type LocalizedProject = ProjectConfig & ProjectCopy

const projects: ProjectConfig[] = [
  {
    id: 'multimodalRag',
    bg: '#6A0DFF',
    tilt: -5,
    icon: BrainCircuit,
    technologies: ['React', 'FastAPI', 'ChromaDB', 'OpenAI', 'Anthropic'],
  },
  {
    id: 'projectMonitoring',
    bg: '#FF4F00',
    tilt: 6,
    icon: ClipboardCheck,
    technologies: ['React', 'RTK Query', 'FastAPI', 'PostgreSQL'],
    live: 'https://project-monitoring-system-new.vercel.app/',
  },
  {
    id: 'inventoryManagement',
    bg: '#2F2F3A',
    tilt: -6,
    icon: Boxes,
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    live: 'https://bookstest-aiyedogbonabraham.vercel.app',
  },
  {
    id: 'hcms',
    bg: '#E11D74',
    tilt: 5,
    icon: WalletCards,
    technologies: ['React', 'TypeScript', 'MUI', 'Redux'],
  },
  {
    id: 'jambNewsletter',
    bg: '#0B7A75',
    tilt: -4,
    icon: Mail,
    technologies: ['React', 'TypeScript', 'MUI', 'Redux'],
  },
  {
    id: 'nyscSaed',
    bg: '#3B3BFF',
    tilt: 6,
    icon: Users,
    technologies: ['React', 'TypeScript', 'MUI', 'Redux'],
  },
  {
    id: 'exeat',
    bg: '#0E9F6E',
    tilt: -5,
    icon: GraduationCap,
    technologies: ['React', 'Node.js', 'Firebase', 'EmailJS', 'Tailwind'],
    live: 'https://gvuexeat.vercel.app/',
  },
]

type StackCardProps = {
  project: LocalizedProject
  index: number
  offset: number
  reduceMotion: boolean
}

function StackCard({ project, index, offset, reduceMotion }: StackCardProps) {
  let animate

  if (offset > 0) {
    animate = {
      y: '115%',
      rotate: project.tilt * 1.5,
      scale: 1,
      x: 0,
      opacity: 0,
    }
  } else if (offset === 0) {
    animate = { y: 0, rotate: 0, scale: 1, x: 0, opacity: 1 }
  } else {
    const depth = Math.min(-offset, 3)
    animate = {
      y: 0,
      rotate: project.tilt,
      scale: 1 - depth * 0.025,
      x: depth * 6,
      opacity: 1,
    }
  }

  const Icon = project.icon

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
        <p className="hidden max-w-[80%] text-[clamp(0.8rem,4.2cqw,1rem)] font-medium opacity-80 sm:block">
          {project.subtitle}
        </p>

        <div className="mx-auto flex h-[38%] w-[38%] items-center justify-center sm:h-[42%] sm:w-[42%]">
          <Icon
            className="h-full w-full"
            strokeWidth={1.4}
            aria-hidden="true"
          />
        </div>

        <h3 className="break-words text-[clamp(1.15rem,10cqw,3rem)] font-bold font-labilGrotesk leading-none tracking-tighter [text-wrap:balance]">
          {project.title}
        </h3>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { language } = useLanguage()
  const languageKey = language === 'fr' ? 'fr' : 'en'
  const t = translations[languageKey]
  const projectCopy = contentTranslations[languageKey].projects as Record<
    ProjectId,
    ProjectCopy
  >

  const localizedProjects: LocalizedProject[] = projects.map((project) => {
    const copy = projectCopy[project.id]

    if (!copy) {
      throw new Error(
        `Missing project translation for "${project.id}" in "${languageKey}".`,
      )
    }

    return { ...project, ...copy }
  })

  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const blocks = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index))
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    blocks.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="bg-white text-black">
      <div className="mx-auto flex max-w-[1840px] flex-row items-center justify-between gap-4 px-5 pb-8 pt-14 sm:items-end sm:px-6 md:px-10 md:pb-10 md:pt-24">
        <h2 className="whitespace-nowrap text-4xl font-bold font-labilGrotesk tracking-tighter sm:text-6xl md:text-7xl">
          {t.projects.title}
        </h2>

        <a
          href="https://github.com/aiyedogbon"
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-black px-4 py-2.5 text-sm font-semibold !text-white transition active:opacity-70 sm:px-6 sm:py-3 sm:text-base md:hover:opacity-80"
        >
          <FaGithub size={20} className="shrink-0" aria-hidden="true" />
          GitHub
        </a>
      </div>

      <div className="mx-auto max-w-[1840px] px-5 sm:px-6 md:grid md:grid-cols-2 md:items-start md:gap-10 md:px-10">
        <div aria-hidden="true" className="sticky top-0 z-10 md:h-screen">
          <div className="relative flex h-[36svh] items-center justify-center overflow-hidden bg-white md:h-full">
            <div className="relative aspect-square h-[27svh] md:h-auto md:w-[min(80%,34rem)]">
              {localizedProjects.map((project, index) => (
                <StackCard
                  key={project.id}
                  project={project}
                  index={index}
                  offset={index - active}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-full h-8 bg-gradient-to-b from-white to-transparent md:hidden" />
        </div>

        <div>
          {localizedProjects.map((project, index) => (
            <article
              key={project.id}
              ref={(element) => {
                blocks.current[index] = element
              }}
              data-index={index}
              className="flex flex-col py-12 md:min-h-screen md:justify-center md:py-16"
            >
              <p className="text-sm font-semibold text-gray-500">
                {project.context}
              </p>

              <h3 className="mt-3 text-[clamp(2rem,9vw,2.6rem)] font-bold font-labilGrotesk leading-none tracking-tighter md:text-[clamp(2.4rem,5vw,5rem)] md:leading-[0.98]">
                {project.title}
              </h3>

              <p className="mt-2 text-base font-medium text-gray-600 sm:hidden">
                {project.subtitle}
              </p>

              <div className="mt-6 max-w-xl space-y-4 md:mt-8 md:space-y-5">
                <p className="text-xl font-medium leading-snug tracking-tight md:text-2xl">
                  {project.story[0]}
                </p>

                {project.story.slice(1).map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-gray-600 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2 md:mt-10 md:gap-2.5">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full px-4 py-2.5 text-[13px] font-semibold leading-none text-black md:px-5 md:py-3 md:text-sm"
                    style={{ backgroundColor: '#fbaf78' }}
                  >
                    {technology}
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
                  {t.projects.viewLive}
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
