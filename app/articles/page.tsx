import Link from 'next/link'
import { getArticles } from '@/lib/markdown'
import { format } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing - Reza Nur',
  description:
    'Product management insights, articles, and thought leadership on fintech, product strategy, and building at scale.',
}

export default function ArticlesPage() {
  const articles = getArticles()

  return (
    <div>
      <h1 className="t-page mb-12 tracking-tight">Writing</h1>
      <div className="space-y-8">
        {articles.length > 0 ? (
          articles.map((article) => {
            const { frontmatter, slug } = article

            return (
              <article key={slug}>
                <Link href={`/articles/${slug}`} className="group block">
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
                            <span
                              key={tag}
                              className="t-micro text-neutral-500"
                            >
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
          })
        ) : (
          <p className="t-body text-neutral-600">
            Coming soon. I'm working on articles about product strategy, fintech
            infrastructure, and building at scale.
          </p>
        )}
      </div>
    </div>
  )
}
