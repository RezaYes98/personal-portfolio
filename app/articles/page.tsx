import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing - Reza Nur',
  description: 'Product management insights and thought leadership.',
}

export default function ArticlesPage() {
  return (
    <div>
      <h1 className="mb-12 text-2xl font-semibold tracking-tight">Writing</h1>
      <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
        Coming soon. I'm working on articles about product strategy, fintech
        infrastructure, and regulatory compliance.
      </p>
    </div>
  )
}
