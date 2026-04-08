import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ChevronRight,
  Globe,
  Heart,
  Home,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Rocket,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiInstagram, SiX } from "react-icons/si";
import { ThemeToggle } from "../components/ThemeToggle";

const NAV_ITEMS = [
  "Home",
  "About",
  "Solutions",
  "BPO Services",
  "Careers",
  "Services",
  "Portfolio",
  "Testimonials",
  "Contact",
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
    if (item === "Home") navigate("/");
    else if (item === "About") navigate("/about");
    else if (item === "Solutions") navigate("/solutions");
    else if (item === "BPO Services") navigate("/bpo");
    else if (item === "Careers") navigate("/careers");
    else if (item === "Portfolio") navigate("/portfolio");
    else navigate(`/#${item.toLowerCase()}`);
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

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item}
              data-ocid="nav.link"
              onClick={() => handleNav(item)}
              className={`text-sm font-medium transition-colors ${
                item === "Careers"
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
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item}
                data-ocid="nav.link"
                onClick={() => handleNav(item)}
                className={`text-sm font-medium text-left py-1 ${
                  item === "Careers"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
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

const WHY_WORK_ITEMS = [
  {
    icon: Rocket,
    title: "Fast Growth",
    description:
      "Accelerate your career with real responsibilities, mentorship, and leadership opportunities from day one.",
    gradient: "from-orange-500/20 to-red-500/10",
    iconColor: "text-orange-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation Culture",
    description:
      "Work on cutting-edge solutions in AI, cloud telephony, and enterprise technology.",
    gradient: "from-yellow-500/20 to-amber-500/10",
    iconColor: "text-yellow-500",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description:
      "A flat, open culture where ideas from every level shape the product and company direction.",
    gradient: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Globe,
    title: "Real Impact",
    description:
      "Help businesses across India and globally solve mission-critical communication and operations challenges.",
    gradient: "from-teal-500/20 to-emerald-500/10",
    iconColor: "text-teal-500",
  },
];

const OPEN_POSITIONS = [
  {
    title: "Sales Executive",
    department: "Sales",
    location: "Delhi/NCR",
    type: "Full-time",
    description:
      "Drive new business and build client relationships for our enterprise technology products.",
    deptColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    typeColor: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "Technical Support Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Provide technical support for cloud telephony and IT infrastructure clients.",
    deptColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    typeColor: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "BPO Team Lead",
    department: "Operations",
    location: "Ghaziabad",
    type: "Full-time",
    description:
      "Manage a team of customer support agents and ensure SLA adherence and quality standards.",
    deptColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    typeColor: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "Software Developer (React/Node)",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and maintain web applications and internal tools for our product suite.",
    deptColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    typeColor: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "Business Development Manager",
    department: "Sales",
    location: "Mumbai",
    type: "Full-time",
    description:
      "Lead strategic partnerships and enterprise accounts in the healthcare and finance verticals.",
    deptColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    typeColor: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "HR & Admin Executive",
    department: "Human Resources",
    location: "Ghaziabad",
    type: "Full-time",
    description:
      "Handle recruitment, onboarding, and day-to-day HR operations for a growing team.",
    deptColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    typeColor: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
];

const PERKS = [
  {
    icon: Heart,
    title: "Health Insurance",
    desc: "Comprehensive medical coverage for you and your family.",
  },
  {
    icon: Zap,
    title: "Flexible Work Hours",
    desc: "Work when you're most productive. Results matter, not hours.",
  },
  {
    icon: Lightbulb,
    title: "Learning & Development",
    desc: "Annual budget for courses, certifications, and conferences.",
  },
  {
    icon: Briefcase,
    title: "Performance Bonuses",
    desc: "Rewarding outstanding contributions with competitive bonuses.",
  },
  {
    icon: Home,
    title: "Work From Home Options",
    desc: "Hybrid and remote-first roles across multiple functions.",
  },
  {
    icon: Users,
    title: "Team Outings & Events",
    desc: "Regular team events, off-sites, and celebrations that build culture.",
  },
];

const SOCIAL_LINKS = [
  { Icon: SiX, href: "https://twitter.com", label: "X (Twitter)" },
  { Icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
  {
    Icon: Linkedin,
    href: "https://linkedin.com/company/71969389/",
    label: "LinkedIn",
  },
];

const FOOTER_NAV = [
  "Home",
  "About",
  "Solutions",
  "BPO Services",
  "Careers",
  "Services",
  "Portfolio",
  "Testimonials",
  "Contact",
];

export default function CareerPage({
  navigate,
}: { navigate: (to: string) => void }) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <NavBar navigate={navigate} />

      <main className="pt-16">
        {/* Hero Banner */}
        <section className="relative py-20 bg-gradient-to-br from-background via-primary/5 to-primary/20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
            >
              <button
                type="button"
                onClick={() => navigate("/")}
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium">Careers</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
                <Briefcase className="w-3.5 h-3.5" />
                We're Hiring
              </div>
              <h1 className="text-2xl font-bold tracking-tight mb-5 leading-tight">
                Join{" "}
                <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
                  Our Team
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Be part of a team that's building tomorrow's technology today.
                Work with passionate people solving real problems for businesses
                across India and beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  data-ocid="careers.primary_button"
                  onClick={() =>
                    document
                      .getElementById("open-positions")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-gradient text-foreground hover:opacity-90 rounded-full px-8 py-3 font-semibold"
                >
                  View Open Roles
                </Button>
                <Button
                  data-ocid="careers.secondary_button"
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("open-application")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-full px-8 py-3 font-semibold"
                >
                  Send Open CV
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Work at ANYI */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
                Our Culture
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Why Work at{" "}
                <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
                  ANYI?
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We believe great work happens when people are trusted,
                challenged, and supported.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_WORK_ITEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-border backdrop-blur-sm hover:scale-[1.02] transition-transform`}
                >
                  <div className="w-12 h-12 rounded-xl bg-background/60 flex items-center justify-center mb-4">
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
                Open Positions
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Current{" "}
                <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
                  Openings
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Find a role where your skills and passion align. We're always
                looking for driven, talented individuals.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4">
              {OPEN_POSITIONS.map((job, i) => (
                <motion.div
                  key={job.title}
                  data-ocid={`careers.item.${i + 1}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${job.deptColor}`}
                        >
                          {job.department}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </Badge>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${job.typeColor}`}
                        >
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-1.5 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        data-ocid={`careers.primary_button.${i + 1}`}
                        asChild
                        className="btn-gradient text-foreground hover:opacity-90 rounded-full px-6 font-semibold"
                      >
                        <a
                          href={`mailto:careers@anyi.co.in?subject=Application for ${encodeURIComponent(job.title)}`}
                        >
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Perks & Benefits */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
                Perks & Benefits
              </div>
              <h2 className="text-2xl font-bold mb-4">
                What We{" "}
                <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
                  Offer
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We take care of our team so they can focus on doing the best
                work of their lives.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <perk.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{perk.title}</h3>
                    <p className="text-sm text-muted-foreground">{perk.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Application CTA */}
        <section id="open-application" className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl bg-gradient-to-br from-primary/20 via-background to-teal-500/20 border border-primary/20 p-12 text-center overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Don't see the right role?
                </h2>
                <p className="text-lg text-muted-foreground mb-2 max-w-xl mx-auto">
                  We're always on the lookout for exceptional talent. If you
                  believe you have what it takes to contribute to ANYI's
                  mission, we'd love to hear from you.
                </p>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm">
                  Send us your CV and a short note about yourself — we review
                  every application and reach out when there's a match.
                </p>
                <Button
                  data-ocid="careers.open_modal_button"
                  asChild
                  size="lg"
                  className="btn-gradient text-foreground hover:opacity-90 rounded-full px-10 font-semibold"
                >
                  <a href="mailto:careers@anyi.co.in?subject=Open Application - Your Name">
                    Send Your CV
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black/60 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            {/* Brand */}
            <div className="md:col-span-1">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mb-5 block"
              >
                <img
                  src="/assets/uploads/logo-019d2435-a026-72b8-ba6b-b9bde75c6d82-1.png"
                  alt="ANYI"
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </button>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Empowering businesses with intelligent communication and
                operations technology.
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-ocid="footer.link"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-white/40">
                Navigation
              </h4>
              <div className="flex flex-col gap-3">
                {FOOTER_NAV.map((item) => (
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

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-white/40">
                Solutions
              </h4>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                {[
                  "Helpdesk (GRIP)",
                  "Voice Solutions",
                  "Call Center Solution",
                  "IT Infrastructure",
                  "BPO Services",
                  "Attendance App",
                ].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>

            {/* Contact */}
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
                  href="tel:+919810657082"
                  className="hover:text-white transition-colors"
                >
                  +91 9810657082
                </a>
                <p>
                  C-32, First &amp; Second Floor, Ram Nagar, Kaushambi,
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
