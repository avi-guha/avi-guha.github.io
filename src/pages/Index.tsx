import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Resume from "../components/Resume";
import Contact from "../components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
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

export default Index;
