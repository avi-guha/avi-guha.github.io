import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import ThreeBackground from "./ThreeBackground";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-hero relative">
      <ThreeBackground />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-up">
          <h1 className="text-balance mb-6">
            Avi Guha
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            Engineering Physics Student
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
            Passionate about exploring the intersection of physics and engineering to solve complex real-world problems. 
            Currently pursuing Engineering Physics with a focus on innovation and practical applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => scrollToSection('projects')}
              className="btn-hero"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-hero-outline"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center space-x-6 mb-16">
            <a 
              href="https://github.com/avi-guha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/avi-guha/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:avi.guha05@gmail.com"
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
              aria-label="Email Contact"
            >
              <Mail size={24} />
            </a>
          </div>

          <button 
            onClick={() => scrollToSection('about')}
            className="text-muted-foreground hover:text-accent transition-colors duration-200 animate-bounce"
            aria-label="Scroll to About section"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;