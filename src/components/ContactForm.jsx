import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function ContactForm() {
  const { language } = useLanguage()
  const t = translations[language]

  const cellInput =
    'w-full bg-transparent text-lg outline-none placeholder-gray-400'

  const subjects = [
    { value: 'project', label: t.contact.subjects.project },
    { value: 'collaboration', label: t.contact.subjects.collaboration },
    { value: 'inquiry', label: t.contact.subjects.inquiry },
  ]

  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSubject = (value) => {
    setSelectedSubjects((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
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

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setStatus({
        loading: false,
        error: t.contact.errors.nameRequired,
        success: false,
      })
      return
    }

    if (!formData.email.trim()) {
      setStatus({
        loading: false,
        error: t.contact.errors.emailRequired,
        success: false,
      })
      return
    }

    if (!validateEmail(formData.email)) {
      setStatus({
        loading: false,
        error: t.contact.errors.invalidEmail,
        success: false,
      })
      return
    }

    if (selectedSubjects.length === 0) {
      setStatus({
        loading: false,
        error: t.contact.errors.subjectRequired,
        success: false,
      })
      return
    }

    if (!formData.message.trim()) {
      setStatus({
        loading: false,
        error: t.contact.errors.messageRequired,
        success: false,
      })
      return
    }

    setStatus({ loading: true, error: null, success: false })

    try {
      const response = await fetch('https://formspree.io/f/myzrdprd', {
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

        setTimeout(() => {
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
      <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 dark:from-orange-600 dark:via-orange-700 dark:to-red-700 px-4 md:px-8 lg:px-16 pt-20 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 italic tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            {t.contact.subtitle}
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden p-4" style={{ marginTop: '-2rem' }}>
            <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 mt-10">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black dark:divide-gray-700">
                <div className="p-6 border-b-2 md:border-b-0 border-black dark:border-gray-700">
                  <label className="block font-bold mb-2 text-black dark:text-white">
                    {t.contact.name} *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${cellInput} text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600`}
                    placeholder="Olivia George"
                  />
                </div>

                <div className="p-6">
                  <label className="block font-bold mb-2 text-black dark:text-white">
                    {t.contact.email} *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${cellInput} text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600`}
                    placeholder="olivia@company.com"
                  />
                </div>
              </div>

              {/* Job Title & Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-x-2 divide-black dark:divide-gray-700 border-t-2 border-black dark:border-gray-700">
                <div className="p-6 border-b-2 md:border-b-0 border-black dark:border-gray-700">
                  <label className="block font-bold mb-2 text-black dark:text-white">
                    {t.contact.jobTitle}
                  </label>
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className={`${cellInput} text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600`}
                    placeholder="Business person"
                  />
                </div>

                <div className="p-6">
                  <label className="block font-bold mb-2 text-black dark:text-white">
                    {t.contact.company}
                  </label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`${cellInput} text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600`}
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Subject with Checkboxes */}
              <div className="p-6 border-t-2 border-black dark:border-gray-700">
                <label className="block font-bold mb-2 text-black dark:text-white">
                  {t.contact.subject} *
                </label>

                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-white dark:bg-gray-700 text-black dark:text-white rounded-none"
                  >
                    <span className="text-left">
                      {t.contact.selectSubjects}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border-2 border-black dark:border-gray-600">
                      {subjects.map((subject) => (
                        <div
                          key={subject.value}
                          onClick={() => toggleSubject(subject.value)}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubjects.includes(subject.value)}
                            onChange={() => {}}
                            className="w-5 h-5 border-2 border-black dark:border-gray-400 cursor-pointer"
                          />
                          <span className="text-sm text-black dark:text-white">
                            {subject.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Tags */}
                {selectedSubjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedSubjects.map((value) => {
                      const label = subjects.find(
                        (s) => s.value === value
                      )?.label
                      return (
                        <span
                          key={value}
                          className="flex items-center gap-2 px-3 py-1 border border-black dark:border-gray-500 text-sm bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
                        >
                          {label}
                          <button
                            type="button"
                            onClick={() => toggleSubject(value)}
                            className="font-bold leading-none hover:text-red-500 dark:hover:text-red-400"
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
              <div className="p-6 border-t-2 border-black dark:border-gray-700">
                <label className="block font-bold mb-2 text-black dark:text-white">
                  {t.contact.message} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`${cellInput} text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 resize-none`}
                  placeholder=""
                />
              </div>

              {/* Status Messages */}
              {status.error && (
                <div className="px-6 py-3 bg-red-50 dark:bg-red-900 dark:bg-opacity-30 border-t-2 border-black dark:border-gray-700 text-red-600 dark:text-red-400">
                  {status.error}
                </div>
              )}
              {status.success && (
                <div className="px-6 py-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-30 border-t-2 border-black dark:border-gray-700 text-green-600 dark:text-green-400">
                  {t.contact.success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status.loading}
                className="w-full flex items-center justify-between p-6 border-t-2 border-black dark:border-gray-700 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed group rounded-none"
              >
                <span className="font-bold text-lg underline text-black dark:text-white group-hover:text-orange-500 transition">
                  {status.loading ? t.contact.sending : t.contact.submit}
                </span>

                <span className="w-12 h-12 border-2 border-black dark:border-gray-500 rounded-full flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
