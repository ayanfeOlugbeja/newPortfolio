import React, { useState, useEffect, useRef } from 'react'

const SkillsShowcase = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef(null)

  const skills = [
    {
      index: 0,
      label: 'DESIGN & BRANDING',
      title: 'Design & Branding',
      description:
        'Creating beautiful, user-centered designs that bring ideas to life with modern tools and creative thinking.',
      bgColor: '#D4C5F9',
      icon: '🎨',
      technologies: [
        {
          name: 'Figma',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
        },
        {
          name: 'Illustrator',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
        },
        {
          name: 'Photoshop',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
        },
        {
          name: 'Canva',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
        },
      ],
    },
    {
      index: 1,
      label: 'MOBILE DEVELOPMENT',
      title: 'Mobile Development',
      description:
        'Building responsive, cross-platform mobile applications with React Native and modern development tools.',
      bgColor: '#FFE9A8',
      icon: '📱',
      technologies: [
        {
          name: 'React',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        },
        {
          name: 'JavaScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        },
        {
          name: 'TypeScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        },
      ],
    },
    {
      index: 2,
      label: 'WEB DEVELOPMENT',
      title: 'Web Development',
      description:
        'Developing modern web applications with cutting-edge technologies including Web3 and blockchain integration.',
      bgColor: '#A8D5F0',
      icon: '💻',
      technologies: [
        {
          name: 'React',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        },
        {
          name: 'Node.js',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        },
        {
          name: 'TypeScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        },
        {
          name: 'Solidity',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg',
        },
      ],
    },
  ]
  const BASE_WIDTH = 20 // always visible
  const EXPANDABLE = 40 // shared pool

  // Calculate card widths based on scroll progress (0-100)
  const getCardWidth = (index) => {
    const progress = scrollProgress / 100
    const activeIndex = progress * (skills.length - 1)

    const distance = Math.abs(activeIndex - index)

    // cards farther than 1 step get no extra
    if (distance >= 1) return BASE_WIDTH

    // interpolate extra width smoothly
    const extra = EXPANDABLE * (1 - distance)

    return BASE_WIDTH + extra
  }
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const sectionHeight = section.offsetHeight
        const scrolled = -rect.top
        const scrollableHeight = sectionHeight - windowHeight

        const progress = Math.min(
          Math.max((scrolled / scrollableHeight) * 100, 0),
          100
        )
        setScrollProgress(progress)
      } else if (rect.top > 0) {
        setScrollProgress(0)
      } else if (rect.bottom < windowHeight) {
        setScrollProgress(100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="flex gap-0 w-full h-full max-w-7xl mx-auto">
          {skills.map((skill, index) => {
            const width = getCardWidth(index)
            const isExpanded = width > 40

            return (
              <div
                className="relative overflow-hidden transition-all duration-700 ease-out rounded-3xl border-4 border-black mx-2"
                style={{
                  width: `${width}%`,
                  backgroundColor: skill.bgColor,
                }}
              >
                {/* Floating Technology Logos Background - only when expanded */}
                {isExpanded && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {skill.technologies.map((tech, techIdx) => (
                      <React.Fragment key={techIdx}>
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="absolute opacity-10"
                          style={{
                            width: `${100 + techIdx * 30}px`,
                            height: `${100 + techIdx * 30}px`,
                            top: `${15 + techIdx * 20}%`,
                            left: `${10 + techIdx * 20}%`,
                            transform: `rotate(${techIdx * 15}deg)`,
                            animation: `float ${
                              5 + techIdx
                            }s ease-in-out infinite`,
                            animationDelay: `${techIdx * 0.5}s`,
                          }}
                        />
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="absolute opacity-10"
                          style={{
                            width: `${80 + techIdx * 25}px`,
                            height: `${80 + techIdx * 25}px`,
                            top: `${20 + techIdx * 18}%`,
                            right: `${5 + techIdx * 15}%`,
                            transform: `rotate(${-techIdx * 20}deg)`,
                            animation: `float ${
                              6 + techIdx
                            }s ease-in-out infinite`,
                            animationDelay: `${techIdx * 0.7}s`,
                          }}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Card Content */}
                <div
                  className="relative z-10 h-full flex items-center justify-center transition-all duration-700"
                  style={{
                    flexDirection: isExpanded ? 'column' : 'row',
                    gap: isExpanded ? '1rem' : '1.5rem',
                  }}
                >
                  {/* Icon at top - always visible */}
                  <div
                    className="transition-all duration-700"
                    style={{
                      marginBottom: isExpanded ? '1rem' : '0',
                      fontSize: isExpanded ? '4rem' : '4rem',
                      opacity: 1,
                    }}
                  >
                    {skill.icon}
                  </div>

                  {/* Title - always visible */}
                  <h2
                    className="font-extrabold text-black transition-all duration-700"
                    style={{
                      fontSize: isExpanded
                        ? 'clamp(36px, 4vw, 64px)'
                        : 'clamp(18px, 2.2vw, 26px)',
                      writingMode: isExpanded ? 'horizontal-tb' : 'vertical-rl',
                      textOrientation: 'mixed',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    {skill.title}
                  </h2>

                  {/* Description - only when expanded */}
                  {isExpanded && (
                    <p
                      className="text-gray-800 leading-relaxed max-w-2xl mt-6 text-center transition-all duration-700"
                      style={{
                        fontSize: 'clamp(16px, 2vw, 20px)',
                        opacity: isExpanded ? 1 : 0,
                      }}
                    >
                      {skill.description}
                    </p>
                  )}

                  {/* Technology Pills - only when expanded */}
                  {isExpanded && (
                    <div
                      className="flex flex-wrap gap-3 justify-center mt-8 transition-all duration-700"
                      style={{
                        opacity: isExpanded ? 1 : 0,
                      }}
                    >
                      {skill.technologies.map((tech, techIdx) => (
                        <div
                          key={techIdx}
                          className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-60 backdrop-blur-sm rounded-full shadow-sm border border-black border-opacity-10"
                        >
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-6 h-6"
                          />
                          <span className="text-sm font-medium text-gray-800">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 h-1 z-20"
        style={{
          background: `linear-gradient(to right, black ${scrollProgress}%, rgba(0,0,0,0.1) ${scrollProgress}%)`,
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotate, 0deg));
          }
          50% {
            transform: translateY(-20px) rotate(var(--rotate, 0deg));
          }
        }
      `}</style>
    </div>
  )
}

export default SkillsShowcase
