// TypeScript type definitions for portfolio content

export interface CaseStudyFrontmatter {
  title: string              // "Disbursement Scaling"
  slug: string               // "disbursement-scaling"
  company: string            // "Doitpay"
  role: string               // "Product Manager"
  date: string               // "2024-06-15" (ISO 8601 format)
  description: string        // Brief summary for SEO meta tags
  tags: string[]             // ["Fintech", "Compliance", "Payments"]
  order?: number             // Optional: manual sort order
  external_url?: string      // Optional: external link instead of internal page
}

export interface CaseStudy {
  slug: string                       // URL-safe identifier
  frontmatter: CaseStudyFrontmatter  // Parsed metadata
  content: string                    // Raw markdown body
}

export interface ProjectFrontmatter {
  title: string              // "CrossFit WOD API"
  slug: string               // "crossfit-wod-api"
  date: string               // "2024-03-15" (ISO 8601 format)
  description: string        // Brief summary for list view and SEO
  tags: string[]             // ["Node.js", "Express", "API"]
  link?: string              // Optional: external URL to live project
  github?: string            // Optional: GitHub repository URL
  order?: number             // Optional: manual sort order
  status?: string            // Optional: "active" | "archived" | "wip"
}

export interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
  content: string
}

export interface ArticleFrontmatter {
  title: string              // "Building Reliable Payment Systems"
  slug: string               // "building-reliable-payment-systems"
  date: string               // "2024-12-15" (ISO 8601 format)
  description: string        // Brief summary for list view and SEO
  tags: string[]             // ["Fintech", "Payments", "Product Strategy"]
  order?: number             // Optional: manual sort order
}

export interface Article {
  slug: string
  frontmatter: ArticleFrontmatter
  content: string
}
