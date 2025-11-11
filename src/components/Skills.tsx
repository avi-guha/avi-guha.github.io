const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        "C++",
        "Python",
        "JavaScript",
        "Java",
        "MATLAB"
      ]
    },
    {
      title: "Engineering Software",
      skills: [
        "Altium",
        "KiCAD",
        "LTSpice",
        "AutoCAD",
        "Solidworks",
        "MS Office & Excel"
      ]
    },
    {
      title: "Hardware & Electronics",
      skills: [
        "PCB Design",
        "ESP-32",
        "Raspberry Pi",
        "Arduino",
        "Circuit Analysis",
        "Power Electronics"
      ]
    },
    {
      title: "Technical Skills",
      skills: [
        "Computer Vision (OpenCV)",
        "FreeRTOS",
        "PID Control",
        "GIT",
        "Machine Learning",
        "Signal Processing"
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Technical skills and knowledge areas I've developed through academic study and practical application.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-card h-full">
                <h3 className="text-lg font-semibold mb-6 text-accent">
                  {category.title}
                </h3>
                
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-accent/10 rounded-2xl">
            <div className="text-2xl">🎓</div>
            <div>
              <p className="font-semibold text-accent">Engineering Physics</p>
              <p className="text-sm text-muted-foreground">
                Combining rigorous physics training with practical engineering applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;