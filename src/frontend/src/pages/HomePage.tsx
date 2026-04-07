import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT } from "@/config/contact";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  Mail,
  MapPin,
  Menu,
  PenTool,
  Phone,
  Quote,
  Target,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiWhatsapp,
  SiX,
} from "react-icons/si";
import { toast } from "sonner";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  useAboutContent,
  useGalleryItems,
  useHeroContent,
  useServices,
  useTestimonials,
} from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const DEFAULT_SERVICES = [
  {
    id: "1",
    title: "Brand Strategy",
    description:
      "We craft compelling brand narratives that resonate with your audience and differentiate you in the market.",
  },
  {
    id: "2",
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across all channels to maximize reach, engagement, and return on investment.",
  },
  {
    id: "3",
    title: "Creative Design",
    description:
      "Stunning visual identities, marketing collateral, and digital assets that make your brand unforgettable.",
  },
  {
    id: "4",
    title: "Web Development",
    description:
      "High-performance, beautifully crafted websites and web applications that convert visitors into customers.",
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "2",
    quote:
      "Working with Anyi was a game-changer. Their strategic approach to our digital marketing drove a 240% increase in qualified leads.",
    author: "Rahul Mehta",
    role: "Founder, GreenLeaf Organics",
  },
  {
    id: "3",
    quote:
      "The team at Anyi truly understands creativity and business. They delivered a world-class website that we're incredibly proud of.",
    author: "Sneha Iyer",
    role: "Marketing Director, Luminary Brands",
  },
  {
    id: "4",
    quote:
      "We were struggling to manage multiple vendors for our business processes, but this team provided a complete end-to-end solution under one roof. From planning to execution, everything was handled seamlessly. Their professionalism and technical expertise truly transformed our operations.",
    author: "Vijay Pandey",
    role: "MD, Sytel India",
  },
  {
    id: "5",
    quote:
      "We implemented the GRIP Help Desk Solution with support from the ANYI team, and the experience has been positive overall. The system helped us organize our support requests better and improved our response time. Their team was cooperative during the implementation and addressed our requirements properly. We are satisfied with the solution and the support provided, and it has helped us deliver more consistent service to our clients.",
    author: "Virender Nagi",
    role: "Maruti",
  },
  {
    id: "6",
    quote:
      "We implemented the BI Tool to improve our reporting and data visibility. Earlier, we relied heavily on manual reports, which were time-consuming and sometimes inconsistent. After implementation, dashboards are now easily accessible, and decision-making has become quicker. The transition took some time, but overall the impact has been positive.",
    author: "Subhash Yadav",
    role: "Appo Mobiles",
  },
  {
    id: "7",
    quote:
      "After implementing this tool, our sales tracking and follow-ups became much more structured. It gave us better visibility on our pipeline and helped the team stay aligned with targets. As a result, we were able to achieve our sales targets on time more consistently.",
    author: "Rahul Mishra",
    role: "Shri Cement",
  },
];

const DEFAULT_GALLERY = [
  {
    id: "1",
    title: "Office PBX System",
    category: "Communication",
    imageUrl: "/assets/generated/portfolio-pbx.dim_600x400.jpg",
  },
  {
    id: "2",
    title: "Multi-Channel Communication",
    category: "Communication",
    imageUrl: "/assets/generated/portfolio-multichannel.dim_600x400.jpg",
  },
  {
    id: "3",
    title: "WhatsApp Business Solution",
    category: "Communication",
    imageUrl: "/assets/generated/portfolio-whatsapp.dim_600x400.jpg",
  },
  {
    id: "4",
    title: "Voice Auto Dialer",
    category: "Communication",
    imageUrl: "/assets/generated/portfolio-voice.dim_600x400.jpg",
  },
  {
    id: "5",
    title: "Helpdesk Ticketing Software",
    category: "CRM Platform",
    imageUrl: "/assets/generated/portfolio-crm.dim_600x400.jpg",
  },
  {
    id: "6",
    title: "Lead Management System",
    category: "CRM Platform",
    imageUrl: "/assets/generated/portfolio-lms.dim_600x400.jpg",
  },
  {
    id: "7",
    title: "Customized Mobile App",
    category: "Custom Solutions",
    imageUrl: "/assets/generated/portfolio-mobile-app.dim_600x400.jpg",
  },
  {
    id: "8",
    title: "System Integrations",
    category: "Integrations",
    imageUrl: "/assets/generated/portfolio-integration.dim_600x400.jpg",
  },
];

const SERVICE_ICONS = [Zap, Target, PenTool, Globe];

function NavBar({ navigate }: { navigate: (to: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
        {/* Logo */}
        <button
          type="button"
          data-ocid="nav.link"
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-1 font-bold text-xl tracking-tight"
        >
          <img
            src="/assets/uploads/logo-019d2435-a026-72b8-ba6b-b9bde75c6d82-1.png"
            alt="ANYI"
            className="h-9 w-auto object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            "Home",
            "About",
            "Solutions",
            "BPO Services",
            "Careers",
            "Services",
            "Portfolio",
            "Testimonials",
            "Contact",
          ].map((item) => (
            <button
              type="button"
              key={item}
              data-ocid="nav.link"
              onClick={() =>
                item === "Portfolio"
                  ? navigate("/portfolio")
                  : item === "Solutions"
                    ? navigate("/solutions")
                    : item === "BPO Services"
                      ? navigate("/bpo")
                      : item === "Careers"
                        ? navigate("/careers")
                        : item === "About"
                          ? navigate("/about")
                          : scrollTo(item.toLowerCase())
              }
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button
            data-ocid="nav.primary_button"
            onClick={() => scrollTo("contact")}
            className="btn-gradient text-foreground hover:opacity-90 rounded-full px-6 text-xs font-semibold uppercase tracking-wider"
          >
            Start a Project
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          data-ocid="nav.toggle"
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background/90 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-4"
          >
            {[
              "Home",
              "About",
              "Solutions",
              "BPO Services",
              "Careers",
              "Services",
              "Portfolio",
              "Testimonials",
              "Contact",
            ].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() =>
                  item === "Portfolio"
                    ? navigate("/portfolio")
                    : item === "Solutions"
                      ? navigate("/solutions")
                      : item === "BPO Services"
                        ? navigate("/bpo")
                        : item === "About"
                          ? navigate("/about")
                          : scrollTo(item.toLowerCase())
                }
                className="text-sm font-medium text-left text-muted-foreground hover:text-foreground py-1"
              >
                {item}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("contact")}
              className="btn-gradient text-foreground rounded-full text-xs font-semibold uppercase tracking-wider w-full"
            >
              Start a Project
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const { data: hero } = useHeroContent();

  return (
    <section
      id="home"
      className="pt-16 min-h-screen bg-background flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left */}
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-6 px-3 py-1.5 bg-primary/20 rounded-full">
                  Process Automation
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] uppercase tracking-tight mb-6">
                  {hero?.title ?? "Process Automation For Every Business Need"}
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-md">
                  {hero?.subtitle ??
                    "Helping Automate Business Processes With Visualization From Bird's-Eye View To Worm's-Eye View"}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    data-ocid="hero.primary_button"
                    onClick={() =>
                      document
                        .getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="btn-gradient text-foreground hover:opacity-90 rounded-full px-8 py-6 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                  >
                    {hero?.ctaText ?? "Explore Services"}
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                  <Button
                    data-ocid="hero.secondary_button"
                    variant="outline"
                    onClick={() =>
                      document
                        .getElementById("portfolio")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="rounded-full px-8 py-6 text-xs font-bold uppercase tracking-widest border-border text-foreground hover:opacity-80 hover:text-foreground transition-all"
                  >
                    View Portfolio
                  </Button>
                </div>
              </motion.div>
            </div>
            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative min-h-[400px] md:min-h-0"
            >
              <img
                src="/assets/generated/hero-workspace.dim_800x600.jpg"
                alt="Modern workspace"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useScrollAnimation();
  const { data: about } = useAboutContent();

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="glass-card rounded-2xl p-10 md:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {about?.title ?? "About Us"}
              </h2>
              <p className="text-lg font-semibold text-foreground mb-6">
                Innovative. Strategic. Results-Driven.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {about?.body ??
                  "We are a full-service creative agency dedicated to building brands that inspire, engage, and convert. With over a decade of experience, our team of strategists, designers, and developers work in harmony to deliver exceptional results."}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { num: "10+", label: "Years Experience" },
                  { num: "320+", label: "Projects Delivered" },
                  { num: "98%", label: "Client Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-extrabold text-foreground">
                      {stat.num}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-card-hover">
              <img
                src="/assets/generated/about-team.dim_600x450.jpg"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useScrollAnimation();
  const { data: services } = useServices();
  const displayServices =
    services && services.length > 0 ? services : DEFAULT_SERVICES;

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
            Comprehensive solutions tailored to elevate your brand and
            accelerate your growth.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl hover:shadow-card-hover transition-all p-8"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const ref = useScrollAnimation();
  const { data: galleryItems } = useGalleryItems();
  const [activeFilter, setActiveFilter] = useState("All");
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const categories = [
    "All",
    "Communication",
    "CRM Platform",
    "Custom Solutions",
    "Integrations",
  ];

  // For backend gallery items, resolve blob URLs
  useEffect(() => {
    if (!galleryItems) return;
    const urls: Record<string, string> = {};
    for (const item of galleryItems) {
      try {
        urls[item.id] = item.blob.getDirectURL();
      } catch {
        // ignore
      }
    }
    setImageUrls(urls);
  }, [galleryItems]);

  const hasBackendItems = galleryItems && galleryItems.length > 0;
  const displayItems = hasBackendItems
    ? galleryItems.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        imageUrl: imageUrls[item.id] ?? "",
      }))
    : DEFAULT_GALLERY;

  const filtered =
    activeFilter === "All"
      ? displayItems
      : displayItems.filter((i) => i.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Portfolio
          </h2>
          <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
            A selection of projects that showcase the depth and diversity of our
            creative work.
          </p>
        </div>

        {/* Filter buttons */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-10"
          data-ocid="portfolio.tab"
        >
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? "btn-gradient text-foreground"
                  : "glass-card text-foreground border border-border hover:opacity-80 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative rounded-2xl overflow-hidden aspect-[3/2] group cursor-pointer"
                data-ocid={`portfolio.item.${i + 1}`}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <span className="text-foreground font-bold text-sm">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useScrollAnimation();
  const { data: testimonials } = useTestimonials();
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : DEFAULT_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const prev = () =>
    setCurrent(
      (c) => (c - 1 + displayTestimonials.length) % displayTestimonials.length,
    );
  const next = () => setCurrent((c) => (c + 1) % displayTestimonials.length);

  const t = displayTestimonials[current];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
            What Clients Say
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Testimonials
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl p-10 md:p-14 text-center"
              data-ocid="testimonials.card"
            >
              <Quote className="w-10 h-10 text-primary mx-auto mb-6 opacity-60" />
              <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-bold text-foreground">{t.author}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {t.role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              type="button"
              data-ocid="testimonials.pagination_prev"
              onClick={prev}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:opacity-80 hover:text-foreground transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {displayTestimonials.map((t, i) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-primary w-6" : "bg-muted-gray"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              data-ocid="testimonials.pagination_next"
              onClick={next}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:opacity-80 hover:text-foreground transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useScrollAnimation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiry: "",
    message: "",
  });
  const [sendMethod, setSendMethod] = useState<"whatsapp" | "email">(
    "whatsapp",
  );

  const validateForm = () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.inquiry.trim() ||
      !form.message.trim()
    ) {
      toast.error("Please fill in all fields before sending.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (sendMethod === "whatsapp") {
      const whatsappNumber = "919810657082";
      const text = `New Enquiry from ANYI Website\n\nName: ${form.name}\nEmail: ${form.email}\nProduct Inquiry: ${form.inquiry}\nMessage: ${form.message}`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
      toast.success("Redirecting to WhatsApp...");
    } else {
      const subject = "Enquiry from ANYI Website";
      const body = `Name: ${form.name}%0AEmail: ${form.email}%0AProduct Inquiry: ${form.inquiry}%0AMessage: ${form.message}`;
      const url = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = url;
      toast.success("Opening your email client...");
    }
    setForm({ name: "", email: "", inquiry: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="glass-card rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left */}
            <div className="glass-card bg-gradient-to-br from-primary/20 to-accent/10 p-10 md:p-16 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-6">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground uppercase leading-tight mb-8">
                  Let&apos;s Build Something
                  <br />
                  <span className="text-primary">Extraordinary</span>
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Email
                      </div>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="text-foreground hover:text-primary transition-colors text-sm"
                      >
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Phone
                      </div>
                      <a
                        href="tel:+919810657082"
                        className="text-foreground hover:text-primary transition-colors text-sm"
                      >
                        {CONTACT.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Address
                      </div>
                      <p className="text-foreground text-sm">
                        {CONTACT.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex gap-4">
                <a
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-foreground hover:bg-primary transition-colors"
                  data-ocid="contact.link"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-foreground hover:bg-primary transition-colors"
                  data-ocid="contact.link"
                >
                  <SiLinkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-foreground hover:bg-primary transition-colors"
                  data-ocid="contact.link"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right form */}
            <div
              className="p-10 md:p-16 flex flex-col gap-5"
              data-ocid="contact.modal"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">
                Send Us a Message
              </h3>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                  Your Name
                </p>
                <Input
                  data-ocid="contact.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="John Doe"
                  className="border-border focus:border-teal"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                  Email Address
                </p>
                <Input
                  data-ocid="contact.input"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="john@company.com"
                  className="border-border focus:border-teal"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                  Product / Service Inquiry
                </p>
                <select
                  data-ocid="contact.select"
                  value={form.inquiry}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, inquiry: e.target.value }))
                  }
                  className="w-full rounded-md border border-border bg-background text-foreground text-sm px-3 py-2 focus:outline-none focus:border-teal appearance-none"
                >
                  <option value="">-- Select a Product / Service --</option>
                  <option value="Helpdesk System - Grievance Resolution and Improvement Solution (GRIP)">
                    Helpdesk System - Grievance Resolution and Improvement
                    Solution (GRIP)
                  </option>
                  <option value="Voice Solutions - Cloud telephony, Inbound/Outbound setup, or AI voice bots">
                    Voice Solutions - Cloud telephony, Inbound/Outbound setup,
                    or AI voice bots
                  </option>
                  <option value="Call Center Solution - System that speaks every language: Call, Chat, Email, WhatsApp & Web">
                    Call Center Solution - System that speaks every language:
                    Call, Chat, Email, WhatsApp &amp; Web
                  </option>
                  <option value="IT Infra | Hardware - All-in-One IT & Cloud Infrastructure">
                    IT Infra | Hardware - All-in-One IT &amp; Cloud
                    Infrastructure
                  </option>
                  <option value="BPO Services - Your business, our process">
                    BPO Services - Your business, our process
                  </option>
                  <option value="MaaS - IT & Technical Manpower As A Service">
                    MaaS - IT &amp; Technical Manpower As A Service
                  </option>
                  <option value="Attendance App - Attendance. Analytics. Accountability - on your phone">
                    Attendance App - Attendance. Analytics. Accountability - on
                    your phone
                  </option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                  Message
                </p>
                <Textarea
                  data-ocid="contact.textarea"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="border-border focus:border-teal resize-none"
                />
              </div>

              {/* Send via selector */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
                  Send Via
                </p>
                <div className="flex gap-3" data-ocid="contact.toggle">
                  <button
                    type="button"
                    onClick={() => setSendMethod("whatsapp")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                      sendMethod === "whatsapp"
                        ? "btn-gradient text-foreground border-transparent"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                    }`}
                  >
                    <SiWhatsapp className="w-3.5 h-3.5" />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setSendMethod("email")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                      sendMethod === "email"
                        ? "btn-gradient text-foreground border-transparent"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </button>
                </div>
              </div>

              <Button
                data-ocid="contact.submit_button"
                type="button"
                onClick={handleSubmit}
                className="btn-gradient text-foreground hover:opacity-90 rounded-full py-6 text-xs font-bold uppercase tracking-widest w-full flex items-center justify-center gap-2 mt-1"
              >
                {sendMethod === "whatsapp" ? (
                  <>
                    <SiWhatsapp className="w-4 h-4" />
                    Send via WhatsApp
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send via Email
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ navigate }: { navigate: (to: string) => void }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-border text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-1 font-bold text-xl mb-4">
              <img
                src="/assets/uploads/logo-019d2435-a026-72b8-ba6b-b9bde75c6d82-1.png"
                alt="ANYI"
                className="h-7 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              We amplify brands through bold strategy, creative design, and
              digital innovation.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                data-ocid="footer.link"
              >
                <SiFacebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                data-ocid="footer.link"
              >
                <SiLinkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                data-ocid="footer.link"
              >
                <SiInstagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-white/40">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {[
                "Home",
                "About",
                "Solutions",
                "BPO Services",
                "Careers",
                "Services",
                "Portfolio",
                "Testimonials",
                "Contact",
              ].map((item) => (
                <button
                  type="button"
                  key={item}
                  data-ocid="footer.link"
                  onClick={() =>
                    item === "About"
                      ? navigate("/about")
                      : item === "Solutions"
                        ? navigate("/solutions")
                        : item === "Portfolio"
                          ? navigate("/portfolio")
                          : document
                              .getElementById(item.toLowerCase())
                              ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm text-white/60 hover:text-white transition-colors text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-white/40">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-white transition-colors"
              >
                {CONTACT.email}
              </a>
              <a
                href="tel:+919810657082"
                className="hover:text-white transition-colors"
              >
                {CONTACT.phone}
              </a>
              <p>{CONTACT.address}</p>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>&copy; {year} Anyi. All rights reserved.</span>
          <span>Built by ANYI</span>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage({
  navigate,
}: { navigate: (to: string) => void }) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar navigate={navigate} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter navigate={navigate} />
    </div>
  );
}
