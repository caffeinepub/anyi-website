import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  LayoutList,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useGalleryItems } from "../hooks/useQueries";

const DEFAULT_GALLERY = [
  {
    id: "1",
    title: "Zenith Brand Identity",
    category: "Branding",
    imageUrl: "/assets/generated/portfolio-branding.dim_600x400.jpg",
    description: "A full brand identity system for a luxury tech startup.",
  },
  {
    id: "2",
    title: "FlowCommerce Website",
    category: "Web Design",
    imageUrl: "/assets/generated/portfolio-web.dim_600x400.jpg",
    description: "E-commerce redesign that boosted conversions by 180%.",
  },
  {
    id: "3",
    title: "VibeCo Social Campaign",
    category: "Social Media",
    imageUrl: "/assets/generated/portfolio-social.dim_600x400.jpg",
    description: "Multi-platform campaign with 3M impressions in 30 days.",
  },
  {
    id: "4",
    title: "Pulse Health App",
    category: "App Design",
    imageUrl: "/assets/generated/portfolio-app.dim_600x400.jpg",
    description: "Intuitive health tracking app UI/UX for iOS & Android.",
  },
  {
    id: "5",
    title: "Urban Glow Ads",
    category: "Advertising",
    imageUrl: "/assets/generated/portfolio-ads.dim_600x400.jpg",
    description: "Out-of-home and digital advertising for a beauty brand.",
  },
  {
    id: "6",
    title: "Bloom Packaging",
    category: "Packaging",
    imageUrl: "/assets/generated/portfolio-packaging.dim_600x400.jpg",
    description: "Sustainable product packaging design for an organic brand.",
  },
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
        scrolled ? "bg-white/95 backdrop-blur-md shadow-card" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          data-ocid="nav.link"
          onClick={() => navigate("/")}
          className="flex items-center gap-1 font-bold text-xl tracking-tight"
        >
          <span className="text-navy">ANYI</span>
          <span className="w-2 h-2 rounded-full bg-teal mt-0.5" />
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {["Home", "About", "Services", "Testimonials", "Contact"].map(
            (item) => (
              <button
                type="button"
                key={item}
                data-ocid="nav.link"
                onClick={() => goHome(item.toLowerCase())}
                className="text-sm font-medium text-body-gray hover:text-navy transition-colors"
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => navigate("/portfolio")}
            className="text-sm font-medium text-teal hover:text-navy transition-colors"
          >
            Portfolio
          </button>
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => navigate("/admin")}
            className="text-sm font-medium text-body-gray hover:text-navy transition-colors"
          >
            Admin
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            data-ocid="nav.primary_button"
            onClick={() => goHome("contact")}
            className="bg-navy text-white hover:bg-navy/90 rounded-full px-6 text-xs font-semibold uppercase tracking-wider"
          >
            Start a Project
          </Button>
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
            className="md:hidden bg-white border-t border-subtle px-6 py-4 flex flex-col gap-4"
          >
            {["Home", "About", "Services", "Testimonials", "Contact"].map(
              (item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => goHome(item.toLowerCase())}
                  className="text-sm font-medium text-left text-body-gray hover:text-navy py-1"
                >
                  {item}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => navigate("/portfolio")}
              className="text-sm font-medium text-left text-teal hover:text-navy py-1"
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="text-sm font-medium text-left text-body-gray hover:text-navy py-1"
            >
              Admin
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
        className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="aspect-video bg-muted relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <Badge className="bg-teal/10 text-teal border-0 mb-2">
            {item.category}
          </Badge>
          <h2 className="text-2xl font-bold text-navy">{item.title}</h2>
          {item.description && (
            <p className="mt-2 text-body-gray">{item.description}</p>
          )}
          <p className="text-xs text-muted-gray mt-3">
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
            : "/assets/generated/portfolio-branding.dim_600x400.jpg",
          description: "",
        }))
      : DEFAULT_GALLERY;

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  const countFor = (cat: string) =>
    cat === "All"
      ? items.length
      : items.filter((i) => i.category === cat).length;

  return (
    <div className="min-h-screen bg-page">
      <NavBar navigate={navigate} />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-br from-navy to-navy/80 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-teal uppercase tracking-widest text-xs font-semibold mb-4"
          >
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/70 max-w-xl mx-auto text-lg"
          >
            Explore our creative work across branding, web design, social media,
            and more.
          </motion.p>
        </div>
      </section>

      {/* Filters + View Toggle */}
      <section className="sticky top-16 z-40 bg-white border-b border-subtle shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div
            className="flex items-center gap-2 flex-wrap"
            data-ocid="portfolio.tab"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid="portfolio.tab"
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                  activeCategory === cat
                    ? "bg-navy text-white"
                    : "bg-muted text-body-gray hover:bg-muted/80"
                }`}
              >
                {cat}
                <span
                  className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat
                      ? "bg-white/20 text-white"
                      : "bg-subtle text-muted-gray"
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
                  ? "bg-white shadow-sm text-navy"
                  : "text-body-gray"
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
                  ? "bg-white shadow-sm text-navy"
                  : "text-body-gray"
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
              className="text-center py-24 text-body-gray"
              data-ocid="portfolio.empty_state"
            >
              <p className="text-5xl mb-4">🎨</p>
              <h3 className="text-xl font-semibold text-navy mb-2">
                No items yet
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="portfolio.list"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  data-ocid={`portfolio.item.${i + 1}`}
                  onClick={() => setLightboxIndex(filtered.indexOf(item))}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-all duration-300 flex items-center justify-center">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="text-white text-sm font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View Project
                      </motion.span>
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge className="bg-teal/10 text-teal border-0 text-xs mb-2">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-navy text-sm">
                      {item.title}
                    </h3>
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
                  className="group cursor-pointer flex gap-5 bg-white rounded-2xl p-4 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <Badge className="bg-teal/10 text-teal border-0 text-xs mb-1 w-fit">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-navy">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-body-gray mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center text-muted-gray group-hover:text-teal transition-colors">
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

      {/* Footer */}
      <footer className="bg-navy text-white/60 text-center text-xs py-6 mt-12">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
