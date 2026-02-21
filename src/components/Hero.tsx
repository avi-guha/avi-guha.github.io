import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-12 flex items-center justify-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/projects" className="btn-hero">
              View My Work
            </Link>
            <Link to="/contact" className="btn-hero-outline">
              Get In Touch
            </Link>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
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
        </div>
      </div>
    </section>
  );
};

export default Hero;