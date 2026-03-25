import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      data-ocid="nav.toggle"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="w-9 h-9 rounded-full flex items-center justify-center border border-border bg-background/60 hover:bg-muted transition-all duration-200 text-foreground"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-yellow-400" />
      ) : (
        <Moon className="w-4 h-4 text-foreground" />
      )}
    </button>
  );
}
