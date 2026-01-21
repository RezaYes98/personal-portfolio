// TypeScript type definitions for portfolio content

export interface CaseStudyFrontmatter {
  title: string              // "Disbursement Scaling"
  slug: string               // "disbursement-scaling"
  company: string            // "Doitpay"
  role: string               // "Product Manager"
  date: string               // "2024-06-15" (ISO 8601 format)
  description: string        // Brief summary for SEO meta tags
  tags: string[]             // ["Fintech", "Compliance", "Payments"]
  featured?: boolean         // Optional: highlight on home page
  order?: number             // Optional: manual sort order
  external_url?: string      // Optional: external link instead of internal page
}

export interface CaseStudy {
  slug: string                       // URL-safe identifier
  frontmatter: CaseStudyFrontmatter  // Parsed metadata
  content: string                    // Raw markdown body
}
