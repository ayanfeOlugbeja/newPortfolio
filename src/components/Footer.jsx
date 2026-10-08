import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import footerimage from '../assets/images/milad-fakurian-iFHGJUgFymw-unsplash.jpg'

const links = [
  { label: 'GitHub', href: 'https://github.com/ayanfeOlugbeja' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aiyedogbon' },
  { label: 'Twitter', href: 'https://twitter.com/joshuaAAbraham?s=20' },
  { label: 'Email', href: 'mailto:aiyedogbonabraham@gmail.com' },
]

export default function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      role="contentinfo"
      className="grid h-full grid-cols-1 overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white md:grid-cols-2"
    >
      <nav
        aria-label="Social links"
        className="flex flex-col justify-center px-6 py-8 md:px-10"
      >
        <motion.ul
          className="space-y-1 md:space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: reduceMotion ? 0 : 0.1 }}
        >
          {links.map((link) => (
            <li key={link.label} className="overflow-hidden pb-[0.1em]">
              {/* Each link rises out from behind its own line, like a mask reveal */}
              <motion.a
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-block text-[clamp(2.25rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tighter transition-opacity hover:opacity-50 focus-visible:underline"
                variants={{
                  hidden: reduceMotion ? { opacity: 0 } : { y: '110%' },
                  visible: reduceMotion ? { opacity: 1 } : { y: 0 },
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </motion.ul>
      </nav>

      <img
        src={footerimage}
        alt="Footer image"
        className="hidden h-full w-full object-cover md:block"
      />
    </footer>
  )
}
