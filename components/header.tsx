import Link from 'next/link'
import { NavLink } from '@/components/nav-link'

function LinkedInMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.6 2.2a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M.6 5.4h2.8v10H.6v-10m4.5 0h2.7v1.4h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4v5.7h-2.8v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.1H5.1v-10" />
    </svg>
  )
}

function EmailMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="1" y="3" width="14" height="10" rx="2" />
      <path d="m2 4.5 6 4.5 6-4.5" />
    </svg>
  )
}

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
          className="pill inline-flex items-center gap-2 border border-[#e5e5e5] bg-eggshell px-4 py-1.5 text-ink opacity-70 transition-colors hover:bg-taupe hover:opacity-100"
        >
          <LinkedInMark />
          linkedin
        </a>
        <a
          href="mailto:rezayes98@gmail.com"
          className="pill inline-flex items-center gap-2 border border-[#e5e5e5] bg-eggshell px-4 py-1.5 text-ink opacity-70 transition-colors hover:bg-taupe hover:opacity-100"
        >
          <EmailMark />
          email
        </a>
      </nav>
    </header>
  )
}
