"use client";

import ReactMarkdown from "react-markdown";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-li:text-foreground/90">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{children}</h2>
          ),
          h2: ({ children }) => (
            <h3 className="text-xl font-semibold text-foreground mt-7 mb-3">{children}</h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-5 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-5 space-y-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed text-foreground/90">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic text-foreground/70 my-5">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
