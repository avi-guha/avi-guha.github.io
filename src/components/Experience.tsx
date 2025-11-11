import { Briefcase, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Electrical Designer",
      company: "UBC Thunderbots",
      location: "Vancouver, British Columbia",
      period: "September 2024 — Present",
      description: [
        "Researched, designed, and implemented a flyback circuit to convert 24V to 240V, enabling energy storage in a 2mF (250V) capacitor for launching a golf ball at speeds exceeding 40 km/h.",
        "Led the design and development of a power distribution board, isolating low (<24V) and high (~240V) voltages, which enhanced the system's resistance to electrical faults and improved overall robot safety.",
        "Engineered an infrared break-beam sensor board to detect ball possession, improving robot ball control and robot maneuverability by 40% during international competition.",
        "Led the implementation of a CAN communication interface which increased board-board communication speed by over 1000% compared to the previous SPI communication."
      ]
    },
    {
      title: "Undergraduate 2D Physics Researcher",
      company: "University of Calgary",
      location: "Calgary, Alberta",
      period: "January 2025 — May 2025",
      description: [
        "Developed and implemented a PID-controlled fluid cell to regulate humidity from (0%-95% RH) in an atomic force microscopy, significantly improving experimental precision by examining the effect of a meniscus on 2-D graphene and MXene materials.",
        "Designed and developed a full-cycle Java application using OpenCV, enabling researchers to visualize and analyze the progressive decay of monolayer flakes under repeated wear in an AFM environment, enhancing their understanding of material degradation."
      ]
    },
    {
      title: "Materials and Processes Intern",
      company: "PFB - Plasti-Fab",
      location: "Calgary, Alberta",
      period: "May 2024 — August 2024",
      description: [
        "Streamlined supply chain management and inventory control across North America by optimizing tracking and distribution processes using advanced Microsoft Excel techniques and predictive analysis.",
        "Achieved a 50% increase in efficiency and accuracy in logistics operations, improving resource allocation and reducing lead times."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Experience</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional experience in electrical design, research, and engineering.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="project-card animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 text-accent">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-lg font-medium mb-2">
                    <Briefcase size={18} className="text-muted-foreground" />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:items-end mt-2 md:mt-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={16} />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} />
                    <span className="text-sm">{exp.location}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
