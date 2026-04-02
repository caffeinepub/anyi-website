import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ThemeProvider } from "./hooks/useTheme";
import AboutPage from "./pages/AboutPage";
import BPOPage from "./pages/BPOPage";
import CareerPage from "./pages/CareerPage";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import SolutionsPage from "./pages/SolutionsPage";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ThemeProvider>
      {path.startsWith("/portfolio") ? (
        <PortfolioPage navigate={navigate} />
      ) : path.startsWith("/about") ? (
        <AboutPage navigate={navigate} />
      ) : path.startsWith("/solutions") ? (
        <SolutionsPage navigate={navigate} />
      ) : path.startsWith("/bpo") ? (
        <BPOPage navigate={navigate} />
      ) : path.startsWith("/careers") ? (
        <CareerPage navigate={navigate} />
      ) : (
        <HomePage navigate={navigate} />
      )}
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}
