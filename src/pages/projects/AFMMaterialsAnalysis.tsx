import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const AFMMaterialsAnalysis = () => {
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
                Research
              </span>
            </div>

            <h1 className="mb-6">2D Materials AFM Analysis</h1>
            
            <div className="flex gap-4 mb-12">
              <a
                href="https://github.com/avi-guha/EdgeDetectionApp"
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
                Conducted materials science research developing both hardware and software solutions for analyzing 
                2D material degradation. Created a complete experimental and computational pipeline combining precision 
                environmental control with advanced image processing for atomic force microscopy applications.
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-accent">Part 1: PID-Controlled Humidity System</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">Hardware & Control System</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Designed and implemented a precision environmental control system for atomic force microscopy experiments, 
                enabling real-time humidity regulation critical for studying meniscus effects on 2D materials.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Engineered custom PID-controlled fluid cell achieving 0-95% RH range with ±2% accuracy</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Implemented feedback control algorithms for stable environmental conditions during AFM scanning</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Integrated real-time sensor data acquisition for monitoring meniscus effects on graphene and MXene</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Enhanced experimental precision enabling reproducible measurements of 2D material behavior</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-6 text-accent mt-12">Part 2: Java Image Analysis Application</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">Computational Analysis Pipeline</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Developed full-cycle Java application leveraging OpenCV for automated visualization and quantitative 
                analysis of monolayer material degradation, transforming raw AFM data into actionable research insights.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Built complete data processing pipeline from AFM image import to statistical degradation analysis</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Implemented OpenCV algorithms for edge detection, flake tracking, and temporal decay visualization</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Generated quantitative metrics tracking progressive decay of graphene and MXene monolayer flakes</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Created interactive visualization tools enabling researchers to explore material degradation patterns</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent mt-8">Research Impact</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                This integrated hardware-software approach significantly advanced the lab's capability to study 
                environmental effects on 2D materials. The PID control system enabled previously impossible experiments 
                at controlled humidity levels, while the analysis software accelerated data processing from days to minutes, 
                facilitating rapid iteration and deeper insights into material behavior.
              </p>

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
