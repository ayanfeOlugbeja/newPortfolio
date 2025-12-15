import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function ContactForm() {
  const { language } = useLanguage()
  const t = translations[language]
  const cellInput =
    'w-full bg-transparent text-lg outline-none placeholder-gray-400'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    company: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      setStatus({ loading: false, error: 'Name is required', success: false })
      return
    }

    if (!formData.email.trim()) {
      setStatus({ loading: false, error: 'Email is required', success: false })
      return
    }

    if (!validateEmail(formData.email)) {
      setStatus({
        loading: false,
        error: 'Please enter a valid email',
        success: false,
      })
      return
    }

    if (!formData.message.trim()) {
      setStatus({
        loading: false,
        error: 'Message is required',
        success: false,
      })
      return
    }

    setStatus({ loading: true, error: null, success: false })

    try {
      // Using Formspree for form submission
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
          subject: formData.subject,
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
          subject: '',
          message: '',
        })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus({ loading: false, error: null, success: false })
        }, 5000)
      } else {
        setStatus({
          loading: false,
          error: 'Failed to send message. Please try again.',
          success: false,
        })
      }
    } catch (error) {
      setStatus({
        loading: false,
        error: `An ${error} occurred. Please try again.`,
        success: false,
      })
    }
  }

  return (
    <section
      id="contact"
      className="w-full py-0"
      aria-labelledby="contact-heading"
    >
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 px-4 md:px-8 lg:px-16 pt-20 pb-12 relative">
        <div className="max-w-6xl mx-auto">
          <h2
            id="contact-heading"
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 italic tracking-tight"
          >
            {t.contact?.title || "LET'S WORK TOGETHER"}
          </h2>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            {t.contact?.message ||
              "Have a project in mind? Let's create something amazing together."}
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full bg-white px-4 md:px-8 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className=" overflow-hidden p-4" style={{ marginTop: '-2rem' }}>
            <form
              onSubmit={handleSubmit}
              className="bg-white border-2 border-black mt-10"
              aria-label="Contact form"
            >
              {/* 2x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
                {/* Name */}
                <div className="p-6 border-b-2 md:border-b-0 border-black">
                  <label className="block font-bold mb-2">
                    {t.contact?.formName || 'Your name'} *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cellInput}
                    placeholder="Olivia George"
                    required
                  />
                </div>

                {/* Email */}
                <div className="p-6">
                  <label className="block font-bold mb-2">
                    {t.contact?.formEmail || 'Your email'} *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cellInput}
                    placeholder="olivia@company.com"
                    required
                  />
                </div>
              </div>

              {/* Second row */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-x-2 divide-black border-t-2 border-black">
                {/* Job Title */}
                <div className="p-6 border-b-2 md:border-b-0 border-black">
                  <label className="block font-bold mb-2">
                    {t.contact?.formJobTitle || 'Your job title'}
                  </label>
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className={cellInput}
                    placeholder="Business person"
                  />
                </div>

                {/* Company */}
                <div className="p-6">
                  <label className="block font-bold mb-2">
                    {t.contact?.formCompany || 'Your company'}
                  </label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={cellInput}
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="p-6 border-t-2 border-black">
                <label className="block font-bold mb-2">
                  {t.contact?.formSubject || 'Subject'} *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={cellInput}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="project">New Project</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="inquiry">General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="p-6 border-t-2 border-black">
                <label className="block font-bold mb-2">
                  {t.contact?.formMessage || 'Your message'} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`${cellInput} resize-none`}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              {/* Footer Action */}
              <button
                type="submit"
                disabled={status.loading}
                className="
    w-full
    flex items-center justify-between
    p-6
    border-t-2 border-black
    text-left
    hover:bg-gray-50
    transition
    disabled:opacity-50
    disabled:cursor-not-allowed
    group
    rounded-none
  "
              >
                {/* Left text */}
                <span className="font-bold text-lg underline group-hover:text-orange-500 transition">
                  {status.loading ? 'Sending…' : 'Submit Message'}
                </span>

                {/* Right arrow */}
                <span
                  className="
      w-12 h-12
      border-2 border-black
      rounded-full
      flex items-center justify-center
      group-hover:bg-black
      group-hover:text-white
      transition
    "
                  aria-hidden="true"
                >
                  <svg
                    className="w-5 h-5 group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
