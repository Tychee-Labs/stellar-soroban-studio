import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    quote:
      "We integrated Tychee in under 3 hours. The TypeScript SDK is incredibly clean—best developer experience I've had with a payment API.",
    name: "Sarah Chen",
    role: "CTO",
    company: "NovaPay Finance",
    avatar: "SC",
    highlight: "3-hour integration",
  },
  {
    quote:
      "The client-side encryption model gave our compliance team instant confidence. No PCI scope creep, no master key liability. Just works.",
    name: "Marcus Rodriguez",
    role: "Lead Engineer",
    company: "BlockVault",
    avatar: "MR",
    highlight: "Zero PCI scope",
  },
  {
    quote:
      "Finally, a card tokenization SDK that understands Web3. Account abstraction support out of the box was a game-changer for our UX.",
    name: "Aisha Patel",
    role: "Founder",
    company: "StellarPay",
    avatar: "AP",
    highlight: "Native AA support",
  },
  {
    quote:
      "The API is so intuitive we didn't even need to read the docs for basic integration. Testnet-first approach saved us weeks of debugging.",
    name: "James Okonkwo",
    role: "Senior Developer",
    company: "Fintech Labs",
    avatar: "JO",
    highlight: "Intuitive API",
  },
  {
    quote:
      "Security audits are usually painful. With Tychee's architecture, our auditors approved in record time. User-owned keys = less risk.",
    name: "Elena Volkov",
    role: "Security Lead",
    company: "TrustBridge",
    avatar: "EV",
    highlight: "Audit-ready",
  },
];

const TestimonialCard = ({
  testimonial,
  isActive,
}: {
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full"
    >
      <div className="relative h-full bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:border-primary/30 group overflow-hidden">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated quote mark */}
        <div className="absolute top-6 right-6">
          <motion.div
            initial={{ opacity: 0.1, scale: 1 }}
            whileHover={{ opacity: 0.3, scale: 1.1 }}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Quote size={40} className="text-primary fill-primary/10" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
          {/* Highlight badge */}
          <div className="inline-flex self-start items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-xs font-medium text-primary">
              {testimonial.highlight}
            </span>
          </div>

          {/* Quote */}
          <blockquote className="text-foreground text-lg leading-relaxed mb-8 flex-grow">
            "{testimonial.quote}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-border flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {testimonial.avatar}
              </span>
            </div>

            {/* Info */}
            <div>
              <div className="font-semibold text-foreground">
                {testimonial.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {testimonial.role} at {testimonial.company}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Developer Love
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Trusted by{" "}
            <span className="text-gradient">builders</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See why developers choose Tychee for secure card tokenization on Stellar.
          </p>
        </AnimatedSection>

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={index === selectedIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {/* Prev button */}
            <motion.button
              onClick={scrollPrev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollPrev
                  ? "border-border bg-card hover:border-primary/50 text-foreground"
                  : "border-border/50 bg-card/50 text-muted-foreground cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="relative p-1"
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedIndex ? "bg-primary" : "bg-muted"
                    }`}
                    animate={{
                      scale: index === selectedIndex ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  {index === selectedIndex && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute inset-0 m-auto w-4 h-4 rounded-full border border-primary/50"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Next button */}
            <motion.button
              onClick={scrollNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollNext
                  ? "border-border bg-card hover:border-primary/50 text-foreground"
                  : "border-border/50 bg-card/50 text-muted-foreground cursor-not-allowed"
              }`}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
