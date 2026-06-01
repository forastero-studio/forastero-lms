"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h1: () => null,
  h2: ({ children }) => (
    <h2
      className="text-2xl font-light text-ink mt-10 mb-4"
      style={{ letterSpacing: "-0.025em" }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-light text-ink mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-base font-light text-deep leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="flex flex-col gap-1.5 mb-6">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="flex flex-col gap-1.5 mb-6 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-sm font-light text-deep">
      <span className="mt-2 w-1 h-1 rounded-full shrink-0 bg-stone" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l border-ink pl-5 my-6 text-stone font-light text-sm">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-ink">{children}</strong>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <pre className="bg-surface border border-line px-5 py-4 my-6 overflow-x-auto">
          <code className="font-mono text-xs text-deep">{children}</code>
        </pre>
      );
    }
    return (
      <code className="font-mono text-xs bg-surface px-1.5 py-0.5 text-deep">
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full text-sm font-light border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-line">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-line/50 hover:bg-surface/60 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="font-mono text-[9px] tracking-[.1em] uppercase text-stone text-left py-3 pr-6 first:pl-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-deep font-light py-3 pr-6 first:pl-0 leading-relaxed">
      {children}
    </td>
  ),
};

export default function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
