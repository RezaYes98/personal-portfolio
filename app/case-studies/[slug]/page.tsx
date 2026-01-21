import { notFound } from 'next/navigation'
import { MarkdownContent } from '@/components/markdown-content'
import { getCaseStudy, getCaseStudies } from '@/lib/markdown'
import { format } from 'date-fns'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateStaticParams() {
  const caseStudies = getCaseStudies()
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const caseStudy = getCaseStudy(slug)

    return {
      title: `${caseStudy.frontmatter.title} - Reza Nur`,
      description: caseStudy.frontmatter.description,
      openGraph: {
        title: caseStudy.frontmatter.title,
        description: caseStudy.frontmatter.description,
        type: 'article',
        publishedTime: caseStudy.frontmatter.date,
        authors: ['Reza Nur'],
        tags: caseStudy.frontmatter.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: caseStudy.frontmatter.title,
        description: caseStudy.frontmatter.description,
      },
    }
  } catch {
    return {
      title: 'Case Study Not Found',
    }
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let caseStudy
  try {
    caseStudy = getCaseStudy(slug)
  } catch {
    notFound()
  }

  const { frontmatter, content } = caseStudy

  return (
    <article>
      <Link
        href="/case-studies"
        className="mb-8 inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← back
      </Link>

      <header className="mb-12">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <span>{frontmatter.company}</span>
          <span>·</span>
          <time>{format(new Date(frontmatter.date), 'MMMM yyyy')}</time>
        </div>
      </header>

      <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-a:text-neutral-900 prose-a:underline prose-a:decoration-neutral-400 prose-a:underline-offset-4 hover:prose-a:decoration-neutral-600 dark:prose-a:text-neutral-100 dark:prose-a:decoration-neutral-600 dark:hover:prose-a:decoration-neutral-400">
        <MarkdownContent content={content} />
      </div>
    </article>
  )
}
