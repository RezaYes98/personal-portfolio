import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        h1: ({ children }) => (
          <h1 className="mb-4 mt-8 text-4xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-6 text-3xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-4 text-2xl font-semibold">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-primary underline underline-offset-4 hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-neutral-300 pl-4 italic text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-neutral-50 dark:bg-neutral-900">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-sm font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-sm">{children}</td>
        ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
