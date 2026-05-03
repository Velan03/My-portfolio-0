import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Code2, 
  Layout, 
  Bot, 
  ShoppingCart,
  Heart,
  Star,
  GitFork,
  Eye
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: "website" | "ai-ml" | "ecommerce" | "fullstack";
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  featured: boolean;
  stats?: {
    stars?: number;
    forks?: number;
    views?: number;
  };
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Human Resource Management System (HRMS)",
    description: "Enterprise HR platform with role-based dashboards for attendance, leave approval, and analytics.",
    longDescription: "A comprehensive HR management system serving 500+ concurrent users with Micro Frontend architecture. Features include real-time attendance tracking, automated payroll processing, employee self-service portals, and advanced analytics dashboards.",
    category: "fullstack",
    technologies: ["Angular", "NgRx", "PrimeNG", "Bootstrap 5", "TypeScript", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/velan03/hrms-system",
    liveUrl: "https://hrms-demo.vercel.app",
    image: "/projects/hrms.jpg",
    featured: true,
    stats: { stars: 45, forks: 12, views: 1200 }
  },
  {
    id: 2,
    title: "AI-Powered Chat Application",
    description: "ChatGPT-style conversational UI with real-time streaming and GenAI/LLM backend.",
    longDescription: "Built a sophisticated chat application integrating with OpenAI's GPT API featuring real-time message streaming, conversation history, code syntax highlighting, and markdown support. Containerized with Docker for scalable deployments.",
    category: "ai-ml",
    technologies: ["React.js", "TypeScript", "Node.js", "WebSockets", "Redux", "Docker", "OpenAI API"],
    githubUrl: "https://github.com/velan03/ai-chat-app",
    liveUrl: "https://ai-chat.vercel.app",
    image: "/projects/ai-chat.jpg",
    featured: true,
    stats: { stars: 128, forks: 34, views: 3500 }
  },
  {
    id: 3,
    title: "Healthcare Appointment Platform",
    description: "Appointment booking system with secure role-based access for patients and doctors.",
    longDescription: "A HIPAA-compliant healthcare platform enabling patients to book appointments, video consultations, prescription management, and medical records access. Features real-time availability tracking and automated reminders.",
    category: "fullstack",
    technologies: ["Angular", "PrimeNG", "Bootstrap 5", "NgRx", "TypeScript", "Spring Boot", "PostgreSQL"],
    githubUrl: "https://github.com/velan03/healthcare-platform",
    liveUrl: "https://healthcare-demo.vercel.app",
    image: "/projects/healthcare.jpg",
    featured: true,
    stats: { stars: 67, forks: 18, views: 2100 }
  },
  {
    id: 4,
    title: "E-Commerce Flower Shop",
    description: "Full-stack flower e-commerce platform with dynamic catalog and secure checkout.",
    longDescription: "A modern e-commerce platform featuring product catalog with filters, shopping cart, wishlist, user authentication, order tracking, and payment integration. Optimized UX reduced cart abandonment by 30%.",
    category: "ecommerce",
    technologies: ["React.js", "Tailwind CSS", "Bootstrap 5", "Material UI", "JavaScript", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/velan03/flower-shop",
    liveUrl: "https://flower-shop.vercel.app",
    image: "/projects/ecommerce.jpg",
    featured: true,
    stats: { stars: 89, forks: 23, views: 3100 }
  },
  {
    id: 5,
    title: "Portfolio Website 2025",
    description: "Modern portfolio with 3D animations and interactive UI components.",
    longDescription: "A cutting-edge portfolio website featuring 3D animations using Three.js, smooth scroll animations, dark/light mode, and an AI-powered chatbot assistant. Built with performance and accessibility in mind.",
    category: "website",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    githubUrl: "https://github.com/velan03/portfolio-2025",
    liveUrl: "https://velan-s.netlify.app",
    image: "/projects/portfolio.jpg",
    featured: true,
    stats: { stars: 156, forks: 42, views: 5000 }
  },
  {
    id: 6,
    title: "Computer Vision Object Detection",
    description: "Real-time object detection using YOLO and OpenCV with webcam integration.",
    longDescription: "Built a real-time object detection system using YOLOv8 and OpenCV. Features include live webcam detection, image upload processing, and custom model training capabilities. Achieved 92% accuracy on COCO dataset.",
    category: "ai-ml",
    technologies: ["Python", "OpenCV", "TensorFlow", "YOLO", "Flask", "React"],
    githubUrl: "https://github.com/velan03/object-detection",
    image: "/projects/object-detection.jpg",
    featured: false,
    stats: { stars: 234, forks: 56, views: 8900 }
  },
  {
    id: 7,
    title: "Task Management Dashboard",
    description: "Kanban-style task manager with drag-drop and team collaboration features.",
    longDescription: "A Trello-like task management system with drag-and-drop functionality, team workspaces, real-time updates, file attachments, and activity logging. Built for small to medium teams.",
    category: "website",
    technologies: ["React", "Redux", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/velan03/task-dashboard",
    liveUrl: "https://task-dashboard.vercel.app",
    image: "/projects/task-dashboard.jpg",
    featured: false,
    stats: { stars: 67, forks: 15, views: 1800 }
  },
  {
    id: 8,
    title: "Fashion E-Commerce Store",
    description: "Modern fashion store with AI-powered size recommendations.",
    longDescription: "An innovative fashion e-commerce platform featuring AI-powered size recommendations, virtual try-on, personalized product suggestions, and seamless checkout experience.",
    category: "ecommerce",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/velan03/fashion-store",
    liveUrl: "https://fashion-store.vercel.app",
    image: "/projects/fashion-store.jpg",
    featured: false,
    stats: { stars: 45, forks: 11, views: 1500 }
  }
];

const categories = [
  { id: "all", label: "All Projects", icon: Code2 },
  { id: "website", label: "Websites", icon: Layout },
  { id: "ai-ml", label: "AI/ML", icon: Bot },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingCart },
  { id: "fullstack", label: "Full Stack", icon: Heart }
];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = selectedCategory === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedCategory);

  const visibleProjects = filteredProjects.slice(currentIndex, currentIndex + 3);

  useEffect(() => {
    if (isAutoPlaying && filteredProjects.length > 3) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => 
          prev + 3 >= filteredProjects.length ? 0 : prev + 3
        );
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, filteredProjects.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev - 3 < 0 ? Math.max(0, filteredProjects.length - 3) : prev - 3
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev + 3 >= filteredProjects.length ? 0 : prev + 3
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "website": return Layout;
      case "ai-ml": return Bot;
      case "ecommerce": return ShoppingCart;
      default: return Heart;
    }
  };

  return (
    <section id="projects" className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="mb-4 px-4 py-2 text-sm bg-gradient-to-r from-primary/20 to-accent/20 border-none">
            <Code2 className="w-4 h-4 mr-2" />
            My Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my collection of web applications, AI/ML projects, and full-stack solutions
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentIndex(0);
                  setIsAutoPlaying(true);
                }}
                className={`group relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative px-4 sm:px-0">
          {filteredProjects.length > 3 && (
            <>
              <button title="btn"
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button title="btn"
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <motion.div
              ref={containerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {visibleProjects.map((project, idx) => {
                  const CategoryIcon = getCategoryIcon(project.category);
                  return (
                    <motion.div
                      key={`${selectedCategory}-${project.id}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      whileHover={{ y: -8 }}
                      onHoverStart={() => setHoveredProject(project.id)}
                      onHoverEnd={() => setHoveredProject(null)}
                    >
                      <Card className="group h-full overflow-hidden bg-gradient-to-br from-card to-secondary/30 border-border/50 hover:border-primary/30 transition-all duration-300">
                        {/* Project Image Placeholder */}
                        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CategoryIcon className="w-16 h-16 text-primary/30" />
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 0.6 }}
                          />
                          {project.featured && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Featured
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <CategoryIcon className="w-4 h-4 text-primary" />
                                <span className="text-xs text-muted-foreground capitalize">
                                  {project.category}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                            </div>
                          </div>

                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2 py-1 bg-secondary rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Project Stats */}
                          {project.stats && (
                            <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                              {project.stats.stars && (
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3" /> {project.stats.stars}
                                </span>
                              )}
                              {project.stats.forks && (
                                <span className="flex items-center gap-1">
                                  <GitFork className="w-3 h-3" /> {project.stats.forks}
                                </span>
                              )}
                              {project.stats.views && (
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" /> {project.stats.views}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 group/btn"
                              onClick={() => window.open(project.githubUrl, "_blank")}
                            >
                              <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                              GitHub
                            </Button>
                            {project.liveUrl && (
                              <Button
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                                onClick={() => window.open(project.liveUrl, "_blank")}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Hover Details */}
                        <AnimatePresence>
                          {hoveredProject === project.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              className="absolute inset-0 bg-gradient-to-br from-primary/95 to-accent/95 backdrop-blur-sm p-6 flex flex-col justify-between"
                            >
                              <div>
                                <h4 className="text-white font-bold mb-2">Details</h4>
                                <p className="text-white/80 text-sm mb-4 line-clamp-4">
                                  {project.longDescription}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="flex-1"
                                  onClick={() => window.open(project.githubUrl, "_blank")}
                                >
                                  <Github className="w-4 h-4 mr-2" />
                                  View Code
                                </Button>
                                {project.liveUrl && (
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-white text-primary hover:bg-white/90"
                                    onClick={() => window.open(project.liveUrl, "_blank")}
                                  >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                  </Button>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Carousel Indicators */}
        {filteredProjects.length > 3 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(filteredProjects.length / 3) }).map((_, idx) => (
              <button title="btn"
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx * 3);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 3) === idx
                    ? "w-8 bg-gradient-to-r from-primary to-accent"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="group"
            onClick={() => window.open("https://github.com/velan03", "_blank")}
          >
            <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            View All Projects on GitHub
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;