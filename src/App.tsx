import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Docs from "./pages/Docs";
import Blog from "./pages/BlogIndex";
import BlogPostPage from "./pages/BlogPostPage";
import NotFound from "./pages/NotFound";

import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const HashScrollHandler = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    const headerOffset = 96;
    let attempts = 0;
    const maxAttempts = 20;

    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (!element) return false;

      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
      return true;
    };

    if (scrollToElement()) return;

    const intervalId = window.setInterval(() => {
      attempts += 1;
      if (scrollToElement() || attempts >= maxAttempts) {
        window.clearInterval(intervalId);
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [hash, pathname]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <HashScrollHandler />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/waitlist" element={<Navigate to="/#waitlist" replace />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/*" element={<Docs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
