// import React, { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// const SkillsShowcase = () => {
//   const sectionRef = useRef(null);

//   // Track scroll progress within the section
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   // Smooth spring physics for natural motion
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   const skills = [
//     {
//       index: 0,
//       label: "DESIGN & BRANDING",
//       title: "Design & Branding",
//       description:
//         "Creating beautiful, user-centered designs that bring ideas to life with modern tools and creative thinking.",
//       bgColor: "#D4C5F9",
//       icon: "🎨",
//       technologies: [
//         {
//           name: "Figma",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
//         },
//         {
//           name: "Illustrator",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
//         },
//         {
//           name: "Photoshop",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
//         },
//         {
//           name: "Canva",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
//         },
//       ],
//     },
//     {
//       index: 1,
//       label: "MOBILE DEVELOPMENT",
//       title: "Mobile Development",
//       description:
//         "Building responsive, cross-platform mobile applications with React Native and modern development tools.",
//       bgColor: "#FFE9A8",
//       icon: "📱",
//       technologies: [
//         {
//           name: "React",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
//         },
//         {
//           name: "JavaScript",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
//         },
//         {
//           name: "TypeScript",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
//         },
//       ],
//     },
//     {
//       index: 2,
//       label: "WEB DEVELOPMENT",
//       title: "Web Development",
//       description:
//         "Developing modern web applications with cutting-edge technologies including Web3 and blockchain integration.",
//       bgColor: "#A8D5F0",
//       icon: "💻",
//       technologies: [
//         {
//           name: "React",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
//         },
//         {
//           name: "Node.js",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
//         },
//         {
//           name: "TypeScript",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
//         },
//         {
//           name: "Solidity",
//           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
//         },
//       ],
//     },
//   ];

//   const BASE_WIDTH = 20;
//   const EXPANDABLE = 40;

//   // Create width transforms for each card at the top level
//   const cardWidths = skills.map((_, index) =>
//     useTransform(smoothProgress, (progress) => {
//       const activeIndex = progress * (skills.length - 1);
//       const distance = Math.abs(activeIndex - index);

//       if (distance >= 1) return BASE_WIDTH;

//       const extra = EXPANDABLE * (1 - distance);
//       return BASE_WIDTH + extra;
//     })
//   );

//   // Create opacity transforms for content
//   const contentOpacities = cardWidths.map((width) =>
//     useTransform(width, [20, 40, 60], [0, 0, 1])
//   );

//   // Create all other transforms at the top level for each card
//   const cardTransforms = cardWidths.map((width, index) => ({
//     widthPercent: useTransform(width, (w) => `${w}%`),
//     flexDirection: useTransform(width, (w) => (w > 40 ? "column" : "row")),
//     fontSize: useTransform(
//       width,
//       [20, 40, 60],
//       [
//         "clamp(18px, 2.2vw, 26px)",
//         "clamp(28px, 3vw, 40px)",
//         "clamp(36px, 4vw, 64px)",
//       ]
//     ),
//     writingMode: useTransform(width, (w) =>
//       w > 40 ? "horizontal-tb" : "vertical-rl"
//     ),
//     titleMarginTop: useTransform(width, (w) => (w > 40 ? "1rem" : "0")),
//     descMarginTop: useTransform(contentOpacities[index], (o) =>
//       o > 0 ? "1.5rem" : "0"
//     ),
//     techMarginTop: useTransform(contentOpacities[index], (o) =>
//       o > 0 ? "2rem" : "0"
//     ),
//   }));

//   return (
//     <div
//       ref={sectionRef}
//       className="relative w-full bg-white dark:bg-gray-900"
//       style={{ height: "300vh" }}>
//       <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
//         <div className="flex gap-0 w-full h-full max-w-7xl mx-auto">
//           {skills.map((skill, index) => {
//             const width = cardWidths[index];
//             const contentOpacity = contentOpacities[index];
//             const transforms = cardTransforms[index];

//             const COLLAPSED_MAX = 32; // % width
//             const isCollapsed = useTransform(width, (w) => w <= COLLAPSED_MAX);

//             return (
//               <motion.div
//                 key={index}
//                 className="relative overflow-hidden rounded-3xl border-4 border-black dark:border-gray-700 mx-2"
//                 style={{
//                   width: transforms.widthPercent,
//                   backgroundColor: skill.bgColor,
//                 }}>
//                 {/* Floating Technology Logos Background */}
//                 <motion.div
//                   className="absolute inset-0 overflow-hidden pointer-events-none"
//                   style={{ opacity: contentOpacity }}>
//                   {skill.technologies.map((tech, techIdx) => (
//                     <React.Fragment key={techIdx}>
//                       <motion.img
//                         src={tech.icon}
//                         alt={tech.name}
//                         className="absolute"
//                         style={{
//                           width: `${100 + techIdx * 30}px`,
//                           height: `${100 + techIdx * 30}px`,
//                           top: `${15 + techIdx * 20}%`,
//                           left: `${10 + techIdx * 20}%`,
//                           opacity: 0.1,
//                         }}
//                         animate={{
//                           y: [-10, 10, -10],
//                           rotate: techIdx * 15,
//                         }}
//                         transition={{
//                           y: {
//                             duration: 5 + techIdx,
//                             repeat: Infinity,
//                             ease: "easeInOut",
//                           },
//                           rotate: {
//                             duration: 0,
//                           },
//                         }}
//                       />
//                       <motion.img
//                         src={tech.icon}
//                         alt={tech.name}
//                         className="absolute"
//                         style={{
//                           width: `${80 + techIdx * 25}px`,
//                           height: `${80 + techIdx * 25}px`,
//                           top: `${20 + techIdx * 18}%`,
//                           right: `${5 + techIdx * 15}%`,
//                           opacity: 0.1,
//                         }}
//                         animate={{
//                           y: [-10, 10, -10],
//                           rotate: -techIdx * 20,
//                         }}
//                         transition={{
//                           y: {
//                             duration: 6 + techIdx,
//                             repeat: Infinity,
//                             ease: "easeInOut",
//                             delay: techIdx * 0.7,
//                           },
//                           rotate: {
//                             duration: 0,
//                           },
//                         }}
//                       />
//                     </React.Fragment>
//                   ))}
//                 </motion.div>

//                 {/* Card Content */}
//                 <motion.div
//                   className="relative z-10 h-full flex items-center justify-center px-6"
//                   style={{
//                     flexDirection: useTransform(isCollapsed, (c) =>
//                       c ? "column" : "column"
//                     ),
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}>
//                   {/* Icon */}
//                   <motion.div
//                     style={{
//                       fontSize: useTransform(
//                         width,
//                         [20, 60],
//                         ["3.5rem", "4rem"]
//                       ),
//                       marginBottom: useTransform(isCollapsed, (c) =>
//                         c ? "1rem" : "0"
//                       ),
//                       marginTop: useTransform(isCollapsed, (c) =>
//                         c ? "15rem" : "0"
//                       ),
//                     }}>
//                     {skill.icon}
//                   </motion.div>

//                   {/* Title */}
//                   <motion.h2
//                     className="font-extrabold text-black dark:text-white"
//                     style={{
//                       writingMode: useTransform(isCollapsed, (c) =>
//                         c ? "vertical-rl" : "horizontal-tb"
//                       ),
//                       textOrientation: "mixed",
//                       fontSize: transforms.fontSize,
//                       opacity: 1,
//                       whiteSpace: "nowrap",
//                       textAlign: "center",
//                       lineHeight: 1,
//                     }}>
//                     {skill.title}
//                   </motion.h2>

//                   {/* Description */}
//                   <motion.p
//                     className="text-gray-800 dark:text-gray-200 leading-relaxed max-w-2xl text-center"
//                     style={{
//                       opacity: useTransform(isCollapsed, (c) => (c ? 0 : 1)),
//                       pointerEvents: useTransform(isCollapsed, (c) =>
//                         c ? "none" : "auto"
//                       ),
//                       marginTop: transforms.descMarginTop,
//                     }}>
//                     {skill.description}
//                   </motion.p>

//                   {/* Technology Pills */}
//                   <motion.div
//                     className="flex flex-wrap gap-3 justify-center"
//                     style={{
//                       opacity: useTransform(isCollapsed, (c) => (c ? 0 : 1)),
//                       pointerEvents: useTransform(isCollapsed, (c) =>
//                         c ? "none" : "auto"
//                       ),
//                       marginTop: transforms.techMarginTop,
//                     }}>
//                     {skill.technologies.map((tech, techIdx) => (
//                       <motion.div
//                         key={techIdx}
//                         className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm rounded-full shadow-sm border border-black dark:border-gray-600 border-opacity-10">
//                         <img
//                           src={tech.icon}
//                           alt={tech.name}
//                           className="w-6 h-6"
//                         />
//                         <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
//                           {tech.name}
//                         </span>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Progress bar at bottom */}
//       <motion.div
//         className="fixed bottom-0 left-0 h-1 bg-black dark:bg-white z-20"
//         style={{
//           right: 0,
//           scaleX: smoothProgress,
//           transformOrigin: "left",
//         }}
//       />
//     </div>
//   );
// };

// export default SkillsShowcase;
import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Code2, FileText, Palette } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

// CardFlip component for mobile
const CardFlip = ({
  title,
  subtitle,
  description,
  features,
  color,
  icon: Icon,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      style={{
        '--primary': color ?? '#2563eb',
      }}
      className="group relative h-[360px] w-full max-w-[300px] mx-auto [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative h-full w-full [transform-style:preserve-3d] transition-all duration-700 ${
          isFlipped
            ? '[transform:rotateY(180deg)]'
            : '[transform:rotateY(0deg)]'
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 h-full w-full [transform:rotateY(0deg)] [backface-visibility:hidden] overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800 border border-slate-200 dark:border-zinc-800/50 shadow-lg dark:shadow-xl transition-all duration-700 group-hover:shadow-xl dark:group-hover:shadow-2xl ${
            isFlipped ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: color }}
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5" />

          {/* Animated code blocks */}
          <div className="absolute inset-0 flex items-center justify-center pt-20">
            <div className="relative flex h-[100px] w-[200px] flex-col items-center justify-center gap-2">
              {/* Code blocks animation */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-full rounded-sm bg-gradient-to-r from-black/20 via-black/30 to-black/20 animate-[slideIn_2s_ease-in-out_infinite] opacity-0"
                  style={{
                    width: `${60 + Math.random() * 40}%`,
                    animationDelay: `${i * 0.2}s`,
                    marginLeft: `${Math.random() * 20}%`,
                  }}
                />
              ))}

              {/* Central icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-xl bg-black/90 flex items-center justify-center shadow-lg animate-pulse transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-zinc-900 transition-all duration-500 ease-out group-hover:translate-y-[-4px] dark:text-white">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-zinc-600 transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px] dark:text-zinc-800">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 h-full w-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl p-5 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800 border border-slate-200 dark:border-zinc-800 shadow-lg dark:shadow-xl flex flex-col transition-all duration-700 group-hover:shadow-xl dark:group-hover:shadow-2xl ${
            !isFlipped ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: color }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-black/5" />

          <div className="relative z-10 flex-1 space-y-5">
            <div className="space-y-2">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/90">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-zinc-900 transition-all duration-500 ease-out group-hover:translate-y-[-2px] dark:text-white">
                  {title}
                </h3>
              </div>
              <p className="line-clamp-3 text-sm tracking-tight text-zinc-700 transition-all duration-500 ease-out group-hover:translate-y-[-2px] dark:text-zinc-800">
                {description}
              </p>
            </div>

            <div className="space-y-2.5">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-zinc-800 transition-all duration-500 dark:text-zinc-900"
                  style={{
                    transform: isFlipped
                      ? 'translateX(0)'
                      : 'translateX(-10px)',
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 100 + 200}ms`,
                  }}
                >
                  <div className="bg-black/10 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Main SkillsShowcase component
const SkillsShowcase = () => {
  const sectionRef = useRef(null)
  const { language } = useLanguage()
  const t = translations[language]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const skills = [
    {
      index: 0,
      label: t.skills.web.label,
      title: t.skills.web.title,
      subtitle: t.skills.web.subtitle,
      description: t.skills.web.description,
      bgColor: '#A8D5F0',
      icon: Code2,
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
          name: 'JavaScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        },
        {
          name: 'Solidity',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg',
        },
      ],
      features: t.skills.web.features,
    },
    {
      index: 1,
      label: t.skills.writing.label,
      title: t.skills.writing.title,
      subtitle: t.skills.writing.subtitle,
      description: t.skills.writing.description,
      bgColor: '#FFE9A8',
      icon: FileText,
      technologies: [
        {
          name: 'Medium',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
        },
        {
          name: 'Hashnode',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
        },
      ],
      features: t.skills.writing.features,
    },
    {
      index: 2,
      label: t.skills.design.label,
      title: t.skills.design.title,
      subtitle: t.skills.design.subtitle,
      description: t.skills.design.description,
      bgColor: '#D4C5F9',
      icon: Palette,
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
      features: t.skills.design.features,
    },
  ]

  const BASE_WIDTH = 20
  const EXPANDABLE = 40

  const cardWidths = skills.map((_, index) =>
    useTransform(smoothProgress, (progress) => {
      const activeIndex = progress * (skills.length - 1)
      const distance = Math.abs(activeIndex - index)

      if (distance >= 1) return BASE_WIDTH

      const extra = EXPANDABLE * (1 - distance)
      return BASE_WIDTH + extra
    })
  )

  const contentOpacities = cardWidths.map((width) =>
    useTransform(width, [20, 40, 60], [0, 0, 1])
  )

  const cardTransforms = cardWidths.map((width, index) => ({
    widthPercent: useTransform(width, (w) => `${w}%`),
    flexDirection: useTransform(width, (w) => (w > 40 ? 'column' : 'row')),
    fontSize: useTransform(
      width,
      [20, 40, 60],
      [
        'clamp(18px, 2.2vw, 26px)',
        'clamp(28px, 3vw, 40px)',
        'clamp(36px, 4vw, 64px)',
      ]
    ),
    writingMode: useTransform(width, (w) =>
      w > 40 ? 'horizontal-tb' : 'vertical-rl'
    ),
    titleMarginTop: useTransform(width, (w) => (w > 40 ? '1rem' : '0')),
    descMarginTop: useTransform(contentOpacities[index], (o) =>
      o > 0 ? '1.5rem' : '0'
    ),
    techMarginTop: useTransform(contentOpacities[index], (o) =>
      o > 0 ? '2rem' : '0'
    ),
  }))

  return (
    <div className="relative w-full bg-white dark:bg-gray-900">
      {/* Desktop View - Scroll Animation */}
      <div
        ref={sectionRef}
        className="hidden md:block relative w-full"
        style={{ height: '300vh' }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
          <div className="flex gap-0 w-full h-full max-w-7xl mx-auto">
            {skills.map((skill, index) => {
              const width = cardWidths[index]
              const contentOpacity = contentOpacities[index]
              const transforms = cardTransforms[index]

              const COLLAPSED_MAX = 32
              const isCollapsed = useTransform(width, (w) => w <= COLLAPSED_MAX)

              return (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-3xl border-4 border-black dark:border-gray-700 mx-2"
                  style={{
                    width: transforms.widthPercent,
                    backgroundColor: skill.bgColor,
                  }}
                >
                  {/* Floating Technology Logos Background */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ opacity: contentOpacity }}
                  >
                    {skill.technologies.map((tech, techIdx) => (
                      <React.Fragment key={techIdx}>
                        <motion.img
                          src={tech.icon}
                          alt={tech.name}
                          className="absolute"
                          style={{
                            width: `${100 + techIdx * 30}px`,
                            height: `${100 + techIdx * 30}px`,
                            top: `${15 + techIdx * 20}%`,
                            left: `${10 + techIdx * 20}%`,
                            opacity: 0.1,
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            rotate: techIdx * 15,
                          }}
                          transition={{
                            y: {
                              duration: 5 + techIdx,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                            rotate: {
                              duration: 0,
                            },
                          }}
                        />
                        <motion.img
                          src={tech.icon}
                          alt={tech.name}
                          className="absolute"
                          style={{
                            width: `${80 + techIdx * 25}px`,
                            height: `${80 + techIdx * 25}px`,
                            top: `${20 + techIdx * 18}%`,
                            right: `${5 + techIdx * 15}%`,
                            opacity: 0.1,
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            rotate: -techIdx * 20,
                          }}
                          transition={{
                            y: {
                              duration: 6 + techIdx,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: techIdx * 0.7,
                            },
                            rotate: {
                              duration: 0,
                            },
                          }}
                        />
                      </React.Fragment>
                    ))}
                  </motion.div>

                  {/* Card Content */}
                  <motion.div
                    className="relative z-10 h-full flex items-center justify-center px-6"
                    style={{
                      flexDirection: useTransform(isCollapsed, (c) =>
                        c ? 'column' : 'column'
                      ),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      style={{
                        fontSize: useTransform(
                          width,
                          [20, 60],
                          ['3.5rem', '4rem']
                        ),
                        marginBottom: useTransform(isCollapsed, (c) =>
                          c ? '1rem' : '0'
                        ),
                        marginTop: useTransform(isCollapsed, (c) =>
                          c ? '15rem' : '0'
                        ),
                      }}
                    >
                      <skill.icon className="w-16 h-16 text-black dark:text-white" />
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      className="font-extrabold text-black dark:text-white"
                      style={{
                        writingMode: useTransform(isCollapsed, (c) =>
                          c ? 'vertical-rl' : 'horizontal-tb'
                        ),
                        textOrientation: 'mixed',
                        fontSize: transforms.fontSize,
                        opacity: 1,
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        lineHeight: 1,
                      }}
                    >
                      {skill.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      className="text-gray-800 dark:text-gray-200 leading-relaxed max-w-2xl text-center"
                      style={{
                        opacity: useTransform(isCollapsed, (c) => (c ? 0 : 1)),
                        pointerEvents: useTransform(isCollapsed, (c) =>
                          c ? 'none' : 'auto'
                        ),
                        marginTop: transforms.descMarginTop,
                      }}
                    >
                      {skill.description}
                    </motion.p>

                    {/* Technology Pills */}
                    <motion.div
                      className="flex flex-wrap gap-3 justify-center"
                      style={{
                        opacity: useTransform(isCollapsed, (c) => (c ? 0 : 1)),
                        pointerEvents: useTransform(isCollapsed, (c) =>
                          c ? 'none' : 'auto'
                        ),
                        marginTop: transforms.techMarginTop,
                      }}
                    >
                      {skill.technologies.map((tech, techIdx) => (
                        <motion.div
                          key={techIdx}
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm rounded-full shadow-sm border border-black dark:border-gray-600 border-opacity-10"
                        >
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-6 h-6"
                          />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {tech.name}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Progress bar at bottom */}
        <motion.div
          className="fixed bottom-0 left-0 h-1 bg-black dark:bg-white z-20"
          style={{
            right: 0,
            scaleX: smoothProgress,
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Mobile View - Flip Cards */}
      <div className="md:hidden py-12 px-4 space-y-8 bg-white dark:bg-gray-900">
        {skills.map((skill) => (
          <CardFlip
            key={skill.index}
            title={skill.title}
            subtitle={skill.subtitle}
            description={skill.description}
            features={skill.features}
            color={skill.bgColor}
            icon={skill.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default SkillsShowcase
