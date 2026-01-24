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
      <h1 className="mb-12 text-2xl font-semibold tracking-tight">Writing</h1>
      <div className="space-y-8">
        {articles.length > 0 ? (
          articles.map((article) => {
            const { frontmatter, slug } = article

            return (
              <article key={slug}>
                <Link
                  href={`/articles/${slug}`}
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
          })
        ) : (
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
            Coming soon. I'm working on articles about product strategy, fintech
            infrastructure, and building at scale.
          </p>
        )}
      </div>
    </div>
  )
}
