import Link from 'next/link'
import { getCaseStudies } from '@/lib/markdown'
import { format } from 'date-fns'

export default function HomePage() {
  const caseStudies = getCaseStudies()

  return (
    <div>
      <section className="mb-16">
        <p className="mb-6 leading-relaxed text-neutral-800 dark:text-neutral-200">
          I'm a product manager and builder. I work at{' '}
          <a
            href="https://doitpay.co"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-600"
          >
            Doitpay
          </a>{' '}
          building payment infrastructure. Previously, I worked at Kanggo and Ohceans.
        </p>
        <p className="mb-6 leading-relaxed text-neutral-800 dark:text-neutral-200">
          I build products by treating constraints—regulation, scale, and operations—as
          first-class inputs, not obstacles, and turning them into systems that are
          reliable, compliant, and easy to operate.
        </p>
        <p className="leading-relaxed text-neutral-800 dark:text-neutral-200">
          I've spent the last few years working on fintech infrastructure: payment
          gateways, disbursement systems, e-wallet integrations, and regulatory
          compliance. I care deeply about building systems that auditors can trust,
          operations teams can understand, and engineers can maintain.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-xl font-semibold tracking-tight">Case Studies</h2>
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
                    <h3 className="font-medium text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-400">
                      {frontmatter.title}
                    </h3>
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
      </section>
    </div>
  )
}
