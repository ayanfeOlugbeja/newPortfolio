import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

const TechnicalWriteups = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const scrollContainerRef = useRef(null)

  // Fetch Medium articles from RSS feed
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@aiyedogbonabraham'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }

        const data = await response.json()

        if (data.status !== 'ok') {
          throw new Error('RSS API error')
        }

        // Extract the 4 most recent articles
        const recentArticles = data.items.slice(0, 5).map((item) => {
          // Extract image from content
          let imageUrl = null
          if (item.content) {
            const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/)
            if (imgMatch) {
              imageUrl = imgMatch[1]
            }
          }

          // Fallback to first media if no image in content
          if (!imageUrl && item.thumbnail) {
            imageUrl = item.thumbnail
          }

          return {
            id: item.guid,
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate),
            imageUrl:
              imageUrl ||
              'https://via.placeholder.com/800x600?text=Medium+Article',
            description:
              item.description?.replace(/<[^>]*>/g, '').substring(0, 150) +
              '...',
          }
        })

        setArticles(recentArticles)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Format date as M/D/YYYY
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  // Scroll functionality
  const scroll = (direction) => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 400
    const container = scrollContainerRef.current

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="technical-writeups"
      className="w-full noise-bg py-20 px-4 md:px-8 lg:px-16"
      aria-label="Technical writeups and blog articles section"
    >
      {/* Header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium tracking-widest mb-2">
            {t.technicalWriteups?.newsroom || 'BLOG'}
          </p>
          <h2 className="text-white text-5xl lg:text-6xl font-bold">
            {t.technicalWriteups?.latestNews || 'Medium Articles'}
          </h2>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4 mb-2">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
            aria-label="Scroll articles left"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              className="text-black"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
            aria-label="Scroll articles right"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              className="text-black"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6 text-red-400">
          <p className="font-medium">
            {t.technicalWriteups?.errorFetching || 'Error fetching articles:'}
          </p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      )}

      {/* Articles grid */}
      {!loading && !error && (
        <>
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth snap-x snap-mandatory"
            style={{
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
            }}
          >
            <style>{`
              #technical-writeups > div:nth-last-child(2)::-webkit-scrollbar {
                display: none; /* Chrome, Safari and Opera */
              }
            `}</style>
            <div className="flex gap-6 pb-4">
              {articles.length === 0 ? (
                <div className="w-full flex items-center justify-center py-20 text-gray-400">
                  <p>
                    {t.technicalWriteups?.noArticles || 'No articles found'}
                  </p>
                </div>
              ) : (
                articles.map((article) => (
                  <a
                    key={article.id}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 snap-start group"
                    aria-label={`Read article: ${article.title}`}
                  >
                    <div className="h-full flex flex-col  overflow-hidden transition-colors duration-300 ">
                      {/* Image container */}
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: '4 / 3' }}
                      >
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                          loading="lazy"
                        />
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col">
                        {/* Date */}
                        <p className="text-gray-400 text-sm mb-3">
                          {formatDate(article.pubDate)}
                        </p>

                        {/* Title */}
                        <h3 className="text-white font-bold text-lg lg:text-xl leading-tight group-hover:text-blue-400 transition-colors duration-300 flex-1">
                          {article.title}
                        </h3>

                        {/* Arrow indicator */}
                        {/* <div className="mt-4 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm font-medium">Read more</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div> */}
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Scroll hint */}
      {!loading && !error && articles.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
          <span>{t.technicalWriteups?.scrollHint || 'Scroll to see more'}</span>
        </div>
      )}
    </section>
  )
}

export default TechnicalWriteups
