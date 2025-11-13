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
                Designed and developed a power distribution board for autonomous soccer robots competing at 
                international Robocup competition. Features voltage isolation, flyback converter circuits, 
                and CAN communication interface.
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

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Flyback circuit converting 24V to 240V for kicking mechanism capacitor storage</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Power distribution with voltage isolation between low (&lt;24V) and high (~240V) systems</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">CAN communication interface increasing board-board communication speed by 1000%</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Altium", "Power Electronics", "CAN Protocol", "Circuit Design"].map((tech) => (
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
