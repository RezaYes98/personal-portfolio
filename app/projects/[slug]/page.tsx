import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MarkdownContent } from '@/components/markdown-content'
import { getProject, getProjects } from '@/lib/markdown'
import { format } from 'date-fns'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const project = getProject(slug)

    return {
      title: `${project.frontmatter.title} - Reza Nur`,
      description: project.frontmatter.description,
      openGraph: {
        title: project.frontmatter.title,
        description: project.frontmatter.description,
        type: 'article',
        publishedTime: project.frontmatter.date,
        authors: ['Reza Nur'],
        tags: project.frontmatter.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: project.frontmatter.title,
        description: project.frontmatter.description,
      },
    }
  } catch {
    return {
      title: 'Project Not Found',
    }
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let project
  try {
    project = getProject(slug)
  } catch {
    notFound()
  }

  const { frontmatter, content } = project

  return (
    <article>
      <Link
        href="/projects"
        className="t-meta mb-8 inline-flex items-center text-neutral-600 transition-colors hover:text-neutral-900"
      >
        ← back
      </Link>

      <header className="mb-12">
        <h1 className="t-page mb-4">{frontmatter.title}</h1>
        <div className="t-meta flex items-center gap-3 text-neutral-600">
          <time>{format(new Date(frontmatter.date), 'MMMM yyyy')}</time>
          {frontmatter.status && (
            <>
              <span>·</span>
              <span className="capitalize">{frontmatter.status}</span>
            </>
          )}
        </div>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="t-micro rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {(frontmatter.link || frontmatter.github) && (
          <div className="mt-4 flex gap-4">
            {frontmatter.link && (
              <a
                href={frontmatter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-600"
              >
                View Project →
              </a>
            )}
            {frontmatter.github && (
              <a
                href={frontmatter.github}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-600"
              >
                GitHub →
              </a>
            )}
          </div>
        )}
      </header>

      <MarkdownContent content={content} />
    </article>
  )
}
