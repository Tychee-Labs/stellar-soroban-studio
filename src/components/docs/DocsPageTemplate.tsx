import { ReactNode } from "react";
import { motion } from "framer-motion";
import { DocsTableOfContents } from "./DocsTableOfContents";
import { DocsNavigation } from "./DocsNavigation";
import { cn, isExternalUrl } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface NavLink {
  title: string;
  href: string;
  description?: string;
}

interface DocsPageTemplateProps {
  title: string;
  description?: string;
  badge?: string;
  headings: TocItem[];
  previous?: NavLink;
  next?: NavLink;
  children: ReactNode;
  className?: string;
}

export const DocsPageTemplate = ({
  title,
  description,
  badge,
  headings,
  previous,
  next,
  children,
  className,
}: DocsPageTemplateProps) => {
  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <article className={cn("flex-1 min-w-0 max-w-3xl", className)}>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {badge && (
            <div className="mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                {badge}
              </span>
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {title}
          </h1>
          
          {description && (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="docs-content"
        >
          {children}
        </motion.div>

        {/* Navigation */}
        <DocsNavigation previous={previous} next={next} />
      </article>

      {/* Table of Contents */}
      <DocsTableOfContents headings={headings} className="w-56 shrink-0" />
    </div>
  );
};

// Typography components for docs content
export const DocsH2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2 id={id} className="group mt-12 mb-4 text-2xl font-bold text-foreground scroll-mt-24">
    <a href={`#${id}`} className="flex items-center gap-2 hover:text-primary transition-colors">
      {children}
      <span className="opacity-0 group-hover:opacity-100 text-primary transition-opacity">#</span>
    </a>
  </h2>
);

export const DocsH3 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h3 id={id} className="group mt-8 mb-3 text-lg font-semibold text-foreground scroll-mt-24">
    <a href={`#${id}`} className="flex items-center gap-2 hover:text-primary transition-colors">
      {children}
      <span className="opacity-0 group-hover:opacity-100 text-primary text-sm transition-opacity">#</span>
    </a>
  </h3>
);

export const DocsP = ({ children }: { children: ReactNode }) => (
  <p className="my-4 text-muted-foreground leading-relaxed">{children}</p>
);

export const DocsUl = ({ children }: { children: ReactNode }) => (
  <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground">{children}</ul>
);

export const DocsOl = ({ children }: { children: ReactNode }) => (
  <ol className="my-4 ml-6 list-decimal space-y-2 text-muted-foreground">{children}</ol>
);

export const DocsLi = ({ children }: { children: ReactNode }) => (
  <li className="leading-relaxed">{children}</li>
);

export const DocsInlineCode = ({ children }: { children: ReactNode }) => (
  <code className="px-1.5 py-0.5 rounded bg-secondary/50 text-primary text-sm font-mono">
    {children}
  </code>
);

export const DocsLink = ({ href, children }: { href: string; children: ReactNode }) => {
  const external = isExternalUrl(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
    >
      {children}
    </a>
  );
};

export const DocsTable = ({ children }: { children: ReactNode }) => (
  <div className="my-6 overflow-x-auto rounded-xl border border-border/50">
    <table className="w-full text-sm">
      {children}
    </table>
  </div>
);

export const DocsThead = ({ children }: { children: ReactNode }) => (
  <thead className="bg-secondary/20 border-b border-border/50">
    {children}
  </thead>
);

export const DocsTr = ({ children }: { children: ReactNode }) => (
  <tr className="border-b border-border/30 last:border-0">{children}</tr>
);

export const DocsTh = ({ children }: { children: ReactNode }) => (
  <th className="px-4 py-3 text-left font-semibold text-foreground">{children}</th>
);

export const DocsTd = ({ children }: { children: ReactNode }) => (
  <td className="px-4 py-3 text-muted-foreground">{children}</td>
);
