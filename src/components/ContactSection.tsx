import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Zap,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden px-4 sm:px-6"
    >
      {/* Background effects */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full blur-[100px] sm:blur-[150px]"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-10 w-16 sm:w-24 h-16 sm:h-24 border border-primary/20 rounded-3xl hidden lg:block"
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-12 sm:w-16 h-12 sm:h-16 bg-accent/10 rounded-full hidden lg:block"
        animate={{ scale: [1, 1.2, 1], rotate: [-45, 45, -45] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="section-container relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary font-mono text-xs sm:text-sm tracking-wider">
              GET IN TOUCH
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            I'm currently looking for new opportunities at top IT companies.
            Let's discuss how I can contribute to your team.
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-border/50 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl p-6 sm:p-8 lg:p-12"
            variants={itemVariants}
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-br-[3rem]" />
            <div className="absolute bottom-0 right-0 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-[3rem]" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Info */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                  Contact Info
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <motion.a
                    href="mailto:velansivasankaran15@gmail.com"
                    className="flex items-center gap-4 sm:gap-5 text-muted-foreground hover:text-primary transition-colors group"
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 border border-border group-hover:border-primary transition-colors"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                        Email
                      </p>
                      <p className="text-foreground text-sm sm:text-base font-medium break-all">
                        velansivasankaran15@gmail.com
                      </p>
                    </div>
                  </motion.a>

                  <motion.div
                    className="flex items-center gap-4 sm:gap-5 text-muted-foreground"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 border border-border">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                        Location
                      </p>
                      <p className="text-foreground text-sm sm:text-base font-medium">
                        Chennai, Tamil Nadu, India
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Social links */}
                <div className="mt-8 sm:mt-10">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                    Find me on
                  </p>
                  <div className="flex gap-3 sm:gap-4">
                    {[
                      {
                        href: "https://www.linkedin.com/in/velan-s-845791250",
                        icon: Linkedin,
                        gradient: "from-blue-500 to-blue-600",
                      },
                      {
                        href: "https://github.com",
                        icon: Github,
                        gradient: "from-gray-600 to-gray-700",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative p-3 sm:p-4 rounded-2xl bg-secondary border border-border hover:border-primary transition-all group overflow-hidden"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-20`}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-center"
              >
                <motion.div
                  className="relative p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.1) 100%)",
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-[2rem] border border-primary/20" />

                  <motion.div
                    className="absolute -top-20 -right-20 w-32 sm:w-40 h-32 sm:h-40 bg-primary/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 relative z-10">
                    Ready to collaborate?
                  </h4>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base relative z-10">
                    Send me an email and let's discuss how I can help build your
                    next big project.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all group relative overflow-hidden"
                      asChild
                    >
                      <a
                        href="mailto:velansivasankaran15@gmail.com?subject=Portfolio Contact&body=Hi Velan,"
                        className="relative inline-flex items-center justify-center gap-2 overflow-hidden"
                      >
                        <motion.span
                          className="absolute inset-0 bg-white/20 pointer-events-none"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />

                        <Send className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Send Email</span>
                        <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground text-xs sm:text-sm">
            © {new Date().getFullYear()} Velan S. Built with{" "}
            <motion.span
              className="text-primary inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ♥
            </motion.span>{" "}
            and code.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
