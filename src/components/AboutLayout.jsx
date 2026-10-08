import React from 'react'
import { motion } from 'framer-motion'
import Divider from './Divider'

const MotionDiv = motion.div

export default function AboutLayout({
  mission,
  title,
  description,
  details,
  cta,
  image,
}) {
  return (
    <section id="about" className="bg-white px-4 pb-20 pt-32 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Mission Label */}
        {/* <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
          {mission}
        </p> */}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.88fr)] lg:gap-16">
          {/* Left Column - About Details */}
          <MotionDiv
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* <h2 className="mb-8 text-5xl font-bold leading-tight text-black dark:text-white lg:text-6xl">
              {title}
            </h2> */}
            {/* Main Description */}
            <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {description}
            </p>

            {/* Details */}
            <div className="mb-8 space-y-4">
              {details.map((detail, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
                >
                  {detail}
                </p>
              ))}
            </div>

            {/* CTA Link */}
            {cta && (
              <a
                href={cta.href}
                className="text-black dark:text-white font-medium hover:opacity-70 transition-opacity underline"
              >
                {cta.text} →
              </a>
            )}
          </MotionDiv>

          {/* Right Column - Image */}
          {image && (
            <MotionDiv
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
              className="w-full"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="block h-auto w-full object-contain"
              />
            </MotionDiv>
          )}
        </div>

        {/* Divider */}
        <Divider className="mt-16" />
      </div>
    </section>
  )
}
