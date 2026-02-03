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
                href="https://github.com/avi-guha/ENPH-353-COMPETITION"
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
                I dove headfirst into machine learning with this project, teaching myself everything from scratch. No pre-trained models allowed. 
                The challenge was to build a robot in ROS Gazebo that could navigate city streets while reading traffic signs. I designed my 
                own CNN architecture, collected and augmented training data, and implemented an imitation learning system that learned to drive 
                by watching demonstrations. After weeks of training and debugging, I hit 95%+ sign recognition accuracy and achieved zero collisions. 
                This project sparked my fascination with how robots can learn to perceive and interact with the world.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Competition That Changed Everything</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The ENPH 353 competition dropped us into unfamiliar territory: build an autonomous robot that could navigate a simulated city, 
                read license plates on parked cars, and identify locations, all without human intervention. The catch? No pre-trained models, 
                no transfer learning, no shortcuts. If we wanted machine learning capabilities, we had to build them from the ground up. I had 
                no prior ML experience, which made this both terrifying and exciting.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My partner and I decided to tackle the problem in two main parts: traffic sign recognition and autonomous navigation. For the sign recognition, my partner
                focused on building a convolutional neural network (CNN) from scratch using TensorFlow/Keras. I took on the navigation system, implementing
                an imitation learning approach where the robot would learn to drive by mimicking expert (aka me) demonstrations.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Building Neural Networks From Scratch</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My first neural network was comically bad. I had vague notions about layers and activations from YouTube videos, but turning 
                that into working code was another matter entirely. My initial traffic sign classifier was basically random and would confidently 
                declare any image to be a stop sign. But failure is a great teacher, and I systematically worked through what I didn't understand.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I spent nights reading papers about convolutional neural networks, understanding why certain architectures work and others don't. 
                I learned about the importance of data, that a model is only as good as what you train it on. I built a comprehensive data 
                augmentation pipeline that would rotate, scale, shift, and color-jitter our limited training images, effectively expanding our 
                dataset by 10x and making the model robust to variations it would encounter in the simulation.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The major breakthrough came through experimentation. I designed a custom CNN architecture with multiple convolutional and pooling layers, batch normalization,
                and dropout for regularization. After countless training runs, tweaking hyperparameters, and debugging code, I finally achieved over 95% accuracy
                on the validation set. Seeing the model correctly identify stop signs, speed limits, and other traffic signs in the simulation was incredibly rewarding.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Teaching a Robot to Drive</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The navigation component required a fundamentally different approach. Instead of classification ("is this a stop sign?"), I
                needed regression: "what steering angle and speed should the robot use right now?" This is where imitation learning came in.
                The idea is simple: demonstrate good driving behavior, record what you see and what you do, then train a network to mimic 
                that behavior.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I spent hours manually driving the robot through the simulation, recording camera images along with my control inputs. But 
                imitation learning has a nasty problem: the model only sees states from good driving. If it makes a small mistake and drifts 
                toward the edge of the road, it's in a state it's never seen before and doesn't know how to recover. My first driving model 
                would go straight beautifully but crash immediately if anything went slightly wrong.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The solution was data augmentation specifically for driving. I would take a straight-ahead image and artificially shift it 
                to simulate being off-center, then label it with a corrective steering angle. This taught the model not just how to drive 
                when everything is perfect, but how to recover when things go wrong. After implementing this, the zero-collision achievement 
                became possible.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Multi-Modal Architecture</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our robot had both a camera and a LIDAR sensor, and I wanted to use both. The challenge was fusing these fundamentally 
                different data types. Images are 2D pixel grids while LIDAR gives sparse distance measurements. I designed a multi-modal 
                fusion network where each modality has its own processing branch before being concatenated and passed through shared layers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The image branch uses convolutional layers to extract visual features: edges, textures, lane markings. The LIDAR branch uses 
                fully connected layers to process the 720-dimensional scan data into a compact representation of nearby obstacles. Combining 
                them gave the robot better situational awareness than either alone. The camera understood the road layout while LIDAR provided 
                precise distance information for obstacle avoidance.
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

              <h2 className="text-2xl font-semibold mb-4 text-accent">Neural Network Architectures</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Multi-Modal Fusion Network (Image + LIDAR)</h3>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <img 
                    src="/projects/Self-Driving-Model.png" 
                    alt="Multi-Modal Fusion Network Architecture" 
                    className="w-full rounded-lg"
                  />
                </div>
                <p className="text-muted-foreground mb-6">
                  This network combines visual and LIDAR data for autonomous navigation. The <strong className="text-foreground">Image Branch</strong> processes 
                  120×120×3 RGB images through 5 convolutional layers with ReLU activations, producing a 4096-dimensional feature vector. 
                  The <strong className="text-foreground">LIDAR Branch</strong> processes 720-dimensional laser scan data through fully connected layers, 
                  outputting 64 features. Both branches are concatenated (4160 features total) and passed through a classifier with dropout 
                  regularization that outputs linear velocity (v) and angular velocity (ω) commands for robot control.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Keras Sequential CNN Classifier</h3>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <img 
                    src="/projects/Clue-Reader-Model.png" 
                    alt="Keras Sequential CNN Architecture" 
                    className="w-full rounded-lg"
                  />
                </div>
                <p className="text-muted-foreground mb-6">
                  A sequential convolutional neural network for traffic sign classification built with Keras. The architecture consists of 
                  3 convolutional blocks, each containing Conv2D layers (3×3 kernels, 'same' padding, ReLU activation) with batch normalization 
                  and 2×2 max pooling for spatial reduction. Filter sizes progress from 32 in Block 1 to 64 in Blocks 2 and 3. After flattening, 
                  the network splits into two classification heads, each with a Dense layer (256 units, ReLU) and 0.5 dropout for regularization, leading 
                  to softmax outputs for multi-class traffic sign classification.
                </p>
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-accent">The Competition and Beyond</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Competition day was intense. Watching our robot navigate autonomously, read license plates, and identify clues, all using
                systems I'd built from scratch, was surreal. Every correct detection felt like a validation of weeks of work. And when it
                completed a run with zero collisions, I knew all those late nights debugging loss functions had been worth it.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                But more than the competition results, this project gave me something valuable: an intuition for machine learning that I 
                couldn't have gotten from courses or tutorials alone. I understand, at a visceral level, why models fail and how to fix them. 
                I know what it feels like to watch a loss curve plateau and figure out how to break through. That experience has been 
                invaluable in every ML project I've worked on since.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-accent">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Python", "ROS", "TensorFlow/Keras", "Computer Vision", "OpenCV", "Imitation Learning", "CNN Architecture", "Data Augmentation"].map((tech) => (
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
    </div>
  );
};

export default RosClueDetective;
