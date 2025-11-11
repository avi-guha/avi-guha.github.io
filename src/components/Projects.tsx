import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      title: "Autonomous Pet Rescuing Robot",
      description: "Developed an autonomous robot with computer vision capabilities to navigate courses and collect plushies. Features H-Bridge PCB design, PID motor control, and CV-Hardware integration using UART communication.",
      technologies: ["C++", "Python", "Computer Vision", "PCB Design", "FreeRTOS", "Raspberry Pi", "ESP-32"],
      githubUrl: "https://github.com/avi-guha",
      liveUrl: "#",
      category: "Robotics & AI",
      slug: "autonomous-pet-rescuing-robot"
    },
    {
      title: "Servo Speed Motor Control",
      description: "Developed a fully analog circuit to control and adjust motor output speed using a PID feedback loop implemented with digital logic components and photonics. Utilized flip-flops, counters, and latches for speed storage.",
      technologies: ["Digital Logic", "Operational Amplifiers", "DAC", "Circuit Design"],
      githubUrl: "https://github.com/avi-guha",
      liveUrl: "#",
      category: "Electronics",
      slug: "servo-motor-control"
    },
    {
      title: "PS4 Controller RC Car",
      description: "Programmed an ESP-32 microcontroller to interface with a PS4 controller via Bluetooth, enabling precise control of a servo motor and brushless DC motor. Includes custom 3D-modeled chassis designed in Solidworks.",
      technologies: ["C++", "ESP-32", "Bluetooth", "Solidworks", "PCB Design"],
      githubUrl: "https://github.com/avi-guha",
      liveUrl: "#",
      category: "Embedded Systems",
      slug: "rc-car"
    },
    {
      title: "UBC Thunderbots Power Board",
      description: "Designed and developed a power distribution board for autonomous soccer robots, featuring voltage isolation, flyback converter circuits, and CAN communication interface for international competition.",
      technologies: ["Altium", "Power Electronics", "CAN Protocol", "Circuit Design"],
      githubUrl: "https://github.com/avi-guha",
      liveUrl: "#",
      category: "Robotics",
      slug: "thunderbots-power-board"
    },
    {
      title: "2D Materials AFM Analysis",
      description: "Developed a Java application using OpenCV to visualize and analyze progressive decay of monolayer graphene and MXene flakes. Implemented PID-controlled humidity regulation for atomic force microscopy experiments.",
      technologies: ["Java", "OpenCV", "PID Control", "Materials Science"],
      githubUrl: "https://github.com/avi-guha",
      liveUrl: "#",
      category: "Research",
      slug: "afm-materials-analysis"
    },
    {
      title: "APSC 101 Autonomous Claw",
      description: "First microcontroller project featuring an Arduino-controlled claw mechanism capable of picking up objects of varying sizes, shapes, and masses. Hands-on experience with metalworking and mechanical design.",
      technologies: ["Arduino", "C++", "Mechanical Design", "Prototyping"],
      githubUrl: "https://github.com/avi-guha",
      liveUrl: "#",
      category: "Mechatronics",
      slug: "autonomous-claw"
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
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={16} />
                  <span className="text-sm">Code</span>
                </a>
                <a
                  href={project.liveUrl}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink size={16} />
                  <span className="text-sm">Demo</span>
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