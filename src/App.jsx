import React from 'react'
// import './App.css'
import { LanguageProvider } from './context/LanguageContext'
import Topbar from './components/Topbar'
import About from './components/About'
import SkillsShowcase from './components/SkillsShowcase'

import Projects from './components/Projects'
import TechnicalWriteups from './components/TechnicalWriteups'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ExperienceMarquee from './components/Experience.tsx'

function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col">
        <Topbar />

        {/* Main content sections */}
        <main role="main" className="w-full">
          <About />
          <ExperienceMarquee />
          <SkillsShowcase />

          <Projects />

          <TechnicalWriteups />
          <ContactForm />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
