import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Clock,
  Database,
  DollarSign,
  Globe,
  Heart,
  Home,
  Laptop,
  Lock,
  Mail,
  Menu,
  Phone,
  PhoneCall,
  Shield,
  ShoppingBag,
  SmilePlus,
  TrendingUp,
  Truck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";
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
    if (item === "About") navigate("/about");
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
                item === "BPO Services"
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
                  item === "BPO Services"
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

const BPO_SERVICES = [
  {
    icon: PhoneCall,
    title: "Customer Support Services",
    color: "bg-blue-50 text-blue-600",
    items: [
      "Inbound & Outbound Call Support",
      "Email & Chat Support",
      "Multilingual Customer Assistance",
      "24/7 Helpdesk Services",
    ],
  },
  {
    icon: Database,
    title: "Back Office Support",
    color: "bg-teal-50 text-teal-600",
    items: [
      "Data Entry & Data Management",
      "Document Processing",
      "CRM Management",
      "Order Processing",
    ],
  },
  {
    icon: Briefcase,
    title: "Sales & Lead Generation",
    color: "bg-indigo-50 text-indigo-600",
    items: [
      "Telemarketing",
      "Lead Qualification",
      "Appointment Setting",
      "Inside Sales Support",
    ],
  },
  {
    icon: Heart,
    title: "Industry-Specific BPO",
    color: "bg-rose-50 text-rose-600",
    items: [
      "Healthcare Process Support",
      "E-commerce Support",
      "IT Helpdesk Services",
      "Finance & Accounting BPO",
    ],
  },
];

const WHY_ANYI = [
  "Experienced & Skilled Workforce",
  "Cost-Effective Solutions",
  "24/7 Operations",
  "Data Security & Compliance",
  "Scalable & Flexible Services",
  "Latest Technology Integration (AI + Automation)",
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Requirement Analysis",
    desc: "Deep dive into your business processes and objectives to understand your unique needs.",
  },
  {
    step: "02",
    title: "Customized Solution Design",
    desc: "Tailor-made BPO strategies crafted to fit your specific operations and goals.",
  },
  {
    step: "03",
    title: "Team Setup & Training",
    desc: "Expert team assembled and trained to meet your service delivery standards.",
  },
  {
    step: "04",
    title: "Execution & Monitoring",
    desc: "Seamless operations launch with real-time tracking and quality control.",
  },
  {
    step: "05",
    title: "Reporting & Optimization",
    desc: "Data-driven insights and continuous improvements to maximize efficiency.",
  },
];

const INDUSTRIES = [
  { icon: Heart, label: "Healthcare" },
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Globe, label: "Real Estate" },
  { icon: DollarSign, label: "Finance" },
  { icon: Laptop, label: "IT & SaaS" },
  { icon: Truck, label: "Logistics" },
];

const TECHNOLOGIES = [
  "CRM Tools (Salesforce, Zoho, HubSpot)",
  "AI Chatbots & Automation",
  "Cloud Telephony Systems",
  "Data Analytics & Reporting Tools",
];

const BENEFITS = [
  {
    icon: TrendingUp,
    text: "Reduce Operational Costs by up to 40%",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: BarChart2,
    text: "Increase Productivity & Efficiency",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: SmilePlus,
    text: "Improve Customer Satisfaction",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: Clock,
    text: "Faster Turnaround Time",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Lock,
    text: "Secure & Reliable Processes",
    color: "bg-rose-50 text-rose-600",
  },
];

export default function BPOPage({
  navigate,
}: { navigate: (to: string) => void }) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background font-body">
      <NavBar navigate={navigate} />

      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/bpo-hero.dim_1200x600.jpg"
            alt="BPO Services Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 via-indigo-800/70 to-teal-800/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <button
              type="button"
              data-ocid="bpo.link"
              onClick={() => navigate("/")}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Home className="w-3 h-3" /> Home
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">BPO Services</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              What We Offer
            </h1>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              At ANYI, we provide end-to-end BPO solutions designed to
              streamline your operations, reduce costs, and improve customer
              experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                data-ocid="bpo.primary_button"
                onClick={() => navigate("/#contact")}
                className="bg-white text-indigo-700 hover:bg-white/90 font-bold rounded-full px-8 py-3"
              >
                Get Started Today
              </Button>
              <Button
                data-ocid="bpo.secondary_button"
                variant="outline"
                onClick={() => navigate("/#contact")}
                className="border-white text-white hover:bg-white/10 rounded-full px-8 py-3"
              >
                Request a Callback
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-indigo-600 to-teal-600 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "500+", label: "Clients Served" },
              { num: "1M+", label: "Calls Handled" },
              { num: "40%", label: "Cost Reduction" },
              { num: "24/7", label: "Operations" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold text-white">
                  {stat.num}
                </div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About BPO */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
                About Our BPO
              </span>
              <h2 className="text-4xl font-display font-bold text-foreground mb-6">
                Your Trusted BPO Partner
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                At ANYI, we act as an extension of your business — helping you
                focus on growth while we handle operations. Our skilled team,
                advanced tools, and data-driven approach ensure efficiency and
                accuracy across all business processes.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Dedicated team for each client",
                  "SLA-backed service delivery",
                  "ISO-grade data security",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img
                src="/assets/generated/bpo-team.dim_600x400.jpg"
                alt="ANYI BPO Team"
                className="w-full rounded-2xl shadow-lg object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our BPO Services */}
      <section className="py-14 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
              What We Do
            </span>
            <h2 className="text-4xl font-display font-bold text-foreground">
              Our BPO Services
            </h2>
          </motion.div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="bpo.list"
          >
            {BPO_SERVICES.map(({ icon: Icon, title, color, items }, i) => (
              <motion.div
                key={title}
                data-ocid={`bpo.item.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ANYI */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
                Our Advantage
              </span>
              <h2 className="text-4xl font-display font-bold text-foreground mb-6">
                Why Choose ANYI?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_ANYI.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 to-teal-50 rounded-2xl p-8 border border-indigo-100"
            >
              <div className="text-center mb-6">
                <Shield className="w-16 h-16 text-indigo-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground">
                  Enterprise-Grade Quality
                </h3>
                <p className="text-muted-foreground mt-2">
                  Backed by robust SLAs, data compliance frameworks, and a
                  quality-first culture.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "500+ Agents" },
                  { icon: Globe, label: "10+ Countries" },
                  { icon: Zap, label: "AI-Powered" },
                  { icon: Lock, label: "ISO Compliant" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl p-4 text-center shadow-sm"
                  >
                    <Icon className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-14 px-6 bg-gradient-to-br from-indigo-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
              How We Work
            </span>
            <h2 className="text-4xl font-display font-bold text-foreground">
              Our Process
            </h2>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-teal-400 z-0" />
            <div className="grid md:grid-cols-5 gap-6 relative z-10">
              {PROCESS_STEPS.map(({ step, title, desc }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-2xl font-extrabold text-white">
                      {step}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
              Sector Expertise
            </span>
            <h2 className="text-4xl font-display font-bold text-foreground">
              Industries We Serve
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-background border border-border rounded-2xl p-6 text-center hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm font-semibold text-foreground">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology We Use */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
              Tech Stack
            </span>
            <h2 className="text-3xl font-display font-bold text-foreground">
              Technology We Use
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {TECHNOLOGIES.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="px-5 py-2.5 rounded-full bg-background border border-indigo-200 text-sm font-medium text-foreground shadow-sm hover:border-primary transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Client Benefits */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-3">
              What You Gain
            </span>
            <h2 className="text-4xl font-display font-bold text-foreground">
              Client Benefits
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BENEFITS.map(({ icon: Icon, text, color }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-background border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-foreground leading-snug">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 px-6 bg-gradient-to-br from-indigo-50 to-teal-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl text-indigo-300 mb-2">&ldquo;</div>
            <blockquote className="text-xl font-medium text-foreground mb-4 leading-relaxed">
              ANYI helped us reduce our support cost and improved response time
              drastically. Their team is professional, responsive, and truly
              results-driven.
            </blockquote>
            <p className="text-sm font-semibold text-primary">
              — A Satisfied Client, Global E-commerce Company
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 px-6 bg-gradient-to-br from-indigo-600 to-teal-600">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Ready to Scale Your Business?
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              Partner with ANYI and transform your business operations with our
              expert BPO solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                data-ocid="bpo.primary_button"
                onClick={() => navigate("/#contact")}
                className="bg-white text-indigo-700 hover:bg-white/90 font-bold rounded-full px-10 py-3 text-base"
              >
                Get Started Today
              </Button>
              <Button
                data-ocid="bpo.secondary_button"
                variant="outline"
                onClick={() => navigate("/#contact")}
                className="border-white text-white hover:bg-white/10 rounded-full px-10 py-3 text-base"
              >
                Request a Callback
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="btn-gradient text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
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
              <div className="flex gap-3 mt-4">
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
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" /> ys@anyi.co.in
                </a>
                <a
                  href="mailto:ys@anyi.co.in"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" /> ys@anyi.co.in
                </a>
                <a
                  href="tel:+919810657082"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" /> +91 9810657082
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <span>&copy; {year} Anyi. All rights reserved.</span>
            <span>Built by ANYI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
