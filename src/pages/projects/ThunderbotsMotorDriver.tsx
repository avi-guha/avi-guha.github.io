import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const ThunderbotsMotorDriver = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/', { state: { scrollTo: 'projects' } });
  };

  return (
    <div className="min-h-screen animate-page-fade-in">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft size={20} />
              Back to Projects
            </button>

            <div className="mb-8">
              <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                Robotics
              </span>
            </div>

            <h1 className="mb-6">Thunderbots Motor Driver</h1>
            
            <div className="flex gap-4 mb-12">
              <a
                href="https://github.com/avi-guha"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Github size={20} />
                View Code
              </a>
            </div>

            <div className="mb-12 flex justify-center">
              <img 
                src="/projects/MD-PCB.png" 
                alt="Motor Driver PCB" 
                className="w-full max-w-2xl rounded-lg shadow-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                When I joined Thunderbots, I took on the challenge of completely redesigning the motor driver, a critical component that needed 
                to be 90% smaller while actually adding more features. I spent months learning about high-density PCB design, teaching myself 
                Field Oriented Control algorithms, and diving deep into CAN protocol implementation. The result? A compact 4-layer board that 
                not only fit in tight spaces but could be swapped out in under 30 seconds during competitions. That's a game-changer when every second counts.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Miniaturization Challenge</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The existing motor driver worked, but it was huge. It barely fit in the robot's chassis, and when something failed, replacing 
                it during a competition was a multi-minute operation that often cost us matches. The team wanted something smaller that would 
                be easier to swap, but they also wanted to add CAN communication, which usually means more components, not fewer. Making it 
                90% smaller while adding features seemed impossible, but I was determined to find a way.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I dove into high-density interconnect (HDI) PCB design techniques. Things like micro-vias, blind and buried vias, and 
                aggressive component placement that I'd only read about before. Moving from a 2-layer to a 4-layer board design opened 
                up new possibilities for routing, but it also introduced new challenges around signal integrity and power plane design. 
                Every design decision became a tradeoff between size, manufacturability, and performance.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Teaching Myself Field Oriented Control</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The firmware challenge was equally daunting. The previous motor driver used simple six-step commutation, which works but 
                leaves significant efficiency on the table. I wanted to implement Field Oriented Control (FOC), the gold standard for BLDC 
                motor control used in everything from electric vehicles to industrial robots. But FOC is notoriously complex, requiring 
                real-time coordinate transforms, PI controllers, and precise timing.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I spent weeks with papers, textbooks, and simulation tools, trying to build intuition for Clarke and Park transforms, 
                space vector modulation, and the control loops that tie everything together. My first implementations were buggy, and motors 
                would spin erratically, overheat, or just refuse to move. But gradually, through systematic debugging and lots of 
                oscilloscope time, I developed working FOC code that achieved 95% motor efficiency.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The real trick was doing this sensorless. With sensors, you know exactly where the rotor is. Without them, you have to 
                estimate position from back-EMF measurements while the motor is spinning. Getting this to work reliably, especially at 
                low speeds and during startup, required careful tuning and some clever state estimation algorithms.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Thermal Problem</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Shrinking the board by 90% meant all that heat was concentrated in a much smaller area. At 20A continuous operation, the 
                MOSFETs generate significant heat, and without proper thermal management, they'd fail in minutes. I ran thermal simulations 
                to identify hot spots, then carefully designed the PCB with heavy copper pours that doubled as heat spreaders.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Component selection also became critical. I spent hours comparing MOSFET datasheets, looking for devices with low Rds(on) 
                and good thermal characteristics in packages small enough for my design. The final design can handle sustained 20A loads 
                without throttling, validated through extended testing in our thermal chamber.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Hot-Swap Revolution</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                One of the features I'm most proud of is the hot-swap connector system. During competitions, motor drivers occasionally fail.
                it's just a reality of pushing hardware to its limits. With the old system, replacing a driver meant disassembling half the 
                robot. I designed a connector interface that lets you pull the old board and plug in a new one in under 30 seconds, without 
                any tools.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Getting this right required careful consideration of electrical and mechanical requirements. The connectors had to handle 
                high currents, be vibration-resistant, and be easy to mate/unmate with gloves on in a high-pressure environment. I went 
                through several connector families before finding one that met all the requirements, then designed a custom mounting system 
                that made installation foolproof.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">What I Built</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Shrunk the board by 90% using a 4-layer HDI design with micro-vias. Learned advanced PCB layout from scratch</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Taught myself sensorless FOC and implemented firmware that achieved 95% motor efficiency</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Integrated CAN communication for real-time telemetry. My first deep dive into automotive protocols</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Designed a hot-swap connector system that saved us countless times during competitions</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Ran thermal simulations to ensure it could handle 20A continuously without overheating</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Competition Validation</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
              Hopefully I'll get to see these guys working in real-time at robo-cup in Korea January 2026!
              </p>
              

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Learning Journey</h2>
              <p className="text-muted-foreground mb-6">
                This project pushed me way beyond my comfort zone. I had to master power plane design, figure out how to estimate motor 
                position without encoders (using back-EMF readings), and ensure everything stayed cool under intense 20A loads. The hardest 
                part? Fitting everything into such a tiny space while maintaining signal integrity. But seeing the robots zip around the 
                field with my drivers inside made every late night worth it. This project taught me that I genuinely enjoy the challenge 
                of making things smaller, smarter, and more reliable.
              </p>
              <p className="text-muted-foreground mb-6">
                More broadly, this project showed me what's possible when you refuse to accept "good enough." The old motor drivers worked 
                fine. Teams had been using them for years. But by questioning the fundamental design choices and applying modern techniques, 
                I created something dramatically better. That mindset, always asking "how could this be better?", has become central to how
                I approach engineering.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["PCB Design", "Embedded C", "Field Oriented Control", "CAN Protocol", "Altium Designer", "Thermal Management", "HDI Design"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThunderbotsMotorDriver;
