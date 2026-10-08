export type ChapterType = 'study' | 'work' | 'cert'

export interface ChapterItem {
  title: string
  /** Optional small line under the title (issuer, date, etc.) */
  meta?: string
}

export interface Chapter {
  id: string
  type: ChapterType
  /** Short label shown in the left column of the chart */
  label: string
  /** Large heading shown in the detail panel */
  title: string
  /** Display text for the period, e.g. "2023 – 2024" */
  years: string
  /** ISO date: "YYYY-MM-DD" (or "YYYY-MM") */
  start: string
  /** ISO date, or "now" for something ongoing */
  end: string
  role?: string
  description: string
  /** Bulleted highlights (work) or entries (certifications) */
  items?: ChapterItem[]
  /** Dark pill tags */
  tags?: string[]
}

export const chapters: Chapter[] = [
  {
    id: 'edu',
    type: 'study',
    label: 'Education',
    title: 'Glorious Vision University',
    years: '2020 – 2024',
    start: '2020-09-01',
    end: '2024-08-10',
    role: 'BSc, Computer Science',
    description:
      'Built a strong foundation in software engineering, databases, networks, and product thinking while graduating with a BSc in Computer Science.',
    tags: [
      'Software Engineering',
      'Databases',
      'Networks',
      'Artificial Intelligence',
    ],
  },
  {
    id: 'techclub',
    type: 'work',
    label: 'TechClub NG',
    title: 'TechClub NG',
    years: '2023 – 2024',
    start: '2023-03-01',
    end: '2024-04-01',
    role: 'Software Engineer',
    description:
      'Developed and optimized responsive web applications, mentored students in frontend development, and supervised projects from concept to deployment in an agile, cross-functional team.',
    tags: ['Frontend development', 'Mentoring', 'Agile'],
  },
  {
    id: 'sidmach',
    type: 'work',
    label: 'Sidmach',
    title: 'Sidmach Technologies',
    years: '2025',
    start: '2025-01-01',
    end: '2026-01-01',
    role: 'Software Engineer',
    description:
      'Contributed to enterprise software, building and maintaining frontend modules and helping shape features in design discussions.',
    items: [
      {
        title:
          'Implemented role-based access control, admin management features and real-time dashboard statistics',
      },
      {
        title:
          'Improved responsiveness and cross-device compatibility across applications',
      },
      {
        title:
          'Debugged, tested and fixed issues to keep multiple applications stable',
      },
    ],
  },
  {
    id: 'fcc',
    type: 'work',
    label: 'freeCodeCamp',
    title: 'freeCodeCamp',
    years: '2026 – Present',
    start: '2026-01-01',
    end: 'now',
    role: 'Technical Writer',
    description:
      'Writing in-depth technical tutorials on programming languages, frameworks, tools and development concepts, turning complex topics into beginner-friendly guides.',
    tags: ['Technical writing', 'Tutorials'],
  },
  {
    id: 'redwire',
    type: 'work',
    label: 'Redwire',
    title: 'Redwire Marketing Consulting',
    years: '2026 – Present',
    start: '2026-03-13',
    end: 'now',
    role: 'Web Developer',
    description:
      'Developed and maintained client websites, taking projects from first concept through to deployment, and helping turn requirements into practical solutions.',
    tags: ['Client websites', 'Deployment'],
  },
  {
    id: 'certs',
    type: 'cert',
    label: 'Certifications',
    title: 'Certifications',
    years: '2025 – 2026',
    start: '2025-12-06',
    end: '2026-07-06',
    role: 'Professional development',
    description:
      'Project-based and online learning across frontend engineering, retrieval-augmented generation, digital marketing and professional skills.',
    items: [
      { title: 'Meta Frontend Developer', meta: 'Meta · Dec 2025' },
      {
        title: 'Digital Marketing Level 3',
        meta: 'Computer Professionals Registration Council of Nigeria · Jun 2026',
      },
      {
        title: 'Basic to Advanced: Retrieval Augmented Generation (RAG)',
        meta: 'Udemy · Jun 2026',
      },
      { title: 'Forward', meta: 'McKinsey · Jul 2026' },
    ],
  },
]
