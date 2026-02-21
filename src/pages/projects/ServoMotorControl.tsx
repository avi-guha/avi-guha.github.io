import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const ServoMotorControl = () => {
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
                Electronics
              </span>
            </div>

            <h1 className="mb-6">Servo Speed Motor Control</h1>
            
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
                <div>
                  <img 
                    src="/projects/ServoSpeedControlSch.png" 
                    alt="Servo Speed Control Schematic" 
                    className="w-full rounded-lg shadow-lg"
                  />
                  <p className="text-sm text-muted-foreground text-center mt-2">Control Circuit Schematic</p>
                </div>
                <div>
                  <img 
                    src="/projects/ServoSpeedControlCircuit.png" 
                    alt="Servo Speed Control Circuit Layout" 
                    className="w-full rounded-lg shadow-lg"
                  />
                  <p className="text-sm text-muted-foreground text-center mt-2">Physical Circuit Implementation</p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Engineered a fully analog PID control system using discrete digital logic components and optoelectronics, demonstrating 
                deep understanding of control theory fundamentals without relying on microcontrollers or software. Designed and implemented 
                complete feedback control architecture achieving stable motor speed regulation through hardware-only implementation of 
                proportional-integral-derivative algorithms. This was a challenging feat requiring expertise in analog circuit design, digital logic, 
                and control systems theory.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Challenge I Set for Myself</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                After working on several microcontroller-based projects, I started to wonder: could I build a sophisticated control system 
                using nothing but discrete components? No Arduino, no code, no debugging serial output, just transistors, op-amps, and logic gates. 
                It seemed like an almost anachronistic challenge in 2024, but I was curious about what engineers did before microcontrollers were 
                ubiquitous. What I discovered was that building control systems from first principles gives you an intuition that writing code never can.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Understanding Control Theory the Hard Way</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The first step was deeply understanding what PID control actually means at a circuit level. The proportional term was 
                straightforward. It's just amplification. But the integral term required me to build an analog integrator using op-amps and 
                capacitors, carefully managing drift and saturation. The derivative term was even trickier, requiring high-pass filtering and 
                careful noise management.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I spent weeks with my oscilloscope, watching signals propagate through the system, understanding how each component affected 
                the output. When something oscillated unexpectedly or went unstable, I couldn't just add a print statement. I had to trace 
                voltages, check component tolerances, and really understand the physics of what was happening.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Feedback Loop: Optical Sensing</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To close the feedback loop, I needed to measure motor speed without any digital processing. I built an optical encoder using 
                a slotted disk and phototransistors. As the disk spun, it would alternately block and pass light, creating a pulse train 
                whose frequency was proportional to motor speed. Converting this frequency to a voltage required building a frequency-to-voltage 
                converter from discrete components, another deep dive into analog circuit design.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The precision of this sensing stage directly affected the entire system's performance. I had to carefully bias the phototransistors, 
                implement hysteresis to prevent false triggering from noise, and filter the output to get a stable voltage representing speed. 
                Every millivolt of noise in this stage would propagate through the entire control loop.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Digital Logic for State Management</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The setpoint (the target speed) needed to be stored and adjustable. I built this using flip-flops, counters, and latches, 
                essentially creating a primitive digital memory without any programmable components. Push-button inputs would increment 
                or decrement the setpoint, stored in a counter, which then fed a DAC (Digital-to-Analog Converter) to create the reference 
                voltage for the PID controller.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This hybrid digital-analog architecture taught me so much about the interface between digital logic and analog signals. 
                I learned about glitches, timing constraints, and the importance of proper decoupling and signal conditioning at domain boundaries.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Achievements</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Implemented complete PID feedback loop using only analog components and combinational logic circuits</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Designed state storage system using flip-flops, counters, and latches for motor speed reference memory</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Built optical encoder system with phototransistor-based speed measurement</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Created frequency-to-voltage converter for analog speed feedback</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Achieved stable motor speed regulation with minimal steady-state error</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">What This Project Taught Me</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This project gave me an appreciation for control theory that I couldn't have gotten any other way. When you can't hide 
                complexity behind code, you have to really understand what's happening at every stage. I learned why certain control 
                configurations are stable and others aren't, not from equations in a textbook, but from watching a motor spin out of control 
                and tracing the problem back to an improperly tuned integrator.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                More than anything, this project taught me that constraints drive creativity. Removing the microcontroller didn't limit what 
                I could build. It forced me to think more deeply about the fundamentals and develop a physical intuition for control systems 
                that serves me well in every project I've worked on since.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Digital Logic", "Operational Amplifiers", "DAC", "Circuit Design", "Analog Computing", "Optoelectronics"].map((tech) => (
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

export default ServoMotorControl;
