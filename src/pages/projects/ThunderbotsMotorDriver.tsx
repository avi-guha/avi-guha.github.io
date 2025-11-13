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
                Spearheaded complete redesign of UBC Thunderbots' motor driver subsystem, achieving a revolutionary 10x miniaturization while 
                simultaneously adding advanced CAN communication and implementing production-grade sensorless Field Oriented Control (FOC). 
                Delivered a mission-critical hot-swappable modular architecture enabling field repairs during international RoboCup competition, 
                combining expertise in high-density PCB design, power electronics, embedded firmware development, and advanced motor control algorithms.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Achievements</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Achieved 90% footprint reduction through 8-layer HDI PCB design with 4mil traces and micro-vias</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Implemented sensorless FOC firmware delivering 95% motor efficiency with sub-millisecond torque response</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Integrated CAN 2.0B protocol for real-time motor telemetry and closed-loop position control</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Designed standardized connector interface enabling &lt;30-second driver replacement during competition</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Validated thermal performance through FEA simulation ensuring reliable operation at 20A continuous current</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technical Innovation</h2>
              <p className="text-muted-foreground mb-6">
                Overcame extreme space constraints through advanced layout optimization including power plane splitting, strategic component placement, 
                and thermal management integration. Developed sophisticated FOC algorithms estimating rotor position from back-EMF measurements, 
                eliminating expensive encoder hardware while maintaining precise control. This project demonstrates full-stack embedded systems 
                capability spanning power electronics design, real-time firmware development, control theory implementation, and manufacturing for reliability.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThunderbotsMotorDriver;
