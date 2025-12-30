import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SkillsShowcase = () => {
  const sectionRef = useRef(null);

  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for natural motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const skills = [
    {
      index: 0,
      label: "DESIGN & BRANDING",
      title: "Design & Branding",
      description:
        "Creating beautiful, user-centered designs that bring ideas to life with modern tools and creative thinking.",
      bgColor: "#D4C5F9",
      icon: "🎨",
      technologies: [
        {
          name: "Figma",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        },
        {
          name: "Illustrator",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
        },
        {
          name: "Photoshop",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
        },
        {
          name: "Canva",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
        },
      ],
    },
    {
      index: 1,
      label: "MOBILE DEVELOPMENT",
      title: "Mobile Development",
      description:
        "Building responsive, cross-platform mobile applications with React Native and modern development tools.",
      bgColor: "#FFE9A8",
      icon: "📱",
      technologies: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
      ],
    },
    {
      index: 2,
      label: "WEB DEVELOPMENT",
      title: "Web Development",
      description:
        "Developing modern web applications with cutting-edge technologies including Web3 and blockchain integration.",
      bgColor: "#A8D5F0",
      icon: "💻",
      technologies: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "Solidity",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
        },
      ],
    },
  ];

  const BASE_WIDTH = 20;
  const EXPANDABLE = 40;

  // Create width transforms for each card at the top level
  const cardWidths = skills.map((_, index) =>
    useTransform(smoothProgress, (progress) => {
      const activeIndex = progress * (skills.length - 1);
      const distance = Math.abs(activeIndex - index);

      if (distance >= 1) return BASE_WIDTH;

      const extra = EXPANDABLE * (1 - distance);
      return BASE_WIDTH + extra;
    })
  );

  // Create opacity transforms for content
  const contentOpacities = cardWidths.map((width) =>
    useTransform(width, [20, 40, 60], [0, 0, 1])
  );

  // Create all other transforms at the top level for each card
  const cardTransforms = cardWidths.map((width, index) => ({
    widthPercent: useTransform(width, (w) => `${w}%`),
    flexDirection: useTransform(width, (w) => (w > 40 ? "column" : "row")),
    fontSize: useTransform(
      width,
      [20, 40, 60],
      [
        "clamp(18px, 2.2vw, 26px)",
        "clamp(28px, 3vw, 40px)",
        "clamp(36px, 4vw, 64px)",
      ]
    ),
    writingMode: useTransform(width, (w) =>
      w > 40 ? "horizontal-tb" : "vertical-rl"
    ),
    titleMarginTop: useTransform(width, (w) => (w > 40 ? "1rem" : "0")),
    descMarginTop: useTransform(contentOpacities[index], (o) =>
      o > 0 ? "1.5rem" : "0"
    ),
    techMarginTop: useTransform(contentOpacities[index], (o) =>
      o > 0 ? "2rem" : "0"
    ),
  }));

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-gray-900"
      style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
        <div className="flex gap-0 w-full h-full max-w-7xl mx-auto">
          {skills.map((skill, index) => {
            const width = cardWidths[index];
            const contentOpacity = contentOpacities[index];
            const transforms = cardTransforms[index];

            const COLLAPSED_MAX = 32; // % width
            const isCollapsed = useTransform(width, (w) => w <= COLLAPSED_MAX);

            return (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-3xl border-4 border-black dark:border-gray-700 mx-2"
                style={{
                  width: transforms.widthPercent,
                  backgroundColor: skill.bgColor,
                }}>
                {/* Floating Technology Logos Background */}
                <motion.div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ opacity: contentOpacity }}>
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
                            ease: "easeInOut",
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
                            ease: "easeInOut",
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
                      c ? "column" : "column"
                    ),
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  {/* Icon */}
                  <motion.div
                    style={{
                      fontSize: useTransform(
                        width,
                        [20, 60],
                        ["3.5rem", "4rem"]
                      ),
                      marginBottom: useTransform(isCollapsed, (c) =>
                        c ? "1rem" : "0"
                      ),
                      marginTop: useTransform(isCollapsed, (c) =>
                        c ? "15rem" : "0"
                      ),
                    }}>
                    {skill.icon}
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="font-extrabold text-black dark:text-white"
                    style={{
                      writingMode: useTransform(isCollapsed, (c) =>
                        c ? "vertical-rl" : "horizontal-tb"
                      ),
                      textOrientation: "mixed",
                      fontSize: transforms.fontSize,
                      opacity: 1,
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      lineHeight: 1,
                    }}>
                    {skill.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    className="text-gray-800 dark:text-gray-200 leading-relaxed max-w-2xl text-center"
                    style={{
                      opacity: useTransform(isCollapsed, (c) => (c ? 0 : 1)),
                      pointerEvents: useTransform(isCollapsed, (c) =>
                        c ? "none" : "auto"
                      ),
                      marginTop: transforms.descMarginTop,
                    }}>
                    {skill.description}
                  </motion.p>

                  {/* Technology Pills */}
                  <motion.div
                    className="flex flex-wrap gap-3 justify-center"
                    style={{
                      opacity: useTransform(isCollapsed, (c) => (c ? 0 : 1)),
                      pointerEvents: useTransform(isCollapsed, (c) =>
                        c ? "none" : "auto"
                      ),
                      marginTop: transforms.techMarginTop,
                    }}>
                    {skill.technologies.map((tech, techIdx) => (
                      <motion.div
                        key={techIdx}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm rounded-full shadow-sm border border-black dark:border-gray-600 border-opacity-10">
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
            );
          })}
        </div>
      </div>

      {/* Progress bar at bottom */}
      <motion.div
        className="fixed bottom-0 left-0 h-1 bg-black dark:bg-white z-20"
        style={{
          right: 0,
          scaleX: smoothProgress,
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

export default SkillsShowcase;
