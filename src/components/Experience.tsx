import { useEffect, useRef, useState, useCallback } from "react";

const experiences = [
  {
    title: "Undergraduate Silicon Quantum Photonics Researcher",
    role: "Stewart Blusson Quantum Matter Institute",
    period: "Jan 2026 - Present",
    location: "Vancouver, BC",
    description: [
      "Investigating the usage of nanowire single photon detectors on silicon for spin detection in photon-based quantum computers.",
      "Engineered RF (~3GHz) PCBAs to interface between cryogenic (4 Kelvin) photon detectors and room temperature acquisition systems, ensuring impedance matching and high signal to noise ratio.",
      "Developed a variable low-noise current source for superconducting biasing applications, delivering up to 8mA with less than 5mA of RMS noise.",
      "Designed a low-noise amplifier to operate at 4 Kelvin with 50 MHz–3 GHz bandwidth and less than 100 mW power dissipation.",
      "Engineering a high-power RF amplifier, operating at 300 Kelvin, to maximise the signal to noise ratio from single photon detectors."
    ]
  },
  {
    title: "Electrical Designer",
    role: "UBC Thunderbots",
    period: "Sep 2024 - Present",
    location: "Vancouver, BC",
    description: [
      "Researched, designed, and implemented a flyback circuit to convert 24V to 240V, enabling energy storage in a 2mF capacitor for launching a golf ball at speeds exceeding 40 km/h.",
      "Led the design and development of a power distribution board, isolating low (<24V) and high (~240V) voltages, improving overall robot safety.",
      "Engineered an infrared break-beam sensor board to detect ball possession, improving robot ball control by 40% during international competition.",
      "Led the implementation of a CAN communication interface which increased board-board communication speed by over 1000%."
    ]
  },
  {
    title: "Undergraduate 2D Physics Researcher",
    role: "University of Calgary",
    period: "Jan 2025 - May 2025",
    location: "Calgary, AB",
    description: [
      "Developed and implemented a PID-controlled fluid cell to regulate humidity from 0%-95% RH in an atomic force microscope, improving experimental precision on 2-D graphene and MXene materials.",
      "Designed a full-cycle Java application using OpenCV, enabling researchers to visualize and analyze progressive decay of monolayer flakes under repeated wear."
    ]
  },
  {
    title: "Materials and Processes Intern",
    role: "PFB - Plasti-Fab",
    period: "May 2024 - Aug 2024",
    location: "Calgary, AB",
    description: [
      "Streamlined supply chain management and inventory control across North America using advanced Microsoft Excel techniques and predictive analysis.",
      "Achieved a 50% increase in efficiency and accuracy in logistics operations, improving resource allocation and reducing lead times."
    ]
  }
];

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lineTop, setLineTop] = useState(0);
  const [lineBottom, setLineBottom] = useState(0);

  const setDotRef = useCallback((el: HTMLDivElement | null, idx: number) => {
    dotRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.55;

      // Calculate the span of the grey line (first dot to last dot)
      const firstDot = dotRefs.current[0];
      const lastDot = dotRefs.current[dotRefs.current.length - 1];
      if (firstDot && lastDot) {
        const firstCenter = firstDot.getBoundingClientRect().top + firstDot.getBoundingClientRect().height / 2 - containerRect.top;
        const lastCenter = lastDot.getBoundingClientRect().top + lastDot.getBoundingClientRect().height / 2 - containerRect.top;
        setLineTop(firstCenter);
        setLineBottom(containerRect.height - lastCenter);
      }

      // Find which dot the scroll has reached based on viewport center
      let reachedIndex = -1;
      let bestLineHeight = 0;

      const firstDotCenter = firstDot
        ? firstDot.getBoundingClientRect().top + firstDot.getBoundingClientRect().height / 2
        : 0;
      const firstDotOffset = firstDot
        ? firstDotCenter - containerRect.top
        : 0;

      for (let i = 0; i < dotRefs.current.length; i++) {
        const dot = dotRefs.current[i];
        if (!dot) continue;
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top + dotRect.height / 2;

        if (dotCenter <= viewportCenter) {
          reachedIndex = i;
          bestLineHeight = dotCenter - containerRect.top - firstDotOffset;
        }
      }

      // If we're between dots, interpolate the line to the scroll position
      if (reachedIndex < dotRefs.current.length - 1 && reachedIndex >= 0) {
        const nextDot = dotRefs.current[reachedIndex + 1];
        if (nextDot) {
          const nextRect = nextDot.getBoundingClientRect();
          const nextCenter = nextRect.top + nextRect.height / 2;
          if (nextCenter <= viewportCenter + window.innerHeight * 0.5) {
            const currentDot = dotRefs.current[reachedIndex]!;
            const currentCenter = currentDot.getBoundingClientRect().top + currentDot.getBoundingClientRect().height / 2;
            const range = nextCenter - currentCenter;
            const progress = Math.max(0, Math.min(1, (viewportCenter - currentCenter) / range));
            bestLineHeight = (currentCenter - containerRect.top - firstDotOffset) + progress * range;
          }
        }
      }

      setLineHeight(Math.max(0, bestLineHeight));
      setActiveIndex(reachedIndex);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    const timer = setTimeout(update, 100);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="mb-4">Experiences</h2>
        </div>

        <div className="timeline-container" ref={containerRef}>
          {/* Background line — spans first dot to last dot only */}
          <div
            className="timeline-line"
            style={{ top: `${lineTop}px`, bottom: `${lineBottom}px` }}
          />
          {/* Progress line — starts at first dot, grows to active dot */}
          <div
            className="timeline-line-progress"
            style={{ top: `${lineTop}px`, height: `${lineHeight}px` }}
          />

          {experiences.map((exp, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            const isFuture = index > activeIndex;

            return (
              <div
                key={index}
                className="timeline-entry"
                style={{
                  opacity: isActive ? 1 : isPast ? 0.5 : isFuture ? 0.3 : 0.3,
                  transition: "opacity 0.5s ease",
                }}
              >
                {/* Date column */}
                <div className="timeline-date">
                  <span
                    className="text-sm font-medium whitespace-nowrap"
                    style={{
                      color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Dot */}
                <div className="timeline-dot-col">
                  <div
                    className="timeline-dot"
                    ref={(el) => setDotRef(el, index)}
                    style={{
                      background: isPast || isActive
                        ? "hsl(var(--foreground))"
                        : "hsl(var(--background))",
                      borderColor: "hsl(var(--foreground))",
                      transform: isActive ? "scale(1.3)" : "scale(1)",
                      transition: "background 0.4s ease, transform 0.4s ease",
                    }}
                  />
                </div>

                {/* Content card */}
                <div className="timeline-content">
                  <div
                    className="project-card"
                    style={{
                      borderColor: isActive
                        ? "hsl(var(--foreground) / 0.3)"
                        : "hsl(var(--border))",
                      transition: "border-color 0.5s ease",
                    }}
                  >
                    <h3 className="text-xl font-medium mb-1">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {exp.role} · {exp.location}
                    </p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                        >
                          <span className="text-foreground/40 select-none mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
