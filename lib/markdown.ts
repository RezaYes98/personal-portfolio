import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { CaseStudy, CaseStudyFrontmatter } from './types'

export function getCaseStudies(): CaseStudy[] {
  const caseStudiesDir = path.join(process.cwd(), 'content/case-studies')
  
  if (!fs.existsSync(caseStudiesDir)) {
    return []
  }

  const filenames = fs.readdirSync(caseStudiesDir)
  
  const caseStudies = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(caseStudiesDir, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      const slug = filename.replace(/\.md$/, '')
      
      if (!data.title || !data.slug || !data.company || !data.role || !data.date) {
        throw new Error(
          `Invalid frontmatter in ${filename} - missing required fields (title, slug, company, role, date)`
        )
      }
      
      return {
        slug: data.slug as string,
        frontmatter: data as CaseStudyFrontmatter,
        content,
      }
    })
  
  return caseStudies.sort((a, b) => {
    if (a.frontmatter.order && b.frontmatter.order) {
      return a.frontmatter.order - b.frontmatter.order
    }
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })
}

export function getCaseStudy(slug: string): CaseStudy {
  const caseStudies = getCaseStudies()
  const caseStudy = caseStudies.find(cs => cs.slug === slug)
  
  if (!caseStudy) {
    throw new Error(`Case study not found: ${slug}`)
  }
  
  return caseStudy
}
