import Link from 'next/link'
import { NavLink } from '@/components/nav-link'

export function Header() {
  return (
    <header className="mb-12">
      <h1 className="mb-8">
        <Link href="/" className="t-site">
          Reza Nur
        </Link>
      </h1>
      <nav className="t-meta flex flex-wrap gap-6">
        <NavLink href="/case-studies">case studies</NavLink>
        <NavLink href="/articles">writing</NavLink>
        <a
          href="https://linkedin.com/in/reza-nur"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-600 transition-colors hover:text-neutral-900"
        >
          linkedin
        </a>
        <a
          href="mailto:rezayes98@gmail.com"
          className="text-neutral-600 transition-colors hover:text-neutral-900"
        >
          email
        </a>
      </nav>
    </header>
  )
}
