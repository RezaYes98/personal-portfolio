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
          ? 'text-foreground underline underline-offset-4'
          : 'text-neutral-600 transition-colors hover:text-neutral-900'
      }
    >
      {children}
    </Link>
  )
}
