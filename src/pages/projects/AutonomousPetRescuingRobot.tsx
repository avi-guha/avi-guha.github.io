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
    <div className="min-h-screen animate-page-fade-in">
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

              <h2 className="text-2xl font-semibold mb-4 text-accent">Introduction to the Project</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                When I first heard about this project (building an autonomous robot that could navigate a course, detect "stranded pets," and
                rescue them), I knew it was exactly the kind of challenge I wanted. For reference, this project was part of a university competition 
                in which 16 teams competed to build the most effective pet-rescuing robot. 
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With my team of three other Engineering Physics students (shoutout to Jack Bradley, Ryan Mahinpey, and Kazu Nakane), we set out to 
                design a robot from the ground up. We had all had some experience with engineering through design team work so we decided to throw 
                ourselves into the deep end and try something completely different. We decided to stray from the typical lidar-sensor approach to 
                instead focus on a computer vision-based solution. 
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Project Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img src="/projects/H-Bridge.png" alt="H-Bridge PCB Design" className="w-full rounded-lg shadow-md" />
                <img src="/projects/RobotMotherBoardSch.png" alt="Robot Motherboard Schematic" className="w-full rounded-lg shadow-md" />
                <img src="/projects/MotherboardPCB.png" alt="Motherboard PCB" className="w-full rounded-lg shadow-md" />
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Hardware Journey: From Breadboard to Custom PCBs</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We started prototyping our circuits with breadboards, testing motor drivers and sensor arrays. But it quickly became clear that for reliability 
                and compactness, we needed custom PCBs. Designing our first H-Bridge motor driver PCB was a steep learning curve. I had to learn 
                about trace widths, thermal management, and proper grounding techniques. After several iterations in KiCad, we finally had a board 
                that could handle the current demands of our motors without overheating.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The motherboard was even more challenging. I had to route power and signals for an ESP-32, multiple motor drivers, line sensors, 
                and a Raspberry Pi camera interface, all while keeping the board small enough to fit in our chassis. I learned more about multi-layer 
                PCB design and EMI mitigation than I ever thought I would. When the first batch of PCBs arrived and everything powered up on the 
                first try, it was an incredible feeling of accomplishment.
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
                in Roboflow, and learning about data augmentation to expand our limited dataset. We did everything from taking pictures in 
                near pitch darkness to capturing objects at weird angles to make the model robust.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My first trained model was terrible. It detected "pets" everywhere, including in shadows, on walls, and occasionally in empty space. 
                But I kept iterating: adjusting confidence thresholds, adding more training data, experimenting with different YOLO architectures. 
                When we finally broke 90% accuracy, our team decided that the model was competition-ready. The robot was capable of differentiating 
                between actual "pets" and random objects on the course with impressive reliability (like it was a sentient being).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Getting the Raspberry Pi to run inference fast enough was another challenge. I optimized the model for edge deployment, 
                implemented threading to separate capture from processing, and established a reliable UART protocol to send detection results 
                to the ESP-32 at 115200 baud with zero packet loss. This was all done so that the ESP-32 could handle real-time motor control 
                without being bogged down by heavy image processing.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Firmware Challenge: Real-Time Everything</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Making everything work together in real-time was perhaps the hardest part. The robot needed to simultaneously follow lines, 
                watch for obstacles, process camera feeds, and respond to motor commands, all without missing a beat. Enter real time operating systems.
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
                The joy of seeing a robot you built from scratch come to life is indescribable. This experience has fueled my passion for robotics 
                and AI, and I can't wait to tackle my next big challenge.
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
