import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/useLanguage'
import { translations } from '../data/translations'
import Divider from './Divider'

const ACCENT = '#fbaf78' // pill orange
const MotionArticle = motion.article

const SkillsShowcase = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const reduceMotion = useReducedMotion()

  const skills = [
    { key: 'web', data: t.skills.web },
    { key: 'writing', data: t.skills.writing },
    { key: 'design', data: t.skills.design },
  ]

  const letter = (i) => String.fromCharCode(65 + i) // A, B, C

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative w-full bg-white text-black"
    >
      <div className="mx-auto grid w-full max-w-[1840px] grid-cols-1 px-5 sm:px-6 md:grid-cols-[5fr_7fr] md:px-7">
        {/*
          Mobile: `contents` lets the title, the skills and the CTA be ordered as
          title -> skills -> CTA (the CTA used to sit above the content).
          md and up: it becomes the sticky left column again.
        */}
        <div className="contents md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-between md:py-10">
          <h2
            id="skills-title"
            className="order-1 pt-10 pb-2 text-2xl font-bold font-labilGrotesk tracking-tight md:order-none md:pb-0 md:pt-[22vh]"
          >
            {t.skills.title}
          </h2>

          <div className="order-3 border-t border-gray-200 py-12 md:order-none md:border-t-0 md:py-0">
            <p className="max-w-[16rem] text-sm leading-relaxed text-gray-500">
              {t.skills.ctaText}
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-3 py-2 text-2xl font-medium tracking-tight transition-opacity active:opacity-60 md:mt-10 md:text-3xl md:hover:opacity-60"
            >
              {t.skills.ctaLabel}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* RIGHT: lettered service blocks */}
        <div className="order-2 md:order-none md:pb-24">
          {skills.map(({ key, data }, i) => (
            <MotionArticle
              key={key}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="grid grid-cols-1 items-start gap-3 border-t border-gray-200 py-10 first:border-t-0 md:min-h-[80vh] md:grid-cols-[6.5rem_1fr] md:gap-2 md:border-t-0 md:py-0 md:pt-[18vh]"
            >
              {/* Faint letter marker: sits above the statement on mobile, beside it on desktop */}
              <span
                aria-hidden="true"
                className="select-none text-4xl font-bold leading-none tracking-tighter text-gray-300 md:text-7xl md:text-gray-200"
              >
                {letter(i)}/
              </span>

              <div className="min-w-0">
                {/* Big statement */}
                <h3 className="break-words text-[1.75rem] font-bold font-labilGrotesk leading-[1.1] tracking-tighter [text-wrap:balance] sm:text-3xl md:text-[clamp(1.9rem,3.7vw,3.6rem)] md:leading-[1.05]">
                  {data.description}
                </h3>

                {/* Pills */}
                <ul className="mt-8 flex flex-wrap gap-2 md:mt-12 md:gap-2.5">
                  {data.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full px-4 py-2.5 text-[13px] font-semibold leading-none text-black md:px-5 md:py-3 md:text-sm"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionArticle>
          ))}
        </div>
      </div>
      <Divider />
    </section>
  )
}

export default SkillsShowcase
