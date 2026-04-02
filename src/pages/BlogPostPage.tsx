import { BlogLayout } from "@/components/blog/BlogLayout";
import { BlogPost } from "@/components/blog/BlogPost";
import SEO from "@/components/SEO";
import { useParams } from "react-router-dom";

const BlogPostPage = () => {
  const { slug } = useParams();
  const formatTitle = (s?: string) => s ? s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Blog Post';

  return (
    <BlogLayout>
      <SEO title={`${formatTitle(slug)} - Blog`} description={`Read ${formatTitle(slug)} on Stellar Soroban Studio.`} />
      <BlogPost />
    </BlogLayout>
  );
};

export default BlogPostPage;
