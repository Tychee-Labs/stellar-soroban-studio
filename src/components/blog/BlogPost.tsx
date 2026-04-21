import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data";
import { Calendar, User, Clock, ChevronLeft, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import { isExternalUrl } from "@/lib/utils";

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = slug ? getBlogPostBySlug(slug) : null;

  useEffect(() => {
    if (post) {
      // Update page meta tags for SEO
      document.title = `${post.title} | Tychee Blog`;
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", post.seo.description);
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", post.seo.keywords.join(", "));
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", post.title);
      }
      const ogDescription = document.querySelector(
        'meta[property="og:description"]',
      );
      if (ogDescription) {
        ogDescription.setAttribute("content", post.seo.description);
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ChevronLeft size={16} />
              Back to Articles
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-secondary/50 text-secondary-foreground border border-border/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-16"
      >
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Main Content */}
          <article className="prose prose-invert max-w-none mb-16">
            <div className="text-foreground leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-3xl font-bold mt-8 mb-4 text-foreground"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-2xl font-bold mt-6 mb-3 text-foreground"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-xl font-semibold mt-4 mb-2 text-foreground"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="mb-4 text-muted-foreground leading-relaxed"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li
                      className="ml-6 mb-2 text-muted-foreground leading-relaxed"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="mb-4 list-decimal" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="mb-4 list-disc" {...props} />
                  ),
                  code: ({ node, inline: isInline, ...props }: any) =>
                    isInline ? (
                      <code
                        className="bg-card/50 px-2 py-1 rounded text-primary font-mono text-sm"
                        {...props}
                      />
                    ) : (
                      <code
                        className="block bg-card/50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto"
                        {...props}
                      />
                    ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-primary pl-4 py-2 mb-4 text-muted-foreground italic"
                      {...props}
                    />
                  ),
                  a: ({ node, href, ...props }) => {
                    const external = isExternalUrl(href);
                    return (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="text-primary hover:text-primary/80 underline underline-offset-4"
                        {...props}
                      />
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Share Section */}
          <div className="border-t border-b border-border py-8 mb-16">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Share this article
                </h3>
                <p className="text-sm text-muted-foreground">
                  Help others discover this content
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center gap-2"
                >
                  <Share2 size={16} />
                  Twitter
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alert("Link copied to clipboard!");
                  }}
                  className="px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center gap-2"
                >
                  <Share2 size={16} />
                  Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="border border-border rounded-lg p-6 hover:border-primary/50 hover:bg-primary/5 transition-all">
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {relatedPost.readTime} min read
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-primary/10 to-primary/5 border-t border-primary/20 py-16"
      >
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to integrate Tychee SDK?
          </h3>
          <p className="text-muted-foreground mb-8">
            Start securing card payments with client-side encryption and Web3
            integration.
          </p>
          <a
            href="https://www.npmjs.com/package/@tychee/sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
          >
            Install SDK
          </a>
        </div>
      </motion.div>
    </div>
  );
};
