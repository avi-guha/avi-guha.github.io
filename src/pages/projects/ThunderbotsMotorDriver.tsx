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
                Over the recent design cycle, the motor driver was made to be more modular, making it more 'hot-swappable' in the event that one of the drivers malfunctioned. 
                There were huge challenges in layout, because we essentially needed to shrink down the previous layout by 10x, while including support for a CAN interface as well. 
                I also wrote firmware to drive the motors using sensorless field oriented control (FOC).
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Modular hot-swappable design for easy maintenance</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">10x size reduction from previous design</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Integrated CAN bus interface</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Sensorless Field Oriented Control (FOC) firmware</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Compact PCB layout with high-density routing</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technical Highlights</h2>
              <p className="text-muted-foreground mb-6">
                The redesign presented significant engineering challenges in achieving a 10x size reduction while adding CAN communication capabilities. 
                The implementation of sensorless field oriented control demonstrates advanced motor control techniques, enabling precise speed and torque control 
                without position sensors. The modular design philosophy ensures system reliability through easy component replacement during competition.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThunderbotsMotorDriver;
