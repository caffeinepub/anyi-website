import { Button } from "@/components/ui/button";
import {
  Award,
  ChevronRight,
  Handshake,
  Home,
  Lightbulb,
  Linkedin,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiInstagram, SiX } from "react-icons/si";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAboutContent } from "../hooks/useQueries";

const DEFAULT_TEAM = [
  {
    name: "Yusuf Suleman",
    role: "Founder & Sales Director",
    bio: "A results-driven leader with 20+ years of experience in scaling businesses across global and domestic markets. Yusuf specializes in building revenue-focused strategies, leading dynamic sales teams, and unlocking new growth opportunities in competitive industries.",
    img: "/assets/uploads/yusuflatest-019d29c9-cd44-77cc-8165-efe3325f36ff-1.jpeg",
  },
  {
    name: "Ajay Tyagi",
    role: "Founder & Technology Director",
    bio: "Driving innovation through technology, leads the development of scalable solutions and digital transformation strategies, helping businesses grow with cutting-edge IT systems.",
    img: "/assets/uploads/ajaytyagilatest-019d2dac-0ae1-70dd-8a48-5316acfe7fc9-1.jpeg",
  },
  {
    name: "Naveen Sati",
    role: "Founder & Operations Director",
    bio: "Expert in process-driven operations, advanced applications, and AI-based innovation, driving efficiency and scalable business solutions.",
    img: "/assets/uploads/naveen_sati-019d29f0-c657-766c-8110-afadb472e2bc-1.jpeg",
  },
];

const VALUES = [
  {
    icon: Lightbulb,
    title: "Creativity",
    desc: "We push boundaries and challenge convention to deliver truly original work.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "Transparent, honest, and accountable in every partnership we form.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We hold ourselves to the highest standards — no shortcuts, ever.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    desc: "Great work happens together. We're your creative partner, not just a vendor.",
  },
];

function NavBar({ navigate }: { navigate: (to: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (item: string) => {
    setMenuOpen(false);
    if (item === "About") {
      navigate("/about");
    } else if (item === "Solutions") {
      navigate("/solutions");
    } else if (item === "BPO Services") {
      navigate("/bpo");
    } else if (item === "Careers") {
      navigate("/careers");
    } else if (item === "Portfolio") {
      navigate("/portfolio");
    } else {
      navigate(`/#${item.toLowerCase()}`);
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
            src="/assets/uploads/logo-019d2435-a026-72b8-ba6b-b9bde75c6d82-1.png"
            alt="ANYI"
            className="h-9 w-auto object-contain"
          />
        </button>

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
              onClick={() => handleNav(item)}
              className={`text-sm font-medium transition-colors ${
                item === "About"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button
            data-ocid="nav.primary_button"
            onClick={() => navigate("/#contact")}
            className="btn-gradient text-foreground hover:opacity-90 rounded-full px-6 text-xs font-semibold uppercase tracking-wider"
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
            className="md:hidden bg-background/90 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-4"
          >
            {[
              "Home",
              "About",
              "Solutions",
              "BPO Services",
              "Services",
              "Portfolio",
              "Testimonials",
              "Contact",
            ].map((item) => (
              <button
                type="button"
                key={item}
                data-ocid="nav.link"
                onClick={() => handleNav(item)}
                className="text-sm font-medium text-left text-muted-foreground hover:text-foreground py-1"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function AboutPage({
  navigate,
}: { navigate: (to: string) => void }) {
  const { data: about } = useAboutContent();
  const year = new Date().getFullYear();

  let parsed = { body: "", mission: "", vision: "", tagline: "" };
  try {
    parsed = JSON.parse(about?.body ?? "");
  } catch {
    parsed.body = about?.body ?? "";
  }

  const bodyText =
    parsed.body ||
    "We are a full-service creative agency dedicated to building brands that inspire, engage, and convert. With over a decade of experience, our team of strategists, designers, and developers work in harmony to deliver exceptional results.";
  const mission =
    parsed.mission ||
    "To empower brands with creative strategies and design that drive real business results.";
  const vision =
    parsed.vision ||
    "To be the most trusted creative partner for ambitious brands around the world.";
  const tagline = parsed.tagline || "Innovative. Strategic. Results-Driven.";

  return (
    <div className="min-h-screen bg-background">
      <NavBar navigate={navigate} />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-background to-primary/20 pt-32 pb-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
              aria-label="Breadcrumb"
            >
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
                data-ocid="about.link"
              >
                <Home className="w-3 h-3" />
                Home
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">About</span>
            </nav>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              The team and story behind Anyi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-10 md:p-16"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
                  Who We Are
                </span>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {about?.title ?? "About Anyi"}
                </h2>
                <p className="text-lg font-semibold text-foreground mb-6">
                  {tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {bodyText}
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
                  alt="Our team at Anyi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
              Purpose
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Mission &amp; Vision
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                label: "Our Mission",
                text: mission,
                accent: "bg-primary/20 text-primary",
              },
              {
                icon: Sparkles,
                label: "Our Vision",
                text: vision,
                accent: "bg-primary/20 text-primary",
              },
            ].map(({ icon: Icon, label, text, accent }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl p-8"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${accent}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary/20 to-accent/10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
              What Drives Us
            </span>
            <h2 className="text-2xl font-bold text-foreground">Our Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-primary/5 border border-border rounded-2xl p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
              The People
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Meet the Team
            </h2>
            <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
              A collective of strategists, creatives, and technologists united
              by a passion for outstanding work.
            </p>
          </motion.div>
          <div
            className="flex flex-wrap justify-center gap-8"
            data-ocid="about.list"
          >
            {DEFAULT_TEAM.map(({ name, role, bio, img }, i) => {
              const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <motion.div
                  key={name}
                  data-ocid={`about.item.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-8 text-center w-full sm:w-80"
                >
                  {img ? (
                    <img
                      src={img}
                      alt={name}
                      className="w-28 h-28 rounded-full object-cover object-top mx-auto mb-5"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
                      <span className="text-2xl font-bold text-foreground">
                        {initials}
                      </span>
                    </div>
                  )}
                  <h3 className="font-bold text-foreground text-lg">{name}</h3>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-1 mb-3">
                    {role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {bio}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-6 opacity-60" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to work with us?
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              Let's build something remarkable together. Reach out and let's
              start the conversation.
            </p>
            <Button
              data-ocid="about.primary_button"
              onClick={() => navigate("/#contact")}
              className="btn-gradient text-foreground hover:opacity-90 rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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
                {[
                  { href: "https://twitter.com", Icon: SiX },
                  { href: "https://instagram.com", Icon: SiInstagram },
                  { href: "https://linkedin.com", Icon: Linkedin },
                ].map(({ href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-ocid="footer.link"
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
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
                          : item === "BPO Services"
                            ? navigate("/bpo")
                            : item === "Careers"
                              ? navigate("/careers")
                              : item === "Portfolio"
                                ? navigate("/portfolio")
                                : navigate(`/#${item.toLowerCase()}`)
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
                  href="mailto:ys@anyi.co.in"
                  className="hover:text-white transition-colors"
                >
                  ys@anyi.co.in
                </a>
                <a
                  href="tel:+919876543210"
                  className="hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
                <p>
                  C-32, First & Second Floor, Ram Nagar, Kaushambi,
                  <br />
                  Ghaziabad, Uttar Pradesh 201010
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <span>&copy; {year} Anyi. All rights reserved.</span>
            <span>Built by ANYI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
