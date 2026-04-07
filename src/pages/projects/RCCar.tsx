import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const RCCar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/projects');
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
                Embedded Systems
              </span>
            </div>

            <h1 className="mb-6">PS4 Controller RC Car</h1>
            
            <div className="flex gap-4 mb-12">
              <a
                href="https://github.com/avi-guha/RC-Car"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Github size={20} />
                View Code
              </a>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Programmed an ESP-32 microcontroller to interface with a PS4 controller via Bluetooth, 
                enabling precise control of a servo motor and brushless DC motor. Includes custom 3D-modeled 
                chassis designed in Solidworks.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">How It Started: Curiosity About Bluetooth</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This project began with a simple question: could I make a PS4 controller talk to something I built? I'd always been 
                fascinated by how wireless controllers work, and I wanted to peek behind the curtain. What started as a curiosity 
                about Bluetooth protocols turned into my first complete mechatronics project, combining electronics, programming, 
                and mechanical design into something I could actually drive around my house.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I chose the ESP-32 because it has built-in Bluetooth capabilities and plenty of community support. But making it 
                communicate with a PS4 controller wasn't as straightforward as I'd hoped. I had to dig deep into Bluetooth HID 
                protocols, understand how the DualShock 4 reports its data, and figure out how to pair without the PlayStation's 
                built-in handshaking.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Motor Challenge: Brushless and Temperamental</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For propulsion, I wanted to use a brushless DC motor because of its efficiency and power-to-weight ratio. But 
                brushless motors are notoriously tricky. They need electronic speed controllers (ESCs) and proper timing to spin 
                correctly. I spent a frustrating weekend figuring out why my motor would just twitch and beep instead of spinning 
                smoothly, eventually learning about ESC calibration and PWM signal timing.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The servo motor for steering was comparatively simple, but integrating it with the parallel wheel mechanism 
                required careful geometry. I had to ensure that the steering angles on both front wheels were coordinated properly 
                to avoid tire scrub and unpredictable handling. This was my first real experience with Ackermann steering geometry, 
                and I have a much better appreciation for automotive engineers now.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Learning CAD: From Sketch to Reality</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I knew I'd need a custom chassis to house everything, so I taught myself Solidworks over a few weekends. My first 
                design was terrible. The motor mounts didn't align, the battery compartment was too small, and I'd completely 
                forgotten to leave room for the wiring. But each iteration got better. I learned about designing for 3D printing: 
                adding fillets to reduce stress concentrations, orienting parts to minimize support material, and accounting for 
                printer tolerances in press-fit joints.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Watching my design emerge from the 3D printer, layer by layer, and then actually holding something I'd designed 
                from scratch. That was a special moment. When I mounted the electronics and everything fit together perfectly, 
                I felt like I'd leveled up as an engineer.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Magical First Drive</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I still remember the first time I pushed forward on the analog stick and the car actually moved. There's something 
                uniquely satisfying about translating your physical inputs into mechanical motion through a system you built entirely 
                yourself. The car wasn't perfect (the steering had some dead zones, the throttle response was a bit jerky), but it worked.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I spent the following weeks refining the firmware. I added exponential curves to the throttle for smoother 
                acceleration, implemented dead-zone compensation for the steering, and even added a "turbo mode" that boosted 
                the top speed when you held down a shoulder button. Each improvement made the car more fun to drive and taught 
                me something new about control systems.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Bluetooth connection between PS4 controller and ESP-32 using HID protocol</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Bidirectional electronic speed controller with brushless DC motor for propulsion</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Servo motor steering control with parallel wheel mechanism and proper Ackermann geometry</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Custom 3D-modeled chassis designed in Solidworks, optimized for FDM printing</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Software features including exponential throttle curves, dead-zone compensation, and turbo mode</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">What I Learned</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This project was my first taste of true full-stack engineering, spanning from low-level protocol work to mechanical 
                design. I learned that building something real requires bridging many different domains, and the interfaces between 
                those domains are often where the hardest problems live. The Bluetooth library doesn't know about motor timing; the 
                CAD software doesn't know about wire routing; and none of it works until you figure out how to make all the pieces 
                talk to each other.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                More importantly, this project gave me confidence. Before this, I thought building something like an RC car from 
                scratch was beyond me. After finishing it, I knew that with enough persistence and willingness to learn, I could 
                tackle much bigger challenges. That mindset has served me well ever since.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["C++", "ESP-32", "Bluetooth HID", "Solidworks", "3D Printing", "Brushless Motors", "PWM Control"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
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

export default RCCar;
