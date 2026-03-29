import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts, getAllCategories } from "@/lib/blog-data";
import { useState } from "react";
import { Search, ChevronRight, Calendar, User } from "lucide-react";

export const BlogListing = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = getAllCategories();

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Tychee <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Insights, updates, and in-depth guides about card tokenization, Web3 payments, and
            secure financial infrastructure.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50 bg-card/30"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary/50 bg-card/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <div className="border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card/30 backdrop-blur-sm h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/20 text-xs font-semibold text-primary border border-primary/30">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <time>{new Date(post.date).toLocaleDateString()}</time>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <span>{post.readTime} min read</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-secondary-foreground border border-border/50"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        Read More
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No articles found. Try adjusting your search or filters.
              </p>
            </motion.div>
          )}
        </div>

        {/* Featured Articles Section */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 pt-12 border-t border-border"
          >
            <h2 className="text-2xl font-bold mb-8">More Resources</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(0, 3).map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-grow">
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{post.readTime} min read</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
