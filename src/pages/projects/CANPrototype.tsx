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
                href="https://github.com/avi-guha"
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
                analysis, and EMI mitigation—skills typically learned only through years of professional hardware engineering experience.
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
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technical Expertise Developed</h2>
              <p className="text-muted-foreground mb-6">
                Gained deep expertise in high-speed differential signaling, transmission line theory, and professional PCB design practices. 
                Performed signal integrity simulations, calculated trace impedances using microstrip equations, and implemented proper 
                termination networks. This foundational work enabled the team's transition to a industrial-grade communication infrastructure, 
                demonstrating both hardware design skills and systems-level thinking essential for embedded systems engineering roles.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CANPrototype;
