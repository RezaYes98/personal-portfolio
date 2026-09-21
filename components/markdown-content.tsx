import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { isValidElement, type ReactElement } from 'react'

interface MarkdownContentProps {
  content: string
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
        img: ({ src, alt }) => (
          <figure className="my-8">
            <img
              src={typeof src === 'string' ? src : undefined}
              alt={alt ?? ''}
              loading="lazy"
              className="w-full"
            />
            {alt ? (
              <figcaption className="t-meta mt-3 text-neutral-600">{alt}</figcaption>
            ) : null}
          </figure>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
        ),
        li: ({ children }) => <li className="t-body">{children}</li>,
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-foreground underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="t-body border-l border-foreground pl-4 text-neutral-600">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-neutral-100 px-1">{children}</code>
        ),
        hr: () => <hr className="border-neutral-200" />,
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="min-w-full">{children}</table>
          </div>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-neutral-200">{children}</tbody>
        ),
        th: ({ children }) => (
          <th className="t-meta border-b border-neutral-200 px-4 py-3 text-left font-semibold">
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
