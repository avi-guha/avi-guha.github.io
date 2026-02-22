import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Section pages
import AboutPage from "./pages/sections/AboutPage";
import ExperiencePage from "./pages/sections/ExperiencePage";
import ProjectsPage from "./pages/sections/ProjectsPage";

import ResumePage from "./pages/sections/ResumePage";
import ContactPage from "./pages/sections/ContactPage";

// Project detail pages
import AutonomousPetRescuingRobot from "./pages/projects/AutonomousPetRescuingRobot";
import ServoMotorControl from "./pages/projects/ServoMotorControl";
import RCCar from "./pages/projects/RCCar";
import ThunderbotsPowerBoard from "./pages/projects/ThunderbotsPowerBoard";
import AFMMaterialsAnalysis from "./pages/projects/AFMMaterialsAnalysis";
import AutonomousClaw from "./pages/projects/AutonomousClaw";
import BreakBeamBoard from "./pages/projects/BreakBeamBoard";
import RosClueDetective from "./pages/projects/RosClueDetective";
import CANPrototype from "./pages/projects/CANPrototype";
import ThunderbotsMotorDriver from "./pages/projects/ThunderbotsMotorDriver";
import ToneLens from "./pages/projects/ToneLens";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Section pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/projects" element={<ProjectsPage />} />

              <Route path="/resume" element={<ResumePage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Project detail pages */}
              <Route path="/projects/autonomous-pet-rescuing-robot" element={<AutonomousPetRescuingRobot />} />
              <Route path="/projects/servo-motor-control" element={<ServoMotorControl />} />
              <Route path="/projects/rc-car" element={<RCCar />} />
              <Route path="/projects/thunderbots-power-board" element={<ThunderbotsPowerBoard />} />
              <Route path="/projects/afm-materials-analysis" element={<AFMMaterialsAnalysis />} />
              <Route path="/projects/autonomous-claw" element={<AutonomousClaw />} />
              <Route path="/projects/break-beam-board" element={<BreakBeamBoard />} />
              <Route path="/projects/ros-clue-detective" element={<RosClueDetective />} />
              <Route path="/projects/can-prototype" element={<CANPrototype />} />
              <Route path="/projects/thunderbots-motor-driver" element={<ThunderbotsMotorDriver />} />
              <Route path="/projects/tonelens" element={<ToneLens />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
