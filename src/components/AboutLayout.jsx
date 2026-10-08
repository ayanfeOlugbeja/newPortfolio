import React from 'react'
import { motion } from 'framer-motion'
import DareToDream from './DaretoDream'
// import Divider from './Divider'

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
            {/* Lead statement: the one thing people should read first */}
            <p className="mb-6 text-balance text-[1.375rem] font-medium leading-snug tracking-tight text-black dark:text-white md:text-2xl lg:text-3xl">
              {description}
            </p>

            {/* Supporting details */}
            <div className="mb-8 max-w-prose space-y-4">
              {details.map((detail, index) => (
                <p
                  key={index}
                  className="text-[1.0625rem] leading-[1.65] text-gray-600 dark:text-gray-300 md:text-lg"
                >
                  {detail}
                </p>
              ))}
            </div>

            {/* CTA: bigger tap target */}
            {cta && (
              <a
                href={cta.href}
                className="inline-flex min-h-12 items-center text-lg font-medium text-black underline underline-offset-4 transition-opacity active:opacity-50 dark:text-white md:hover:opacity-70"
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
              className="order-first lg:order-none w-full"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="block h-auto w-full object-contain"
              />
            </MotionDiv>
          )}
        </div>

        <DareToDream />
      </div>
    </section>
  )
}
