import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface DocsTableOfContentsProps {
  headings: TocItem[];
  className?: string;
}

export const DocsTableOfContents = ({ headings, className }: DocsTableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className={cn("hidden xl:block", className)}>
      <div className="sticky top-24">
        <h4 className="text-sm font-semibold text-foreground mb-4">On this page</h4>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <motion.button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "block w-full text-left text-sm py-1 transition-all duration-200 hover:text-foreground",
                heading.level === 2 ? "pl-0" : "pl-4",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
              whileHover={{ x: 2 }}
            >
              {heading.text}
            </motion.button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
