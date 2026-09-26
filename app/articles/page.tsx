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
      <h1 className="t-page mb-12">Writing</h1>
      <div className="space-y-8">
        {articles.length > 0 ? (
          articles.map((article) => {
            const { frontmatter, slug } = article

            return (
              <article key={slug} className="card-study">
                <Link href={`/articles/${slug}`} className="group block">
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <h2 className="t-card-title text-ink">
                      {frontmatter.title}
                    </h2>
                    <time className="t-micro shrink-0 text-smoke">
                      {format(new Date(frontmatter.date), 'MMM yyyy')}
                    </time>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="t-card-desc text-smoke">
                        {frontmatter.description}
                      </p>
                      {frontmatter.tags && frontmatter.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {frontmatter.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="t-micro text-smoke"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 text-smoke transition-colors group-hover:text-graphite">
                      →
                    </span>
                  </div>
                </Link>
              </article>
            )
          })
        ) : (
          <p className="t-body text-smoke">
            Coming soon. I'm working on articles about product strategy, fintech
            infrastructure, and building at scale.
          </p>
        )}
      </div>
    </div>
  )
}
