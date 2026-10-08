import React from 'react'
import heroImage from '../assets/images/Aiyedogbon Abraham.png'

export default function HeroSection() {
  return (
    <section
      className="w-full bg-white"
      aria-label="Aiyedogbon Abraham hero section"
    >
      <img
        src={heroImage}
        alt="Aiyedogbon Abraham"
        className="block h-auto w-1/3"
      />
    </section>
  )
}
