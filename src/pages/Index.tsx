import Navigation from "../components/Navigation";
import Hero from "../components/Hero";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen animate-page-fade-in bg-background">
      <Navigation />
      <main className="flex-1 pb-16">
        <Hero />
      </main>
    </div>
  );
};

export default Index;
