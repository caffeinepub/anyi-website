import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  BarChart2,
  Brain,
  CheckCircle,
  ChevronRight,
  Cpu,
  Globe,
  HardDrive,
  Headphones,
  Home,
  Layers,
  Mail,
  Menu,
  MessageSquare,
  Mic,
  Monitor,
  Phone,
  QrCode,
  Server,
  Settings,
  Smartphone,
  Star,
  StickyNote,
  Tag,
  TrendingUp,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";

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
          <span className="text-gradient font-bold">ANYI</span>
          <span className="w-2 h-2 rounded-full bg-primary mt-0.5" />
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {[
            "Home",
            "About",
            "Solutions",
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
                item === "Solutions"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => navigate("/admin")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            data-ocid="nav.primary_button"
            onClick={() => navigate("/#contact")}
            className="btn-gradient text-white hover:opacity-90 rounded-full px-6 text-xs font-semibold uppercase tracking-wider"
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
                className={`text-sm font-medium text-left py-1 ${
                  item === "Solutions"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
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
              className="text-sm font-medium text-left text-muted-foreground hover:text-foreground"
            >
              Admin
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const PBX_FEATURES = [
  "IP/SIP based technology",
  "Less hardware, more features",
  "Phone/ext. call handled through PC (without landline)",
  "Hot/Cold Redundancy with real-time switch-over",
  "Live monitoring & control",
  "Easy to use UI with UCP (User Control Panel)",
  "Multi-location access without extra hardware",
  "FAX/Voicemail to Email",
  "Call Recording",
  "Interactive Voice Response (IVR)",
  "Do Not Disturb",
  "Remote Office Support",
];

const HELPDESK_FEATURES = [
  { icon: Users, label: "Create/Manage Customer Profile" },
  { icon: StickyNote, label: "Create Ticket Under Customer Profile" },
  { icon: Layers, label: "Multi-channel Connector" },
  { icon: AlertTriangle, label: "Internal 5-Level Escalation" },
  { icon: Settings, label: "Assign Ticket to Owner/Department" },
  { icon: TrendingUp, label: "Auto TAT Calculation" },
  { icon: CheckCircle, label: "Maintain SLA (Service Level Agreement)" },
  { icon: Tag, label: "Categorize Tickets (Complaint/Query/Request)" },
  { icon: QrCode, label: "QR Code Assignment" },
  { icon: Brain, label: "Torch for RCA — AI Feature" },
  { icon: Zap, label: "3rd Party Integration via Ready-to-Plug-in API" },
  { icon: BarChart2, label: "Real-time Reporting & Analytics" },
];

const LEAD_FEATURES = [
  {
    icon: Globe,
    title: "Lead Generation",
    desc: "Lead generation via Website, portal, 3rd party software, landing pages, e-marketing platforms, Email, SMS, Voice, Social Media",
  },
  {
    icon: Zap,
    title: "Ready-to-use APIs",
    desc: "Ready-to-use APIs to plug-in & integrate with 3rd party for data sharing",
  },
  {
    icon: Users,
    title: "Customer Profiling",
    desc: "Create & manage customer's profile: Demographic, Contact, Profession, Personal",
  },
  {
    icon: StickyNote,
    title: "Lead Details",
    desc: "Capture details respect to query of the prospect",
  },
  {
    icon: TrendingUp,
    title: "Historical Information",
    desc: "Log history of all activities done",
  },
  {
    icon: Layers,
    title: "Multi-channel Connector",
    desc: "Voice, Email, SMS, Chat, Customer Portal",
  },
];

const CUSTOM_APPS = [
  {
    icon: Settings,
    title: "Complex Process Flow",
    desc: "Design tailor-made processes using ANYI Services Development & Customization Suite",
  },
  {
    icon: Cpu,
    title: "Appointment System",
    desc: "Create and maintain appointments, upload documents, send notification/reminders",
  },
  {
    icon: Monitor,
    title: "Data Entry/Medical Transcription",
    desc: "Customized data entry software for various business needs",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    desc: "Mobile application development for Android and iOS platforms",
  },
  {
    icon: Globe,
    title: "Integration Projects/APIs Creation",
    desc: "Middle layer applications for information sharing and data encryption",
  },
];

const INTEGRATIONS = [
  {
    icon: Star,
    title: "SalesForce",
    desc: "Smooth integrated solution using SF's Apps. SSO, Single User Interface, click-to-call, single action dual command",
  },
  {
    icon: Layers,
    title: "Leading CRM",
    desc: "Integrate with any 3rd party: ERP, HR, Workforce, Core Banking, Insurance CRM, Payment gateway",
  },
  {
    icon: HardDrive,
    title: "Homegrown LMS/CRM",
    desc: "Integrate with client's homemade CRM/LMS/helpdesk for automation, SSO, data sharing",
  },
  {
    icon: Users,
    title: "Social Media Accounts",
    desc: "Facebook, LinkedIn, Twitter, WhatsApp, Instagram & more",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Business API",
    desc: "Promotional & transactional messages. Chatbot system for FAQ and self-service",
  },
  {
    icon: Globe,
    title: "Websites/Landing Pages",
    desc: "Integration via SOAP API and REST API for automation",
  },
  {
    icon: MessageSquare,
    title: "SMS Gateways",
    desc: "Two-way integration for sending & receiving messages",
  },
  {
    icon: Mail,
    title: "Email System",
    desc: "Integrates via SMTP/POP3/IMAP for email communication & notification",
  },
];

const HARDWARE_ITEMS = [
  { icon: Wifi, label: "Gateways on Rent/Buyout" },
  { icon: Phone, label: "IP Phone" },
  { icon: Monitor, label: "Laptop & Desktop" },
  { icon: Server, label: "PRI Card" },
  { icon: HardDrive, label: "Server on Rent/Buyout" },
  { icon: Globe, label: "Networking" },
  { icon: Headphones, label: "USB Headphone" },
  { icon: Cpu, label: "Command Center" },
];

const SMART_MARKS = [
  {
    icon: Brain,
    title: "Smart RCA",
    desc: "Built-in Intelligence (AI) to find the possible root cause of the matter/issue",
  },
  {
    icon: Mic,
    title: "Voice Commands",
    desc: "Easy navigation & access key features through voice command",
  },
  {
    icon: Users,
    title: "CuPa for CSat",
    desc: "Help increasing customer's participation (CuPa) in survey (CSat) to get direct feedback",
  },
  {
    icon: Zap,
    title: "Buzz",
    desc: "Flicker to all users on new product/service buzz created by supervisor/admin",
  },
  {
    icon: QrCode,
    title: "QR Code Scanning",
    desc: "Unique QR code against each ticket for easy access & quick search",
  },
  {
    icon: Star,
    title: "Self-assessment",
    desc: "Build questionnaire for user self-assessment, get individual/cumulative performance",
  },
  {
    icon: AlertTriangle,
    title: "Mass Outage",
    desc: "Bunch mass outage complaints from customers in single ticket; on closure, all customers notified",
  },
  {
    icon: Tag,
    title: "Customer Tagging",
    desc: "Tag a customer as Bronze/Silver/Gold/Platinum",
  },
  {
    icon: TrendingUp,
    title: "Forecasting",
    desc: "Estimate the work load & align workforce accordingly",
  },
];

export default function SolutionsPage({
  navigate,
}: {
  navigate: (to: string) => void;
}) {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <NavBar navigate={navigate} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-background via-primary/10 to-background pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
              <button
                type="button"
                data-ocid="hero.link"
                onClick={() => navigate("/")}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Home className="w-3 h-3" /> Home
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary">Solutions</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              Integrated Solutions
            </h1>
            <p className="text-2xl text-primary font-medium mb-4">
              For All Possible Industries
            </p>
            <p className="text-white/60 max-w-2xl mb-10 text-lg">
              We design solutions which a business requires, using latest
              technology, AI & easy-to-use UI
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Communication", id: "communication" },
                { label: "CRM Platform", id: "crm" },
                { label: "Integrations", id: "integrations" },
                { label: "Hardware / Infra", id: "hardware" },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  data-ocid="hero.button"
                  onClick={() => scrollTo(id)}
                  className="px-5 py-2.5 rounded-full border border-teal/50 text-primary text-sm font-medium hover:bg-primary hover:text-foreground transition-all"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Communication */}
      <section id="communication" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Communication Solutions
            </span>
            <h2 className="text-4xl font-display font-bold text-foreground mt-2">
              Communication
            </h2>
          </motion.div>

          {/* Office PBX */}
          <div
            id="officepbx"
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/assets/generated/solutions-pbx.dim_800x500.jpg"
                alt="Office PBX ThinkTell"
                className="w-full rounded-2xl shadow-card object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Office PBX
              </span>
              <h3 className="text-3xl font-display font-bold text-foreground mt-2 mb-4">
                Office PBX — ThinkTell
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                An IP-PBX based solution that completes the telephony
                requirements in an office environment. This server-based PBX
                technology is preferred over hard EPABX, eliminating hardware
                while delivering all essential communication features.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PBX_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Multi-Channel Communication */}
          <div
            id="multichannel"
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Multi-Channel
              </span>
              <h3 className="text-3xl font-display font-bold text-foreground mt-2 mb-6">
                Multi-Channel Communication
              </h3>
              <Tabs defaultValue="voice" data-ocid="multichannel.tab">
                <TabsList className="bg-muted mb-4">
                  <TabsTrigger value="voice">Voice</TabsTrigger>
                  <TabsTrigger value="chatbot">Chat Bot</TabsTrigger>
                  <TabsTrigger value="sms">SMS</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="voice"
                  className="text-muted-foreground leading-relaxed"
                >
                  Catering both inbound and outbound voice, integrates with
                  SIP/PRI/UCM or Gateways. All standard features including
                  pacing ratio setting, time-based calling, dynamic CLI, DNC,
                  IVR. Supports all modes: Predictive, Progressive, and Preview
                  dialing.
                </TabsContent>
                <TabsContent
                  value="chatbot"
                  className="text-muted-foreground leading-relaxed"
                >
                  All AI-based humanized chats. Integrates with all major CRM
                  platforms like Zoho, Salesforce, Zendesk, or any third-party
                  CRM. NLP (Neuro Linguistic Programming) enabled. Easy transfer
                  to LIVE agents.
                </TabsContent>
                <TabsContent
                  value="sms"
                  className="text-muted-foreground leading-relaxed"
                >
                  Easy integrated world-class SMS solution with full API
                  integration for seamless two-way communication.
                </TabsContent>
                <TabsContent
                  value="email"
                  className="text-muted-foreground leading-relaxed"
                >
                  Robust Email integration with multiple mailbox configuration,
                  keyword analysis, auto-reply functionality, and all standard
                  Email features.
                </TabsContent>
              </Tabs>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 md:order-2"
            >
              <img
                src="/assets/generated/solutions-multichannel.dim_800x500.jpg"
                alt="Multi-Channel Communication"
                className="w-full rounded-2xl shadow-card object-cover"
              />
            </motion.div>
          </div>

          {/* WhatsApp */}
          <div id="whatsapp" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                <div className="p-10 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                    WhatsApp
                  </span>
                  <h3 className="text-3xl font-display font-bold text-foreground mb-5">
                    WhatsApp Solutions
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Smooth integration with WhatsApp Business API through official credentials",
                      "Send promotional & transactional messages at scale",
                      "Build chatbot system for FAQ and self-service automation",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <img
                  src="/assets/generated/solutions-whatsapp.dim_800x500.jpg"
                  alt="WhatsApp Solutions"
                  className="w-full h-64 md:h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Voice Solutions */}
          <div id="voice">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/20 to-accent/10 glass-card rounded-2xl p-10 text-white"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
                Auto Dialer
              </span>
              <h3 className="text-3xl font-display font-bold mb-5">
                Voice Solutions — Auto Dialer
              </h3>
              <p className="text-white/70 leading-relaxed mb-8 max-w-3xl">
                Auto Dialer Software is generally used in call centers and
                mobile companies. It automatically dials telephone numbers from
                a list or API. Once the call is answered, the auto-dialer either
                plays a recorded message or connects the call to a live person.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Predictive Dialing", icon: TrendingUp },
                  { label: "Progressive Dialing", icon: BarChart2 },
                  { label: "Preview Dialing", icon: Monitor },
                  { label: "IVR with Key-Press Options", icon: Settings },
                ].map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="bg-white/10 rounded-xl p-5 text-center"
                  >
                    <Icon className="w-7 h-7 text-primary mx-auto mb-3" />
                    <p className="text-sm font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: CRM Platform */}
      <section id="crm" className="py-20 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              CRM Platform
            </span>
            <h2 className="text-4xl font-display font-bold text-foreground mt-2">
              CRM Platform
            </h2>
          </motion.div>

          {/* Helpdesk */}
          <div id="ticketing" className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                Helpdesk Ticketing Software
              </h3>
              <p className="text-muted-foreground mb-6 max-w-3xl">
                Software to help create, manage, follow-up & close customer
                complaints/queries/requests received via voice, email, chat or
                portal.
              </p>
              <img
                src="/assets/generated/solutions-helpdesk.dim_800x500.jpg"
                alt="Helpdesk Software"
                className="w-full rounded-2xl shadow-card object-cover mb-8 max-h-72"
              />
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {HELPDESK_FEATURES.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="glass-card rounded-xl p-5 flex items-start gap-3"
                  >
                    <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground font-medium">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Lead Management */}
          <div id="leadmanagement" className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                    Lead Management System (LMS)
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive lead tracking and management solution that
                    captures, qualifies, and nurtures prospects through every
                    stage of the sales funnel.
                  </p>
                </div>
                <img
                  src="/assets/generated/solutions-leadmanagement.dim_800x500.jpg"
                  alt="Lead Management"
                  className="w-full rounded-2xl shadow-card object-cover"
                />
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {LEAD_FEATURES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="glass-card rounded-xl p-6">
                    <Icon className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">
                      {title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Customized Applications */}
          <div id="customized">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                Customized Applications with ANYI
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {CUSTOM_APPS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Integrations */}
      <section id="integrations" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Ecosystem
            </span>
            <h2 className="text-4xl font-display font-bold text-foreground mt-2">
              Integrations
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden mb-10"
          >
            <img
              src="/assets/generated/solutions-integrations.dim_800x500.jpg"
              alt="Integrations"
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
              <p className="text-white text-2xl font-display font-bold text-center px-4">
                Seamlessly connect with your entire ecosystem
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {INTEGRATIONS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Hardware / Infra */}
      <section
        id="hardware"
        className="py-20 px-6 bg-gradient-to-br from-primary/20 to-accent/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
                Infrastructure
              </span>
              <h2 className="text-4xl font-display font-bold text-white mb-8">
                Hardware / Infra
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {HARDWARE_ITEMS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="bg-white/10 rounded-xl p-4 text-center hover:bg-primary/30 transition-colors"
                  >
                    <Icon className="w-7 h-7 text-primary mx-auto mb-2" />
                    <p className="text-xs text-white/80 font-medium">{label}</p>
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
                src="/assets/generated/solutions-hardware.dim_800x500.jpg"
                alt="Hardware Infrastructure"
                className="w-full rounded-2xl object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Smart Marks */}
      <section id="smartmarks" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-block bg-gradient-to-r from-teal to-navy rounded-2xl p-8 w-full">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2 block">
                AI-Powered
              </span>
              <h2 className="text-4xl font-display font-bold text-white mb-2">
                Smart Marks
              </h2>
              <p className="text-white/70">
                AI-Powered Features that transform your operations
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SMART_MARKS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal/20 to-navy/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/20 to-accent/10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Need a hand?
            </h2>
            <p className="text-white/60 mb-8">
              Contact us at Anyi Services India Private Limited
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 text-sm text-white/70">
              <a
                href="tel:+919810657082"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" /> +91 9810657082
              </a>
              <a
                href="mailto:ys@anyi.co.in"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" /> ys@anyi.co.in
              </a>
              <a
                href="mailto:sales@anyi.co.in"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" /> sales@anyi.co.in
              </a>
            </div>
            <Button
              data-ocid="cta.primary_button"
              onClick={() => navigate("/#contact")}
              className="bg-primary text-foreground hover:bg-primary/90 font-bold px-10 py-3 rounded-full text-base"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="btn-gradient text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-1 font-bold text-xl mb-4">
                <span>ANYI</span>
                <span className="w-2 h-2 rounded-full bg-primary mt-0.5" />
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
                  href="mailto:sales@anyi.co.in"
                  className="hover:text-white transition-colors"
                >
                  sales@anyi.co.in
                </a>
                <a
                  href="tel:+919810657082"
                  className="hover:text-white transition-colors"
                >
                  +91 9810657082
                </a>
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
                className="text-primary hover:text-white transition-colors"
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
