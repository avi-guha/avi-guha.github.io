import { ArrowLeft, Github } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";

const AFMMaterialsAnalysis = () => {
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
                Research
              </span>
            </div>

            <h1 className="mb-6">2D Materials AFM Analysis</h1>
            
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
                Developed a Java application using OpenCV to visualize and analyze progressive decay of monolayer 
                graphene and MXene flakes. Implemented PID-controlled humidity regulation for atomic force 
                microscopy experiments.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">PID-controlled fluid cell regulating humidity from 0-95% RH in AFM environment</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Full-cycle Java application for visualizing material degradation analysis</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Examining meniscus effects on 2D graphene and MXene materials</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Enhanced experimental precision for researchers studying monolayer flake decay</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Java", "OpenCV", "PID Control", "Materials Science"].map((tech) => (
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

export default AFMMaterialsAnalysis;
