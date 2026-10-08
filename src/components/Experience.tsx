'use client'

import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { chapters as defaultChapters } from './timelineData'
import type { Chapter, ChapterType } from './timelineData'
import './ExperienceTimeline.css'
import Divider from './Divider'

interface ExperienceTimelineProps {
  chapters?: Chapter[]
  /** Colour for markers, the "Now" pill and the highlighted time band. */
  accent?: string
  title?: string
  intro?: string
}

const KIND_LABEL: Record<ChapterType, string> = {
  study: 'Education',
  work: 'Work',
  cert: 'Certifications',
}

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ')

/** "2024-04-01" -> 2024.25 (UTC based, so server and client agree). */
function toYear(date: string): number {
  const iso = date.length === 7 ? `${date}-01` : date
  const d = new Date(`${iso}T00:00:00Z`)
  const y = d.getUTCFullYear()
  const from = Date.UTC(y, 0, 1)
  const to = Date.UTC(y + 1, 0, 1)
  return y + (d.getTime() - from) / (to - from)
}

function buildModel(chapters: Chapter[]) {
  if (chapters.length === 0) return null

  const todayYear = toYear(new Date().toISOString().slice(0, 10))
  const items = chapters.map((c) => ({
    ...c,
    from: toYear(c.start),
    to: c.end === 'now' ? todayYear : toYear(c.end),
  }))

  const firstYear = Math.floor(Math.min(...items.map((c) => c.from)))
  const lastYear = Math.floor(Math.max(todayYear, ...items.map((c) => c.to)))
  const years = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, i) => firstYear + i,
  )
  const pct = (v: number) => ((v - firstYear) / years.length) * 100

  return { items, years, pct, nowPct: pct(todayYear) }
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === 'left' ? (
        <>
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      )}
    </svg>
  )
}

export default function ExperienceTimeline({
  chapters = defaultChapters,
  accent,
  title = 'Experience Timeline',
  intro = 'A year-by-year view of the work, education, and professional growth I have been involved in since 2020.',
}: ExperienceTimelineProps) {
  const model = useMemo(() => buildModel(chapters), [chapters])

  const [selectedId, setSelectedId] = useState<string | undefined>(
    chapters[0]?.id,
  )
  const [hoverId, setHoverId] = useState<string | null>(null)
  // Entry animations run once on load; "swap" animations only after the first click.
  const [interacted, setInteracted] = useState(false)

  if (!model) return null
  const { items, years, pct, nowPct } = model

  const selectedIndex = Math.max(
    0,
    items.findIndex((c) => c.id === selectedId),
  )
  const selected = items[selectedIndex]
  const bandChapter =
    items.find((c) => c.id === (hoverId ?? selected.id)) ?? selected
  const previewing = hoverId !== null && hoverId !== selected.id

  const select = (id: string) => {
    if (id === selected.id) return
    setInteracted(true)
    setSelectedId(id)
  }
  const step = (dir: 1 | -1) =>
    select(items[(selectedIndex + dir + items.length) % items.length].id)

  const sw = interacted ? 'tl__swap' : undefined
  const delay = (ms: number): CSSProperties | undefined =>
    interacted ? { animationDelay: `${ms}ms` } : undefined

  const rootStyle = accent
    ? ({ '--tl-accent': accent } as CSSProperties)
    : undefined
  const plotStyle = { '--tl-years': years.length } as CSSProperties

  return (
    <section className="tl" style={rootStyle} aria-labelledby="tl-title">
      <div className="tl__inner">
        <header className="tl__header">
          <div className="tl__heading">
            <h2 id="tl-title" className="tl__title tl__rise">
              {title}
            </h2>
            <p
              className="tl__intro tl__rise"
              style={{ animationDelay: '90ms' }}
            >
              {intro}
            </p>
          </div>
          <div
            className="tl__legend tl__rise"
            style={{ animationDelay: '180ms' }}
          >
            {(['study', 'work', 'cert'] as ChapterType[]).map((type) => (
              <span className="tl__legend-item" key={type}>
                <span className={cx('tl__swatch', `tl__swatch--${type}`)} />
                {KIND_LABEL[type]}
              </span>
            ))}
          </div>
        </header>

        <div className="tl__chart tl__rise" style={{ animationDelay: '120ms' }}>
          <div className="tl__plot" style={plotStyle}>
            <div className="tl__overlay" aria-hidden="true">
              <div
                className={cx(
                  'tl__band',
                  'tl__fade',
                  previewing && 'is-preview',
                )}
                style={{
                  left: `${pct(bandChapter.from)}%`,
                  width: `${pct(bandChapter.to) - pct(bandChapter.from)}%`,
                }}
              />
              <div
                className="tl__now-line tl__drop"
                style={{ left: `${nowPct}%` }}
              />
              <span
                className="tl__now-pill tl__fade"
                style={{ left: `${nowPct}%` }}
              >
                <span className="tl__now-dot" />
                Now
              </span>
            </div>

            <div className="tl__axis">
              <span className="tl__axis-label">Chapter</span>
              <div className="tl__track tl__track--axis">
                {years.map((y, i) => (
                  <span
                    className="tl__year tl__fade"
                    key={y}
                    style={{
                      left: `${pct(y)}%`,
                      animationDelay: `${150 + i * 60}ms`,
                    }}
                  >
                    {y}
                  </span>
                ))}
              </div>
            </div>

            {items.map((c, i) => {
              const on = c.id === selected.id
              const left = pct(c.from)
              const width = pct(c.to) - left
              const barDelay = 350 + i * 110
              return (
                <button
                  key={c.id}
                  type="button"
                  className="tl__row tl__fade"
                  aria-pressed={on}
                  style={{ animationDelay: `${200 + i * 70}ms` }}
                  onClick={() => select(c.id)}
                  onMouseEnter={() => setHoverId(c.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(c.id)}
                  onBlur={() => setHoverId(null)}
                >
                  <span className="tl__row-label">
                    <span className={cx('tl__row-name', on && 'is-selected')}>
                      {on && <span className="tl__dot" />}
                      <span className="tl__row-name-text">{c.label}</span>
                    </span>
                    <span className="tl__row-years">{c.years}</span>
                  </span>
                  <span className="tl__track">
                    <span
                      className={cx(
                        'tl__bar',
                        `tl__bar--${c.type}`,
                        on && 'is-selected',
                      )}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        animationDelay: `${barDelay}ms`,
                      }}
                    >
                      {on && (
                        <span
                          className="tl__ring"
                          style={{
                            animationDelay: interacted
                              ? '0ms'
                              : `${barDelay + 850}ms`,
                          }}
                        />
                      )}
                    </span>
                  </span>
                </button>
              )
            })}
            <div className="tl__plot-end" />
          </div>
        </div>

        <div
          className="tl__detail tl__rise"
          aria-live="polite"
          style={{ animationDelay: '650ms' }}
        >
          {/* Keyed on the chapter so the swap animation replays on every change. */}
          <div className="tl__detail-body" key={selected.id}>
            <div className="tl__side">
              <div className={cx('tl__kicker', sw)}>
                <span className="tl__dot" />
                {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                {KIND_LABEL[selected.type]}
              </div>
              <div className={cx('tl__detail-years', sw)} style={delay(40)}>
                {selected.years}
              </div>
              <div className="tl__nav">
                <button
                  type="button"
                  className="tl__nav-btn"
                  aria-label="Previous chapter"
                  onClick={() => step(-1)}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  type="button"
                  className="tl__nav-btn"
                  aria-label="Next chapter"
                  onClick={() => step(1)}
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </div>

            <div className="tl__main">
              {selected.role && (
                <div className={cx('tl__role', sw)} style={delay(60)}>
                  {selected.role}
                </div>
              )}
              <h3 className={cx('tl__detail-title', sw)} style={delay(100)}>
                {selected.title}
              </h3>
              <p className={cx('tl__desc', sw)} style={delay(170)}>
                {selected.description}
              </p>

              {selected.items && selected.items.length > 0 && (
                <ul className="tl__list">
                  {selected.items.map((item, j) => (
                    <li
                      className={cx('tl__list-item', sw)}
                      style={delay(230 + j * 70)}
                      key={item.title}
                    >
                      <span className="tl__list-dot" />
                      <span className="tl__list-text">
                        <span className="tl__list-title">{item.title}</span>
                        {item.meta && (
                          <span className="tl__list-meta">{item.meta}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {selected.tags && selected.tags.length > 0 && (
                <div className="tl__tags">
                  {selected.tags.map((tag, j) => (
                    <span
                      className={cx('tl__tag', sw)}
                      style={delay(230 + j * 55)}
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </section>
  )
}
