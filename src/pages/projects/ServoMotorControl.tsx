import { ArrowLeft, Github } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";

const ServoMotorControl = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Portfolio
            </Link>

            <div className="mb-8">
              <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                Electronics
              </span>
            </div>

            <h1 className="mb-6">Servo Speed Motor Control</h1>
            
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
                Developed a fully analog circuit to control and adjust motor output speed using a PID feedback loop 
                implemented with digital logic components and photonics.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">PID feedback loop implemented completely with digital circuit components</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Utilized flip-flops, counters, and latches for motor speed storage</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Speed based on phototransistor readings for precise control</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Digital Logic", "Operational Amplifiers", "DAC", "Circuit Design"].map((tech) => (
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

export default ServoMotorControl;
