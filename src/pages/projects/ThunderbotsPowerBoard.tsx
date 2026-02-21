import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const ThunderbotsPowerBoard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/projects');
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

            <h1 className="mb-6">UBC Thunderbots Power Board</h1>
            
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

            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img 
                  src="/projects/PWR-PCB1.png" 
                  alt="Thunderbots Power Board - Top View" 
                  className="w-full rounded-lg shadow-lg"
                />
                <img 
                  src="/projects/PWR-PCB2.png" 
                  alt="Thunderbots Power Board - Bottom View" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Designed mission-critical power distribution system for autonomous soccer robots competing at international RoboCup, 
                managing high-voltage capacitor charging (&gt;200V) and delivering precision voltage regulation across multiple power domains. 
                Engineered custom flyback converter topology achieving 92% efficiency while meeting stringent safety requirements for 
                competition. Integrated CAN bus communication enabling 1000% improvement in inter-board data transfer rates compared to 
                legacy architecture.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Inheriting a Legacy System</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                When I joined UBC Thunderbots, the existing power board had been designed years ago and was showing its age. It worked,
                but just barely, plagued by efficiency problems, overheating issues, and a communication architecture that was becoming
                a bottleneck. The team needed someone willing to redesign it from scratch, and I volunteered despite having never 
                worked with high-voltage power electronics before. Looking back, I had no idea what I was getting into, but that
                naivety probably helped. I might not have volunteered if I'd truly understood the challenge ahead.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Kicker Problem: 240 Volts of Complexity</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The most critical function of the power board is charging a massive capacitor bank to 240V for the "kicker," the 
                mechanism that launches the ball. Think about that for a second: we needed to take 24V from a LiPo battery and 
                boost it to 240V efficiently, safely, and reliably, all in a robot that gets bumped and jostled during intense 
                matches. One mistake could mean a fried board, a dead robot, or worse, a safety incident.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I spent weeks studying flyback converter topology, understanding transformer design, and learning about feedback 
                control for switching power supplies. My first prototype barely worked, achieving maybe 60% efficiency with
                components that ran hot enough to be uncomfortable to touch. Through iterative optimization (adjusting switching
                frequencies, redesigning the transformer, improving the feedback loop), I eventually hit 92% efficiency with
                components that stayed cool under continuous operation.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Circuit Schematics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <img src="/projects/FlybackSch.png" alt="Flyback Converter Schematic" className="w-full rounded-lg shadow-md mb-2" />
                  <p className="text-sm text-muted-foreground text-center">Flyback Converter Circuit</p>
                </div>
                <div>
                  <img src="/projects/DischargerSch.png" alt="Discharger Schematic" className="w-full rounded-lg shadow-md mb-2" />
                  <p className="text-sm text-muted-foreground text-center">Discharger Circuit</p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Safety First: Galvanic Isolation</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With 240V on one side and sensitive microcontroller circuits on the other, isolation was non-negotiable. I 
                implemented galvanic isolation between the low-voltage control domain (&lt;24V) and the high-voltage power domain 
                (~240V). This meant carefully selecting optocouplers, designing isolated feedback paths, and ensuring there was 
                no possible way for the high-voltage side to couple back into the control circuits.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The PCB layout for isolation was particularly challenging. I had to maintain proper creepage and clearance 
                distances (the physical spacing between high and low voltage traces required by safety standards). This constrained 
                the layout significantly and forced creative solutions for component placement and routing.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Communication Overhaul: Migrating to CAN</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The legacy system used a slow, unreliable communication scheme that was becoming a bottleneck as we added more 
                sensors and demanded faster response times. I led the integration of CAN 2.0B, a robust, high-speed protocol 
                originally designed for automotive applications. The improvement was dramatic: communication speed increased by 
                over 1000%, and the differential signaling made it virtually immune to the electromagnetic noise generated by 
                our motors and power electronics.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Implementing CAN required learning about protocol arbitration, message filtering, and error handling. I also had 
                to design the physical layer carefully, ensuring proper termination, impedance matching, and protection against 
                voltage spikes.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Debugging Adventure</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My favorite war story from this project involves a mysterious failure where the flyback converter just wouldn't start. 
                I checked everything: the feedback loop, the transformer windings, the control IC configuration. All looked correct. 
                The switching waveforms on the oscilloscope were completely wrong, but I couldn't figure out why.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                After days of frustrating debugging, I finally discovered the culprit: the gate driver footprint was flipped. The 
                component library I'd used had the pinout mirrored, so what I thought was the input was actually the output and vice 
                versa. The gate driver was receiving signals on its output pin and trying to drive through its input. No wonder the 
                MOSFET wasn't switching properly. The fix was simple once identified: I had to carefully lift the chip and dead-bug 
                it with tiny wires to correct the connections. It worked, but I learned a painful lesson about always verifying 
                component footprints against datasheets, never trusting library components blindly.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Another memorable challenge was eliminating audible whine from the switching converter. The transformer would 
                emit an annoying high-pitched sound under certain load conditions due to magnetostriction. I solved it by 
                adjusting the switching frequency out of the audible range and adding proper potting to dampen vibrations.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Achievements</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Designed isolated flyback converter stepping 24V to 240V with 92% efficiency for kicker capacitor charging</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Implemented galvanic isolation between low-voltage control (&lt;24V) and high-voltage power (~240V) systems</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Integrated CAN 2.0B interface achieving 1000% speed improvement over previous communication architecture</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Designed custom transformer with optimized core selection and winding ratios</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Achieved competition-proven reliability through rigorous testing and iterative improvement</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Competition Day</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Seeing the power boards I designed operating flawlessly at international competition was one of the most 
                rewarding experiences of my engineering journey. Every time our robot kicked a goal, I knew my circuits were 
                working exactly as designed, charging that capacitor, delivering the energy precisely when needed, and doing it 
                reliably match after match. All those late nights debugging, all those moments of frustration when things didn't 
                work. They were all worth it for that feeling.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Altium Designer", "Power Electronics", "Flyback Converters", "CAN Protocol", "Transformer Design", "High-Voltage Systems"].map((tech) => (
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

      <footer className="bg-muted/50 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Avi Guha. Built with passion for engineering physics.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThunderbotsPowerBoard;
