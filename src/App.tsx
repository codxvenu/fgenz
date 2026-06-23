import React, { useState, useEffect, useRef } from "react";
import { 
  Plus, Minus, TrendingUp, Info, Lock, Globe, Mail, 
  ArrowUpRight, ArrowRight, CheckCircle2, Megaphone, 
  Brush, Users, Target, Compass, Sparkles, Zap, X, Calendar, Check
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { SERVICES_DATA, VENTURES_DATA, PROCESS_DATA, FAQ_DATA, ServiceItem } from "./data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlobServices from "./components/BlobServices";
import { PlugIllustration } from "./components/PlugIllustration";

gsap.registerPlugin(ScrollTrigger);

const blobShapes = [
  "58% 42% 52% 48% / 42% 55% 45% 58%",
  "43% 57% 48% 52% / 60% 40% 60% 40%",
  "61% 39% 51% 49% / 52% 58% 42% 48%",
  "45% 55% 60% 40% / 48% 39% 61% 52%",
  "54% 46% 41% 59% / 61% 49% 51% 39%",
  "63% 37% 55% 45% / 44% 60% 40% 56%",
];

const hoveredBlobShapes = [
  "42% 58% 48% 52% / 55% 45% 58% 42%",
  "57% 43% 52% 48% / 40% 60% 40% 60%",
  "39% 61% 49% 51% / 58% 42% 48% 52%",
  "55% 45% 40% 60% / 39% 48% 52% 61%",
  "46% 54% 59% 41% / 49% 61% 39% 51%",
  "37% 63% 45% 55% / 60% 44% 56% 40%",
];

const serviceMap: { [key: string]: { title: string; desc: string } } = {
  "web-dev": {
    title: "WEB DEVELOPMENT",
    desc: "Engineering blazing-fast, premium responsive web interfaces styled for extreme performance and absolute pixel-perfection."
  },
  "brand-strategy": {
    title: "BRAND STRATEGY",
    desc: "Architecting memorable visual identities, premium guidelines, and creative positioning strategies that establish customer trust."
  },
  "ui-ux-design": {
    title: "UI/UX DESIGN",
    desc: "Crafting bespoke digital interfaces, high-fidelity prototypes, and sleek UX paths strictly designed to capture and hold attention."
  },
  "growth-marketing": {
    title: "GROWTH MARKETING",
    desc: "Driving hyper-targeted user distribution loops, organic product-led referrals, and ad campaign systems focused on growth."
  },
  "seo-optimization": {
    title: "SEO OPTIMIZATION",
    desc: "Achieve dominant rankings for critical target queries with state-of-the-art search index setups and crawlable contents."
  },
  "performance-mkt": {
    title: "PERFORMANCE MARKETING",
    desc: "Deploying high-intent analytical spend across multi-channel models to secure high conversion rates at calculated costs."
  },
  "social-media": {
    title: "SOCIAL MEDIA MANAGEMENT",
    desc: "Nurturing active and deeply loyal communities across major online feeds, speaking your audience's language fluently and directly."
  },
  "content-creation": {
    title: "CONTENT CREATION",
    desc: "Producing stunning, scroll-stopping micro-videos, cinema-grade graphics, and sleek copies that connect with cultural trends."
  },
  "email-marketing": {
    title: "EMAIL MARKETING",
    desc: "Forging close digital relationships through personalized retention copy decks, private drop notifications, and loyalty incentives."
  }
};

interface GridPebble {
  id: string;
  type: "service" | "accent";
  colorType: "dark" | "green" | "purple";
  shapeIdx: number;
  floatClass: string;
  flexVal: number;
}

const gridColumns: GridPebble[][] = [
  // Column 1 (3 items)
  [
    { id: "web-dev", type: "service", colorType: "dark", shapeIdx: 0, floatClass: "float-1", flexVal: 1.15 },
    { id: "accent-p1", type: "accent", colorType: "purple", shapeIdx: 1, floatClass: "float-2", flexVal: 0.95 },
    { id: "seo-optimization", type: "service", colorType: "dark", shapeIdx: 2, floatClass: "float-3", flexVal: 1.15 },
  ],
  // Column 2 (4 items)
  [
    { id: "accent-g1", type: "accent", colorType: "green", shapeIdx: 3, floatClass: "float-4", flexVal: 1 },
    { id: "ui-ux-design", type: "service", colorType: "dark", shapeIdx: 4, floatClass: "float-1", flexVal: 1 },
    { id: "accent-g2", type: "accent", colorType: "green", shapeIdx: 5, floatClass: "float-2", flexVal: 1 },
    { id: "content-creation", type: "service", colorType: "purple", shapeIdx: 0, floatClass: "float-3", flexVal: 1.05 },
  ],
  // Column 3 (4 items)
  [
    { id: "brand-strategy", type: "service", colorType: "dark", shapeIdx: 1, floatClass: "float-4", flexVal: 1 },
    { id: "accent-p2", type: "accent", colorType: "purple", shapeIdx: 2, floatClass: "float-1", flexVal: 1 },
    { id: "performance-mkt", type: "service", colorType: "dark", shapeIdx: 3, floatClass: "float-2", flexVal: 1.05 },
    { id: "social-media", type: "service", colorType: "dark", shapeIdx: 4, floatClass: "float-3", flexVal: 0.95 },
  ],
  // Column 4 (4 items)
  [
    { id: "accent-p3", type: "accent", colorType: "purple", shapeIdx: 5, floatClass: "float-4", flexVal: 1 },
    { id: "growth-marketing", type: "service", colorType: "dark", shapeIdx: 0, floatClass: "float-1", flexVal: 1 },
    { id: "accent-g3", type: "accent", colorType: "green", shapeIdx: 2, floatClass: "float-2", flexVal: 1 },
    { id: "email-marketing", type: "service", colorType: "dark", shapeIdx: 3, floatClass: "float-3", flexVal: 1 },
  ]
];

interface PebbleCardProps {
  item: GridPebble;
  onSelect: (id: string) => void;
  key?: string | number;
}

function PebbleCard({ item, onSelect }: PebbleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Organic shape morphing transitions
  const baseShape = blobShapes[item.shapeIdx % blobShapes.length];
  const hoverShape = hoveredBlobShapes[item.shapeIdx % hoveredBlobShapes.length];
  const currentShape = isHovered ? hoverShape : baseShape;

  // Dynamic colors: Green <-> Purple on hover; dark remains dark with reflective change
  let bgStyle = "";
  if (item.colorType === "green") {
    bgStyle = isHovered ? "pebble-card-purple" : "pebble-card-green";
  } else if (item.colorType === "purple") {
    bgStyle = isHovered ? "pebble-card-green" : "pebble-card-purple";
  } else {
    bgStyle = "pebble-card-dark";
  }

  const srvInfo = item.type === "service" ? serviceMap[item.id] : null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => item.type === "service" && onSelect(item.id)}
      style={{ flex: item.flexVal }}
      className={`relative w-full overflow-hidden cursor-pointer group transition-all duration-[700ms] ${item.floatClass}`}
    >
      {item.type === "service" ? (
        <div className="w-full h-full perspective-1000">
          {/* Card core flipper */}
          <div className="w-full h-full relative transform-style-3d duration-[800ms] transition-transform ease-out group-hover:rotate-y-180">
            
            {/* FRONT CARD (Title + organic design) */}
            <div
              className={`absolute inset-0 ${bgStyle} flex flex-col justify-center items-center p-4 text-center backface-hidden transition-all duration-[600ms] ease-in-out`}
              style={{ borderRadius: currentShape }}
            >
              {/* Highlight Overlay */}
              <div className="absolute inset-0 bg-[#000000]/15 pointer-events-none group-hover:bg-transparent transition-all duration-300" style={{ borderRadius: currentShape }} />
              
              {/* Spaced Elegant Typography centered exactly like the image */}
              <h3 
                className={`font-sans font-extrabold text-xs sm:text-[13px] md:text-[14px] lg:text-[15px] uppercase tracking-[0.25em] leading-[1.4] transition-all duration-500 transform group-hover:scale-[1.05] px-2 ${
                  item.colorType === "dark" ? "text-zinc-100 group-hover:text-white" : "text-zinc-950 group-hover:text-zinc-100"
                }`}
              >
                {srvInfo?.title.split(" ").map((w, wi) => (
                  <span key={wi} className="block">{w}</span>
                ))}
              </h3>

              {/* Accent dot */}
              <div className={`w-1.5 h-1.5 rounded-full mt-4 opacity-30 group-hover:opacity-60 transition-all duration-300 ${
                item.colorType === "dark" ? "bg-[#D9FF00]" : "bg-white"
              }`} />
            </div>

            {/* BACK CARD (Revealing descriptive content on flip) */}
            <div
              className="absolute inset-0 rotate-y-180 flex flex-col justify-center items-center p-4 text-center backface-hidden transition-all duration-[600ms] ease-in-out bg-[#070709] border border-zinc-800"
              style={{ borderRadius: currentShape }}
            >
              {/* Decorative tint gradient backplate */}
              <div className="absolute inset-0 bg-black/60 pointer-events-none" style={{ borderRadius: currentShape }} />
              
              <div className="relative z-10 px-2">
                <span className="font-mono text-[9px] text-[#cdf200] tracking-[0.15em] uppercase font-bold block mb-2">
                  BLUEPRINT_0{item.shapeIdx + 1}
                </span>
                <p className="font-sans text-[10px] md:text-[11px] lg:text-xs leading-relaxed text-zinc-300 font-medium max-w-[90%] mx-auto">
                  {srvInfo?.desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ACCENT PEBBLE (No flip, pure morph and floating visual atmosphere matching the shared reference layout) */
        <div
          className={`w-full h-full ${bgStyle} flex items-center justify-center transition-all duration-[600ms] ease-in-out`}
          style={{ borderRadius: currentShape }}
        >
          {/* Accent decoration inner ring */}
          <div className="w-8 h-8 rounded-full border border-white/5 opacity-10 group-hover:scale-150 group-hover:opacity-20 transition-all duration-[800ms]" style={{ borderRadius: currentShape }} />
        </div>
      )}
    </div>
  );
}


export default function App() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // GSAP ScrollTrigger Animations Hook
  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- SECTION 1: HERO ENTRANCE ---
      gsap.fromTo(
        ".hero-badge-anim",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-title-anim",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-desc-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(
        ".hero-btn-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );
      gsap.fromTo(
        ".hero-card-anim",
        { scale: 0.9, opacity: 0, rotation: 10 },
        { scale: 1, opacity: 1, rotation: 3, duration: 1.2, ease: "back.out(1.5)", delay: 0.6 }
      );

      // --- SECTION 2: HOW WE GROW ---
      gsap.fromTo(
        ".process-header-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#process",
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
      gsap.fromTo(
        ".process-card-anim",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: "#process",
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // --- SECTION 3: SERVICES INTRO ---
      gsap.fromTo(
        ".services-intro-anim",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#services",
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // --- SECTION 4: STAND TOGETHER (Heading & Details) ---
      gsap.fromTo(
        ".vision-word",
        { 
          y: -150, 
          opacity: 0,
          display: "inline-block",
          transformOrigin: "center top"
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.2,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: "#vision",
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(
        ".vision-details-anim",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#vision",
            start: "top 65%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // --- SECTION 5: LATEST VENTURES ---
      gsap.fromTo(
        ".ventures-header-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: "#ventures",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(
        ".venture-card-anim",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          duration: 0.9,
          scrollTrigger: {
            trigger: "#ventures-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // --- SECTION 6: WE DON'T SELL DREAMS ---
      gsap.fromTo(
        ".quote-side-anim",
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#dreams",
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
      gsap.fromTo(
        ".desc-side-anim",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#dreams",
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // --- SECTION 7: FAQS ---
      gsap.fromTo(
        ".faq-intro-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: "#faq",
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
      gsap.fromTo(
        ".faq-item-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: "#faq",
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // --- SECTION 8: PROJECTS & METRICS ---
      gsap.fromTo(
        ".metric-card-anim",
        { scale: 0.9, y: 50, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: "#projects-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // --- SECTION 9: ACCELERATOR BOOKING CTA & PLUG ---
      gsap.fromTo(
        ".cta-content-anim",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#accelerate-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
      gsap.fromTo(
        ".cta-plug-anim",
        { scale: 0.7, opacity: 0, rotation: -15 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: "#accelerate-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Interactive Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"form" | "sending" | "success">("form");
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingWarning, setBookingWarning] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$5k - $10k",
    message: "",
    selectedServices: [] as string[]
  });

  const toggleModal = () => {
    setIsModalOpen(prev => {
      const next = !prev;
      if (!next) {
        setBookingError(null);
        setBookingWarning(null);
        setBookingStep("form");
      }
      return next;
    });
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(serviceId);
      const updated = exists
          ? prev.selectedServices.filter(id => id !== serviceId)
          : [...prev.selectedServices, serviceId];
      return { ...prev, selectedServices: updated };
    });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep("sending");
    setBookingError(null);
    setBookingWarning(null);

    try {
      const response = await fetch("/api/gba/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to submit booking.");
      }

      const result = await response.json();
      
      // Request successful! Close modal and prompt custom toast notification
      setIsModalOpen(false);
      setBookingStep("form");
      
      // Reset form controls
      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "$5k - $10k",
        message: "",
        selectedServices: []
      });

      // Show sleek top Level notification saying active literal payload: "Request send"
      setNotification("Request send");
      setTimeout(() => {
        setNotification(null);
      }, 5000);

    } catch (err: any) {
      console.error("Booking submission failed:", err);
      setBookingError(err.message || "An error occurred during booking. Please try again.");
      setBookingStep("form");
    }
  };

  const scrollToServices = () => {
    const services = document.getElementById("services");
    if (services) {
      services.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const selectServiceForWorkshop = (serviceId: string) => {
    // Automatically select the service inside the form and open modal
    setFormData(prev => {
      if (!prev.selectedServices.includes(serviceId)) {
        return { ...prev, selectedServices: [...prev.selectedServices, serviceId] };
      }
      return prev;
    });
    toggleModal();
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  // Helper mapping string to Lucide React component
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "campaign":
        return <Megaphone className="w-10 h-10 text-[#c0c1ff]" />;
      case "brush":
        return <Brush className="w-10 h-10 text-[#b4d400]" />;
      case "groups":
        return <Users className="w-10 h-10 text-[#ddb7ff]" />;
      case "target":
        return <Target className="w-10 h-10 text-white" />;
      case "insights":
        return <Compass className="w-10 h-10 text-[#c0c1ff]" />;
      default:
        return <Sparkles className="w-10 h-10 text-white" />;
    }
  };

  // Border theme colors helper to represent neo-brutal high contrast variations
  const getThemeBorderClass = (color: string) => {
    switch (color) {
      case "primary":
        return "border-[#c0c1ff] neo-brutal-shadow-primary";
      case "tertiary":
        return "border-[#b4d400] neo-brutal-shadow-tertiary";
      case "secondary":
        return "border-[#ddb7ff] shadow-[4px_4px_0px_0px_#ddb7ff]";
      case "white":
        return "border-white neo-brutal-shadow-white";
      default:
        return "border-zinc-800 neo-brutal-shadow";
    }
  };

  const getThemeTextClass = (color: string) => {
    switch (color) {
      case "primary":
        return "text-[#c0c1ff]";
      case "tertiary":
        return "text-[#b4d400]";
      case "secondary":
        return "text-[#ddb7ff]";
      case "white":
        return "text-white";
      default:
        return "text-white";
    }
  };

  return (
    <div className="bg-[#131112] min-h-screen text-[#e5e2e1] font-sans selection:bg-[#b4d400] selection:text-black antialiased">
      {/* Top Floating Success Toast */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-bounce max-w-sm w-full px-4">
          <div className="bg-black text-[#cdf200] px-6 py-4 border-4 border-[#cdf200] font-mono text-xs uppercase tracking-widest font-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#cdf200] animate-ping" />
              <span>{notification}</span>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="text-zinc-400 hover:text-white font-bold ml-2 font-sans text-sm"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Navigation header */}
      <Navbar onStartBuildingClick={toggleModal} />

      {/* Main Container */}
      <main className="pt-24 pb-12">
        {/* 1. HERO LAYOUT */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-12 py-20 overflow-hidden border-b-4 border-black bg-gradient-to-br from-[#1a0f26]/20 via-[#131313] to-[#121600]/10">
          {/* Subtle overlay grid background lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

          <div className="relative z-10 max-w-5xl">
            <div className="hero-badge-anim inline-block bg-[#b4d400] text-black px-4 py-1.5 mb-6 border-2 border-black font-poppins text-xs font-bold transform -rotate-1 uppercase tracking-widest">
              GBA GEN-Z BUSINESS AGENCY
            </div>
            
            <h1 className="hero-title-anim font-oswald font-extrabold text-5xl sm:text-7xl md:text-9xl mb-8 uppercase tracking-tighter leading-[0.85] text-white break-words">
              The One-Stop <br />
              <span className="text-[#c0c1ff] italic">Solution</span> for <br />
              Business Growth.
            </h1>

            <p className="hero-desc-anim font-sans font-medium text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
              GBA helps startups and businesses grow by managing branding, marketing, hiring, customer acquisition, and business strategy—all in one place.
            </p>

            <div className="hero-btn-anim flex flex-col sm:flex-row gap-5 font-poppins">
              <button 
                onClick={toggleModal}
                className="bg-[#cdf200] text-black font-extrabold text-sm uppercase tracking-wider px-8 py-5 border-4 border-black shadow-[4px_4px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2 uppercase animate-bounce"
              >
                Start Building Together
                <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
              </button>
              <button 
                onClick={scrollToServices}
                className="bg-transparent text-white font-extrabold text-sm uppercase tracking-wider px-8 py-5 border-4 border-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase"
              >
                View Our Services
              </button>
            </div>
          </div>

          {/* Hero Background Image on the Right */}
          <div className="hero-card-anim hidden lg:block absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-[45%] h-[80%] pointer-events-none">
            <img 
              src="/herobg.png" 
              alt="Hero background" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain object-right"
            />
          </div>
        </section>

        {/* 2. HOW WE GROW YOUR BRAND (Process) */}
        <section className="px-4 md:px-12 py-20 border-b-4 border-black" id="process">
          <div className="process-header-anim mb-16">
            <span className="text-[#b4d400] font-mono text-xs uppercase tracking-[0.25em] font-extrabold block mb-2">
              OUR THREE-STEP PROCESS
            </span>
            <h2 className="font-oswald font-extrabold text-3xl sm:text-5xl uppercase tracking-tighter text-white">
              HOW WE GROW YOUR BRAND
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_DATA.map((step) => (
              <div 
                key={step.number} 
                className={`process-card-anim relative border-4 border-black p-8 flex flex-col justify-between min-h-[300px] transition-all ${
                  step.highlightCard 
                    ? "bg-[#c0c1ff] text-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]" 
                    : "bg-[#181818] text-[#e5e2e1] neo-brutal-shadow"
                }`}
              >
                {/* Asymmetric number backdrop */}
                <div className={`absolute top-2 right-4 font-oswald text-8xl md:text-9xl font-extrabold opacity-10 select-none ${
                  step.highlightCard ? "text-white" : "text-zinc-600"
                }`}>
                  {step.number}
                </div>

                <div className="relative z-10">
                  <h3 className="font-poppins font-extrabold text-3xl uppercase tracking-tight mb-4">
                    {step.title}
                  </h3>
                  <p className={`font-sans font-medium text-xs md:text-sm leading-relaxed ${
                    step.highlightCard ? "text-zinc-900" : "text-zinc-400"
                  }`}>
                    {step.description}
                  </p>
                </div>

                <span className="font-mono text-[10px] uppercase font-bold tracking-wider mt-12 block">
                  STEP 0{step.number}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SERVICES WE PROVIDE (Amorphous Pebble Grid) */}
        <section className="px-4 md:px-12 py-24 border-b-4 border-black relative overflow-hidden bg-[#0A0A0A]" id="services">
          {/* Seamless dark cosmic ambient backdrop lines representing raw stone cracks */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,15,20,0.95)_0%,#050505_100%)] pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto relative z-10 lg:grid lg:grid-cols-[300px_1fr] xl:grid-cols-[360px_1fr] gap-[40px] xl:gap-[64px] items-start">
            {/* Left Column containing Section Header - Sticky on Large/Wider Screens */}
            <div className="services-intro-anim lg:sticky lg:top-36 mb-12 lg:mb-0 space-y-6">
              <div style={{ marginBottom: "40px" }}>
                <span className="text-[#cdf200] font-poppins text-xs uppercase tracking-[0.25em] font-extrabold block mb-2">
                  ORGANIC BRAND PATHWAY
                </span>
                <h2 
                  className="font-oswald font-extrabold uppercase text-white leading-none"
                  style={{ fontSize: "4rem", letterSpacing: "1px" }}
                >
                  Our Services
                </h2>
              </div>
              <p 
                className="font-opensans text-[#b4d400] font-bold text-sm sm:text-base leading-relaxed capitalize tracking-[2px] w-[78%] lg:w-full"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                We build digital ecosystems that attract attention, generate trust, and drive measurable growth. From strategy and design to content and marketing, every service is engineered to help brands scale organically.
              </p>
            </div>

            {/* Right Column containing the interactive stone map */}
            <div className="relative w-full" id="services-mosaic-container">
              <BlobServices onSelectService={selectServiceForWorkshop} />
            </div>
          </div>
        </section>

        {/* 4. STAND TOGETHER SECTION */}
        <section className="relative px-4 md:px-12 py-20 text-center overflow-hidden bg-background border-b-4 border-black" id="vision">
          {/* subtle background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          <div className="relative z-10 py-16">
            <h2 className="font-oswald font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[1.0] uppercase tracking-tighter mb-12 py-2 overflow-hidden">
              <span className="vision-word mr-3 hover:translate-y-2 transition-transform cursor-default">Stand</span>
              <span className="vision-word text-[#b4d400] hover:translate-y-2 transition-transform cursor-default">Together.</span>
              <br className="hidden sm:block" />
              <span className="vision-word mr-3 mt-2 sm:mt-0 hover:translate-y-2 transition-transform cursor-default">Build</span>
              <span className="vision-word text-[#c0c1ff] hover:translate-y-2 transition-transform cursor-default">Together.</span>
              <br className="hidden sm:block" />
              <span className="vision-word mr-3 mt-2 sm:mt-0 hover:translate-y-2 transition-transform cursor-default">Grow</span>
              <span className="vision-word text-[#ddb7ff] hover:translate-y-2 transition-transform cursor-default">Together.</span>
            </h2>
            <div className="max-w-2xl mx-auto vision-details-anim">
              <p className="font-sans font-medium text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed">
                Our native expertise lies in reaching and activating the most influential consumer blocks today: Gen-Z, Millennials, and Gen Alpha. We speak their language because it's our own.
              </p>
            </div>
          </div>
        </section>

        {/* 5. LATEST VENTURES */}
        <section className="bg-zinc-950 px-4 md:px-12 py-20 border-b-4 border-black" id="ventures">
          <div className="ventures-header-anim mb-16">
            <span className="text-[#ddb7ff] font-poppins text-xs uppercase tracking-[0.25em] font-extrabold block mb-2">
              OUR TRACK RECORD
            </span>
            <h2 className="font-oswald font-extrabold text-3xl sm:text-5xl uppercase tracking-tighter text-white">
              LATEST VENTURES
            </h2>
            <p className="font-sans text-zinc-400 font-medium text-sm sm:text-base max-w-xl mt-3">
              A snapshot of the diverse businesses currently scaling with GBA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="ventures-grid">
            {VENTURES_DATA.map((ven) => {
              // Dynamic bg color styles corresponding to the reference
              // "bg-primary", "bg-tertiary", "bg-secondary-container" mapping:
              const isNeon = ven.name.toLowerCase().includes("neon");
              const isDrift = ven.name.toLowerCase().includes("drift");
              const backdropColor = isNeon ? "bg-[#c0c1ff]" : isDrift ? "bg-[#b4d400]" : "bg-[#ddb7ff]";

              return (
                <div key={ven.name} className="venture-card-anim relative group min-h-[420px]">
                  {/* Backdrop tilted container */}
                  <div className={`absolute inset-0 border-2 border-black transform transition-transform group-hover:rotate-0 duration-500 translate-x-3 translate-y-3 ${backdropColor} ${ven.rotateClass}`}></div>
                  
                  {/* Front card body with brutalist styling and hover lift */}
                  <div className="relative bg-white text-black p-6 border-2 border-black h-full flex flex-col justify-between hover:-translate-x-1 hover:-translate-y-1 transition-all duration-350">
                    <div>
                      {/* Grayscale image container */}
                      <div className="aspect-video bg-neutral-200 mb-6 border border-black overflow-hidden relative">
                        <img 
                          src={ven.imageUrl} 
                          alt={ven.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale transition-all duration-750 group-hover:grayscale-0 group-hover:scale-105"
                        />
                      </div>

                      <span className="bg-black text-white px-2.5 py-1 font-poppins text-[9px] uppercase tracking-wider font-bold mb-4 inline-block transform -rotate-1">
                        {ven.tag}
                      </span>

                      <h3 className="font-poppins font-extrabold text-2xl uppercase tracking-tight text-black mb-2 leading-none">
                        {ven.name}
                      </h3>
                      <p className="font-sans font-medium text-neutral-600 text-xs md:text-sm leading-relaxed mb-6 font-body-md">
                        {ven.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-zinc-200 pt-4 font-mono text-[10px] text-zinc-500">
                      <span>STATUS: ACTIVE & RUNNING</span>
                      <span className="text-black font-extrabold font-poppins">VIEW MORE &gt;</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. "WE DON'T SELL DREAMS" SECTION */}
        <section id="dreams" className="grid grid-cols-1 md:grid-cols-2 border-b-4 border-black">
          {/* Quote side */}
          <div className="quote-side-anim bg-[#cdf200] text-black p-8 md:p-16 flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black">
            <h2 className="font-oswald font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase leading-[0.95] tracking-tighter text-black w-full text-left md:text-center shrink-0">
              "WE DON'T <br />
              SELL DREAMS. <br />
              WE BUILD <br />
              MACHINES."
            </h2>
          </div>

          {/* Vibe description side */}
          <div className="desc-side-anim bg-[#1a1a1a] p-8 md:p-16 flex flex-col justify-center">
            <span className="font-mono text-xs text-[#c0c1ff] uppercase tracking-widest font-extrabold block mb-4">
              OUR FOCUS & PROMISE
            </span>
            <h3 className="font-poppins font-extrabold text-xl sm:text-2xl uppercase text-white tracking-tight mb-6">
              Traditional marketing agencies waste time with useless meetings and consulting hours. We focus strictly on launching real assets, running ads, and placing talent.
            </h3>
            
            <div className="font-sans space-y-4 text-zinc-400 font-medium text-sm sm:text-base leading-relaxed">
              <p>
                We started GBA to eliminate typical agency overhead and delays. Standard consulting firms charge you just to draw a generic logo, hand you a generic visual guide, and wish you luck. 
              </p>
              <p>
                We launch quickly. We build active web designs, run live social advertisements, screen and hire team players, and map out growth strategies centered entirely around your target budget.
              </p>
            </div>
          </div>
        </section>

        {/* 7. FAQs */}
        <section className="bg-zinc-950 px-4 md:px-12 py-20 border-b-4 border-black animate-fadeIn" id="faq">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="faq-intro-anim lg:col-span-4 sticky top-28">
              <span className="text-[#b4d400] font-mono text-xs uppercase tracking-[0.25em] font-extrabold block mb-2">
                COMMON QUESTIONS
              </span>
              <h2 className="font-oswald font-extrabold text-3xl sm:text-5xl uppercase tracking-tighter text-white leading-none mb-4">
                FREQUENTLY ASKED
              </h2>
              <p className="font-sans text-zinc-400 font-medium text-sm sm:text-base">
                Got questions? Here are honest, direct answers about GBA and how we work.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {FAQ_DATA.map((item, idx) => {
                const isOpen = activeFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="faq-item-anim border-4 border-black bg-[#181818] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-5 flex justify-between items-center gap-4 text-white hover:text-[#b4d400] transition-colors focus:outline-none"
                    >
                      <span className="font-extrabold text-[#c0c1ff] font-mono text-xs sm:text-sm shrink-0">
                        0{idx+1} //
                      </span>
                      <span className="font-poppins font-extrabold text-sm sm:text-base uppercase tracking-tight flex-1">
                        {item.question}
                      </span>
                      <div className="bg-black/60 p-2 border border-zinc-800 text-white shrink-0">
                        {isOpen ? <Minus className="w-4 h-4 text-[#cdf200]" /> : <Plus className="w-4 h-4 text-[#cdf200]" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 border-t-2 border-black/50 pt-5 bg-black/40 text-zinc-400 font-sans font-medium text-xs sm:text-sm leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. PROJECTS DELIVERED SECTION (Metrics Numbers Showcase) */}
        <section id="projects-section" className="bg-black px-4 md:px-12 py-16 border-b-4 border-black">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="metric-card-anim bg-[#c0c1ff] text-black border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="font-mono text-xs uppercase font-extrabold tracking-wider bg-black text-white px-2.5 py-1 inline-block mb-3">
                01/ Projects Delivered
              </span>
              <div className="font-oswald font-extrabold text-5xl md:text-7xl leading-none uppercase tracking-tighter mb-2">50+</div>
              <div className="font-poppins font-extrabold text-base md:text-lg uppercase">Brands Launched</div>
              <p className="font-sans font-medium text-zinc-800 text-xs md:text-sm mt-3 opacity-90">
                We design and support web platforms, online stores, and brand strategies from start to finish.
              </p>
            </div>

            <div className="metric-card-anim bg-[#b4d400] text-black border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 hover:rotate-0 transition-transform">
              <span className="font-mono text-xs uppercase font-extrabold tracking-wider bg-black text-white px-2.5 py-1 inline-block mb-3">
                02/ Total Impact
              </span>
              <div className="font-oswald font-extrabold text-5xl md:text-7xl leading-none uppercase tracking-tighter mb-2">1M+</div>
              <div className="font-poppins font-extrabold text-base md:text-lg uppercase">Customers Reached</div>
              <p className="font-sans font-medium text-zinc-900 text-xs md:text-sm mt-3 opacity-90">
                Creative marketing setups and social media campaigns built to grab attention and drive sales.
              </p>
            </div>

            <div className="metric-card-anim bg-zinc-900 text-white border-4 border-black p-8 shadow-[4px_4px_0px_0px_#ddb7ff] transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="font-mono text-xs uppercase font-extrabold tracking-wider bg-zinc-850 text-[#ddb7ff] px-2.5 py-1 inline-block mb-3">
                03/ Team Coordination
              </span>
              <div className="font-oswald font-extrabold text-5xl md:text-7xl leading-none uppercase tracking-tighter mb-2">24/7</div>
              <div className="font-poppins font-extrabold text-base md:text-lg uppercase">Fast Results</div>
              <p className="font-sans font-medium text-zinc-400 text-xs md:text-sm mt-3 opacity-90">
                No long corporate delays. We work fast to post ads, hire people, and write clean code.
              </p>
            </div>
          </div>
        </section>

        {/* BOOK CONSULTATION CTA FOR SECTION SEPARATION AND CONTINUITY */}
        <section id="accelerate-section" className="px-4 md:px-12 py-16 overflow-hidden">
          <div className="relative bg-[#c0c1ff] border-4 border-black p-8 md:p-16 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row items-center gap-12 overflow-hidden">
            {/* Sticker badge */}
            <div className="absolute -top-6 -left-3 bg-[#b4d400] text-black px-6 py-3 border-4 border-black font-extrabold text-base md:text-lg rotate-3 uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-poppins">
              BOOKING AVAILABILITY: ACTIVE
            </div>

            <div className="cta-content-anim flex-1 text-left relative z-10 pt-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-900 font-extrabold block mb-2">
                TAKE THE NEXT STEP
              </span>
              <h2 className="font-oswald font-extrabold text-4xl sm:text-7xl uppercase leading-[0.9] tracking-tighter text-black mb-6">
                READY TO <br />
                <span className="text-white italic">ACCELERATE?</span>
              </h2>
              <p className="font-sans font-semibold text-zinc-900 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-snug">
                Stop dealing with slow marketing firms. Work with GBA to launch high-converting creative designs, websites, and hiring paths.
              </p>
              
              <button 
                onClick={toggleModal}
                className="bg-black text-white font-poppins font-extrabold text-sm sm:text-[15px] uppercase tracking-wider px-10 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-4 group"
              >
                Book Your Call Now
                <TrendingUp className="w-5 h-5 text-[#b4d400] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Asymmetric Circle Visual widget containing dynamic PlugIllustration */}
            <div className="cta-plug-anim hidden xl:flex flex-1 justify-end relative z-10 pr-6">
              <PlugIllustration />
            </div>
          </div>
        </section>
      </main>      {/* FOOTER */}
      <footer className="w-full px-4 md:px-12 py-16 bg-[#0c0c0d] border-t-4 border-black flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#b4d400] text-black px-2 py-0.5 border border-black font-oswald font-extrabold text-sm transform -rotate-2">
              GBA
            </div>
            <span className="font-poppins font-extrabold text-lg uppercase tracking-tight text-white block">
              GROWTH AGENCY
            </span>
          </div>
          <p className="font-sans font-medium text-[#908fa0] text-xs leading-relaxed">
            © 2026 GBA. <br />
            Design. Market. Staff. Grow.
          </p>
          <div className="flex gap-3 pt-2">
            <a 
              href="#" 
              aria-label="Website" 
              className="w-9 h-9 border-2 border-zinc-800 hover:border-[#b4d400] hover:bg-[#b4d400] hover:text-black transition-all flex items-center justify-center text-zinc-500"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a 
              href="mailto:eafstriker@gmail.com" 
              aria-label="Email" 
              className="w-9 h-9 border-2 border-zinc-800 hover:border-[#c0c1ff] hover:bg-[#c0c1ff] hover:text-black transition-all flex items-center justify-center text-zinc-500"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-poppins">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-[#cdf200] uppercase font-extrabold block mb-1">Navigation</span>
            <button onClick={scrollToServices} className="text-left text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Services</button>
            <button onClick={() => { const v = document.getElementById("ventures"); v?.scrollIntoView({ behavior:"smooth" }); }} className="text-left text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Ventures</button>
            <button onClick={() => { const p = document.getElementById("process"); p?.scrollIntoView({ behavior:"smooth" }); }} className="text-left text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Framework</button>
            <button onClick={toggleModal} className="text-left text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Book Consultation</button>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-[#cdf200] uppercase font-extrabold block mb-1">Legal Links</span>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Privacy Policy</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Terms of Operations</a>
          </div>
        </div>
      </footer>

      {/* Dynamic Booking/Consultation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#181818] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#cdf200] text-[#e5e2e1] max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button 
              onClick={toggleModal}
              className="absolute top-4 right-4 bg-black text-white hover:bg-neutral-900 border-2 border-black p-1.5 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingStep === "form" && (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-[#b4d400] uppercase tracking-widest font-extrabold block mb-1">
                    [ GET STARTED ]
                  </span>
                  <h3 className="font-poppins font-extrabold text-2xl uppercase tracking-tighter text-white">
                    BOOK YOUR CONSULTATION
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 mt-1">
                    Fill out the form below. We will analyze your project and schedule a consultation within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block font-poppins text-[10px] uppercase text-zinc-400 font-bold mb-1.5">
                      Your Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Robin Brooks" 
                      className="w-full bg-black border-2 border-zinc-850 focus:border-[#cdf200] p-3 text-sm text-white font-sans font-medium outline-hidden"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block font-poppins text-[10px] uppercase text-zinc-400 font-bold mb-1.5">
                      Your Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. robin@company.com" 
                      className="w-full bg-black border-2 border-zinc-850 focus:border-[#cdf200] p-3 text-sm text-white font-sans font-medium outline-hidden"
                    />
                  </div>

                  {/* Company field */}
                  <div>
                    <label className="block font-poppins text-[10px] uppercase text-zinc-400 font-bold mb-1.5">
                      Company or Project Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="e.g. Nexa Dynamics" 
                      className="w-full bg-black border-2 border-zinc-850 focus:border-[#cdf200] p-3 text-sm text-white font-sans font-medium outline-hidden"
                    />
                  </div>

                  {/* Selected services */}
                  <div>
                    <label className="block font-poppins text-[10px] uppercase text-zinc-400 font-bold mb-2">
                      Which Services Do You Need?
                    </label>
                    <div className="grid grid-cols-2 gap-2 font-poppins">
                      {SERVICES_DATA.map((srv) => {
                        const isSelected = formData.selectedServices.includes(srv.id);
                        return (
                          <button
                            type="button"
                            key={srv.id}
                            onClick={() => handleServiceSelect(srv.id)}
                            className={`p-2.5 text-left border-2 text-xs font-bold uppercase tracking-tight transition-all flex items-center justify-between ${
                              isSelected 
                               ? "bg-[#b4d400] text-black border-black" 
                               : "bg-black text-zinc-400 border-zinc-900 hover:border-zinc-750"
                            }`}
                          >
                            <span>{srv.title.split(" ")[0]}</span>
                            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 opacity-40" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block font-poppins text-[10px] uppercase text-zinc-400 font-bold mb-1.5">
                      Tell us about your project
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Share your goals, timeline, or any specific requests..." 
                      className="w-full bg-black border-2 border-zinc-850 focus:border-[#cdf200] p-3 text-sm text-white font-sans font-medium outline-hidden resize-none"
                    />
                  </div>
                </div>

                {bookingError && (
                  <div className="p-3 bg-red-950/40 border-2 border-red-500 text-red-200 text-xs font-mono rounded-none">
                    <p className="font-extrabold uppercase mb-1">⚠️ Error submitting booking</p>
                    {bookingError}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-[#cdf200] text-black font-poppins font-extrabold text-xs uppercase tracking-wider py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  Send Consultation Request
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </form>
            )}

            {bookingStep === "sending" && (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 border-4 border-dashed border-[#b4d400] border-t-transparent rounded-full animate-spin mb-6"></div>
                <h4 className="font-poppins font-extrabold text-lg uppercase text-white mb-2 tracking-tight">
                  Sending Your Request
                </h4>
                <p className="text-xs text-zinc-500 font-mono">
                  Connecting to our database...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
