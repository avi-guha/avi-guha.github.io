import Navigation from "../components/Navigation";
import Hero from "../components/Hero";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen animate-page-fade-in bg-background">
      <Navigation />
      <main className="flex-1 pb-16">
        <Hero />
      </main>

      <footer className="bg-muted/50 py-8 border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Avi Guha. Built with passion for engineering physics.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
