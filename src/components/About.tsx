const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">About Me</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                I'm an Engineering Physics student at the University of British Columbia,
                passionate about bridging the gap between theoretical physics and practical
                engineering applications. My work spans from designing high-voltage circuits
                for autonomous robots to researching 2D materials using atomic force microscopy.
              </p>

              <p>
                Currently, I'm researching silicon quantum photonics at the Stewart Blusson
                Quantum Matter Institute, working on nanowire single photon detectors for
                quantum computing applications. I'm also an Electrical Designer at UBC Thunderbots,
                designing PCBs and control systems for autonomous soccer robots competing internationally.
              </p>

              <p>
                I'm driven by challenging projects that require creative problem-solving
                and hands-on implementation. Whether it's developing PID-controlled systems,
                designing communication interfaces, or analyzing 2D materials, I enjoy
                working at the intersection of physics, electronics, and software.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Physics", "Engineering", "Problem Solving", "Research",
                "Innovation", "Critical Thinking", "Mathematics", "Technology"
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 bg-accent/10 text-accent rounded-md text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="aspect-square bg-muted/50 rounded-2xl p-1">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src="/headshot.jpg"
                    alt="Avi Guha - Engineering Physics Student"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background px-5 py-3 rounded-full shadow-lg border border-border">
                <p className="text-lg leading-none text-foreground whitespace-nowrap" aria-label="Lightning bolt">
                  ⚡
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
