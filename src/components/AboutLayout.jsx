import React from 'react'
import Divider from './Divider'

export default function AboutLayout({
  mission,
  title,
  description,
  details,
  cta,
}) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Mission Label */}
        <p className="text-gray-600 text-sm font-medium mb-4">{mission}</p>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Title */}
          <div>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
              {title}
            </h2>
          </div>

          {/* Right Column - Description & Details */}
          <div>
            {/* Main Description */}
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {description}
            </p>

            {/* Details */}
            <div className="space-y-4 mb-8">
              {details.map((detail, index) => (
                <p
                  key={index}
                  className="text-gray-700 text-sm leading-relaxed"
                >
                  {detail}
                </p>
              ))}
            </div>

            {/* CTA Link */}
            {cta && (
              <a
                href={cta.href}
                className="text-black font-medium hover:opacity-70 transition-opacity underline"
              >
                {cta.text} →
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <Divider className="mt-16" />
      </div>
    </section>
  )
}
