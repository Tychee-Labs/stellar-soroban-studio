import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  canonicalUrl?: string;
  keywords?: string;
  image?: string;
  author?: string;
  robots?: string;
}

export default function SEO({
  title,
  description,
  name = "Stellar Soroban Studio",
  type = "website",
  canonicalUrl = "https://tychee.store",
  keywords = "Stellar, Soroban, Smart Contracts, Web3, Blockchain, Development Studio, Tychee",
  image = "https://tychee.store/open_graph.jpeg",
  author = "Tychee Labs",
  robots = "index, follow",
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />

      {/* Standard SEO */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}
