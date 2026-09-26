'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export function NavLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={
        isActive
          ? 'pill bg-taupe px-4 py-1.5 text-ink'
          : 'pill px-4 py-1.5 text-ink transition-colors hover:bg-taupe'
      }
    >
      {children}
    </Link>
  )
}
