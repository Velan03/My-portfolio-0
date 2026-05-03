import { ArrowDown, Github, Linkedin, Mail, Sparkles, Download, Cloud, Brain, Cpu } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const { text } = useTypewriter({
    words: ["Full Stack Developer", "Angular Expert", "React Enthusiast", "Java Developer", "AWS Cloud", "AI/ML Enthusiast"],
    typeSpeed: 80,
    deleteSpeed: 40,
    delayBetweenWords: 2500,
  });
  
  const { toast } = useToast();

  const handleDownloadResume = async () => {
    try {
      // First try to download from public folder
      const response = await fetch('/resume/Velan_Resume.pdf');
      
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'Velan_S_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        
        toast({
          title: "Download Started",
          description: "Your resume is being downloaded.",
        });
      } else {
        // If PDF not found, generate resume on the fly
        generateResumeOnTheFly();
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      generateResumeOnTheFly();
    }
  };

  const generateResumeOnTheFly = () => {
    // Create HTML content for resume
    const resumeHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Velan S - Resume</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 { color: #2563eb; margin-bottom: 5px; }
          h2 { color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-top: 20px; }
          .contact { display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0; }
          .skill-tag { display: inline-block; background: #e5e7eb; padding: 5px 10px; border-radius: 5px; margin: 3px; font-size: 14px; }
          .job { margin-bottom: 20px; }
          .job-title { font-weight: bold; font-size: 18px; }
          .company { color: #4b5563; }
          .date { color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Velan S</h1>
          <p><strong>Frontend & Full Stack Engineer | AWS Cloud | AI/ML Enthusiast</strong></p>
          
          <div class="contact">
            <div>📧 velansivasanakaran15@gmail.com</div>
            <div>🔗 linkedin.com/in/velan-s-845791250</div>
            <div>💻 github.com/velan03</div>
            <div>🌐 https://velan-s.vercel.app</div>
          </div>
          
          <h2>Professional Summary</h2>
          <p>Software Engineer based in Chennai with 4+ years of experience building web applications used by 500+ users daily. Passionate about AWS Cloud services and AI/ML integration to create intelligent, scalable solutions. Strong expertise in Angular, React, TypeScript, and modern web technologies.</p>
          
          <h2>Skills</h2>
          <p><strong>Frontend:</strong> Angular (17+), React.js, Next.js, TypeScript, JavaScript, PrimeNG, Tailwind CSS, Bootstrap 5, NgRx, Redux, RxJS</p>
          <p><strong>Backend:</strong> Node.js, Spring Boot, Java, Python, RESTful APIs, WebSockets</p>
          <p><strong>AWS Cloud:</strong> EC2, S3, Lambda, API Gateway, CloudFront, RDS, DynamoDB</p>
          <p><strong>AI/ML:</strong> TensorFlow, PyTorch, Scikit-learn, OpenCV, Natural Language Processing, Computer Vision</p>
          <p><strong>Tools:</strong> Git, Docker, Azure DevOps, MongoDB, MySQL, JWT, OAuth, CI/CD, GitHub Copilot, Cursor AI</p>
          
          <h2>Work Experience</h2>
          <div class="job">
            <div class="job-title">Software Engineer</div>
            <div class="company">Tarkiz Infotech Pvt Ltd | Chennai, Tamil Nadu</div>
            <div class="date">Jul 2024 - Present</div>
            <ul>
              <li>Architected enterprise web apps with Angular (20+) and TypeScript, serving 500+ concurrent users</li>
              <li>Integrated RESTful APIs & WebSockets, boosting performance by 40%</li>
              <li>Implemented NgRx & Redux state management, reducing bugs by 30%</li>
              <li>Built reusable UI library, reducing development time by 25%</li>
              <li>Exploring AWS services for cloud deployment and AI integration for intelligent features</li>
            </ul>
          </div>
          
          <div class="job">
            <div class="job-title">Frontend & Data Analysis Intern</div>
            <div class="company">Intrainz | Chennai, Tamil Nadu</div>
            <div class="date">May 2023 - Jul 2023</div>
            <ul>
              <li>Built System Prices Checker with real-time API calls, cutting manual effort by 50%</li>
              <li>Engineered data visualization dashboards, improving data interpretation by 30%</li>
            </ul>
          </div>
          
          <h2>Education</h2>
          <p><strong>BE Computer Science Engineering</strong><br>
          Sri Muthukumaran Institute of Technology<br>
          CGPA: 8.39 | Graduated: June 2023</p>
          
          <h2>Certifications</h2>
          <ul>
            <li>AWS Certified Cloud Practitioner (In Progress)</li>
            <li>Java Full Stack - QSpiders (Sep 2023 - May 2024)</li>
            <li>Python & Data Science - Besant Technologies (2023)</li>
          </ul>
          
          <h2>Key Achievements</h2>
          <ul>
            <li>Top performer in CSE department with CGPA 8.39</li>
            <li>Built 4+ production-grade enterprise applications</li>
            <li>35% productivity gain using AI tools (GitHub Copilot & Cursor AI)</li>
            <li>Zero critical security incidents in production</li>
          </ul>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'Velan_S_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    
    toast({
      title: "Resume Generated",
      description: "HTML resume downloaded. For PDF, please check the file in public/resume folder.",
    });
  };

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
        className="section-container relative z-10 text-center mt-8 py-6"
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
          <h1 className="flex gap-2 justify-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6 flex-wrap">
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

        {/* Description with AWS and AI/ML highlights */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl lg:max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 sm:mb-12 leading-relaxed px-2"
        >
          Software Engineer crafting elegant web solutions with{" "}
          <motion.span
            className="text-primary font-semibold inline-block"
            whileHover={{ scale: 1.1 }}
          >
            Java
          </motion.span>
          ,{" "}
          <motion.span
            className="text-primary font-semibold inline-block"
            whileHover={{ scale: 1.1 }}
          >
            Angular
          </motion.span>
          ,{" "}
          <motion.span
            className="text-primary font-semibold inline-block"
            whileHover={{ scale: 1.1 }}
          >
            React
          </motion.span>
          , and exploring{" "}
          <motion.span
            className="text-accent font-semibold inline-block"
            whileHover={{ scale: 1.1 }}
          >
            <Cloud className="inline w-4 h-4 mx-0.5" /> AWS Cloud
          </motion.span>
          {" "}with{" "}
          <motion.span
            className="text-accent font-semibold inline-block"
            whileHover={{ scale: 1.1 }}
          >
            <Brain className="inline w-4 h-4 mx-0.5" /> AI/ML
          </motion.span>
          . Passionate about building intelligent, scalable applications.
        </motion.p>

        {/* Tech stack badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
            <Cloud className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm">AWS</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
            <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
            <span className="text-xs sm:text-sm">AI/ML</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
            <Cpu className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">TensorFlow</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
            <span className="text-xs sm:text-sm">OpenCV</span>
          </div>
        </motion.div>

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
              onClick={handleDownloadResume}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-border hover:border-primary hover:bg-primary/5 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transition-all"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
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
            { href: "mailto:velansivasanakaran15@gmail.com", icon: Mail, label: "Email" },
            { href: "https://github.com/velan03", icon: Github, label: "GitHub" },
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
      </motion.div>
    </section>
  );
};

export default HeroSection;