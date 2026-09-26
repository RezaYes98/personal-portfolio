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
      <nav className="flex min-h-[50px] flex-wrap items-center gap-2">
        <NavLink href="/case-studies">case studies</NavLink>
        <NavLink href="/articles">writing</NavLink>
        <a
          href="https://linkedin.com/in/reza-nur"
          target="_blank"
          rel="noopener noreferrer"
          className="pill border border-[#e5e5e5] bg-eggshell px-4 py-1.5 text-ink transition-colors hover:bg-taupe"
        >
          linkedin
        </a>
        <a
          href="mailto:rezayes98@gmail.com"
          className="pill border border-[#e5e5e5] bg-eggshell px-4 py-1.5 text-ink transition-colors hover:bg-taupe"
        >
          email
        </a>
      </nav>
    </header>
  )
}
