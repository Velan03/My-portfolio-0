import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Tarkiz Infotech",
    location: "Chennai, Tamil Nadu, India",
    period: "July 2024 - Present",
    duration: "1 year 7 months",
    description: [
      "Building intuitive and engaging user interfaces using Angular 19 and TypeScript",
      "Collaborating with cross-functional teams to develop responsive web applications",
      "Implementing innovative solutions aligned with client requirements",
      "Delivering high-quality applications that drive user engagement",
    ],
    technologies: ["Angular 19", "TypeScript", "HTML", "CSS"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    title: "Internship Trainee",
    company: "Intrainz",
    location: "Chennai, Tamil Nadu, India",
    period: "May 2023 - July 2023",
    duration: "3 months",
    description: [
      "Developed System Prices Checker tool for price analysis and comparison",
      "Utilized Jupyter Notebook for data handling, visualization, and automation",
      "Designed user-friendly interfaces using HTML and CSS",
      "Integrated scripts for automated price tracking and comparisons",
    ],
    technologies: ["Python", "Jupyter Notebook", "HTML", "CSS", "Data Analysis"],
    gradient: "from-violet-500 via-purple-500 to-pink-500",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-16 sm:py-24 lg:py-32 relative bg-secondary/20 overflow-hidden px-4 sm:px-6">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:80px_80px] opacity-5" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-40 right-10 w-24 sm:w-32 h-24 sm:h-32 border border-primary/20 rounded-full hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-16 sm:w-20 h-16 sm:h-20 bg-accent/10 rounded-2xl hidden lg:block"
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-primary font-mono text-xs sm:text-sm tracking-wider">CAREER PATH</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Building impactful solutions and growing as a developer in the tech industry
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central timeline line */}
          <motion.div
            className="absolute left-4 sm:left-8 lg:left-1/2 top-0 bottom-0 w-0.5 lg:-translate-x-0.5"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)), transparent)",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative mb-8 sm:mb-12 lg:mb-16 pl-12 sm:pl-20 lg:pl-0 ${
                index % 2 === 0 ? "lg:pr-[52%]" : "lg:pl-[52%]"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              {/* Timeline dot */}
              <motion.div
                className={`absolute left-2 sm:left-6 lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r ${exp.gradient}`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.3, type: "spring" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${exp.gradient.split(" ")[0]} 0%, ${exp.gradient.split(" ")[2]} 100%)` }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 hsl(var(--primary) / 0.4)",
                      "0 0 0 15px hsl(var(--primary) / 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Card */}
              <motion.div
                className={`relative group ${index % 2 === 0 ? "" : ""}`}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`relative overflow-hidden p-5 sm:p-6 lg:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-border/50 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl transition-all duration-500 group-hover:border-primary/30 ${
                    index % 2 === 0
                      ? "rounded-tl-none sm:rounded-tl-none lg:rounded-tl-[2rem] lg:rounded-tr-none"
                      : "rounded-tr-none sm:rounded-tr-none lg:rounded-tr-[2rem] lg:rounded-tl-none"
                  }`}
                >
                  {/* Gradient accent line */}
                  <div
                    className={`absolute top-0 ${index % 2 === 0 ? "right-0 lg:left-0" : "right-0"} h-1 w-1/3 bg-gradient-to-r ${exp.gradient}`}
                  />

                  {/* Header */}
                  <div className="mb-4 sm:mb-6">
                    <motion.h3
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2"
                      whileHover={{ color: "hsl(var(--primary))" }}
                    >
                      {exp.title}
                    </motion.h3>
                    <p className={`text-base sm:text-lg font-semibold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>
                      {exp.company}
                    </p>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 text-muted-foreground text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 sm:gap-3 text-muted-foreground text-xs sm:text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.8 + index * 0.3 + i * 0.1 }}
                      >
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className={`px-2.5 sm:px-3 py-1 text-xs font-medium rounded-full border bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent border-primary/20`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1 + index * 0.3 + techIndex * 0.05 }}
                        whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05) 0%, transparent 70%)`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
