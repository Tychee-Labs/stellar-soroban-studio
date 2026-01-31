import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export const GradientBlob = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{
          x,
          y,
          background:
            "radial-gradient(circle, hsl(14 89% 56% / 0.4) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, hsl(14 89% 56% / 0.5) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
};
