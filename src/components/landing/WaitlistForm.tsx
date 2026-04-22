import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      await addDoc(collection(db, "waitlist"), {
        email,
        joinedAt: serverTimestamp(),
      });

      await addDoc(collection(db, "mail"), {
        to: email,
        message: {
          subject: "You're on the waitlist! 🎉",
          html: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto">
            <h2>You're in! 🚀</h2>
            <p>Thanks for joining our waitlist. We'll email you the moment we launch.</p>
            <p style="color:#888;font-size:14px">- Team Tychee</p>
          </div>`,
        },
      });

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="scroll-mt-28 py-24 lg:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Primary glow orbs */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(242,87,43,0.12) 0%, rgba(242,87,43,0.04) 45%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[280px] h-[280px] rounded-full bg-primary/8 blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, -25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-texture" />

        {/* Top & bottom border scanning lines */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ width: "50%" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            style={{ width: "50%" }}
            animate={{ x: ["200%", "-100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-primary font-medium">Limited Early Access</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
          >
            <span className="text-foreground">Be the first to </span>
            <span className="text-gradient">experience it.</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto"
          >
            Join the waitlist and get early access to Stellar Soroban Studio before the public launch.
          </motion.p>

          {/* Form / Success state */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4 px-8 py-8 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <CheckCircle2 size={48} className="text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">You're on the list!</p>
                    <p className="text-sm text-muted-foreground mt-1">Check your inbox — a confirmation is on its way.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-3 items-center"
                >
                  {/* Input */}
                  <div className="relative flex-1 w-full">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    />
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-card/60 
                                 text-foreground placeholder:text-muted-foreground text-sm
                                 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all duration-200"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm
                               text-white overflow-hidden whitespace-nowrap
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-200 hover:shadow-[0_0_30px_hsl(14_89%_56%/0.4)]"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Joining…
                      </>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </>
                    )}
                    {/* Shine overlay */}
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                      }}
                    />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Error message */}
            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 mt-4 text-sm text-destructive"
                >
                  <AlertCircle size={14} />
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-5 mt-8 text-xs text-muted-foreground"
          >
            {["No spam, ever", "Unsubscribe anytime", "Early-bird perks"].map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                {i > 0 && <span className="w-px h-3 bg-border inline-block" />}
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
                  {item}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
