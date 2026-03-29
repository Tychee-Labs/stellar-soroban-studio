import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
}

export const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
