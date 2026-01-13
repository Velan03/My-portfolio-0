import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

const HeroSection = () => {
  const { text } = useTypewriter({
    words: ["Full Stack Developer", "Angular Expert", "React Enthusiast", "Java Developer", "Problem Solver"],
    typeSpeed: 80,
    deleteSpeed: 40,
    delayBetweenWords: 2500,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-full blur-[100px] lg:blur-[120px]"
          style={{ background: "radial-gradient(circle, hsl(190 100% 50% / 0.15) 0%, transparent 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full blur-[80px] lg:blur-[100px]"
          style={{ background: "radial-gradient(circle, hsl(280 100% 65% / 0.12) 0%, transparent 70%)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {/* Third orb for depth */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-[150px] sm:w-[200px] lg:w-[300px] h-[150px] sm:h-[200px] lg:h-[300px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, hsl(220 100% 60% / 0.1) 0%, transparent 70%)" }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] opacity-10" />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 sm:left-20 w-8 h-8 sm:w-12 sm:h-12 border-2 border-primary/30 rounded-lg hidden sm:block"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-10 sm:right-32 w-6 h-6 sm:w-8 sm:h-8 bg-accent/20 rounded-full hidden sm:block"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-10 sm:left-32 w-10 h-10 sm:w-16 sm:h-16 border border-accent/20 rotate-45 hidden sm:block"
        animate={{
          rotate: [45, 90, 45],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="section-container relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-secondary to-secondary/50 border border-border/50 backdrop-blur-xl mb-6 sm:mb-8"
          whileHover={{ scale: 1.05, borderColor: "hsl(190 100% 50% / 0.5)" }}
        >
          <motion.span
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400"
            animate={{
              boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.4)", "0 0 0 10px rgba(74, 222, 128, 0)", "0 0 0 0 rgba(74, 222, 128, 0)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs sm:text-sm text-muted-foreground font-medium">Available for opportunities</span>
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
        </motion.div>

        {/* Main heading */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6">
            <motion.span
              className="block text-foreground mb-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Hi, I'm
            </motion.span>
            <motion.span
              className="text-gradient relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
            >
              Velan S
              <motion.div
                className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-2xl -z-10 blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.span>
          </h1>
        </motion.div>

        {/* Typewriter Role */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8"
        >
          <motion.div
            className="h-px w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-transparent to-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <div className="relative">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-medium h-8 sm:h-10 lg:h-12 flex items-center">
              {text}
              <motion.span
                className="inline-block w-0.5 sm:w-1 h-6 sm:h-8 bg-primary ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </p>
          </div>
          <motion.div
            className="h-px w-8 sm:w-12 lg:w-16 bg-gradient-to-l from-transparent to-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl lg:max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 sm:mb-12 leading-relaxed px-2"
        >
          Software Engineer crafting elegant web solutions with{" "}
          <motion.span
            className="text-primary font-semibold"
            whileHover={{ scale: 1.1 }}
            style={{ display: "inline-block" }}
          >
            Java
          </motion.span>
          ,{" "}
          <motion.span
            className="text-primary font-semibold"
            whileHover={{ scale: 1.1 }}
            style={{ display: "inline-block" }}
          >
            Angular
          </motion.span>
          , and{" "}
          <motion.span
            className="text-primary font-semibold"
            whileHover={{ scale: 1.1 }}
            style={{ display: "inline-block" }}
          >
            React
          </motion.span>
          . Passionate about building scalable applications that make an impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold glow group relative overflow-hidden"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Get In Touch</span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-border hover:border-primary hover:bg-primary/5 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transition-all group"
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span>View My Work</span>
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 sm:gap-6"
        >
          {[
            { href: "https://www.linkedin.com/in/velan-s-845791250", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:velansivasankaran15@gmail.com", icon: Mail, label: "Email" },
            { href: "https://github.com", icon: Github, label: "GitHub" },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="relative p-3 sm:p-4 rounded-2xl bg-secondary/80 border border-border hover:border-primary hover:text-primary transition-all group"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              <motion.div
                className="absolute -inset-1 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 -z-10"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-muted-foreground"
            whileHover={{ color: "hsl(190 100% 50%)" }}
          >
            {/* <span className="text-xs font-medium tracking-wider hidden sm:block">SCROLL</span>
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" /> */}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
