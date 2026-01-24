import Link from 'next/link'
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

  return (
    <div>
      <h1 className="mb-12 text-2xl font-semibold tracking-tight">Projects</h1>
      <div className="space-y-8">
        {projects.map((project) => {
          const { frontmatter, slug } = project

          return (
            <article key={slug}>
              <Link
                href={`/projects/${slug}`}
                className="group block"
              >
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h2 className="font-medium text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-400">
                    {frontmatter.title}
                  </h2>
                  <time className="shrink-0 text-sm text-neutral-500">
                    {format(new Date(frontmatter.date), 'MMM yyyy')}
                  </time>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {frontmatter.description}
                    </p>
                    {frontmatter.tags && frontmatter.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {frontmatter.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-neutral-500 dark:text-neutral-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-600 dark:text-neutral-600 dark:group-hover:text-neutral-400">
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
