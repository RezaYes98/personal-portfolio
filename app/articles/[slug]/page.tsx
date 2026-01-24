import { notFound } from 'next/navigation'
import { MarkdownContent } from '@/components/markdown-content'
import { getArticle, getArticles } from '@/lib/markdown'
import { format } from 'date-fns'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateStaticParams() {
  const articles = getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const article = getArticle(slug)

    return {
      title: `${article.frontmatter.title} - Reza Nur`,
      description: article.frontmatter.description,
      openGraph: {
        title: article.frontmatter.title,
        description: article.frontmatter.description,
        type: 'article',
        publishedTime: article.frontmatter.date,
        authors: ['Reza Nur'],
        tags: article.frontmatter.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.frontmatter.title,
        description: article.frontmatter.description,
      },
    }
  } catch {
    return {
      title: 'Article Not Found',
    }
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let article
  try {
    article = getArticle(slug)
  } catch {
    notFound()
  }

  const { frontmatter, content } = article

  return (
    <article>
      <Link
        href="/articles"
        className="mb-8 inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← back
      </Link>

      <header className="mb-12">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>
        <time className="text-sm text-neutral-600 dark:text-neutral-400">
          {format(new Date(frontmatter.date), 'MMMM d, yyyy')}
        </time>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-neutral-500 dark:text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-a:text-neutral-900 prose-a:underline prose-a:decoration-neutral-400 prose-a:underline-offset-4 hover:prose-a:decoration-neutral-600 dark:prose-a:text-neutral-100 dark:prose-a:decoration-neutral-600 dark:hover:prose-a:decoration-neutral-400">
        <MarkdownContent content={content} />
      </div>
    </article>
  )
}
