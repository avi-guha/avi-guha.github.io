import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const CANPrototype = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/', { state: { scrollTo: 'projects' } });
  };

  return (
    <div className="min-h-screen">
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
                Hardware Design
              </span>
            </div>

            <h1 className="mb-6">CAN Prototype Board</h1>
            
            <div className="flex gap-4 mb-12">
              <a
                href="https://github.com/avi-guha/CanFirmwareTesting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Github size={20} />
                View Code
              </a>
            </div>

            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img 
                  src="/projects/CANSch.png" 
                  alt="CAN Schematic" 
                  className="w-full rounded-lg shadow-lg"
                />
                <p className="text-sm text-muted-foreground text-center mt-2">CAN Bus Schematic</p>
              </div>
              <div>
                <img 
                  src="/projects/CANPCB.png" 
                  alt="CAN PCB Layout" 
                  className="w-full rounded-lg shadow-lg"
                />
                <p className="text-sm text-muted-foreground text-center mt-2">PCB Layout Design</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Led the critical infrastructure upgrade converting UBC Thunderbots' motor control system from SPI to CAN bus protocol, 
                achieving a 10x improvement in noise immunity and 1000% increase in communication reliability. Designed custom PCB prototype 
                from scratch, mastering advanced high-speed digital design principles including differential impedance matching, signal integrity 
                analysis, and EMI mitigation. These are skills typically learned only through years of professional hardware engineering experience.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Communication Crisis</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Thunderbots were having a reliability problem, and it was getting worse. As we added more features (more sensors,
                faster control loops, better telemetry), the SPI communication links started dropping packets. At first it was occasional,
                easily masked by retransmissions. But then the robots started behaving erratically during matches, motors stuttering 
                because commands were getting lost in electromagnetic noise from our own power electronics.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I was tasked with investigating alternatives, and CAN bus immediately stood out. It's the communication standard in 
                automotive applications, designed specifically for noisy, high-reliability environments. If it could handle the 
                electromagnetic chaos inside a car, it could handle our robots. But implementing CAN would require a complete overhaul 
                of our hardware infrastructure, and I'd never designed high-speed digital systems before.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Deep Dive into Differential Signaling</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                CAN uses differential signaling. Instead of measuring voltage relative to ground, it measures the difference between 
                two wires. Any noise that affects both wires equally gets canceled out. Beautiful in theory, but making it work 
                requires precise control over something called differential impedance. If the impedance isn't matched throughout the 
                system, signals reflect back and forth, turning clean digital pulses into unintelligible mush.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I spent weeks learning transmission line theory, something I never expected to need for "just" a communication bus. 
                I learned about characteristic impedance, reflection coefficients, and why the geometry of your PCB traces matters 
                at high frequencies. I ran calculations, simulated designs, and ordered multiple board revisions, each one getting 
                closer to the 120Ω ±5% impedance target that CAN requires.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">From Theory to Working Hardware</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Designing the actual PCB was a meticulous process. I had to consider trace widths, spacing, layer stack-ups, and
                ground plane configurations to achieve the desired impedance. I followed IPC-2221 standards and consulted 
                application notes from CAN transceiver manufacturers. Each design iteration involved careful review and analysis
                to ensure signal integrity.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Debugging Toolkit</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I became intimately familiar with the oscilloscope during this project. Learning to interpret signal integrity issues 
                from waveforms, identifying reflection artifacts, measuring rise times and comparing them to transmission line 
                characteristics. These skills transformed how I think about high-speed digital design. I also learned to use a TDR 
                (Time Domain Reflectometer) to characterize impedance along the trace, which helped me identify exactly where 
                impedance discontinuities were occurring.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For firmware testing, I wrote a comprehensive validation suite that would stress-test the CAN bus under various 
                conditions: varying bus loads, different message priorities, error injection. This systematic approach to validation 
                caught several edge cases that would have caused problems in the field.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Achievements</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Architected communication protocol migration improving reliability by 1000% in high-EMI robot environment</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Implemented controlled differential impedance (120Ω ±5%) across entire PCB trace routing</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Reduced signal-to-noise ratio by 40dB through proper termination and ground plane design</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Designed full schematic and PCB layout in Altium Designer following IPC-2221 standards</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Developed comprehensive firmware validation suite for CAN bus stress testing</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Impact and Lessons</h2>
              <p className="text-muted-foreground mb-6">
                The CAN migration became the foundation for all of our inter-board communication. It enabled features that simply 
                weren't possible with unreliable SPI: real-time telemetry, distributed control algorithms, coordinated multi-board 
                operations. The team's software developers could finally assume that when they sent a command, it would actually 
                arrive.
              </p>
              <p className="text-muted-foreground mb-6">
                For me personally, this project was a turning point. I went from being intimidated by high-speed digital design 
                to genuinely understanding it. The skills I developed (signal integrity analysis, impedance control, systematic
                debugging) have proven valuable in almost every hardware project since. More importantly, I learned that seemingly
                arcane topics like transmission line theory aren't just academic exercises; they're essential tools for building 
                reliable systems.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["CAN Protocol", "PCB Design", "Differential Signaling", "Altium Designer", "Signal Integrity", "Impedance Control", "Embedded Firmware"].map((tech) => (
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

export default CANPrototype;
