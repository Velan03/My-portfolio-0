import React, { useState, useRef, useEffect, useCallback } from "react";
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
  Eye,
  Sparkles
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
  imageUrl?: string;
  bgGradient?: string;
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
    technologies: ["Angular", "NgRx", "PrimeNG", "TypeScript", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/velan03/hrms-system",
    liveUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop",
    bgGradient: "from-indigo-600 to-blue-600",
    featured: true,
    stats: { stars: 45, forks: 12, views: 1200 }
  },
  {
    id: 2,
    title: "AI-Powered Chat Application",
    description: "ChatGPT-style conversational UI with real-time streaming and GenAI/LLM backend.",
    longDescription: "A sophisticated chat application integrating with OpenAI's GPT API featuring real-time message streaming, conversation history, code syntax highlighting, and markdown support.",
    category: "ai-ml",
    technologies: ["React.js", "TypeScript", "Node.js", "WebSockets", "Redux", "Docker"],
    githubUrl: "https://github.com/velan03/ai-chat-app",
    liveUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    bgGradient: "from-green-600 to-emerald-600",
    featured: true,
    stats: { stars: 128, forks: 34, views: 3500 }
  },
  {
    id: 3,
    title: "AI-FACE-MASK DETECTION",
    description: "Real-time face mask detection using AI and computer vision for safety compliance.",
    longDescription: "A real-time face mask detection system using deep learning and computer vision. Features include live webcam detection, image upload processing, and high accuracy.",
    category: "ai-ml",
    technologies: ["Python", "OpenCV", "TensorFlow", "Keras", "Flask"],
    githubUrl: "https://github.com/velan03/AI-FACE-MASK-DETECTION",
    imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=400&fit=crop",
    bgGradient: "from-teal-600 to-cyan-600",
    featured: true,
    stats: { stars: 67, forks: 18, views: 2100 }
  },
  {
    id: 4,
    title: "Ayurvedic Wellness Site",
    description: "Digital platform for Ayurvedic consultations, product catalog, and wellness guidance.",
    longDescription: "A comprehensive Ayurvedic wellness platform featuring online consultations with certified practitioners, authentic Ayurvedic product catalog, personalized wellness recommendations, and educational blog content.",
    category: "website",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Razorpay"],
    githubUrl: "https://github.com/Velan03/AYURVEDIC",
    liveUrl: "https://ayurvedic-eight.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c6d08dc8?w=800&h=400&fit=crop",
    bgGradient: "from-emerald-600 to-green-600",
    featured: true,
    stats: { stars: 34, forks: 9, views: 980 }
  },
  {
    id: 5,
    title: "Portfolio Website 2025",
    description: "Modern portfolio with 3D animations and interactive UI components.",
    longDescription: "A cutting-edge portfolio website featuring smooth scroll animations, dark/light mode, and an AI-powered chatbot assistant. Built with performance and accessibility in mind.",
    category: "website",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/velan03/My-portfolio-0",
    liveUrl: "https://velan-s.netlify.app",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    bgGradient: "from-purple-600 to-pink-600",
    featured: true,
    stats: { stars: 156, forks: 42, views: 5000 }
  },
  {
    id: 6,
    title: "Pharmacy Management System",
    description: "Complete pharmacy solution with inventory tracking, prescription management, and billing.",
    longDescription: "A full-featured pharmacy management system including medicine inventory with expiry tracking, prescription management, barcode scanning, sales reports, and GST-compliant invoicing.",
    category: "fullstack",
    technologies: ["Angular", "Spring Boot", "MySQL", "Bootstrap", "Java", "Hibernate"],
    githubUrl: "https://github.com/velan03/pharmacy",
    liveUrl: "https://pharmacy-ten-jet.vercel.app",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c6d08dc8?w=800&h=400&fit=crop",
    bgGradient: "from-blue-600 to-indigo-600",
    featured: true,
    stats: { stars: 56, forks: 14, views: 1560 }
  },
  {
    id: 7,
    title: "Handmade Ornaments Shop",
    description: "E-commerce platform for traditional handmade jewelry and ornamental crafts.",
    longDescription: "A beautiful e-commerce platform showcasing traditional handmade ornaments including temple jewelry, kundan work, pearl sets, and antique pieces with secure checkout.",
    category: "ecommerce",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB", "Cloudinary"],
    githubUrl: "https://github.com/Velan03/HAND-MADE-ORNAMENTS",
    liveUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=400&fit=crop",
    bgGradient: "from-amber-600 to-orange-600",
    featured: true,
    stats: { stars: 78, forks: 21, views: 2340 }
  },
  {
    id: 8,
    title: "Smart Billing System",
    description: "Modern billing and invoicing solution for retail businesses with analytics.",
    longDescription: "A comprehensive billing system featuring POS interface, invoice generation, barcode scanning, multiple payment methods, customer loyalty program, GST calculations, and real-time analytics.",
    category: "fullstack",
    technologies: ["React.js", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Socket.io"],
    githubUrl: "https://github.com/velan03/billing-v1",
    liveUrl: "https://billing-v1.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    bgGradient: "from-rose-600 to-red-600",
    featured: true,
    stats: { stars: 92, forks: 27, views: 2870 }
  },
  {
    id: 9,
    title: "Fashion E-Commerce Store",
    description: "Modern fashion store with AI-powered size recommendations.",
    longDescription: "An innovative fashion e-commerce platform featuring AI-powered size recommendations, virtual try-on, personalized product suggestions, and seamless checkout experience.",
    category: "ecommerce",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com/velan03/like-n-pick",
    liveUrl: "https://like-n-pick.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop",
    bgGradient: "from-fuchsia-600 to-purple-600",
    featured: false,
    stats: { stars: 45, forks: 11, views: 1500 }
  },
  {
    id: 10,
    title: "Task Management Dashboard",
    description: "Kanban-style task manager with drag-drop and team collaboration features.",
    longDescription: "A Trello-like task management system with drag-and-drop functionality, team workspaces, real-time updates, file attachments, and activity logging.",
    category: "website",
    technologies: ["React", "Redux", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com/velan03/task-dashboard",
    liveUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
    bgGradient: "from-slate-600 to-gray-600",
    featured: false,
    stats: { stars: 67, forks: 15, views: 1800 }
  },
  {
    id: 11,
    title: "Computer Vision Object Detection",
    description: "Real-time object detection using YOLO and OpenCV with webcam integration.",
    longDescription: "Built a real-time object detection system using YOLOv8 and OpenCV. Features live webcam detection, image upload processing, and custom model training capabilities.",
    category: "ai-ml",
    technologies: ["Python", "OpenCV", "TensorFlow", "Flask", "React"],
    githubUrl: "https://github.com/velan03/object-detection",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop",
    bgGradient: "from-cyan-600 to-blue-600",
    featured: false,
    stats: { stars: 234, forks: 56, views: 8900 }
  }
];

const categories = [
  { id: "all", label: "All Projects", icon: Code2, color: "from-blue-500 to-cyan-500" },
  { id: "website", label: "Websites", icon: Layout, color: "from-purple-500 to-pink-500" },
  { id: "ai-ml", label: "AI/ML", icon: Bot, color: "from-green-500 to-emerald-500" },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingCart, color: "from-orange-500 to-red-500" },
  { id: "fullstack", label: "Full Stack", icon: Heart, color: "from-indigo-500 to-blue-500" }
];

const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const projectsPerPage = isMobile ? 1 : 3;
  const filteredProjects = selectedCategory === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedCategory);
  
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const visibleProjects = filteredProjects.slice(
    currentPage * projectsPerPage, 
    (currentPage + 1) * projectsPerPage
  );

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (totalPages > 1 && autoPlayRef.current === null) {
      autoPlayRef.current = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 6000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => {
      autoPlayRef.current = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 6000);
    }, 10000);
  }, [totalPages]);

  const handleNext = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setTimeout(() => {
      autoPlayRef.current = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 6000);
    }, 10000);
  }, [totalPages]);

  const getCategoryIcon = (category: string) => {
    const found = categories.find(c => c.id === category);
    return found?.icon || Heart;
  };

  const getCategoryColor = (category: string) => {
    const found = categories.find(c => c.id === category);
    return found?.color || "from-primary to-accent";
  };

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <Badge className="mb-3 sm:mb-4 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-primary/20 to-accent/20 border-none">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            My Work
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Explore my collection of web applications, AI/ML projects, and full-stack solutions
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 overflow-x-auto scrollbar-hide"
        >
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 pb-2 sm:pb-0">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(0);
                  }}
                  className={`relative flex-shrink-0 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                  style={isActive ? {
                    background: `linear-gradient(135deg, ${category.color.split(' ')[1].replace('to-', '')}, ${category.color.split(' ')[2]})`
                  } : {}}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="whitespace-nowrap">{category.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative">
          {totalPages > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Previous projects"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Next projects"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          <div className="px-0 sm:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
              >
                {visibleProjects.map((project, idx) => {
                  const CategoryIcon = getCategoryIcon(project.category);
                  const categoryColor = getCategoryColor(project.category);
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                      onHoverStart={() => setHoveredProject(project.id)}
                      onHoverEnd={() => setHoveredProject(null)}
                      className="h-full"
                    >
                      <Card className="group relative h-full overflow-hidden bg-gradient-to-br from-card to-secondary/30 border-border/50 hover:border-primary/30 transition-all duration-300">
                        {/* Project Header with Image/Background */}
                        <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                          {/* Background Image with Overlay */}
                          <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${project.imageUrl})` }}
                          />
                          
                          {/* Gradient Overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient || categoryColor} opacity-75`} />
                          
                          {/* Dark Gradient Overlay for better text contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          
                          {/* Icon Center */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CategoryIcon className="w-12 h-12 sm:w-16 sm:h-16 text-white/30" />
                          </div>
                          
                          {/* Featured Badge */}
                          {project.featured && (
                            <div className="absolute top-3 right-3 z-10">
                              <Badge className="bg-black/50 backdrop-blur-sm text-white border-none text-[10px] sm:text-xs">
                                <Star className="w-2 h-2 sm:w-3 sm:h-3 mr-1 fill-current" />
                                Featured
                              </Badge>
                            </div>
                          )}
                          
                          {/* Category Badge on Image */}
                          <div className="absolute bottom-3 left-3 z-10">
                            <Badge className="bg-black/50 backdrop-blur-sm text-white border-none text-[10px] sm:text-xs">
                              <CategoryIcon className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                              {project.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-4 sm:p-5">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-[9px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-secondary rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-[9px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-secondary rounded-full">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Stats */}
                          {project.stats && (
                            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-[10px] sm:text-xs text-muted-foreground">
                              {project.stats.stars && (
                                <span className="flex items-center gap-0.5 sm:gap-1">
                                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {project.stats.stars}
                                </span>
                              )}
                              {project.stats.forks && (
                                <span className="flex items-center gap-0.5 sm:gap-1">
                                  <GitFork className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {project.stats.forks}
                                </span>
                              )}
                              {project.stats.views && (
                                <span className="flex items-center gap-0.5 sm:gap-1">
                                  <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {project.stats.views}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 h-8 sm:h-9 text-xs sm:text-sm"
                              onClick={() => window.open(project.githubUrl, "_blank")}
                            >
                              <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Code
                            </Button>
                            {project.liveUrl && (
                              <Button
                                size="sm"
                                className={`flex-1 h-8 sm:h-9 text-xs sm:text-sm bg-gradient-to-r ${project.bgGradient || categoryColor} hover:opacity-90 text-white`}
                                onClick={() => window.open(project.liveUrl, "_blank")}
                              >
                                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                Demo
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Hover Overlay - Desktop only */}
                        {hoveredProject === project.id && !isMobile && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-br from-primary/95 to-accent/95 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-between"
                          >
                            <div>
                              <h4 className="text-white font-bold text-sm sm:text-base mb-2">About this project</h4>
                              <p className="text-white/80 text-xs sm:text-sm line-clamp-5">
                                {project.longDescription}
                              </p>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="flex-1 h-8 text-xs"
                                onClick={() => window.open(project.githubUrl, "_blank")}
                              >
                                <Github className="w-3 h-3 mr-1" />
                                View Code
                              </Button>
                              {project.liveUrl && (
                                <Button
                                  size="sm"
                                  className="flex-1 h-8 text-xs bg-white text-primary hover:bg-white/90"
                                  onClick={() => window.open(project.liveUrl, "_blank")}
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Live Demo
                                </Button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Indicators */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current);
                    autoPlayRef.current = null;
                  }
                  setCurrentPage(idx);
                  setTimeout(() => {
                    autoPlayRef.current = setInterval(() => {
                      setCurrentPage((prev) => (prev + 1) % totalPages);
                    }, 6000);
                  }, 10000);
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  currentPage === idx
                    ? "w-6 sm:w-8 bg-gradient-to-r from-primary to-accent"
                    : "w-1.5 sm:w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10 md:mt-12"
        >
          <Button
            variant="outline"
            className="group text-sm sm:text-base"
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