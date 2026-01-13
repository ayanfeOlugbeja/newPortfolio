import React from 'react'
import { HeroGeometric } from './ui/shape-landing-hero'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function HeroSection() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <HeroGeometric
      badge={t.hero.badge}
      title1={t.hero.title1}
      title2={t.hero.title2}
      description={t.hero.description}
    />
  )
}
