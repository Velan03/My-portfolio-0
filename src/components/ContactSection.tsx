import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Zap,
  X,
  Loader2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Check screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Web3Forms configuration
  const WEB3FORMS_ACCESS_KEY = "eab8d2ee-2fd8-4797-8aa9-558890b6cc9a";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setIsDialogOpen(false);
          setSubmitStatus({ type: null, message: "" });
        }, 2000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <>
      <section
        id="contact"
        className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden px-4 sm:px-6"
      >
        {/* Background effects - optimized */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[600px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full blur-[80px] sm:blur-[100px] lg:blur-[150px]"
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
          {/* Section header */}
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-primary font-mono text-[10px] sm:text-xs tracking-wider">
                GET IN TOUCH
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
              Let's Work{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              I'm currently looking for new opportunities. Let's discuss how I can contribute to your team.
            </p>
          </motion.div>

          {/* Contact card */}
          <motion.div
            className="max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-sm p-5 sm:p-6 md:p-8 lg:p-10"
              variants={itemVariants}
            >
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-br-2xl sm:rounded-br-3xl" />
              <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-tl from-accent/5 to-transparent rounded-tl-2xl sm:rounded-tl-3xl" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-stretch gap-6 md:gap-8 lg:gap-12">
                {/* Left Column - Contact Info */}
                <motion.div variants={itemVariants} className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                    Contact Info
                  </h3>
                  <div className="space-y-4 sm:space-y-5">
                    <motion.a
                      href="mailto:velansivasankaran15@gmail.com"
                      className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-primary transition-all group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 border border-border group-hover:border-primary transition-colors">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                          Email
                        </p>
                        <p className="text-foreground text-sm sm:text-base font-medium break-all">
                          velansivasankaran15@gmail.com
                        </p>
                      </div>
                    </motion.a>

                    <motion.div
                      className="flex items-center gap-3 sm:gap-4 text-muted-foreground"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 border border-border">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                          Location
                        </p>
                        <p className="text-foreground text-sm sm:text-base font-medium">
                          Chennai, Tamil Nadu, India
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Social links */}
                  <div className="mt-6 sm:mt-8">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      Connect with me
                    </p>
                    <div className="flex gap-3 sm:gap-4">
                      {[
                        {
                          href: "https://www.linkedin.com/in/velan-s-845791250",
                          icon: Linkedin,
                          label: "LinkedIn",
                          gradient: "from-blue-500 to-blue-600",
                        },
                        {
                          href: "https://github.com/velan03",
                          icon: Github,
                          label: "GitHub",
                          gradient: "from-gray-600 to-gray-700",
                        },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-secondary border border-border hover:border-primary transition-all group overflow-hidden"
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.label}
                        >
                          <social.icon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
                          />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Divider - Desktop only */}
                <div className="hidden lg:block w-px bg-border/50" />

                {/* Right Column - CTA */}
                <motion.div
                  variants={itemVariants}
                  className="flex-1 flex flex-col"
                >
                  <div className="relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 overflow-hidden h-full flex flex-col">
                    {/* Animated background */}
                    <motion.div
                      className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary/5 blur-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    />

                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 relative">
                      Ready to collaborate?
                    </h4>
                    <p className="text-muted-foreground text-sm mb-5 sm:mb-6 relative">
                      Send me a message and let's discuss your next big project.
                    </p>

                    <motion.button
                      onClick={() => setIsDialogOpen(true)}
                      className="relative mt-auto w-full group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl py-3 sm:py-3.5 px-4 sm:px-6 font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl">
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Send Message</span>
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="text-center mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
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
              using React & Tailwind CSS
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dialog/Modal - Optimized for all screens */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsDialogOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md sm:max-w-lg bg-card rounded-xl sm:rounded-2xl shadow-2xl border border-border overflow-hidden mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                  I'll get back to you as soon as possible
                </p>
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Job Opportunity / Collaboration"
                  className="w-full"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={isMobile ? 3 : 4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full resize-none"
                />
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus.type === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-2.5 sm:p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs sm:text-sm"
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                {submitStatus.type === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-2.5 sm:p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm"
                  >
                    {submitStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group"
                size={isMobile ? "default" : "lg"}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:translate-x-0.5 transition-transform" />
                    Send Message
                  </>
                )}
              </Button>

              {/* Footer Note */}
              <p className="text-[10px] sm:text-xs text-center text-muted-foreground pt-2">
                Your message will be sent directly to my email
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ContactSection;