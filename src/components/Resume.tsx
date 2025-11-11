import { Download, FileText } from "lucide-react";
import { Button } from "./ui/button";

const Resume = () => {
  return (
    <section id="resume" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Resume</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Download my complete resume to learn more about my experience and qualifications.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="project-card text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
              <FileText size={40} className="text-accent" />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Avi Guha - Resume</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span className="font-medium">Engineering Physics Student</span>
            </div>
            <div className="text-muted-foreground">
              University of British Columbia • GPA: 83%
            </div>
            <div className="text-muted-foreground">
              Expected Graduation: May 2027
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <a href="/Avi_Guha_Resume.docx" download>
                <Download size={20} />
                Download Resume
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a 
                href="https://www.linkedin.com/in/avi-guha/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View LinkedIn Profile
              </a>
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-semibold text-accent mb-2">Contact</p>
                <p className="text-muted-foreground">avi.guha05@gmail.com</p>
                <p className="text-muted-foreground">403-805-9675</p>
              </div>
              <div>
                <p className="font-semibold text-accent mb-2">Location</p>
                <p className="text-muted-foreground">Vancouver, BC</p>
                <p className="text-muted-foreground">Canada</p>
              </div>
              <div>
                <p className="font-semibold text-accent mb-2">Links</p>
                <a 
                  href="https://github.com/avi-guha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-accent transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/avi-guha/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
