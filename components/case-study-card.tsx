import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CaseStudy } from '@/lib/types'
import { format } from 'date-fns'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const { frontmatter, slug } = caseStudy
  const href = frontmatter.external_url || `/case-studies/${slug}`
  const isExternal = !!frontmatter.external_url

  const CardWrapper = isExternal ? 'a' : Link

  return (
    <CardWrapper
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group"
    >
      <Card className="h-full transition-all hover:shadow-lg">
        <CardHeader>
          <div className="mb-2 flex flex-wrap gap-2">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="group-hover:text-primary">
            {frontmatter.title}
          </CardTitle>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {frontmatter.company} • {frontmatter.role}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            {format(new Date(frontmatter.date), 'MMMM yyyy')}
          </p>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
            {frontmatter.description}
          </p>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}
