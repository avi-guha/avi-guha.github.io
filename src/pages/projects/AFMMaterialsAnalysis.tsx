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
              <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-none">
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

              <h2 className="text-2xl font-semibold mb-4 text-accent">My First Real Research Experience</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Walking into a real research lab for the first time was intimidating. The atomic force microscope looked like 
                something from a science fiction movie, and everyone around me seemed to speak a language of monolayers, van der 
                Waals forces, and substrate interactions that I barely understood. But I'd been given a problem to solve: figure 
                out how humidity affects the degradation of 2D materials. That clarity of purpose helped me focus.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The research focused on graphene and MXenes, exotic materials just a few atoms thick with incredible properties. 
                But these materials are also delicate, and understanding how they degrade in different conditions is crucial for 
                any practical applications. My job was to build the tools that would let us study this degradation systematically.
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-accent">Part 1: PID-Controlled Humidity System</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">The Problem: You Can't Measure What You Can't Control</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The existing AFM setup had no way to control humidity during experiments. This was a huge limitation because humidity 
                dramatically affects how water forms a meniscus between the AFM tip and the sample, which in turn affects 
                the wear patterns we were trying to study. We needed precise control from near-zero to 95% relative humidity, 
                with stability good enough to run experiments that lasted hours.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I designed a custom fluid cell, essentially a sealed chamber around the AFM tip and sample with controlled gas 
                flow. Dry nitrogen would lower humidity; bubbling nitrogen through water would raise it. The trick was maintaining 
                stable conditions without disturbing the incredibly sensitive AFM measurements.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-foreground">Building the Control System</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I implemented a PID controller to regulate the gas flow based on real-time humidity sensor readings. The tuning 
                process was fascinating. Too aggressive and the system would oscillate wildly; too conservative and it would 
                take forever to reach the setpoint. I learned to characterize the system's response, estimate time constants, 
                and dial in parameters that achieved ±2% accuracy with good settling time.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                One unexpected challenge was sensor placement. The humidity sensor needed to measure conditions right at the 
                sample surface, but it couldn't interfere with the AFM tip or create air currents that would disturb measurements. 
                After several iterations, I found a configuration that gave accurate readings without compromising experimental quality.
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
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">From Images to Insights</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Once we could control the experimental conditions, we started generating a lot of AFM images. Each scan showed 
                the topography of our 2D material samples at atomic resolution, and we needed to track how these materials changed 
                over time and under different conditions. The existing workflow was painfully manual. Researchers would eyeball 
                images, draw boundaries around flakes, and estimate degradation by hand. This was slow, subjective, and didn't scale.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I proposed building software to automate this process, and the lab enthusiastically agreed. What followed was 
                an intensive deep-dive into image processing, where I taught myself OpenCV and applied computer vision 
                techniques to a domain I'd never encountered before.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-foreground">The Technical Challenges</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                AFM images aren't like photographs. They represent height data, often with nanometer-scale variations and various 
                artifacts from the scanning process. I had to develop preprocessing pipelines that would normalize images, remove 
                scan-line artifacts, and enhance the edges of material flakes without introducing false features.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Edge detection was particularly tricky. The boundary between a monolayer flake and the substrate might be just 
                a few angstroms high, essentially invisible in a standard image. I experimented with gradient-based methods, 
                adaptive thresholding, and eventually settled on a multi-scale approach that could reliably identify flake 
                boundaries across different materials and imaging conditions.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The temporal tracking component (following how flakes changed across repeated scans) required solving a registration 
                problem. Samples might shift slightly between scans, so I implemented feature matching algorithms to align images 
                before computing degradation metrics.
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

              <h2 className="text-2xl font-semibold mb-4 text-accent">What Research Taught Me</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Research is messier than coursework. There's no answer key, and sometimes you spend weeks on an approach 
                that turns out to be a dead end. But I also learned that engineering skills can unlock new scientific 
                possibilities. The researchers I worked with were brilliant at understanding physics, but they needed 
                someone who could build the tools to test their hypotheses. Being that bridge between engineering and 
                science was incredibly rewarding.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I also learned to communicate across disciplines. Explaining why my PID controller needed certain tuning 
                parameters, or why my image processing algorithm made certain assumptions. These conversations required 
                translating between engineering and physics vocabularies. That skill has been valuable in every collaborative 
                project since.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Java", "OpenCV", "PID Control", "Materials Science", "AFM", "Image Processing", "Data Analysis"].map((tech) => (
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
