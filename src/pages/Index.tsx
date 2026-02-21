import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import { User, Briefcase, FolderOpen, FileText, Mail } from "lucide-react";

const sections = [
  { label: "About", path: "/about", icon: User },
  { label: "Experience", path: "/experience", icon: Briefcase },
  { label: "Projects", path: "/projects", icon: FolderOpen },
  { label: "Resume", path: "/resume", icon: FileText },
  { label: "Contact", path: "/contact", icon: Mail },
];

const SectionTile = ({ section }: { section: typeof sections[number] }) => {
  const Icon = section.icon;

  return (
    <Link
      to={section.path}
      className="group flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border border-border bg-card/60 hover:bg-card hover:border-foreground/20 transition-all duration-300 hover:shadow-md hover:scale-[1.04]"
    >
      <div className="w-10 h-10 rounded-xl bg-foreground/8 flex items-center justify-center group-hover:bg-foreground/15 transition-colors">
        <Icon size={18} className="text-foreground/70 group-hover:text-foreground transition-colors" />
      </div>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {section.label}
      </span>
    </Link>
  );
};

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen animate-page-fade-in">
      <Navigation />
      <main className="flex-1">
        <Hero />

        {/* Section tiles in '+' pattern */}
        <div className="max-w-md mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-3 gap-3">
            {/* Row 1: About centered */}
            <div />
            <SectionTile section={sections[0]} />
            <div />
            {/* Row 2: Experience, Projects, Resume */}
            <SectionTile section={sections[1]} />
            <SectionTile section={sections[2]} />
            <SectionTile section={sections[3]} />
            {/* Row 3: Contact centered */}
            <div />
            <SectionTile section={sections[4]} />
            <div />
          </div>
        </div>
      </main>

      <footer className="bg-muted/50 py-8 border-t border-border">
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
