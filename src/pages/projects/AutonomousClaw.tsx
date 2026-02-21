import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const AutonomousClaw = () => {
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
                Mechatronics
              </span>
            </div>

            <h1 className="mb-6">APSC 101 Autonomous Claw</h1>
            
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

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                First microcontroller project featuring an Arduino-controlled claw mechanism capable of picking 
                up objects of varying sizes, shapes, and masses. Hands-on experience with metalworking and 
                mechanical design.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Where It All Began</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every engineer has that first project, the one that transforms vague interest into genuine passion. 
                For me, it was this autonomous claw. As a first-year APSC 101 project, the task seemed simple: build 
                a mechanism that could pick up various objects. But what happened during this project fundamentally 
                changed my trajectory as an engineer.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Before this, I had never programmed a microcontroller, never used a servo motor, and certainly never 
                fabricated anything from metal. I was just a student who thought engineering seemed cool but had no 
                idea what actually building things felt like. This project changed everything.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Learning to Speak Arduino</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My first struggle was simply getting the Arduino to do anything. I remember spending hours trying to 
                understand why my LED wouldn't blink, only to discover I'd wired it backwards. But each small victory 
                built confidence. When I finally got a servo to move by pressing a button, I felt like I'd unlocked 
                some kind of magic power.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The programming was simple by any objective measure, just basic control logic for operating the claw's 
                open/close mechanism and arm positioning. But writing code that made physical things move was 
                intoxicating. I started experimenting beyond the requirements, adding features like variable grip 
                strength and programmed movement sequences. The Arduino became my gateway into embedded systems.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Getting My Hands Dirty</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The mechanical fabrication was an adventure in itself. I'd never worked in a machine shop before, 
                and the first time I used an angle grinder I was genuinely terrified. Learning to cut, bend, and 
                drill metal, to take raw material and transform it into functional parts, was deeply satisfying in 
                a way I hadn't anticipated.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My first claw design was hilariously bad. The fingers were too short, the pivot points were wrong, 
                and it could barely grip a tennis ball without dropping it. But each iteration taught me something: 
                about mechanical advantage, about friction and grip surfaces, about the difference between what 
                looks good in a sketch and what actually works.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The requirement to handle objects of varying sizes, shapes, and masses forced me to think about 
                adaptability. I ended up with a compliant mechanism that could conform to different objects, not 
                through sophisticated sensors, but through clever mechanical design that let the claw naturally 
                adjust its grip.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Moment of Truth</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Testing day was nerve-wracking. Our claw had to pick up a variety of objects (some round, some
                irregular, some heavy, some slippery) and place them in a target zone. When it successfully gripped
                the first object and lifted it, I felt a rush of pride that I still remember vividly. This thing 
                I'd built from scratch, programmed myself, and iterated through multiple failures, actually worked.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The imperfections were obvious in hindsight. The arm was wobbly, the movements were jerky, and 
                the grip wasn't always reliable. But none of that mattered because I'd learned something far more 
                valuable than building a perfect claw: I'd learned that I could figure things out. Give me a 
                problem, some tools, and enough time, and I could build a solution.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Arduino microcontroller programming for autonomous operation</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Versatile claw design for objects of varying sizes, shapes, and mass</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Hands-on metalworking and fabrication experience</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Compliant mechanism design for adaptive gripping</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Foundation for future embedded systems and robotics projects</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Spark That Started It All</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Looking back, this simple claw project was the most important thing I built in my first year. Not 
                because it was impressive (it wasn't), but because it showed me what engineering could feel like. 
                The combination of programming, electronics, and mechanical design; the iterative process of 
                building, testing, and improving; the satisfaction of creating something functional from nothing. These 
                experiences ignited a passion that has driven everything I've done since.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every project I've taken on since then (the autonomous robots, the power electronics, the competition
                hardware) can trace its roots back to this simple claw. It wasn't about what I built; it was about
                discovering that I wanted to spend my life building things.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Arduino", "C++", "Servo Motors", "Mechanical Design", "Metalworking", "Prototyping"].map((tech) => (
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

export default AutonomousClaw;
