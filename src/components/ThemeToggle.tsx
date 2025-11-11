import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-secondary/50 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 rounded-lg bg-secondary hover:bg-secondary-hover transition-all duration-300 flex items-center justify-center group"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 text-foreground transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 text-foreground transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-lg bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </button>
  );
};

export default ThemeToggle;