type TimelineTranslation = {
  label?: string
  title?: string
  role?: string
  description?: string
  items?: Array<{ title: string; meta?: string }>
  tags?: string[]
}

type ProjectTranslation = {
  title: string
  subtitle: string
  context: string
  story: readonly string[]
}

type ContentTranslation = {
  timeline: Record<string, TimelineTranslation>
  projects: Record<string, ProjectTranslation>
}

export const contentTranslations: Record<'en' | 'fr', ContentTranslation>
