import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code2, Sparkles, ArrowRight, X, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Project {
  id: number;
  title: string;
  description: string;
  category: "website" | "ai-ml" | "ecommerce" | "fullstack";
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  features: string[];
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Human Resource Management System (HRMS)",
    description: "Enterprise HR platform with role-based dashboards for attendance, leave approval, and analytics using Micro Frontend architecture.",
    category: "fullstack",
    technologies: ["Angular", "NgRx", "PrimeNG", "TypeScript", "Bootstrap 5"],
    githubUrl: "https://github.com/velan03/hrms",
    liveUrl: "https://hrms-demo.vercel.app",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    features: [
      "Role-based access control (Admin, HR, Manager, Employee)",
      "Real-time attendance tracking",
      "Leave approval workflow",
      "Analytics dashboard with charts",
      "Micro Frontend architecture"
    ],
    icon: <Code2 className="w-5 h-5" />
  },
  {
    id: 2,
    title: "AI-Powered Chat Application",
    description: "ChatGPT-style conversational UI with real-time streaming and GenAI/LLM backend via RESTful APIs.",
    category: "ai-ml",
    technologies: ["React.js", "TypeScript", "Node.js", "WebSockets", "Redux", "Docker"],
    githubUrl: "https://github.com/velan03/ai-chat-app",
    liveUrl: "https://ai-chat-demo.vercel.app",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    features: [
      "Real-time message streaming",
      "Chat history persistence",
      "Multiple conversation threads",
      "Code syntax highlighting",
      "Docker containerized deployment"
    ],
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Healthcare Appointment Platform",
    description: "Appointment booking, doctor scheduling and patient dashboards with secure RBAC for health records.",
    category: "website",
    technologies: ["Angular", "PrimeNG", "Bootstrap 5", "NgRx", "TypeScript"],
    githubUrl: "https://github.com/velan03/healthcare-platform",
    liveUrl: "https://healthcare-demo.vercel.app",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
    features: [
      "Doctor availability scheduling",
      "Patient appointment booking",
      "Prescription management",
      "Secure health record access",
      "Email/SMS notifications"
    ],
    icon: <Code2 className="w-5 h-5" />
  },
  {
    id: 4,
    title: "E-Commerce Flower Shop",
    description: "Full-stack flower e-commerce platform with dynamic catalog, shopping cart and secure checkout.",
    category: "ecommerce",
    technologies: ["React.js", "Tailwind CSS", "Bootstrap 5", "Material UI", "JavaScript", "MongoDB"],
    githubUrl: "https://github.com/velan03/ecommerce-flower-shop",
    liveUrl: "https://flower-shop-demo.vercel.app",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600",
    features: [
      "Product catalog with filters",
      "Shopping cart functionality",
      "JWT authenticated checkout",
      "Order tracking system",
      "Payment gateway integration"
    ],
    icon: <Code2 className="w-5 h-5" />
  },
  {
    id: 5,
    title: "Computer Vision Object Detection",
    description: "Real-time object detection using YOLOv8 and OpenCV with webcam integration.",
    category: "ai-ml",
    technologies: ["Python", "TensorFlow", "OpenCV", "YOLOv8", "Flask"],
    githubUrl: "https://github.com/velan03/object-detection",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600",
    features: [
      "Real-time object detection",
      "Multiple object tracking",
      "Custom model training",
      "Webcam integration",
      "REST API for inference"
    ],
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 6,
    title: "Portfolio Website 2025",
    description: "Modern portfolio with 3D animations, chatbot integration, and responsive design.",
    category: "website",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    githubUrl: "https://github.com/velan03/portfolio",
    liveUrl: "https://velan-s.netlify.app",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    features: [
      "3D animations and effects",
      "AI-powered chatbot",
      "Fully responsive design",
      "Dark/Light theme",
      "Performance optimized"
    ],
    icon: <Code2 className="w-5 h-5" />
  }
];

const categories = [
  { id: "all", label: "All Projects", icon: <Code2 className="w-4 h-4" /> },
  { id: "website", label: "Websites", icon: <Code2 className="w-4 h-4" /> },
  { id: "ai-ml", label: "AI/ML", icon: <Sparkles className="w-4 h-4" /> },
  { id: "ecommerce", label: "E-Commerce", icon: <Code2 className="w-4 h-4" /> },
  { id: "fullstack", label: "Full Stack", icon: <Code2 className="w-4 h-4" /> }
];

const ProjectsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => 
    selectedCategory === "all" || project.category === selectedCategory
  );

  return (
    <section id="projects-showcase" className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">My Creative Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Featured{" "}
            <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work across web development, AI/ML, and full-stack applications
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full bg-primary -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Carousel Swiper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="projects-swiper"
          >
            {filteredProjects.map((project, index) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="h-full"
                >
                  <Card className="h-full overflow-hidden bg-gradient-to-br from-card to-secondary/30 border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-white text-xs font-medium">
                          {categories.find(c => c.id === project.category)?.label}
                        </div>
                      </div>
                      
                      {/* Overlay Icons */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-primary transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </a>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4 text-white" />
                        </a>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* View Details Button */}
                      <Button
                        variant="ghost"
                        className="w-full group/btn"
                        onClick={() => setSelectedProject(project)}
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-border"
        >
          {[
            { label: "Projects Completed", value: "15+", icon: <Code2 className="w-6 h-6" /> },
            { label: "GitHub Commits", value: "500+", icon: <Github className="w-6 h-6" /> },
            { label: "Technologies", value: "20+", icon: <Sparkles className="w-6 h-6" /> },
            { label: "Happy Clients", value: "10+", icon: <Code2 className="w-6 h-6" /> },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 rounded-2xl bg-gradient-to-br from-secondary/30 to-transparent border border-border/50"
            >
              <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-card to-secondary/20 border border-border/50 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="relative h-48">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button title="btn"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
                
                <h4 className="font-semibold mb-3">Key Features</h4>
                <ul className="space-y-2 mb-6">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full gap-2">
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </Button>
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for Swiper */}
      <style jsx global>{`
        .projects-swiper {
          padding: 20px 20px 50px !important;
        }
        .projects-swiper .swiper-button-prev,
        .projects-swiper .swiper-button-next {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          width: 40px;
          height: 40px;
          border-radius: 50%;
          opacity: 0.7;
          transition: all 0.3s;
        }
        .projects-swiper .swiper-button-prev:hover,
        .projects-swiper .swiper-button-next:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        .projects-swiper .swiper-button-prev:after,
        .projects-swiper .swiper-button-next:after {
          font-size: 18px;
        }
        .projects-swiper .swiper-pagination-bullet {
          background: hsl(var(--primary));
          opacity: 0.5;
        }
        .projects-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: hsl(var(--primary));
        }
        @media (max-width: 640px) {
          .projects-swiper .swiper-button-prev,
          .projects-swiper .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsShowcase;