import { useState, useMemo } from "react";
import { Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

const projects = [
  {
    title: "ToneLens",
    description: "AI-powered communication assistant using Gemini AI to decode emotional tones in text messages. Analyzes conversation screenshots and provides real-time tone detection, helping users navigate digital communication with confidence.",
    technologies: ["Gemini AI", "React", "TypeScript", "NLP", "Image Processing"],
    githubUrl: "https://github.com/avi-guha/HACKCAMP-2025-V2",
    categories: ["AI & Machine Learning"],
    slug: "tonelens"
  },
  {
    title: "Autonomous Pet Rescuing Robot",
    description: "Architected end-to-end autonomous mobile robot with custom PCB hardware, YOLOv11-powered computer vision (90%+ accuracy), and dual-core FreeRTOS achieving <1ms control loops. Full-stack development from circuit design to ML model training with Roboflow.",
    technologies: ["C++", "Python", "YOLOv11", "Roboflow", "PCB Design", "FreeRTOS", "Raspberry Pi", "ESP-32"],
    githubUrl: "https://github.com/avi-guha/ROBOT",
    categories: ["Embedded Systems", "AI & Machine Learning", "Robotics", "Mechatronics", "Hardware Design"],
    slug: "autonomous-pet-rescuing-robot"
  },
  {
    title: "Servo Speed Motor Control",
    description: "Engineered hardware-only PID control system using discrete logic components and optoelectronics. Achieved stable motor speed regulation without microcontrollers, demonstrating mastery of analog circuit design and control theory fundamentals.",
    technologies: ["Digital Logic", "Operational Amplifiers", "DAC", "Circuit Design"],
    categories: ["Hardware Design"],
    slug: "servo-motor-control"
  },
  {
    title: "PS4 Controller RC Car",
    description: "Programmed an ESP-32 microcontroller to interface with a PS4 controller via Bluetooth, enabling precise control of a servo motor and brushless DC motor. Includes custom 3D-modeled chassis designed in Solidworks.",
    technologies: ["C++", "ESP-32", "Bluetooth", "Solidworks", "PCB Design"],
    githubUrl: "https://github.com/avi-guha/RC-Car",
    categories: ["Embedded Systems", "Mechatronics", "Hardware Design"],
    slug: "rc-car"
  },
  {
    title: "UBC Thunderbots Power Board",
    description: "Designed mission-critical power system for RoboCup robots managing >200V capacitor charging with 92% efficiency flyback converter. Integrated CAN bus achieving 1000% communication speed improvement. Competition-proven reliability.",
    technologies: ["Altium", "Power Electronics", "CAN Protocol", "Circuit Design"],
    categories: ["Hardware Design", "Embedded Systems", "Robotics"],
    slug: "thunderbots-power-board"
  },
  {
    title: "2D Materials AFM Analysis",
    description: "Developed a Java application using OpenCV to visualize and analyze progressive decay of monolayer graphene and MXene flakes. Implemented PID-controlled humidity regulation for atomic force microscopy experiments.",
    technologies: ["Java", "OpenCV", "PID Control", "Materials Science"],
    githubUrl: "https://github.com/avi-guha/EdgeDetectionApp",
    categories: ["Research"],
    slug: "afm-materials-analysis"
  },
  {
    title: "APSC 101 Autonomous Claw",
    description: "First microcontroller project featuring an Arduino-controlled claw mechanism capable of picking up objects of varying sizes, shapes, and masses. Hands-on experience with metalworking and mechanical design.",
    technologies: ["Arduino", "C++", "Mechanical Design", "Prototyping"],
    categories: ["Embedded Systems", "Hardware Design", "Mechatronics"],
    slug: "autonomous-claw"
  },
  {
    title: "Break Beam Board",
    description: "Eliminated 95%+ false detections through innovative multi-photodiode AND-gate architecture. Redesigned ball detection system for UBC Thunderbots achieving near-perfect reliability in debris-filled competition environments.",
    technologies: ["PCB Design", "Photodiodes", "Digital Logic", "Altium"],
    categories: ["Hardware Design", "Robotics", "Embedded Systems"],
    slug: "break-beam-board"
  },
  {
    title: "ROS Clue Detective",
    description: "Built autonomous navigation system with custom CNNs achieving 95%+ sign recognition accuracy and zero-collision imitation learning. Self-taught reinforcement learning and implemented custom reward functions, all from scratch in ROS Gazebo.",
    technologies: ["Python", "ROS", "Machine Learning", "Computer Vision", "TensorFlow"],
    githubUrl: "https://github.com/avi-guha/ENPH-353-COMPETITION",
    categories: ["AI & Machine Learning", "Robotics"],
    slug: "ros-clue-detective"
  },
  {
    title: "CAN Prototype Board",
    description: "Led SPI-to-CAN migration improving communication reliability 10x. Mastered differential impedance matching, signal integrity analysis, and high-speed PCB design, achieving professional-grade 120Ω ±5% impedance control.",
    technologies: ["CAN Protocol", "PCB Design", "Differential Signaling", "Altium"],
    githubUrl: "https://github.com/avi-guha/CanFirmwareTesting",
    categories: ["Hardware Design", "Embedded Systems", "Robotics"],
    slug: "can-prototype"
  },
  {
    title: "Thunderbots Motor Driver",
    description: "Achieved 90% footprint reduction through 4-layer HDI PCB design while adding CAN interface. Implemented sensorless FOC firmware delivering 95% motor efficiency with <30-second hot-swap capability for competition reliability.",
    technologies: ["PCB Design", "Embedded C", "FOC", "CAN Protocol", "Altium"],
    categories: ["Embedded Systems", "Robotics", "Hardware Design"],
    slug: "thunderbots-motor-driver"
  }
];

const ProjectCard = ({ project }: { project: typeof projects[number] }) => {
  const { ref, isVisible } = useFadeInOnScroll(0.05);

  return (
    <div
      ref={ref}
      className="project-card group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      }}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {project.categories.map((cat) => (
          <span key={cat} className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
            {cat}
          </span>
        ))}
      </div>

      <Link to={`/projects/${project.slug}`}>
        <h3 className="text-xl font-medium mb-3 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
      </Link>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 pt-4 border-t border-border">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github size={16} />
            <span className="text-sm">Code</span>
          </a>
        )}
        <Link
          to={`/projects/${project.slug}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors ml-auto"
          aria-label={`Learn more about ${project.title}`}
        >
          <span className="text-sm">Learn More</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

const Projects = () => {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.flatMap((p) => p.categories)));
    return ["All", ...cats.sort()];
  }, []);

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Projects</h2>
          <p className="text-xl text-muted-foreground mb-8">
            A showcase of my engineering physics projects and research work.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === cat
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No projects found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;