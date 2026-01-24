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
        className="mb-8 inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← back
      </Link>

      <header className="mb-12">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
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
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {(frontmatter.link || frontmatter.github) && (
          <div className="mt-4 flex gap-4 text-sm">
            {frontmatter.link && (
              <a
                href={frontmatter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
              >
                View Project →
              </a>
            )}
            {frontmatter.github && (
              <a
                href={frontmatter.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
              >
                GitHub →
              </a>
            )}
          </div>
        )}
      </header>

      <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-a:text-neutral-900 prose-a:underline prose-a:decoration-neutral-400 prose-a:underline-offset-4 hover:prose-a:decoration-neutral-600 dark:prose-a:text-neutral-100 dark:prose-a:decoration-neutral-600 dark:hover:prose-a:decoration-neutral-400">
        <MarkdownContent content={content} />
      </div>
    </article>
  )
}
