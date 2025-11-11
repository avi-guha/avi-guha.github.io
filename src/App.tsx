import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AutonomousPetRescuingRobot from "./pages/projects/AutonomousPetRescuingRobot";
import ServoMotorControl from "./pages/projects/ServoMotorControl";
import RCCar from "./pages/projects/RCCar";
import ThunderbotsPowerBoard from "./pages/projects/ThunderbotsPowerBoard";
import AFMMaterialsAnalysis from "./pages/projects/AFMMaterialsAnalysis";
import AutonomousClaw from "./pages/projects/AutonomousClaw";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/autonomous-pet-rescuing-robot" element={<AutonomousPetRescuingRobot />} />
            <Route path="/projects/servo-motor-control" element={<ServoMotorControl />} />
            <Route path="/projects/rc-car" element={<RCCar />} />
            <Route path="/projects/thunderbots-power-board" element={<ThunderbotsPowerBoard />} />
            <Route path="/projects/afm-materials-analysis" element={<AFMMaterialsAnalysis />} />
            <Route path="/projects/autonomous-claw" element={<AutonomousClaw />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
