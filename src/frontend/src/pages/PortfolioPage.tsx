import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Grid3X3,
  LayoutList,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useGalleryItems } from "../hooks/useQueries";

const DEFAULT_GALLERY = [
  {
    id: "1",
    title: "Office PBX System",
    category: "Communication",
    imageUrl: "/assets/generated/portfolio-pbx.dim_600x400.jpg",
    description:
      "IP/SIP based PBX solution with live monitoring, hot/cold redundancy, and easy-to-use User Control Panel.",
  },
  {
    id: "2",
    title: "Multi-Channel Communication",
    category: "Communication",
    imageUrl: "/assets/generated/portfolio-multichannel.dim_600x400.jpg",
    description:
      "Unified inbound & outbound communication across Voice, Chat, SMS, and Email channels.",
  },
  {
    id: "3",
    title: "WhatsApp Business Solution",
    category: "Communication",
    imageUrl: "/assets/generated/portfolio-whatsapp.dim_600x400.jpg",
    description:
      "Promotional & transactional WhatsApp messaging with chatbot capabilities and CRM integration.",
  },
  {
    id: "4",
    title: "Voice Auto Dialer",
    category: "Communication",
    imageUrl: "/assets/generated/portfolio-voice.dim_600x400.jpg",
    description:
      "Predictive, progressive & preview dialing with IVR, DNC, and dynamic CLI support.",
  },
  {
    id: "5",
    title: "Helpdesk Ticketing Software",
    category: "CRM Platform",
    imageUrl: "/assets/generated/portfolio-crm.dim_600x400.jpg",
    description:
      "Multi-channel ticketing with SLA management, 5-level escalation, and QR code assignment.",
  },
  {
    id: "6",
    title: "Lead Management System",
    category: "CRM Platform",
    imageUrl: "/assets/generated/portfolio-lms.dim_600x400.jpg",
    description:
      "End-to-end lead pipeline with customer profiling, multi-channel connector, and ready-to-use APIs.",
  },
  {
    id: "7",
    title: "Customized Mobile App",
    category: "Custom Solutions",
    imageUrl: "/assets/generated/portfolio-mobile-app.dim_600x400.jpg",
    description:
      "Tailor-made mobile applications for healthcare, appointment systems, and data entry.",
  },
  {
    id: "8",
    title: "System Integrations",
    category: "Integrations",
    imageUrl: "/assets/generated/portfolio-integration.dim_600x400.jpg",
    description:
      "Seamless integration with Salesforce, leading CRMs, WhatsApp Business API, SMS gateways, and more.",
  },
];

const CATEGORIES = [
  "All",
  "Communication",
  "CRM Platform",
  "Custom Solutions",
  "Integrations",
];

interface GalleryEntry {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

function NavBar({ navigate }: { navigate: (to: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = (id?: string) => {
    setMenuOpen(false);
    navigate("/");
    if (id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-background/80 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          data-ocid="nav.link"
          onClick={() => navigate("/")}
          className="flex items-center gap-1 font-bold text-xl tracking-tight"
        >
          <img
            src="/assets/generated/anyi-logo-hires.dim_400x120.png"
            alt="ANYI"
            className="h-9 w-auto object-contain"
          />
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {["Home", "About", "Services", "Testimonials", "Contact"].map(
            (item) => (
              <button
                type="button"
                key={item}
                data-ocid="nav.link"
                onClick={() => goHome(item.toLowerCase())}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => navigate("/portfolio")}
            className="text-sm font-medium text-primary hover:text-foreground transition-colors"
          >
            Portfolio
          </button>
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => navigate("/solutions")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Solutions
          </button>
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => navigate("/bpo")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            BPO Services
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            data-ocid="nav.primary_button"
            onClick={() => goHome("contact")}
            className="btn-gradient text-white hover:opacity-90 rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-wider"
          >
            Get In Touch
          </button>
        </div>

        <button
          type="button"
          data-ocid="nav.toggle"
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background/90 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-4"
          >
            {["Home", "About", "Services", "Testimonials", "Contact"].map(
              (item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => goHome(item.toLowerCase())}
                  className="text-sm font-medium text-left text-muted-foreground hover:text-foreground py-1"
                >
                  {item}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => navigate("/portfolio")}
              className="text-sm font-medium text-left text-primary hover:text-foreground py-1"
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => navigate("/solutions")}
              className="text-sm font-medium text-left text-muted-foreground hover:text-foreground py-1"
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => navigate("/bpo")}
              className="text-sm font-medium text-left text-muted-foreground hover:text-foreground py-1"
            >
              BPO Services
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Lightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: GalleryEntry[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const item = items[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(i + 1, items.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [items.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
      data-ocid="portfolio.modal"
    >
      <button
        type="button"
        data-ocid="portfolio.close_button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        type="button"
        data-ocid="portfolio.pagination_prev"
        onClick={(e) => {
          e.stopPropagation();
          setIndex((i) => Math.max(i - 1, 0));
        }}
        disabled={index === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-30"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        type="button"
        data-ocid="portfolio.pagination_next"
        onClick={(e) => {
          e.stopPropagation();
          setIndex((i) => Math.min(i + 1, items.length - 1));
        }}
        disabled={index === items.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-30"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full glass-card rounded-2xl overflow-hidden"
      >
        <div className="aspect-video bg-muted relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {item.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground">{item.title}</h2>
          {item.description && (
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground/50 mt-4">
            {index + 1} / {items.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioPage({
  navigate,
}: { navigate: (to: string) => void }) {
  const { data: backendItems } = useGalleryItems();
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items: GalleryEntry[] =
    backendItems && backendItems.length > 0
      ? backendItems.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          imageUrl: item.blob.getDirectURL
            ? item.blob.getDirectURL()
            : "/assets/generated/portfolio-pbx.dim_600x400.jpg",
          description: "",
        }))
      : DEFAULT_GALLERY;

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  const countFor = (cat: string) =>
    cat === "All"
      ? items.length
      : items.filter((i) => i.category === cat).length;

  return (
    <div className="min-h-screen bg-background">
      <NavBar navigate={navigate} />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-background via-primary/10 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-48 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary uppercase tracking-widest text-xs font-semibold mb-4"
          >
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-tight text-foreground"
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Explore our solutions and projects delivered to clients across
            industries
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-8"
          >
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "200+", label: "Happy Clients" },
              { value: "15+", label: "Years Experience" },
              { value: "4", label: "Solution Categories" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters + View Toggle */}
      <section className="sticky top-16 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div
            className="flex items-center gap-2 flex-wrap"
            data-ocid="portfolio.tab"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid="portfolio.tab"
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                  activeCategory === cat
                    ? "btn-gradient text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
                <span
                  className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat
                      ? "bg-white/20 text-white"
                      : "bg-muted-foreground/20 text-muted-foreground/70"
                  }`}
                >
                  {countFor(cat)}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              type="button"
              data-ocid="portfolio.toggle"
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "grid"
                  ? "glass-card text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-ocid="portfolio.toggle"
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "glass-card text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 text-muted-foreground"
              data-ocid="portfolio.empty_state"
            >
              <p className="text-5xl mb-4">📂</p>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No items found
              </h3>
              <p className="text-sm">
                No portfolio items found in this category.
              </p>
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              data-ocid="portfolio.list"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  data-ocid={`portfolio.item.${i + 1}`}
                  onClick={() => setLightboxIndex(filtered.indexOf(item))}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col"
                >
                  {/* Image — 60% of card height */}
                  <div
                    className="relative overflow-hidden"
                    style={{ paddingTop: "60%" }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-full border border-white/30 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </span>
                    </div>
                    {/* Category badge on image */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-primary text-xs font-semibold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Learn more</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
              data-ocid="portfolio.list"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  data-ocid={`portfolio.item.${i + 1}`}
                  onClick={() => setLightboxIndex(filtered.indexOf(item))}
                  className="group cursor-pointer flex gap-5 glass-card rounded-2xl p-4 shadow-card hover:shadow-lg transition-all duration-300 border border-border"
                >
                  <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <Badge className="bg-primary/20 text-primary border-0 text-xs mb-2 w-fit">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center text-muted-foreground/70 group-hover:text-primary transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      <WhatsAppButton />

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-md border-t border-border text-white/60 text-center text-xs py-6 mt-12">
        © {new Date().getFullYear()}. Built by ANYI
      </footer>
    </div>
  );
}
