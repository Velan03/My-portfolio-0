import { Award, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const education = [
  {
    degree: "Bachelor of Engineering",
    field: "Computer Science and Engineering",
    institution: "Sri Muthukumaran Institute Of Technology",
    period: "August 2019 - June 2023",
    icon: GraduationCap,
  },
];

const certifications = [
  {
    title: "Java Full Stack Development",
    institution: "QSpiders/JSpiders",
    duration: "9 months",
    period: "September 2023 - May 2024",
    topics: ["React.js", "Core Java", "Advanced Java", "Oracle SQL", "MySQL", "Manual Testing"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Java Full Stack Development",
    institution: "TNS Foundation (C2C)",
    duration: "6 months",
    topics: ["Full Stack Development", "Web Technologies"],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Python & Data Science",
    institution: "Besant Technologies",
    duration: "1 month each",
    topics: ["Python Programming", "Data Science", "Analytics"],
    gradient: "from-orange-500 to-amber-500",
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="education" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden px-4 sm:px-6">
      {/* Background decorations */}
      <motion.div
        className="absolute -top-20 -right-20 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-48 sm:w-72 h-48 sm:h-72 bg-accent/5 rounded-full blur-[100px]"
        animate={{ scale: [1.3, 1, 1.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent font-mono text-xs sm:text-sm tracking-wider">QUALIFICATIONS</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Education & <span className="text-gradient">Training</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Continuous learning journey combining formal education with intensive technical training
          </p>
        </motion.div>

        {/* Education Card */}
        <motion.div
          className="mb-10 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="relative group"
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-[3rem]" />
                
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start lg:items-center relative z-10">
                  <motion.div
                    className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-primary relative overflow-hidden"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <edu.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{edu.degree}</h3>
                    <p className="text-primary text-base sm:text-lg lg:text-xl mb-1">{edu.field}</p>
                    <p className="text-muted-foreground text-sm sm:text-base">{edu.institution}</p>
                  </div>
                  <div className="lg:text-right">
                    <span className="inline-flex px-4 py-2 rounded-full bg-secondary border border-border text-muted-foreground font-mono text-xs sm:text-sm">
                      {edu.period}
                    </span>
                  </div>
                </div>

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-[2.5rem]"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05) 0%, transparent 70%)",
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="flex items-center gap-3 mb-6 sm:mb-8"
            variants={itemVariants}
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-accent/10 border border-accent/20">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Professional Training</h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div
                  className={`h-full relative overflow-hidden p-5 sm:p-6 lg:p-8 border border-border/50 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl transition-all duration-500 group-hover:border-primary/30 ${
                    index === 0
                      ? "rounded-[2rem] rounded-tr-none"
                      : index === 1
                      ? "rounded-[2rem] rounded-bl-none"
                      : "rounded-[2rem] rounded-tl-none rounded-br-none"
                  }`}
                >
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.gradient}`} />

                  {/* Duration badge */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <motion.div
                      className={`p-2 rounded-lg bg-gradient-to-r ${cert.gradient}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <BookOpen className="w-4 h-4 text-white" />
                    </motion.div>
                    <span className="text-xs sm:text-sm text-muted-foreground font-mono bg-secondary/50 px-2 py-1 rounded-md">
                      {cert.duration}
                    </span>
                  </div>

                  <h4 className={`text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r ${cert.gradient} bg-clip-text text-transparent`}>
                    {cert.title}
                  </h4>
                  <p className="text-primary text-xs sm:text-sm mb-2">{cert.institution}</p>
                  {cert.period && (
                    <p className="text-xs text-muted-foreground mb-4">{cert.period}</p>
                  )}

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                    {cert.topics.map((topic, topicIndex) => (
                      <motion.span
                        key={topic}
                        className="px-2 py-1 text-xs bg-secondary/80 rounded-lg text-muted-foreground border border-border/50 hover:border-primary/30 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 + index * 0.1 + topicIndex * 0.05 }}
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>

                  {/* Corner decoration */}
                  <div className={`absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-tl ${cert.gradient} opacity-5 rounded-tl-[2rem]`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
