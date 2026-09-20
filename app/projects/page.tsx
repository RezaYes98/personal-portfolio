import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjects } from '@/lib/markdown'
import { format } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Reza Nur',
  description:
    'Side projects and weekend builds exploring product ideas, APIs, and developer tools.',
}

export default function ProjectsPage() {
  const projects = getProjects()

  // Empty list: render a 404 instead of a blank page. Drop this guard
  // once a project ships.
  if (projects.length === 0) {
    notFound()
  }

  return (
    <div>
      <h1 className="t-page mb-12 tracking-tight">Projects</h1>
      <div className="space-y-8">
        {projects.map((project) => {
          const { frontmatter, slug } = project

          return (
            <article key={slug}>
              <Link href={`/projects/${slug}`} className="group block">
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h2 className="t-entry">{frontmatter.title}</h2>
                  <time className="t-meta shrink-0 text-neutral-500">
                    {format(new Date(frontmatter.date), 'MMM yyyy')}
                  </time>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="t-meta text-neutral-600">
                      {frontmatter.description}
                    </p>
                    {frontmatter.tags && frontmatter.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {frontmatter.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="t-micro text-neutral-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-600">
                    →
                  </span>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
