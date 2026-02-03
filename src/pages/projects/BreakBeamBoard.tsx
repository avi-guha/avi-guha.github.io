import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const BreakBeamBoard = () => {
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

            <h1 className="mb-6">Break Beam Board</h1>
            
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
                src="/projects/Breakbeam.png" 
                alt="Break Beam Board" 
                className="w-full max-w-2xl rounded-lg shadow-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Engineered a high-reliability ball detection system for UBC Thunderbots' autonomous soccer robots competing at RoboCup. 
                Redesigned the previous sensor architecture to eliminate false-positive triggers caused by field debris, implementing a novel 
                multi-photodiode AND-gate configuration that improved detection accuracy to near 100% while maintaining sub-millisecond response times.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Frustrating Problem</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                When I first joined the Thunderbots electrical team, one of the persistent complaints from the software developers 
                was about the ball detection system. The robot would think it had the ball when it didn't, triggering the dribbler 
                and kicker at random moments. During matches, this meant missed opportunities and wasted energy. The false positive 
                rate was estimated at over 95% during particularly dusty field conditions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The existing design used a simple single break-beam sensor: an IR LED on one side, a photodiode on the other, and 
                when something broke the beam, it registered as "ball present." The problem? Debris, dust, even slight misalignments 
                could trigger false readings. The software team had implemented filtering and timeouts, but these were band-aids 
                on a fundamentally unreliable sensor.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Rethinking the Architecture</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I spent a lot of time just watching the robot and thinking about what made a real ball detection different from 
                debris. A golf ball is large and would block multiple beams if we had them. Debris particles are small and might 
                block one beam but not others. This insight led to my solution: require multiple simultaneous beam breaks before 
                registering a detection.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Instead of a single photodiode, I implemented an array of photodiodes arranged so that a golf ball would block all 
                of them but a dust particle couldn't. The key was implementing this as a hardware AND-gate: all sensors had to trigger 
                simultaneously for the output to go high. This wasn't just filtering; it was a fundamental architectural change that 
                made the system robust by design rather than by compensation.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The PCB Design Challenge</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The physical layout was tricky. I had to position multiple IR emitters and detectors in a compact space, ensure they 
                were precisely aligned, and protect them from the harsh competition environment: impacts, vibrations, and that 
                ever-present dust. I designed a custom PCB that integrated all the sensors with proper optical isolation between 
                channels to prevent crosstalk.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Implementing the AND-gate logic using analog components was an interesting challenge. I could have used a microcontroller, 
                but that would have added latency and complexity. Instead, I designed a purely analog solution using the photodiode 
                currents directly. Only when all channels detected an obstruction would the output transistor turn on. This achieved 
                sub-millisecond response times while maintaining the fail-safe property.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Achievements</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Eliminated 95%+ false-positive detections through innovative series photodiode architecture</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Implemented digital logic AND-gate configuration using analog components for fail-safe operation</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Designed PCB layout optimizing signal integrity and minimizing electromagnetic interference</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Integrated seamlessly with existing dribbler control system for real-time ball possession feedback</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Achieved sub-millisecond response time for competition-critical detection speed</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Lessons Learned</h2>
              <p className="text-muted-foreground mb-6">
                This project taught me that sometimes the best solution isn't adding more software. It's redesigning the hardware 
                to make the problem go away. The software team had spent significant effort working around a fundamentally flawed 
                sensor. By fixing the sensor, I eliminated the need for all that complexity.
              </p>
              <p className="text-muted-foreground mb-6">
                I also learned about the importance of understanding the failure modes you're trying to prevent. I didn't just try 
                to make a "better" sensor; I specifically analyzed what was causing the false positives and designed a system that 
                was inherently immune to those failure modes. That targeted approach (understanding the root cause before designing
                the solution) has become a core part of how I approach engineering problems.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["PCB Design", "Photodiodes", "IR Optoelectronics", "Digital Logic", "Altium Designer", "Analog Circuit Design"].map((tech) => (
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

export default BreakBeamBoard;
