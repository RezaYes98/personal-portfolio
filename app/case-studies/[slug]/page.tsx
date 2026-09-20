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
        className="t-meta mb-8 inline-flex items-center text-neutral-600 transition-colors hover:text-neutral-900"
      >
        ← back
      </Link>

      <header className="mb-12">
        <h1 className="t-page mb-4 tracking-tight">{frontmatter.title}</h1>
        <div className="t-meta flex items-center gap-3 text-neutral-600">
          <span>{frontmatter.company}</span>
          <span>·</span>
          <time>{format(new Date(frontmatter.date), 'MMMM yyyy')}</time>
        </div>
      </header>

      <MarkdownContent content={content} />
    </article>
  )
}
