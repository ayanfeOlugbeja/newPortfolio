import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function Skills() {
  const { language } = useLanguage()
  const t = translations[language]

  const skillCategories = {
    [t.skills.frontend]: [
      'React.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'Responsive Design',
    ],
    [t.skills.backend]: [
      'Node.js',
      'Django',
      'Python',
      'Firebase',
      'Database Design',
    ],
    [t.skills.tools]: [
      'Git',
      'Github',
      'Agile Development',
      'UI/UX Design',
      'Technical Documentation',
      'Software Testing',
    ],
    [t.skills.languages]: ['English (C2)', 'Yoruba (Native)', 'French (A2)'],
  }

  return (
    <section
      id="skills"
      className="py-20 bg-gray-50"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 id="skills-heading" className="text-4xl font-bold mb-12">
          {t.skills.title}
        </h2>

        <div className="space-y-8">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {category}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium text-gray-700 hover:shadow-md hover:bg-gray-50 transition-all"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
