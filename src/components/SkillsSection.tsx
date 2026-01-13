import { Code2, Database, Layout, Server, Terminal, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    category: "Frontend",
    icon: Layout,
    technologies: ["React.js", "Angular 19", "TypeScript", "HTML5", "CSS3", "JavaScript"],
    color: "from-cyan-500 to-blue-500",
    shape: "rounded-[2rem] rounded-tr-none",
  },
  {
    category: "Backend",
    icon: Server,
    technologies: ["Core Java", "Advanced Java", "JSP", "JDBC", "C#", ".NET"],
    color: "from-violet-500 to-purple-500",
    shape: "rounded-[2rem] rounded-bl-none",
  },
  {
    category: "Database",
    icon: Database,
    technologies: ["Oracle SQL", "MySQL", "Data Modeling"],
    color: "from-emerald-500 to-green-500",
    shape: "rounded-[2rem] rounded-tl-none",
  },
  {
    category: "Data Science",
    icon: Terminal,
    technologies: ["Python", "Jupyter Notebook", "Data Analysis"],
    color: "from-orange-500 to-amber-500",
    shape: "rounded-[2rem] rounded-br-none",
  },
  {
    category: "Testing",
    icon: Wrench,
    technologies: ["Manual Testing", "QA Processes"],
    color: "from-pink-500 to-rose-500",
    shape: "rounded-[2rem] rounded-tr-none rounded-bl-none",
  },
  {
    category: "Tools",
    icon: Code2,
    technologies: ["Git", "VS Code", "Automation"],
    color: "from-blue-500 to-indigo-500",
    shape: "rounded-[2rem] rounded-tl-none rounded-br-none",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden px-4 sm:px-6">
      {/* Background decorations */}
      <motion.div
        className="absolute top-20 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-[80px] sm:blur-[100px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-accent/5 rounded-full blur-[80px] sm:blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-primary font-mono text-xs sm:text-sm mb-3 sm:mb-4 tracking-widest"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 1 }}
          >
            EXPERTISE
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Full stack development expertise gained through intensive training and real-world project experience
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`group relative p-5 sm:p-6 lg:p-8 border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 ${skill.shape}`}
              style={{
                perspective: "1000px",
              }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${skill.shape} blur-xl -z-10`}
                style={{
                  background: `linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.1) 100%)`,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Icon with animated gradient background */}
              <motion.div
                className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${skill.color} mb-4 sm:mb-6 relative overflow-hidden`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              {/* Category */}
              <motion.h3
                className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300"
              >
                {skill.category}
              </motion.h3>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skill.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-secondary/80 rounded-full text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-primary transition-all cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 + techIndex * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br ${skill.color} opacity-10 ${skill.shape}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
