import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, Minimize2, Maximize2, MessageCircle, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

// Portfolio knowledge base - Updated with Velan's actual information
const portfolioData = {
  name: "Velan S",
  title: "Frontend & Full Stack Engineer",
  bio: "I'm a Software Engineer based in Chennai, building web applications that real people rely on every day. From HR teams managing attendance to patients booking appointments, the things I build are used by 500+ users daily. I work primarily with Angular, React, and TypeScript, focusing on writing clean code, building fast UIs, and designing maintainable systems.",
  skills: {
    frontend: ["Angular (17+)", "React.js", "Next.js", "TypeScript", "JavaScript", "PrimeNG", "Angular Material", "Bootstrap 5", "Tailwind CSS", "NgRx", "Redux", "RxJS"],
    backend: ["Node.js", "Spring Boot", "Java", "Python", "RESTful APIs", "WebSockets"],
    tools: ["Git", "Docker", "Azure DevOps", "MongoDB", "MySQL", "JWT", "OAuth", "CI/CD", "GitHub Copilot", "Cursor AI"]
  },
  experience: [
    {
      company: "Tarkiz Infotech Pvt Ltd",
      role: "Software Engineer",
      period: "Jul 2024 - Present",
      location: "Chennai, Tamil Nadu",
      description: "Architected enterprise web apps with Angular (20+) and TypeScript, delivering role-based dashboards serving 500+ concurrent users.",
      achievements: [
        "Integrated RESTful APIs & WebSockets, boosting performance by 40%",
        "Implemented NgRx & Redux state management, reducing bugs by 30%",
        "Built reusable UI library, reducing development time by 25%",
        "Leveraged GitHub Copilot & Cursor AI for 35% productivity gain",
        "Applied Micro Frontend architecture with CI/CD pipelines",
        "Enforced JWT auth, OAuth, achieving zero security incidents"
      ]
    },
    {
      company: "Intrainz",
      role: "Frontend & Data Analysis Intern",
      period: "May 2023 - Jul 2023",
      location: "Chennai, Tamil Nadu",
      description: "Built System Prices Checker with real-time API calls comparing pricing across e-commerce platforms.",
      achievements: [
        "Cut manual effort by 50% through automated price tracking",
        "Engineered data visualization dashboards, improving data interpretation by 30%"
      ]
    }
  ],
  education: {
    degree: "BE Computer Science Engineering",
    university: "Sri Muthukumaran Institute of Technology",
    year: "2023",
    cgpa: "8.39",
    courses: ["Data Structures & Algorithms", "Object Oriented Programming", "Web Technologies", "Software Engineering"]
  },
  certifications: [
    {
      name: "Java Full Stack",
      institution: "QSpiders",
      period: "Sep 2023 - May 2024",
      topics: ["React.js", "TypeScript", "APIs", "Docker", "Git"]
    },
    {
      name: "Python & Data Science",
      institution: "Besant Technologies",
      year: "2023"
    }
  ],
  projects: [
    {
      name: "Human Resource Management System (HRMS)",
      period: "Jul 2024 - Present",
      description: "Enterprise HR platform with role-based dashboards for attendance, leave approval, and analytics.",
      technologies: ["Angular", "NgRx", "PrimeNG", "Bootstrap 5", "TypeScript"]
    },
    {
      name: "AI-Powered Chat Application",
      period: "2024 - Present",
      description: "ChatGPT-style conversational UI with real-time streaming and GenAI/LLM backend.",
      technologies: ["React.js", "TypeScript", "Node.js", "WebSockets", "Redux", "Docker"]
    },
    {
      name: "Healthcare Appointment Platform",
      period: "Jul 2025 - Present",
      description: "Appointment booking, doctor scheduling and patient dashboards with secure role-based access control.",
      technologies: ["Angular", "PrimeNG", "Bootstrap 5", "NgRx", "TypeScript"]
    },
    {
      name: "E-Commerce Web Application",
      period: "Sep 2024 - Jan 2025",
      description: "Full-stack flower e-commerce platform with dynamic catalog, shopping cart and secure checkout.",
      technologies: ["React.js", "Tailwind CSS", "Bootstrap 5", "Material UI", "JavaScript", "MongoDB"]
    }
  ],
  achievements: {
    academic: "CGPA 8.39 - Top performer in CSE department, 2023 batch.",
    coding: "Built 4+ production-grade enterprise apps. 35% productivity gain using AI tools."
  },
  contact: {
    email: "velansivasanakaran15@gmail.com",
    github: "github.com/velan03",
    linkedin: "linkedin.com/in/velan-s-845791250",
    portfolio: "velan-s.netlify.app",
  },
  resumeUrl: "/resume/Velan_Resume.pdf"
};

// Function to handle PDF resume download
const handleDownloadResume = async () => {
  try {
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
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error downloading resume:', error);
    return false;
  }
};

// Allowed topics that the bot can answer
const allowedTopics = [
  "skill", "technology", "tech stack", "know", "tool", "language",
  "experience", "work", "job", "career", "company", "tarkiz", "intrainz",
  "education", "study", "degree", "university", "college", "cgpa", "certification",
  "contact", "email", "reach", "get in touch", "hire", "connect", "linkedin", "github",
  "project", "portfolio", "build", "create", "made", "built", "hrms", "chat", "healthcare", "e-commerce",
  "achievement", "award", "recognition", "accomplishment",
  "about", "who are you", "intro", "tell me about yourself", "background", "bio",
  "where", "location", "based", "chennai",
  "hello", "hi", "hey", "greetings", "sup", "howdy", "namaste",
  "help", "what can you", "what do you", "resume", "download", "cv"
];

const isRelevantQuestion = (message: string): boolean => {
  const msg = message.toLowerCase();
  return allowedTopics.some(topic => msg.includes(topic));
};

const getBotResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase();

  if (!isRelevantQuestion(userMessage)) {
    return "Ha! Ha! 😄 This is not my region. Can you ask about my skills, experience, projects, education, or download my resume?";
  }

  if (msg.includes("resume") || msg.includes("download") || msg.includes("cv")) {
    handleDownloadResume();
    return "📄 Downloading my resume! Check your downloads folder.";
  }

  if (msg.includes("skill") || msg.includes("technology") || msg.includes("tech stack")) {
    return `I'm proficient in:\n\n🎨 Frontend: ${portfolioData.skills.frontend.join(", ")}\n\n⚙️ Backend: ${portfolioData.skills.backend.join(", ")}\n\n🛠️ Tools: ${portfolioData.skills.tools.join(", ")}`;
  }

  if (msg.includes("experience") || msg.includes("work") || msg.includes("job")) {
    const experiences = portfolioData.experience.map(exp =>
      `📌 ${exp.role} at ${exp.company} (${exp.period})\n   ${exp.description}\n   🏆 Achievements: ${exp.achievements.join(", ")}`
    ).join("\n\n");
    return `Here's my experience:\n\n${experiences}`;
  }

  if (msg.includes("education") || msg.includes("study") || msg.includes("degree")) {
    return `🎓 ${portfolioData.education.degree}\n   ${portfolioData.education.university}\n   📅 ${portfolioData.education.year} | CGPA: ${portfolioData.education.cgpa}`;
  }

  if (msg.includes("contact") || msg.includes("email")) {
    return `📧 Email: ${portfolioData.contact.email}\n💻 GitHub: ${portfolioData.contact.github}\n🔗 LinkedIn: ${portfolioData.contact.linkedin}`;
  }

  if (msg.includes("project")) {
    const projects = portfolioData.projects.map(proj =>
      `🚀 ${proj.name}: ${proj.description}\n   Tech: ${proj.technologies.join(", ")}`
    ).join("\n\n");
    return `Here are my projects:\n\n${projects}`;
  }

  if (msg.match(/^(hello|hi|hey)/)) {
    return `Hey there! 👋 I'm ${portfolioData.name}, ${portfolioData.title}. Ask me about my skills, experience, projects, or download my resume!`;
  }

  return "I can help with my skills, experience, projects, education, contact info, or resume. What would you like to know?";
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = sessionStorage.getItem("chatMessages");
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      return parsed.map((msg: Omit<Message, 'timestamp'> & { timestamp: string }) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [{
      id: "1",
      type: "bot",
      content: `Hi! I'm ${portfolioData.name}'s AI assistant. 👋\n\nAsk me about my skills, experience, projects, or type "download resume"!`,
      timestamp: new Date(),
    }];
  });
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = inputValue;
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(currentQuestion);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleClearChat = () => {
    sessionStorage.removeItem("chatMessages");
    setMessages([{
      id: Date.now().toString(),
      type: "bot",
      content: `Chat cleared! 👋 Hi again! I'm ${portfolioData.name}'s assistant.`,
      timestamp: new Date(),
    }]);
    toast({ title: "Chat Cleared", description: "Conversation history reset." });
  };

  if (!isOpen) {
    return (
      <button title="btn"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${
      isMinimized ? "w-[280px] sm:w-80" : "w-[calc(100%-2rem)] sm:w-[450px] md:w-[500px] max-w-[500px]"
    }`}>
      <Card className="shadow-2xl border-2 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-sm">Velan's AI Assistant</h3>
              <p className="text-[10px] text-muted-foreground">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleDownloadResume} className="p-1.5 hover:bg-muted rounded-md" title="Download Resume">
              <Download className="w-3 h-3" />
            </button>
            <button onClick={handleClearChat} className="p-1.5 hover:bg-muted rounded-md text-xs">Clear</button>
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-muted rounded-md">
              {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            </button>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-muted rounded-md" title="Close Chat">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="h-[400px] overflow-y-auto p-3 space-y-3 flex flex-col">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-lg p-2 ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <p className="text-xs whitespace-pre-wrap">{message.content}</p>
                    <span className="text-[8px] opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce delay-75" />
                      <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce delay-150" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 pt-2 pb-1 border-t">
              <p className="text-[10px] text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {["Skills", "Experience", "Projects", "Contact", "Download Resume"].map((q) => (
                  <button key={q} onClick={() => handleQuickQuestion(q === "Download Resume" ? "download resume" : `What are your ${q.toLowerCase()}?`)} className="text-[10px] px-2 py-1 bg-muted hover:bg-muted/80 rounded-full">
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask me..." className="flex-1 text-sm" />
                <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()} className="h-9 w-9">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};