import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, Terminal, BookOpen } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
        <div className="absolute inset-0 noise-texture" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8">
              <span className="text-sm text-primary font-medium">
                Ready to build the future of payments?
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              Start tokenizing{" "}
              <span className="text-gradient">today</span>
            </h2>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10">
              Join developers building the next generation of payment solutions
              on Stellar. Free to start, powerful at scale.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton variant="primary" href="#">
                <Terminal size={18} />
                Get API Keys
                <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton variant="secondary" href="#">
                <BookOpen size={18} />
                Explore Docs
              </MagneticButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
              {[
                { value: "99.9%", label: "Uptime SLA" },
                { value: "<100ms", label: "Avg Latency" },
                { value: "180+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
