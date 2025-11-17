import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const ToneLens = () => {
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
                AI & Machine Learning
              </span>
            </div>

            <h1 className="mb-6">ToneLens</h1>
            
            <div className="flex gap-4 mb-12">
              <a
                href="https://github.com/avi-guha/HACKCAMP-2025-V2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Github size={20} />
                View Code
              </a>
            </div>

            <div className="mb-8">
              <img 
                src="/projects/tonelens_logo.png" 
                alt="ToneLens Logo"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                An AI-powered communication assistant that helps individuals decode the emotional tone 
                of text messages. Built with Gemini AI to analyze conversation screenshots and provide 
                real-time tone detection, helping users navigate digital communication with confidence.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We've all been there—staring at a text message, wondering if someone's being sarcastic, 
                angry, or just joking around. For some people, especially those with social anxiety or 
                neurodivergent individuals, this uncertainty can make digital communication incredibly 
                stressful. I wanted to build something that could take that guesswork out of the equation.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                ToneLens was born during HackCamp 2025, where I focused on creating a tool that goes beyond 
                simple sentiment analysis. Using Google's Gemini AI, the application doesn't just tell you 
                if a message is positive or negative—it breaks down the nuanced tones like sarcasm, weariness, 
                casualness, and even passive-aggressiveness. It's like having a friend who's really good at 
                reading between the lines, always there to help you understand what someone really means.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
              <ul className="space-y-3 mb-8">
                <li className="text-muted-foreground">
                  <strong className="text-foreground">Screenshot Analysis:</strong> Upload a conversation 
                  screenshot and get a complete breakdown of each message's tone with confidence percentages
                </li>
                <li className="text-muted-foreground">
                  <strong className="text-foreground">Real-Time Tone Detection:</strong> Type your message 
                  and see how it might be perceived before you hit send
                </li>
                <li className="text-muted-foreground">
                  <strong className="text-foreground">Multi-Tone Analysis:</strong> Detects complex emotional 
                  layers including sarcasm, weary, casual, and formal tones simultaneously
                </li>
                <li className="text-muted-foreground">
                  <strong className="text-foreground">Gemini AI Integration:</strong> Leverages Google's 
                  advanced language model for nuanced understanding of context and subtext
                </li>
                <li className="text-muted-foreground">
                  <strong className="text-foreground">Intuitive UI:</strong> Clean, accessible interface 
                  with visual tone indicators and confidence metrics
                </li>
              </ul>

              <div className="my-8 grid md:grid-cols-2 gap-4">
                <img 
                  src="/projects/tonelens_input.png" 
                  alt="ToneLens text input interface"
                  className="w-full rounded-lg shadow-lg"
                />
                <img 
                  src="/projects/tonelens_analysis.png" 
                  alt="ToneLens tone analysis results"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technical Implementation</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The backend is powered by Gemini AI's natural language processing capabilities, which I 
                integrated to handle both image-based conversation analysis and text-based real-time tone 
                detection. The challenge was designing prompts that would return consistent, actionable tone 
                classifications rather than vague sentiment scores.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                I built a custom parsing system that structures Gemini's responses into quantifiable tone 
                metrics, displaying them as percentage-based confidence scores. The frontend visualizes these 
                results with gradient progress bars that make the tone immediately understandable at a glance—
                no need to interpret raw data or complicated reports.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                For screenshot analysis, I implemented image preprocessing to ensure text extraction works 
                reliably across different messaging apps and conversation formats. The system can handle 
                multi-turn conversations, analyzing each message independently while maintaining awareness 
                of the conversational context.
              </p>

              <div className="my-8">
                <img 
                  src="/projects/tonelens_conversation.png" 
                  alt="ToneLens conversation breakdown"
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Impact & Learning</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Building ToneLens taught me a lot about the intersection of AI and accessibility. It's not 
                just about throwing a language model at a problem—it's about understanding user needs deeply 
                enough to design an interface that makes AI insights actually useful and digestible.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                This project also deepened my understanding of prompt engineering. Getting Gemini to return 
                consistent, structured tone classifications required iterative refinement of the prompts and 
                careful consideration of edge cases. I learned that the quality of AI outputs is heavily 
                dependent on how well you can communicate what you need from the model.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Most importantly, ToneLens represents my belief that technology should reduce barriers, not 
                create them. If this tool can help even one person feel more confident in their digital 
                conversations, then it's served its purpose.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent mt-8">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Gemini AI</span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Natural Language Processing</span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Image Processing</span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">API Integration</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ToneLens;
