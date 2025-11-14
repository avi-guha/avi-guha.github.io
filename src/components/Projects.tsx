import { Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      title: "Autonomous Pet Rescuing Robot",
      description: "Architected end-to-end autonomous mobile robot with custom PCB hardware, YOLOv11-powered computer vision (90%+ accuracy), and dual-core FreeRTOS achieving <1ms control loops. Full-stack development from circuit design to ML model training with Roboflow.",
      technologies: ["C++", "Python", "YOLOv11", "Roboflow", "PCB Design", "FreeRTOS", "Raspberry Pi", "ESP-32"],
      githubUrl: "https://github.com/avi-guha/ROBOT",
      category: "Robotics & AI",
      slug: "autonomous-pet-rescuing-robot"
    },
    {
      title: "Servo Speed Motor Control",
      description: "Engineered hardware-only PID control system using discrete logic components and optoelectronics. Achieved stable motor speed regulation without microcontrollers—demonstrating mastery of analog circuit design and control theory fundamentals.",
      technologies: ["Digital Logic", "Operational Amplifiers", "DAC", "Circuit Design"],
      githubUrl: "https://github.com/avi-guha",
      category: "Electronics",
      slug: "servo-motor-control"
    },
    {
      title: "PS4 Controller RC Car",
      description: "Programmed an ESP-32 microcontroller to interface with a PS4 controller via Bluetooth, enabling precise control of a servo motor and brushless DC motor. Includes custom 3D-modeled chassis designed in Solidworks.",
      technologies: ["C++", "ESP-32", "Bluetooth", "Solidworks", "PCB Design"],
      githubUrl: "https://github.com/avi-guha/RC-Car",
      category: "Embedded Systems",
      slug: "rc-car"
    },
    {
      title: "UBC Thunderbots Power Board",
      description: "Designed mission-critical power system for RoboCup robots managing >200V capacitor charging with 92% efficiency flyback converter. Integrated CAN bus achieving 1000% communication speed improvement. Competition-proven reliability.",
      technologies: ["Altium", "Power Electronics", "CAN Protocol", "Circuit Design"],
      githubUrl: "https://github.com/avi-guha",
      category: "Robotics",
      slug: "thunderbots-power-board"
    },
    {
      title: "2D Materials AFM Analysis",
      description: "Developed a Java application using OpenCV to visualize and analyze progressive decay of monolayer graphene and MXene flakes. Implemented PID-controlled humidity regulation for atomic force microscopy experiments.",
      technologies: ["Java", "OpenCV", "PID Control", "Materials Science"],
      githubUrl: "https://github.com/avi-guha/EdgeDetectionApp",
      category: "Research",
      slug: "afm-materials-analysis"
    },
    {
      title: "APSC 101 Autonomous Claw",
      description: "First microcontroller project featuring an Arduino-controlled claw mechanism capable of picking up objects of varying sizes, shapes, and masses. Hands-on experience with metalworking and mechanical design.",
      technologies: ["Arduino", "C++", "Mechanical Design", "Prototyping"],
      githubUrl: "https://github.com/avi-guha",
      category: "Mechatronics",
      slug: "autonomous-claw"
    },
    {
      title: "Break Beam Board",
      description: "Eliminated 95%+ false detections through innovative multi-photodiode AND-gate architecture. Redesigned ball detection system for UBC Thunderbots achieving near-perfect reliability in debris-filled competition environments.",
      technologies: ["PCB Design", "Photodiodes", "Digital Logic", "Altium"],
      githubUrl: "https://github.com/avi-guha",
      category: "Robotics",
      slug: "break-beam-board"
    },
    {
      title: "ROS Clue Detective",
      description: "Built autonomous navigation system with custom CNNs achieving 95%+ sign recognition accuracy and zero-collision imitation learning. Self-taught reinforcement learning and implemented custom reward functions—all from scratch in ROS Gazebo.",
      technologies: ["Python", "ROS", "Machine Learning", "Computer Vision", "TensorFlow"],
      githubUrl: "https://github.com/avi-guha/ENPH-353-COMPETITION",
      category: "Machine Learning",
      slug: "ros-clue-detective"
    },
    {
      title: "CAN Prototype Board",
      description: "Led SPI-to-CAN migration improving communication reliability 10x. Mastered differential impedance matching, signal integrity analysis, and high-speed PCB design—achieving professional-grade 120Ω ±5% impedance control.",
      technologies: ["CAN Protocol", "PCB Design", "Differential Signaling", "Altium"],
      githubUrl: "https://github.com/avi-guha/CanFirmwareTesting",
      category: "Hardware Design",
      slug: "can-prototype"
    },
    {
      title: "Thunderbots Motor Driver",
      description: "Achieved 90% footprint reduction through 4-layer HDI PCB design while adding CAN interface. Implemented sensorless FOC firmware delivering 95% motor efficiency with <30-second hot-swap capability for competition reliability.",
      technologies: ["PCB Design", "Embedded C", "FOC", "CAN Protocol", "Altium"],
      githubUrl: "https://github.com/avi-guha",
      category: "Robotics",
      slug: "thunderbots-motor-driver"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Projects</h2>
          <p className="text-xl text-muted-foreground mb-8">
            A showcase of my engineering physics projects and research work.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group"
            >
              <div className="mb-4">
                <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              <Link to={`/projects/${project.slug}`}>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;