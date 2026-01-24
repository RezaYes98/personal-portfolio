import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Reza Nur</h1>
      <nav className="flex flex-wrap gap-6 text-sm">
        <Link href="/" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">
          home
        </Link>
        <Link href="/case-studies" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">
          case studies
        </Link>
        <Link href="/projects" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">
          projects
        </Link>
        <Link href="/articles" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">
          writing
        </Link>
        <a href="https://linkedin.com/in/reza-nur" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">
          linkedin
        </a>
        <a href="mailto:rezayes98@gmail.com" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">
          email
        </a>
      </nav>
    </header>
  )
}
