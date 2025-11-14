import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const AutonomousPetRescuingRobot = () => {
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
                Robotics & AI
              </span>
            </div>

            <h1 className="mb-6">Autonomous Pet Rescuing Robot</h1>
            
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
              <img 
                src="/projects/FinalRobot.png" 
                alt="Autonomous Pet Rescuing Robot" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                This was my introduction to building a complete robot from the ground up. My team and I designed custom PCBs, trained our 
                own computer vision models using YOLOv11 and Roboflow, and wrote all the firmware to make it navigate autonomously. The moment 
                it first recognized a "pet" and drove over to rescue it felt incredible. We achieved 100% line following accuracy and hit 90%+ 
                object recognition after countless hours of model training. By carefully optimizing our FreeRTOS task scheduling, we kept the 
                control loops running at under 1ms. This project showed me I love the challenge of bringing together hardware, firmware, and AI 
                into one working system.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Project Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img src="/projects/H-Bridge.png" alt="H-Bridge PCB Design" className="w-full rounded-lg shadow-md" />
                <img src="/projects/RobotMotherBoardSch.png" alt="Robot Motherboard Schematic" className="w-full rounded-lg shadow-md" />
                <img src="/projects/MotherboardPCB.png" alt="Motherboard PCB" className="w-full rounded-lg shadow-md" />
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Achievements</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Designed custom H-Bridge PCB with PID motor control for precise movement</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Trained YOLOv11 model using Roboflow achieving 90%+ object recognition accuracy</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Achieved 100% line following accuracy through optimized sensor processing algorithms</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Implemented high-speed UART protocol (115200 baud) between ESP-32 and Raspberry Pi with zero packet loss</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Developed dual-core FreeRTOS architecture with &lt;1ms sampling for real-time line following and object detection</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["C++", "Python", "YOLOv11", "Roboflow", "Computer Vision", "PCB Design", "FreeRTOS", "Raspberry Pi", "ESP-32"].map((tech) => (
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

export default AutonomousPetRescuingRobot;
