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
                When I joined Thunderbots, I took on the challenge of completely redesigning the motor driver—a critical component that needed 
                to be 90% smaller while actually adding more features. I spent months learning about high-density PCB design, teaching myself 
                Field Oriented Control algorithms, and diving deep into CAN protocol implementation. The result? A compact 4-layer board that 
                not only fit in tight spaces but could be swapped out in under 30 seconds during competitions—a game-changer when every second counts.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">What I Built</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Shrunk the board by 90% using a 4-layer HDI design with micro-vias—learned advanced PCB layout from scratch</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Taught myself sensorless FOC and implemented firmware that achieved 95% motor efficiency</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Integrated CAN communication for real-time telemetry—my first deep dive into automotive protocols</span>
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

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Learning Journey</h2>
              <p className="text-muted-foreground mb-6">
                This project pushed me way beyond my comfort zone. I had to master power plane design, figure out how to estimate motor 
                position without encoders (using back-EMF readings), and ensure everything stayed cool under intense 20A loads. The hardest 
                part? Fitting everything into such a tiny space while maintaining signal integrity. But seeing the robots zip around the 
                field with my drivers inside made every late night worth it. This project taught me that I genuinely enjoy the challenge 
                of making things smaller, smarter, and more reliable.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThunderbotsMotorDriver;
