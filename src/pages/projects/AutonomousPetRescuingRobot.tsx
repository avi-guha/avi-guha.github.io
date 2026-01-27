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
                href="https://github.com/avi-guha/ROBOT"
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

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Beginning: Where It All Started</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                When I first heard about this project (building an autonomous robot that could navigate a course, detect "stranded pets," and
                rescue them), I knew it was exactly the kind of challenge I wanted. But honestly, I had no idea how deep the rabbit hole would go.
                I'd never designed a custom PCB before, never trained a machine learning model, and my real-time operating system experience was 
                basically zero. What I had was curiosity and a willingness to fail until I figured it out.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The first few weeks were humbling. I spent entire nights reading datasheets for motor drivers, watching YouTube tutorials on 
                PCB design, and trying to understand why my first H-bridge prototype kept releasing the magic smoke. But each failure taught me 
                something, and slowly the pieces started coming together.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Project Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img src="/projects/H-Bridge.png" alt="H-Bridge PCB Design" className="w-full rounded-lg shadow-md" />
                <img src="/projects/RobotMotherBoardSch.png" alt="Robot Motherboard Schematic" className="w-full rounded-lg shadow-md" />
                <img src="/projects/MotherboardPCB.png" alt="Motherboard PCB" className="w-full rounded-lg shadow-md" />
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Hardware Journey: From Breadboard to Custom PCBs</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I started prototyping on breadboards, which worked fine until the motors drew enough current to melt the jumper wires. That's 
                when I realized we needed real PCBs. I taught myself Altium Designer over a weekend, made about a dozen rookie mistakes on my 
                first board, and eventually produced an H-Bridge that could handle the current without catching fire.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The motherboard was even more challenging. I had to route power and signals for an ESP-32, multiple motor drivers, line sensors, 
                and a Raspberry Pi camera interface, all while keeping the board small enough to fit in our chassis. I learned about ground planes, 
                decoupling capacitors, and why you should never run high-current traces next to sensitive analog signals the hard way.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Implementing PID motor control was another adventure. I spent a week tuning the constants, watching the robot oscillate wildly 
                before settling into smooth, precise movements. There's something deeply satisfying about tweaking a few numbers and seeing your 
                robot go from unstable jittering to buttery smooth curves.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Teaching a Robot to See: My First Dive into Computer Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The computer vision component pushed me into completely unfamiliar territory. I'd heard of YOLO (You Only Look Once) but had 
                never actually trained a model. I started by collecting hundreds of photos of our target objects, meticulously labeling them 
                in Roboflow, and learning about data augmentation to expand our limited dataset.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My first trained model was terrible. It detected "pets" everywhere, including in shadows, on walls, and occasionally in empty space. 
                But I kept iterating: adjusting confidence thresholds, adding more training data, experimenting with different YOLO architectures. 
                When we finally broke 90% accuracy, I felt like I'd unlocked a superpower. The robot could actually see and understand its environment.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Getting the Raspberry Pi to run inference fast enough was another challenge. I optimized the model for edge deployment, 
                implemented threading to separate capture from processing, and established a reliable UART protocol to send detection results 
                to the ESP-32 at 115200 baud with zero packet loss.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Firmware Challenge: Real-Time Everything</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Making everything work together in real-time was perhaps the hardest part. The robot needed to simultaneously follow lines, 
                watch for obstacles, process camera feeds, and respond to motor commands, all without missing a beat. Enter FreeRTOS.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I spent weeks learning about task priorities, semaphores, and message queues. Using the ESP-32's dual cores, I architected a 
                system where one core handled time-critical motor control (running at &lt;1ms loops) while the other managed sensor processing 
                and communication. The breakthrough came when I realized I could use interrupt-driven sampling for the line sensors, freeing 
                up CPU cycles for the heavy lifting.
              </p>

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

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Moment It All Came Together</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'll never forget the first successful run. After months of work, late nights debugging, and more failures than I can count, 
                the robot smoothly navigated the course, spotted a "pet," drove over, and successfully picked it up. My teammates and I just 
                stood there in disbelief for a moment before erupting in cheers. All those frustrating hours suddenly felt worth it.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This project fundamentally changed how I see engineering. It taught me that building something complex isn't about being 
                brilliant. It's about being persistent, breaking problems into smaller pieces, and not being afraid to learn new things. 
                I went from never having designed a PCB to shipping custom hardware, from never training an ML model to achieving competition-ready 
                accuracy. That transformation is what I'm most proud of.
              </p>

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
