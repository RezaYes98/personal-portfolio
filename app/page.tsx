import Link from 'next/link'
import { getCaseStudies } from '@/lib/markdown'
import { format } from 'date-fns'

export default function HomePage() {
  const caseStudies = getCaseStudies()

  return (
    <div>
      <section className="hero-wash mb-16">
        <p className="t-body mb-4">
          I'm a product manager and builder. Currently working at{' '}
          <a
            href="https://doitpay.co"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-600"
          >
            Doitpay
          </a>{' '}
          on payment infrastructure.
        </p>
        <p className="t-body mb-4">
          The work so far: payment gateways, disbursement systems, integrations,
          and the regulatory side of moving other people's money. Lately, that's
          meant preparing Doitpay's Bank Indonesia PJP Category 1 Bundle 2 submission.
        </p>
        <p className="t-body">
          This site is the record: case studies with the constraints, the
          decisions, and the numbers (including the ones that never got measured),
          plus an essay on product and systems.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="t-page mb-8">Case Studies</h2>
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
                    <h3 className="t-entry">{frontmatter.title}</h3>
                    <time className="t-meta shrink-0 text-neutral-500">
                      {format(new Date(frontmatter.date), 'MMM yyyy')}
                    </time>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <p className="t-meta text-neutral-600">
                      {frontmatter.description}
                    </p>
                    <span className="shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-600">
                      →
                    </span>
                  </div>
                </a>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
