import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

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
  };

  return (
    <>
      {path.startsWith("/admin") ? (
        <AdminPage navigate={navigate} />
      ) : (
        <HomePage navigate={navigate} />
      )}
      <Toaster position="top-right" richColors />
    </>
  );
}
