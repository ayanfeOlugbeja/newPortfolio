import React from 'react'

export default function Projects() {
  return (
    <section id="projects" className="py-16" aria-labelledby="projects-heading">
      <div className="container mx-auto px-4">
        <h2 id="projects-heading" className="text-2xl font-bold mb-6">
          Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article
            className="p-6 bg-white rounded shadow"
            aria-labelledby="project-1-title"
          >
            <h3 id="project-1-title" className="font-semibold">
              Project 1
            </h3>
            <p className="text-sm text-gray-600">
              Short description of project 1.
            </p>
          </article>
          <article
            className="p-6 bg-white rounded shadow"
            aria-labelledby="project-2-title"
          >
            <h3 id="project-2-title" className="font-semibold">
              Project 2
            </h3>
            <p className="text-sm text-gray-600">
              Short description of project 2.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
