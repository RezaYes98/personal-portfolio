import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { isValidElement, type ReactElement } from 'react'
import { FigureDialog } from '@/components/figure-lightbox'

interface MarkdownContentProps {
  content: string
}

const FIGURE_PREFIX = '/case-studies/merchant-payments-fig-'

function FigureCaption({ alt }: { alt?: string }) {
  if (!alt) return null
  const parsed = alt.match(/^(Fig\. \d+)([\s\S]*)$/)
  if (!parsed) {
    return <figcaption className="t-body mt-3 text-sm text-smoke">{alt}</figcaption>
  }
  return (
    <figcaption className="t-body mt-3 text-sm text-smoke">
      <span className="font-medium text-graphite">{parsed[1]}</span>
      {parsed[2]}
    </figcaption>
  )
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="t-page mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="t-sub mt-10 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="t-entry mt-7 mb-2">{children}</h3>,
        p: ({ children }) => {
          const arr = Array.isArray(children) ? children : [children]
          const only = arr.length === 1 ? arr[0] : null
          const isFigure =
            !!only &&
            isValidElement(only) &&
            typeof (only as ReactElement<{ src?: unknown }>).props?.src === 'string'
          if (isFigure) return <>{only}</>
          return <p className="t-body mb-4">{children}</p>
        },
        img: ({ src, alt }) => {
          const isFigure = typeof src === 'string' && src.startsWith(FIGURE_PREFIX)
          if (isFigure) {
            return (
              <figure className="my-8">
                <div className="overflow-x-auto">
                  <FigureDialog src={src} alt={alt ?? ''} />
                </div>
                <FigureCaption alt={alt} />
              </figure>
            )
          }
          return (
            <figure className="my-8">
              <img
                src={typeof src === 'string' ? src : undefined}
                alt={alt ?? ''}
                loading="lazy"
                className="w-full"
              />
              <FigureCaption alt={alt} />
            </figure>
          )
        },
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
        ),
        li: ({ children }) => <li className="t-body">{children}</li>,
        a: ({ children, href }) => {
          const internal = typeof href === 'string' && href.startsWith('/')
          return (
            <a
              href={href}
              className="text-ink underline decoration-stone underline-offset-4 transition-colors hover:decoration-smoke"
              {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {children}
            </a>
          )
        },
        blockquote: ({ children }) => (
          <blockquote className="t-body border-l border-ink pl-4 text-smoke">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-taupe px-1">{children}</code>
        ),
        hr: () => <hr className="border-stone" />,
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="min-w-full">{children}</table>
          </div>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-stone">{children}</tbody>
        ),
        th: ({ children }) => (
          <th className="t-meta border-b border-stone px-4 py-3 text-left font-medium">
            {children}
          </th>
        ),
        td: ({ children }) => <td className="t-meta px-4 py-3">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
