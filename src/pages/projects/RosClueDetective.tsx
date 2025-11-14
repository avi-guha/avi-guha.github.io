import { useEffect } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const RosClueDetective = () => {
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
                Machine Learning
              </span>
            </div>

            <h1 className="mb-6">ROS Clue Detective</h1>
            
            <div className="flex gap-4 mb-12">
              <a
                href="https://github.com/avi-guha"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Github size={20} />
                View Code
              </a>
            </div>

            <div className="mb-12 flex justify-center">
              <img 
                src="/projects/ROS.png" 
                alt="ROS Clue Detective Robot" 
                className="w-full max-w-2xl rounded-lg shadow-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                I dove headfirst into machine learning with this project, teaching myself everything from scratch—no pre-trained models allowed. 
                The challenge was to build a robot in ROS Gazebo that could navigate city streets while reading traffic signs. I designed my 
                own CNN architecture, collected and augmented training data, and implemented an imitation learning system that learned to drive 
                by watching demonstrations. After weeks of training and debugging, I hit 95%+ sign recognition accuracy and achieved zero collisions. 
                This project sparked my fascination with how robots can learn to perceive and interact with the world.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Key Achievements</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Designed and trained custom CNN architecture achieving 95%+ accuracy on traffic sign classification</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Implemented advanced data augmentation pipeline (rotation, scaling, color jittering) expanding dataset 10x</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Developed vision-only imitation learning system achieving zero collisions in dynamic obstacle environments</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Engineered custom reinforcement learning reward function optimizing for safety and efficiency simultaneously</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">Integrated real-time perception, planning, and control modules within ROS framework for seamless operation</span>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technical Innovation</h2>
              <p className="text-muted-foreground mb-6">
                Self-directed the implementation of end-to-end imitation learning and reinforcement learning algorithms, mastering 
                state-of-the-art ML techniques through independent research and experimentation. The system successfully demonstrated 
                human-level performance in navigation tasks while maintaining computational efficiency suitable for real-time robotics applications, 
                showcasing proficiency in PyTorch, OpenCV, ROS, and autonomous systems design.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RosClueDetective;
