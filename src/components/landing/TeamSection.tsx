import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Twitter, Linkedin } from "lucide-react";
import aniketPhoto from "@/assets/team/aniket-raikar.jpg";
import shreyasPhoto from "@/assets/team/shreyas-thakur.jpg";
import shankarPhoto from "@/assets/team/shankar-warang.png";
import ramaPhoto from "@/assets/team/rama-shankar-jha.jpg";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  image?: string;
  twitter?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  { name: "Shankar Warang", role: "Architect", initials: "SW", image: shankarPhoto, twitter: "#", linkedin: "#" },
  { name: "Shreyas Thakur", role: "Intern", initials: "ST", image: shreyasPhoto, twitter: "#", linkedin: "#" },
  { name: "Aniket Raikar", role: "Wizard", initials: "AR", image: aniketPhoto, twitter: "#", linkedin: "#" },
  { name: "Rama Shankar Jha", role: "Artist", initials: "RJ", image: ramaPhoto, twitter: "#", linkedin: "#" },
];

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Generate a unique gradient for each member based on index
  const gradientAngles = [135, 225, 315, 45];
  const gradientColors = [
    "from-primary/30 via-primary/10 to-transparent",
    "from-primary/25 via-orange-400/10 to-transparent",
    "from-orange-500/30 via-primary/15 to-transparent",
    "from-primary/35 via-amber-500/10 to-transparent",
  ];

  return (
    <AnimatedSection delay={0.1 * index}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full"
      >
        {/* Gradient border effect */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/20 via-border to-border opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/60 via-primary/30 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glow effect on hover */}
        <div className="absolute -inset-2 rounded-3xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
        
        {/* Card content */}
        <div 
          className={cn(
            "relative rounded-2xl bg-card p-8 h-full",
            "flex flex-col items-center text-center",
            "transition-all duration-500"
          )}
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Avatar */}
          <div className="relative mb-6">
            <Avatar 
              className={cn(
                "w-32 h-32",
                "border-2 border-border/50",
                "group-hover:border-primary/40 transition-colors duration-500"
              )}
            >
              <AvatarImage 
                src={member.image} 
                alt={member.name}
                className="object-cover"
              />
              <AvatarFallback 
                className={cn(
                  "text-3xl font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-300"
                )}
                style={{ 
                  background: `linear-gradient(${gradientAngles[index % gradientAngles.length]}deg, hsl(14 89% 56% / 0.3) 0%, hsl(14 89% 56% / 0.05) 50%, transparent 100%)` 
                }}
              >
                {member.initials}
              </AvatarFallback>
            </Avatar>
            
            {/* Subtle ring animation on hover */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/0 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500" />
          </div>

          {/* Name */}
          <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
            {member.name}
          </h3>

          {/* Role */}
          <p className="text-muted-foreground text-sm mb-6">
            {member.role}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-auto">
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group/icon relative p-2 rounded-lg transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover/icon:bg-primary/10 transition-colors duration-300" />
              <Twitter 
                size={20} 
                className="relative text-muted-foreground group-hover/icon:text-primary group-hover/icon:scale-110 transition-all duration-300"
              />
              {/* Icon glow */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 blur-md bg-primary/30" />
            </a>
            
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group/icon relative p-2 rounded-lg transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover/icon:bg-primary/10 transition-colors duration-300" />
              <Linkedin 
                size={20} 
                className="relative text-muted-foreground group-hover/icon:text-primary group-hover/icon:scale-110 transition-all duration-300"
              />
              {/* Icon glow */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 blur-md bg-primary/30" />
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
};

export const TeamSection = () => {
  return (
    <section id="team" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6"
          >
            Our Team
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet the{" "}
            <span className="text-gradient">Builders</span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            A small team crafting the future of secure Web3 card tokenization.
          </p>
        </AnimatedSection>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
