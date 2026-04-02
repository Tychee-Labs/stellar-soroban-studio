import { BlogLayout } from "@/components/blog/BlogLayout";
import { BlogListing } from "@/components/blog/BlogListing";
import SEO from "@/components/SEO";

const Blog = () => {
  return (
    <BlogLayout>
      <SEO title="Blog - Stellar Soroban Studio" description="Read the latest updates and articles." />
      <BlogListing />
    </BlogLayout>
  );
};

export default Blog;
