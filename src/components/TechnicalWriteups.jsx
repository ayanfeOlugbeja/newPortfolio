import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

const FEEDS = [
  {
    source: 'Medium',
    key: 'medium',
    url: 'https://medium.com/feed/@aiyedogbonabraham',
  },
  {
    source: 'freeCodeCamp',
    key: 'freecodecamp',
    url: 'https://www.freecodecamp.org/news/author/abrahamaiyedogbon/rss/',
  },
]

const RSS_TO_JSON_URL = 'https://api.rss2json.com/v1/api.json?rss_url='

const fallbackImages = {
  medium:
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  freecodecamp:
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
}

const stripHtml = (value = '') => value.replace(/<[^>]*>/g, ' ')

const decodeHtml = (value = '') => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = value
  return textarea.value
}

const getImageUrl = (item, sourceKey) => {
  const content = item.content || item.description || ''
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i)

  return (
    item.enclosure?.link ||
    item.thumbnail ||
    item.enclosure?.url ||
    imgMatch?.[1] ||
    fallbackImages[sourceKey]
  )
}

const normalizeArticle = (item, feed) => ({
  id: `${feed.key}-${item.guid || item.link || item.title}`,
  source: feed.source,
  sourceKey: feed.key,
  title: decodeHtml(stripHtml(item.title)).trim(),
  link: item.link,
  pubDate: new Date(item.pubDate),
  category:
    item.categories?.[0] || (feed.key === 'medium' ? 'Article' : 'Tutorial'),
  imageUrl: getImageUrl(item, feed.key),
  description: decodeHtml(stripHtml(item.description || item.content))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150),
})

const TechnicalWriteups = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const copy = t.technicalWriteups || {}
  const [articles, setArticles] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const fetchFeed = async (feed) => {
      const response = await fetch(
        `${RSS_TO_JSON_URL}${encodeURIComponent(feed.url)}`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch ${feed.source} articles`)
      }

      const data = await response.json()

      if (data.status !== 'ok') {
        throw new Error(`${feed.source} RSS API error`)
      }

      return data.items.map((item) => normalizeArticle(item, feed))
    }

    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)

        const results = await Promise.allSettled(FEEDS.map(fetchFeed))
        const successfulArticles = results
          .filter((result) => result.status === 'fulfilled')
          .flatMap((result) => result.value)
          .sort((a, b) => b.pubDate - a.pubDate)
          .slice(0, 12)

        const failedFeeds = results.filter(
          (result) => result.status === 'rejected',
        )

        if (!successfulArticles.length && failedFeeds.length) {
          throw new Error(
            failedFeeds.map((result) => result.reason.message).join(' '),
          )
        }

        setArticles(successfulArticles)
        setError(failedFeeds.length ? failedFeeds[0].reason.message : null)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const tabs = [
    { id: 'all', label: copy.tabs?.all || 'All' },
    { id: 'medium', label: copy.tabs?.medium || 'Medium' },
    { id: 'freecodecamp', label: copy.tabs?.freecodecamp || 'freeCodeCamp' },
  ]

  const filteredArticles = useMemo(() => {
    if (activeTab === 'all') return articles
    return articles.filter((article) => article.sourceKey === activeTab)
  }, [activeTab, articles])

  const scrollArticles = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const firstCard = container.querySelector('article')
    const cardWidth =
      firstCard?.getBoundingClientRect().width || container.clientWidth
    const gap = Number.parseFloat(getComputedStyle(container).columnGap) || 24

    container.scrollBy({
      left: direction === 'next' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    })
  }

  const handleManualScroll = (direction) => {
    setAutoScrollEnabled(false)
    scrollArticles(direction)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (
      !container ||
      !autoScrollEnabled ||
      loading ||
      filteredArticles.length <= 1
    ) {
      return undefined
    }

    const interval = window.setInterval(() => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth

      if (container.scrollLeft >= maxScrollLeft - 8) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
        return
      }

      scrollArticles('next')
    }, 4500)

    return () => window.clearInterval(interval)
  }, [autoScrollEnabled, filteredArticles, loading])

  useEffect(() => {
    setAutoScrollEnabled(true)
  }, [activeTab])

  const formatDate = (date) =>
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date)

  return (
    <section
      id="blog"
      className="relative left-1/2 w-screen -translate-x-1/2 px-4 py-20 text-left text-[#101828] md:px-8 lg:px-16"
      aria-label="Technical writeups and blog articles section"
    >
      <div className="w-full">
        {/* <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#878787]">
          {copy.newsroom || 'Technical Writeups'}
        </p> */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-4xl font-medium leading-tight text-[#101828] md:text-5xl">
            {copy.latestNews || 'Technical Writeups'}
          </h2>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleManualScroll('prev')}
              className="flex h-12 w-12 items-center justify-center rounded-full border-0 bg-white p-0 text-[#101828] shadow-sm transition-colors duration-200 hover:bg-[#e9eaef]"
              aria-label="Scroll articles left"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleManualScroll('next')}
              className="flex h-12 w-12 items-center justify-center rounded-full border-0 bg-white p-0 text-[#101828] shadow-sm transition-colors duration-200 hover:bg-[#e9eaef]"
              aria-label="Scroll articles right"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="mb-8 flex gap-3 overflow-x-auto rounded-full bg-[#fef1e7] p-2"
          role="tablist"
          aria-label="Filter technical writeups"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`min-w-fit rounded-full border-0 px-6 py-3 text-sm font-medium transition-colors duration-200 md:px-8 ${
                  isActive
                    ? 'bg-white text-[#101828] shadow-sm'
                    : 'bg-transparent text-[#101828] hover:bg-white/70'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#df3e1d] border-t-transparent" />
          </div>
        )}

        {error && !loading && (
          <div className="mb-8 border border-[#df3e1d]/30 bg-white p-5 text-sm text-[#9f2c15] shadow-sm">
            <p className="font-semibold">
              {copy.errorFetching || 'Error fetching articles:'}
            </p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="bg-white py-16 text-center text-[#667085] shadow-sm">
            {copy.noArticles || 'No articles found'}
          </div>
        )}

        {!loading && filteredArticles.length > 0 && (
          <div
            ref={scrollContainerRef}
            className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group flex min-h-[520px] w-full shrink-0 snap-start flex-col bg-white shadow-[0_12px_28px_rgba(16,24,40,0.14)] transition-transform duration-300 hover:-translate-y-1 sm:w-[calc((100%_-_1.5rem)/2)] lg:w-[calc((100%_-_4.5rem)/4)]"
              >
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden"
                  aria-label={`Read article: ${article.title}`}
                >
                  <img
                    src={article.imageUrl}
                    alt=""
                    className="aspect-[4/3] w-full object-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </a>

                <div className="flex flex-1 flex-col p-6">
                  {/* <p className="mb-3 text-sm text-[#8d929a]">
                    <span className="font-bold uppercase text-[#8d929a]">
                      {article.source}
                    </span>
                    <span className="mx-1">|</span>
                    <span>{article.category}</span>
                  </p> */}

                  {/* <time
                    dateTime={article.pubDate.toISOString()}
                    className="mb-2 text-base font-semibold text-[#101828]"
                  >
                    {formatDate(article.pubDate)}
                  </time> */}

                  <h3 className="text-xl font-medium leading-snug text-[#101828]">
                    {article.title}
                  </h3>

                  <div className="mt-4 h-px w-full bg-[#d2d5da]" />

                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-between gap-4 rounded-full bg-[#fc9c4d] px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#fdcba2]"
                    aria-label={`Read more: ${article.title}`}
                  >
                    <span>{copy.readMore || 'Read more'}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white">
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TechnicalWriteups
