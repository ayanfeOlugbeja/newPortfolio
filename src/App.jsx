import React from 'react'
// import './App.css'
import { LanguageProvider } from './context/LanguageContext'
import Topbar from './components/Topbar'
import HeroSection from './components/HeroSection'
import About from './components/About'
import SkillsShowcase from './components/SkillsShowcase'

import Projects from './components/Projects'
import TechnicalWriteups from './components/TechnicalWriteups'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ExperienceMarquee from './components/Experience'

function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col">
        {/* Hero section with fixed topbar */}
        <div className="relative w-full">
          <Topbar />
          <HeroSection />
        </div>

        {/* Main content sections */}
        <main role="main" className="w-full">
          <About />
          <SkillsShowcase />
          <ExperienceMarquee />
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
