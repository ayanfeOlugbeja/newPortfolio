import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'
import AboutLayout from './AboutLayout'

export default function About() {
  const { language } = useLanguage()
  const t = translations[language]

  const aboutData = {
    mission: t.about.mission || 'About Me',
    title: t.about.title,
    description: t.about.bio1,
    details: [t.about.bio2, t.about.bio3, t.about.bio4],
    cta: {
      text: t.about.learnMore || 'Learn more about my journey',
      href: '#projects',
    },
  }

  return <AboutLayout {...aboutData} />
}
