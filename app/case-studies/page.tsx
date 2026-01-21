import Link from 'next/link'
import { getCaseStudies } from '@/lib/markdown'
import { format } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies - Reza Nur',
  description:
    'Product management case studies covering fintech infrastructure, payments, compliance, and operational systems.',
}

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies()

  return (
    <div>
      <h1 className="mb-12 text-2xl font-semibold tracking-tight">Case Studies</h1>
      <div className="space-y-8">
        {caseStudies.map((caseStudy) => {
          const { frontmatter, slug } = caseStudy
          const href = frontmatter.external_url || `/case-studies/${slug}`
          const isExternal = !!frontmatter.external_url

          return (
            <article key={slug}>
              <a
                href={href}
                {...(isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
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
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {frontmatter.description}
                  </p>
                  <span className="shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-600 dark:text-neutral-600 dark:group-hover:text-neutral-400">
                    →
                  </span>
                </div>
              </a>
            </article>
          )
        })}
      </div>
    </div>
  )
}
