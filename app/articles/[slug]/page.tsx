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
        className="t-meta mb-8 inline-flex items-center text-neutral-600 transition-colors hover:text-neutral-900"
      >
        ← back
      </Link>

      <header className="mb-12">
        <h1 className="t-page mb-4 tracking-tight">{frontmatter.title}</h1>
        <time className="t-meta text-neutral-600">
          {format(new Date(frontmatter.date), 'MMMM d, yyyy')}
        </time>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="t-micro text-neutral-500">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <MarkdownContent content={content} />
    </article>
  )
}
