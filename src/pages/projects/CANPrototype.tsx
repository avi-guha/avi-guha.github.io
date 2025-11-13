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
                The first project I worked on this year was converting our motor drivers from SPI to CAN, to minimize the interference from noise. 
                The first step in this was designing a prototype board for CAN. Though these can be bought online fairly cost effectively, the design of this was invaluable due to introduction to important concepts such as differential impedance matching.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">SPI to CAN bus conversion for motor drivers</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Differential impedance matching implementation</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Noise interference minimization</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Custom PCB design and prototyping</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technical Highlights</h2>
              <p className="text-muted-foreground mb-6">
                Designing this prototype board provided hands-on experience with critical high-speed digital design concepts. 
                The CAN bus implementation required careful attention to differential signaling, impedance matching, and noise reduction 
                techniques. This project laid the foundation for more robust motor control communications in the robotics system.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CANPrototype;
