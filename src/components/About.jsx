import React from 'react'
import { useLanguage } from '../context/useLanguage'
import { translations } from '../data/translations'
import AboutLayout from './AboutLayout'
import heroImage from '../assets/images/Aiyedogbon Abraham.png'

export default function About() {
  const { language } = useLanguage()
  const t = translations[language]

  const aboutData = {
    mission: t.about.mission || 'About Me',
    title: t.about.title,
    description: t.about.bio1,
    details: [t.about.bio2, t.about.bio3],
    cta: {
      text: t.about.learnMore || 'Learn more about my journey',
      href: '#journey',
    },
    image: {
      src: heroImage,
      alt: 'Aiyedogbon Abraham',
    },
  }

  return <AboutLayout {...aboutData} />
}
