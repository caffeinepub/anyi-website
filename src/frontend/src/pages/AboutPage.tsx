import { Button } from "@/components/ui/button";
import {
  Award,
  ChevronRight,
  Handshake,
  Home,
  Lightbulb,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { useAboutContent } from "../hooks/useQueries";

const DEFAULT_TEAM = [
  {
    name: "Ananya Sharma",
    role: "Founder & Creative Director",
    bio: "10+ years crafting brand identities that move markets and inspire loyalty.",
    img: "",
  },
  {
    name: "Rahul Mehta",
    role: "Head of Strategy",
    bio: "Data-driven growth strategist turning insights into measurable business results.",
    img: "",
  },
  {
    name: "Priya Nair",
    role: "Lead Designer",
    bio: "Visual storyteller and UI specialist with a passion for purposeful aesthetics.",
    img: "",
  },
  {
    name: "Arjun Patel",
    role: "Digital Marketing Lead",
    bio: "SEO, paid ads, and content expert driving organic and paid growth.",
    img: "",
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
    } else if (item === "Portfolio") {
      navigate("/portfolio");
    } else {
      navigate(`/#${item.toLowerCase()}`);
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
          {[
            "Home",
            "About",
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
                  ? "text-teal"
                  : "text-body-gray hover:text-navy"
              }`}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => navigate("/admin")}
            className="text-sm font-medium text-teal hover:text-navy transition-colors"
          >
            Admin
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            data-ocid="nav.primary_button"
            onClick={() => navigate("/#contact")}
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
            {[
              "Home",
              "About",
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
                className="text-sm font-medium text-left text-body-gray hover:text-navy py-1"
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              data-ocid="nav.link"
              onClick={() => {
                setMenuOpen(false);
                navigate("/admin");
              }}
              className="text-sm font-medium text-left text-teal"
            >
              Admin
            </button>
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
  const hostname = window.location.hostname;

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
    <div className="min-h-screen bg-page">
      <NavBar navigate={navigate} />

      {/* Hero Banner */}
      <section className="bg-navy pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-xs text-white/50 mb-6"
              aria-label="Breadcrumb"
            >
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-1 hover:text-white transition-colors"
                data-ocid="about.link"
              >
                <Home className="w-3 h-3" />
                Home
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">About</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-lg text-white/60 max-w-xl">
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
            className="bg-white rounded-2xl shadow-card p-10 md:p-16"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-teal block mb-3">
                  Who We Are
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                  {about?.title ?? "About Anyi"}
                </h2>
                <p className="text-lg font-semibold text-navy mb-6">
                  {tagline}
                </p>
                <p className="text-sm text-body-gray leading-relaxed">
                  {bodyText}
                </p>
                <div className="mt-8 grid grid-cols-3 gap-6">
                  {[
                    { num: "10+", label: "Years Experience" },
                    { num: "320+", label: "Projects Delivered" },
                    { num: "98%", label: "Client Satisfaction" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-extrabold text-navy">
                        {stat.num}
                      </div>
                      <div className="text-xs text-body-gray mt-1">
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
            <span className="text-xs font-semibold uppercase tracking-widest text-teal block mb-3">
              Purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Mission &amp; Vision
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                label: "Our Mission",
                text: mission,
                accent: "bg-teal/10 text-teal",
              },
              {
                icon: Sparkles,
                label: "Our Vision",
                text: vision,
                accent: "bg-navy/10 text-navy",
              },
            ].map(({ icon: Icon, label, text, accent }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-card p-8"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${accent}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{label}</h3>
                <p className="text-sm text-body-gray leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-teal block mb-3">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Values
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
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
            <span className="text-xs font-semibold uppercase tracking-widest text-teal block mb-3">
              The People
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Meet the Team
            </h2>
            <p className="text-sm text-body-gray mt-4 max-w-lg mx-auto">
              A collective of strategists, creatives, and technologists united
              by a passion for outstanding work.
            </p>
          </motion.div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
                  className="bg-white rounded-2xl shadow-card p-6 text-center"
                >
                  {img ? (
                    <img
                      src={img}
                      alt={name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-navy">
                        {initials}
                      </span>
                    </div>
                  )}
                  <h3 className="font-bold text-navy">{name}</h3>
                  <p className="text-xs font-semibold text-teal uppercase tracking-wider mt-1 mb-2">
                    {role}
                  </p>
                  <p className="text-xs text-body-gray leading-relaxed">
                    {bio}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-teal/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Users className="w-12 h-12 text-teal mx-auto mb-6 opacity-60" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Ready to work with us?
            </h2>
            <p className="text-sm text-body-gray mb-8 max-w-md mx-auto">
              Let's build something remarkable together. Reach out and let's
              start the conversation.
            </p>
            <Button
              data-ocid="about.primary_button"
              onClick={() => navigate("/#contact")}
              className="bg-navy text-white hover:bg-navy/90 rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-1 font-bold text-xl mb-4">
                <span>ANYI</span>
                <span className="w-2 h-2 rounded-full bg-teal mt-0.5" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                We amplify brands through bold strategy, creative design, and
                digital innovation.
              </p>
              <div className="flex gap-3 mt-6">
                {[
                  { href: "https://twitter.com", Icon: SiX },
                  { href: "https://instagram.com", Icon: SiInstagram },
                  { href: "https://linkedin.com", Icon: SiLinkedin },
                ].map(({ href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-ocid="footer.link"
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-teal transition-colors"
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
                  href="mailto:hello@anyi.co.in"
                  className="hover:text-white transition-colors"
                >
                  hello@anyi.co.in
                </a>
                <a
                  href="tel:+919876543210"
                  className="hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
                <p>
                  42 Creative Hub,
                  <br />
                  Koramangala, Bengaluru
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <span>&copy; {year} Anyi. All rights reserved.</span>
            <span>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noreferrer"
                className="text-teal hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
