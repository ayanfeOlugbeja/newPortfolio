import React, { useState, useRef, useEffect, useId } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function ContactForm() {
  const { language } = useLanguage()
  const t = translations[language]
  const uid = useId()

  const cellInput =
    'w-full bg-transparent text-lg outline-none placeholder-gray-400'
  const fieldInput = `${cellInput} text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600`

  // Each cell is a <label>: tapping anywhere in it focuses the field, and the
  // cell highlights while focused (the inputs themselves have no outline).
  const cell =
    'block cursor-text p-4 transition-colors focus-within:bg-gray-50 dark:focus-within:bg-gray-700/40 sm:p-6'
  const fieldLabel = 'block font-bold mb-2 text-black dark:text-white'

  const subjects = [
    { value: 'project', label: t.contact.subjects.project },
    { value: 'collaboration', label: t.contact.subjects.collaboration },
    { value: 'inquiry', label: t.contact.subjects.inquiry },
  ]

  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const formRef = useRef(null)
  const successTimerRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    company: '',
    message: '',
  })

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  })

  // Close the dropdown on an outside tap/click or Escape.
  // pointerdown rather than mousedown: iOS doesn't fire mouse events for taps
  // on non-clickable areas, so the old listener could miss outside taps.
  useEffect(() => {
    function handlePointerDown(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsDropdownOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Don't leave the success timer running if the form unmounts
  useEffect(() => () => clearTimeout(successTimerRef.current), [])

  const toggleSubject = (value) => {
    setSelectedSubjects((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Show the error and take the visitor to the field that needs fixing
  // (on a phone the keyboard opens right there instead of them hunting for it)
  const fail = (message, field) => {
    setStatus({ loading: false, error: message, success: false })

    if (field === 'subjects') {
      setIsDropdownOpen(true)
      dropdownRef.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    } else {
      formRef.current?.elements.namedItem(field)?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status.loading) return

    if (!formData.name.trim()) {
      fail(t.contact.errors.nameRequired, 'name')
      return
    }

    if (!formData.email.trim()) {
      fail(t.contact.errors.emailRequired, 'email')
      return
    }

    if (!validateEmail(formData.email)) {
      fail(t.contact.errors.invalidEmail, 'email')
      return
    }

    if (selectedSubjects.length === 0) {
      fail(t.contact.errors.subjectRequired, 'subjects')
      return
    }

    if (!formData.message.trim()) {
      fail(t.contact.errors.messageRequired, 'message')
      return
    }

    setStatus({ loading: true, error: null, success: false })

    try {
      const response = await fetch('https://formspree.io/f/xrevllkk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          jobTitle: formData.jobTitle,
          company: formData.company,
          subjects: selectedSubjects
            .map((val) => subjects.find((s) => s.value === val)?.label)
            .join(', '),
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus({ loading: false, error: null, success: true })
        setFormData({
          name: '',
          email: '',
          jobTitle: '',
          company: '',
          message: '',
        })
        setSelectedSubjects([])

        successTimerRef.current = setTimeout(() => {
          setStatus({ loading: false, error: null, success: false })
        }, 5000)
      } else {
        setStatus({
          loading: false,
          error: t.contact.errors.sendFailed,
          success: false,
        })
      }
    } catch {
      setStatus({
        loading: false,
        error: t.contact.errors.genericError,
        success: false,
      })
    }
  }

  return (
    <section id="contact" className="w-full py-0">
      {/* Header Section */}
      <div className="px-5 pt-14 pb-10 sm:px-6 md:px-8 md:pt-20 md:pb-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-4 break-words text-4xl font-black italic tracking-tight text-black dark:text-white sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
            {t.contact.title}
          </h2>
          <p className="text-lg md:text-xl text-black dark:text-white max-w-2xl">
            {t.contact.subtitle}
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full bg-white dark:bg-gray-900 px-5 pb-14 sm:px-6 md:px-8 md:pb-20 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* The extra padding is only for larger screens: on phones the form gets the full width */}
          <div
            className="overflow-hidden p-0 md:p-4"
            style={{ marginTop: '-2rem' }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-busy={status.loading}
              className="bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 mt-10"
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black dark:divide-gray-700">
                <label className={cell}>
                  <span className={fieldLabel}>{t.contact.name} *</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={fieldInput}
                    placeholder="Olivia George"
                    autoComplete="name"
                    autoCapitalize="words"
                    enterKeyHint="next"
                    required
                  />
                </label>

                <label className={cell}>
                  <span className={fieldLabel}>{t.contact.email} *</span>
                  <input
                    name="email"
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={fieldInput}
                    placeholder="olivia@company.com"
                    autoComplete="email"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="next"
                    required
                  />
                </label>
              </div>

              {/* Job Title & Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black dark:divide-gray-700 border-t-2 border-black dark:border-gray-700">
                <label className={cell}>
                  <span className={fieldLabel}>{t.contact.jobTitle}</span>
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className={fieldInput}
                    placeholder="Business person"
                    autoComplete="organization-title"
                    autoCapitalize="words"
                    enterKeyHint="next"
                  />
                </label>

                <label className={cell}>
                  <span className={fieldLabel}>{t.contact.company}</span>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={fieldInput}
                    placeholder="Your Company"
                    autoComplete="organization"
                    autoCapitalize="words"
                    enterKeyHint="next"
                  />
                </label>
              </div>

              {/* Subject with Checkboxes */}
              <div
                className="p-4 sm:p-6 border-t-2 border-black dark:border-gray-700"
                role="group"
                aria-labelledby={`${uid}-subject-label`}
              >
                <span id={`${uid}-subject-label`} className={fieldLabel}>
                  {t.contact.subject} *
                </span>

                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-expanded={isDropdownOpen}
                    aria-controls={`${uid}-subject-list`}
                    className="w-full min-h-[3rem] px-4 py-3 flex items-center justify-between gap-3 bg-white dark:bg-gray-700 text-black dark:text-white rounded-none"
                  >
                    <span className="text-left">
                      {t.contact.selectSubjects}
                    </span>
                    <svg
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div
                      id={`${uid}-subject-list`}
                      className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border-2 border-black dark:border-gray-600"
                    >
                      {subjects.map((subject) => (
                        // A real <label>: the whole row toggles the checkbox, and it works from the keyboard too
                        <label
                          key={subject.value}
                          className="flex min-h-[3rem] items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-100 md:hover:bg-gray-100 dark:active:bg-gray-600 dark:md:hover:bg-gray-600"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubjects.includes(subject.value)}
                            onChange={() => toggleSubject(subject.value)}
                            className="w-5 h-5 shrink-0 border-2 border-black dark:border-gray-400 cursor-pointer"
                          />
                          <span className="text-base text-black dark:text-white">
                            {subject.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Tags */}
                {selectedSubjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedSubjects.map((value) => {
                      const label = subjects.find(
                        (s) => s.value === value,
                      )?.label
                      return (
                        <span
                          key={value}
                          className="flex items-center gap-1 pl-3 border border-black dark:border-gray-500 text-sm bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
                        >
                          {label}
                          <button
                            type="button"
                            onClick={() => toggleSubject(value)}
                            aria-label={`${t.contact.remove ?? 'Remove'} ${label}`}
                            className="flex h-9 w-9 items-center justify-center font-bold leading-none active:text-red-500 md:hover:text-red-500 dark:active:text-red-400 dark:md:hover:text-red-400"
                          >
                            ×
                          </button>
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Message */}
              <label
                className={`${cell} border-t-2 border-black dark:border-gray-700`}
              >
                <span className={fieldLabel}>{t.contact.message} *</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`${fieldInput} resize-none`}
                  placeholder=""
                  autoCapitalize="sentences"
                  required
                />
              </label>

              {/* Status Messages */}
              {status.error && (
                <div
                  role="alert"
                  className="px-4 py-3 sm:px-6 bg-red-50 dark:bg-red-900 dark:bg-opacity-30 border-t-2 border-black dark:border-gray-700 text-red-600 dark:text-red-400"
                >
                  {status.error}
                </div>
              )}
              {status.success && (
                <div
                  role="status"
                  className="px-4 py-3 sm:px-6 bg-green-50 dark:bg-green-900 dark:bg-opacity-30 border-t-2 border-black dark:border-gray-700 text-green-600 dark:text-green-400"
                >
                  {t.contact.success}
                </div>
              )}

              {/* Submit Button: a real submit, so the keyboard's Go/Enter key works too */}
              <button
                type="submit"
                disabled={status.loading}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-6 border-t-2 border-black dark:border-gray-700 text-left active:bg-gray-50 md:hover:bg-gray-50 dark:active:bg-gray-700 dark:md:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed group rounded-none"
              >
                <span className="font-bold text-lg underline text-black dark:text-white group-active:text-orange-500 md:group-hover:text-orange-500 transition">
                  {status.loading ? t.contact.sending : t.contact.submit}
                </span>

                <span className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 border-2 border-black dark:border-gray-500 rounded-full flex items-center justify-center group-active:bg-black dark:group-active:bg-white group-active:text-white dark:group-active:text-black md:group-hover:bg-black dark:md:group-hover:bg-white md:group-hover:text-white dark:md:group-hover:text-black transition">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
