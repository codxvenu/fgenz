import React, { useState } from "react";
import { 
  Plus, Minus, TrendingUp, Info, Lock, Globe, Mail, 
  ArrowUpRight, ArrowRight, CheckCircle2, Megaphone, 
  Brush, Users, Target, Compass, Sparkles, Zap, X, Calendar, Check
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { SERVICES_DATA, VENTURES_DATA, PROCESS_DATA, FAQ_DATA, ServiceItem } from "./data";

export default function App() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  
  // Interactive Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"form" | "sending" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$5k - $10k",
    message: "",
    selectedServices: [] as string[]
  });

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    setBookingStep("form");
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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep("sending");
    setTimeout(() => {
      setBookingStep("success");
    }, 1500);
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
      {/* Navigation header */}
      <Navbar onStartBuildingClick={toggleModal} />

      {/* Main Container */}
      <main className="pt-24 pb-12">
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex flex-col justify-center px-4 md:px-12 py-16 overflow-hidden border-b-4 border-black bg-gradient-to-br from-[#1a0f26]/20 via-[#131313] to-[#121600]/10">
          {/* Subtle overlay grid background lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

          <div className="relative z-10 max-w-5xl">
            <div className="inline-flex items-center gap-2 bg-[#b4d400] text-black px-4 py-1.5 mb-8 border-2 border-black font-extrabold text-xs tracking-widest transform -rotate-1 uppercase max-w-fit">
              <Zap className="w-3.5 h-3.5 fill-black" />
              GBA GROWTH SERVICES
            </div>
            
            <h1 className="font-extrabold text-4xl sm:text-6xl md:text-8xl mb-8 uppercase tracking-tighter leading-[0.9] text-white">
              The One-Stop <br />
              <span className="text-[#c0c1ff] italic">Solution</span> for <br />
              Business Growth.
            </h1>

            <p className="font-medium text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
              GBA handles your brand design, modern marketing, staffing, and customer acquisition. We focus on real work that drives sales, rather than endless meetings or slide decks.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={toggleModal}
                className="bg-[#cdf200] text-black font-extrabold text-sm uppercase tracking-wider px-8 py-5 border-4 border-black shadow-[4px_4px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Work With Us
                <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
              </button>
              <button 
                onClick={scrollToServices}
                className="bg-transparent text-white font-extrabold text-sm uppercase tracking-wider px-8 py-5 border-4 border-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                View Our Services
              </button>
            </div>
          </div>

          {/* Asymmetric Floating Mockup Badge Card */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[340px] h-[440px] border-4 border-[#c0c1ff] p-5 shadow-[6px_6px_0px_0px_#c0c1ff] transform rotate-3 bg-zinc-900 overflow-hidden group">
            <div className="absolute top-2 left-2 bg-black border border-[#c0c1ff]/50 px-2.5 py-0.5 font-mono text-[9px] uppercase text-[#c0c1ff] z-10 font-bold">
              ACTIVE WORKSPACE
            </div>
            
            <div className="w-full h-[300px] mt-6 bg-zinc-950 border-2 border-black overflow-hidden relative">
              {/* Fallback pattern / image */}
              <img 
                src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80" 
                alt="Workspace preview" 
                className="w-full h-full object-cover grayscale transition-all duration-750 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
            
            <div className="mt-4 pt-1 border-t border-zinc-800 flex justify-between items-end">
              <div>
                <span className="font-mono text-[9px] text-zinc-500 uppercase block">Agency Platform</span>
                <span className="text-white font-bold text-xs uppercase block">GBA Operations</span>
              </div>
              <div className="bg-[#b4d400] text-black font-extrabold text-[10px] px-2 py-1 transform -rotate-3">
                100% RELIABLE
              </div>
            </div>
          </div>
        </section>

        {/* METRICS & NUMBERS SHOWCASE */}
        <section className="bg-black px-4 md:px-12 py-16 border-b-4 border-black">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#c0c1ff] text-black border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="font-mono text-xs uppercase font-extrabold tracking-wider bg-black text-white px-2.5 py-1 inline-block mb-3">
                01/ Projects Delivered
              </span>
              <div className="font-extrabold text-5xl md:text-7xl leading-none uppercase tracking-tighter mb-2">50+</div>
              <div className="font-extrabold text-base md:text-lg uppercase">Brands Launched</div>
              <p className="font-medium text-zinc-800 text-xs md:text-sm mt-3 opacity-90">
                We design and support web platforms, online stores, and brand strategies from start to finish.
              </p>
            </div>

            <div className="bg-[#b4d400] text-black border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 hover:rotate-0 transition-transform">
              <span className="font-mono text-xs uppercase font-extrabold tracking-wider bg-black text-white px-2.5 py-1 inline-block mb-3">
                02/ Total Impact
              </span>
              <div className="font-extrabold text-5xl md:text-7xl leading-none uppercase tracking-tighter mb-2">1M+</div>
              <div className="font-extrabold text-base md:text-lg uppercase">Customers Reached</div>
              <p className="font-medium text-zinc-900 text-xs md:text-sm mt-3 opacity-90">
                Creative marketing setups and social media campaigns built to grab attention and drive sales.
              </p>
            </div>

            <div className="bg-zinc-900 text-white border-4 border-black p-8 shadow-[4px_4px_0px_0px_#ddb7ff] transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="font-mono text-xs uppercase font-extrabold tracking-wider bg-zinc-850 text-[#ddb7ff] px-2.5 py-1 inline-block mb-3">
                03/ Team Coordination
              </span>
              <div className="font-extrabold text-5xl md:text-7xl leading-none uppercase tracking-tighter mb-2">24/7</div>
              <div className="font-extrabold text-base md:text-lg uppercase">Fast Results</div>
              <p className="font-medium text-zinc-400 text-xs md:text-sm mt-3 opacity-90">
                No long corporate delays. We work fast to post ads, hire people, and write clean code.
              </p>
            </div>
          </div>
        </section>

        {/* DEMAND VS FOLLOWER GAP ANALYSIS */}
        <section className="bg-zinc-950 px-4 md:px-12 py-16 border-b-4 border-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#b4d400] font-mono text-xs uppercase tracking-[0.25em] font-extrabold block">
                HOW WE ARE DIFFERENT
              </span>
              <h2 className="font-extrabold text-3xl sm:text-5xl uppercase tracking-tighter text-white leading-[1.05]">
                We don’t just buy followers or compile vanity branding decks.
              </h2>
              <p className="font-medium text-zinc-400 text-sm sm:text-base leading-relaxed">
                Most agencies hand you a colorful PDF of mock values, collect their retainer, and vanish. GBA connects your brand directly to results. We write your ad copy, design your customer flow, help hire your key workers, and set up your physical offices on budget.
              </p>

              {/* Checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Real Sales Over Social Followers",
                  "All-In-One Marketing & Staffing",
                  "Direct Designer & Developer Help",
                  "Fast Hiring Paths For Talent"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <CheckCircle2 className="w-5 h-5 text-[#b4d400] shrink-0" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Asymmetric Block Poster */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-[#111111] border-4 border-black p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_#cdf200]">
                <div className="flex justify-between items-center text-zinc-600 font-mono text-[9px] uppercase font-bold">
                  <span>ANALYSIS SHEET // 109</span>
                  <span>CONFIDENTIAL</span>
                </div>

                <div className="py-6 border-y-2 border-dashed border-zinc-850">
                  <h3 className="font-extrabold text-2xl uppercase tracking-tight text-white mb-2">
                    "GROWTH COMES FROM DOING THE WORK."
                  </h3>
                  <p className="text-zinc-500 font-body-md text-xs leading-normal">
                    We connect clean graphic designs and websites with real daily marketing and business systems.
                  </p>
                </div>

                <div className="bg-[#cdf200] text-black text-center py-2 border-2 border-black font-extrabold text-xs uppercase tracking-widest text-wrap">
                  REAL RESULTS &gt; ENDLESS MEETINGS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES / BENTO TOOLKIT */}
        <section className="px-4 md:px-12 py-20 border-b-4 border-black" id="services">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="text-[#cdf200] font-mono text-xs uppercase tracking-[0.25em] font-extrabold block mb-2">
                OUR CORE CAPABILITIES
              </span>
              <h2 className="font-extrabold text-3xl sm:text-5xl uppercase tracking-tighter text-white">
                HOW WE HELP YOU GROW
              </h2>
            </div>
            <p className="text-zinc-400 font-medium text-sm sm:text-base max-w-md">
              We offer a full suite of services to turn your ideas into a successful, profit-generating business brand.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {SERVICES_DATA.map((srv, idx) => {
              const isColSpan3 = idx < 2; // Marketing & Branding get prominent spots
              return (
                <div 
                  key={srv.id}
                  className={`border-4 border-black p-6 md:p-8 hover:-translate-x-1 hover:-translate-y-1 transition-all bg-[#1a1a1a] flex flex-col justify-between min-h-[340px] group ${
                    isColSpan3 ? "md:col-span-3" : "md:col-span-2"
                  } ${getThemeBorderClass(srv.themeColor)}`}
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      {renderServiceIcon(srv.iconName)}
                      <span className="font-mono text-xs uppercase text-zinc-500 font-extrabold">
                        MODULE // {srv.number}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-2xl uppercase tracking-tight text-white">
                      {srv.title}
                    </h3>
                    <p className="text-zinc-400 font-body-md text-xs leading-normal">
                      {srv.description}
                    </p>

                    <ul className="space-y-1.5 font-mono text-[10px] text-zinc-400 uppercase tracking-wide">
                      {srv.highlights.map((hlt, hIdx) => (
                        <li key={hlt} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#b4d400]"></span>
                          {hlt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => selectServiceForWorkshop(srv.id)}
                    className="mt-8 w-full py-2.5 bg-black hover:bg-neutral-900 text-white border-2 border-black group-hover:border-[#cdf200] transition-all font-mono text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2"
                  >
                    Select This Service
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#cdf200]" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* LATEST VENTURES / PORTFOLIO */}
        <section className="bg-zinc-950 px-4 md:px-12 py-20 border-b-4 border-black" id="ventures">
          <div className="mb-16">
            <span className="text-[#ddb7ff] font-mono text-xs uppercase tracking-[0.25em] font-extrabold block mb-2">
              OUR TRACK RECORD
            </span>
            <h2 className="font-extrabold text-3xl sm:text-5xl uppercase tracking-tighter text-white">
              RECENT WORK & BRANDS
            </h2>
            <p className="text-zinc-400 font-medium text-sm sm:text-base max-w-xl mt-3">
              Take a look at the actual brands we have designed, launched, and helped scale in the real world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VENTURES_DATA.map((ven) => (
              <div key={ven.name} className="relative group min-h-[420px]">
                {/* Backdrop tilted container */}
                <div className={`absolute inset-0 border-4 border-black transform transition-transform group-hover:rotate-0 duration-500 ${ven.bgColorClass} ${ven.rotateClass}`}></div>
                
                {/* Front card body */}
                <div className="relative bg-white text-black p-6 border-4 border-black h-full flex flex-col justify-between group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  <div>
                    {/* Simulated Grayscale Image with sharp borders */}
                    <div className="aspect-video bg-neutral-200 mb-6 border-2 border-black overflow-hidden relative">
                      <img 
                        src={ven.imageUrl} 
                        alt={ven.name} 
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </div>

                    <span className="bg-black text-white px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider font-bold mb-4 inline-block transform -rotate-1">
                      {ven.tag}
                    </span>

                    <h3 className="font-extrabold text-2xl uppercase tracking-tight text-black mb-2 leading-none">
                      {ven.name}
                    </h3>
                    <p className="font-medium text-zinc-600 text-xs md:text-sm leading-relaxed mb-6">
                      {ven.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-zinc-200 pt-4 font-mono text-[10px] text-zinc-500">
                    <span>STATUS: ACTIVE & RUNNING</span>
                    <span className="text-black font-extrabold">VIEW MORE &gt;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HERO CULTURE BANNER: 'WE DON'T SELL DREAMS. WE BUILD MACHINES' */}
        <section className="grid grid-cols-1 md:grid-cols-2 border-b-4 border-black">
          {/* Quote side */}
          <div className="bg-[#cdf200] text-black p-8 md:p-16 flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black">
            <h2 className="font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase leading-[0.95] tracking-tighter text-black w-full text-left md:text-center shrink-0">
              "WE DON'T <br />
              SELL DREAMS. <br />
              WE BUILD <br />
              MACHINES."
            </h2>
          </div>

          {/* Vibe description side */}
          <div className="bg-[#1a1a1a] p-8 md:p-16 flex flex-col justify-center">
            <span className="font-mono text-xs text-[#c0c1ff] uppercase tracking-widest font-extrabold block mb-4">
              OUR FOCUS & PROMISE
            </span>
            <h3 className="font-extrabold text-xl sm:text-2xl uppercase text-white tracking-tight mb-6">
              Traditional marketing agencies waste time with useless meetings and consulting hours. We focus strictly on launching real assets, running ads, and placing talent.
            </h3>
            
            <div className="space-y-4 text-zinc-400 font-medium text-sm sm:text-base leading-relaxed">
              <p>
                We started GBA to eliminate typical agency overhead and delays. Standard consulting firms charge you just to draw a generic logo, hand you a generic visual guide, and wish you luck. 
              </p>
              <p>
                We launch quickly. We build active web designs, run live social advertisements, screen and hire team players, and map out growth strategies centered entirely around your target budget.
              </p>
            </div>
          </div>
        </section>

        {/* PROCESS STEPS */}
        <section className="px-4 md:px-12 py-20 border-b-4 border-black" id="process">
          <div className="mb-16">
            <span className="text-[#b4d400] font-mono text-xs uppercase tracking-[0.25em] font-extrabold block mb-2">
              OUR THREE-STEP PROCESS
            </span>
            <h2 className="font-extrabold text-3xl sm:text-5xl uppercase tracking-tighter text-white">
              HOW WE GROW YOUR BRAND
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_DATA.map((step) => (
              <div 
                key={step.number} 
                className={`relative border-4 border-black p-8 flex flex-col justify-between min-h-[300px] transition-all ${
                  step.highlightCard 
                    ? "bg-[#c0c1ff] text-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]" 
                    : "bg-[#181818] text-[#e5e2e1] neo-brutal-shadow"
                }`}
              >
                {/* Asymmetric number backdrop */}
                <div className={`absolute top-2 right-4 font-mono text-8xl md:text-9xl font-extrabold opacity-10 select-none ${
                  step.highlightCard ? "text-white" : "text-zinc-600"
                }`}>
                  {step.number}
                </div>

                <div className="relative z-10">
                  <h3 className="font-extrabold text-3xl uppercase tracking-tight mb-4">
                    {step.title}
                  </h3>
                  <p className={`font-medium text-xs md:text-sm leading-relaxed ${
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

        {/* FAQ ACCORDION SECTION */}
        <section className="bg-zinc-950 px-4 md:px-12 py-20 border-b-4 border-black animate-fadeIn" id="faq">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-28">
              <span className="text-[#b4d400] font-mono text-xs uppercase tracking-[0.25em] font-extrabold block mb-2">
                COMMON QUESTIONS
              </span>
              <h2 className="font-extrabold text-3xl sm:text-5xl uppercase tracking-tighter text-white leading-none mb-4">
                FREQUENTLY ASKED
              </h2>
              <p className="text-zinc-400 font-medium text-sm sm:text-base">
                Got questions? Here are honest, direct answers about GBA and how we work.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {FAQ_DATA.map((item, idx) => {
                const isOpen = activeFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="border-4 border-black bg-[#181818] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-5 flex justify-between items-center gap-4 text-white hover:text-[#b4d400] transition-colors focus:outline-none"
                    >
                      <span className="font-extrabold text-[#c0c1ff] font-mono text-xs sm:text-sm shrink-0">
                        0{idx+1} //
                      </span>
                      <span className="font-extrabold text-sm sm:text-base uppercase tracking-tight flex-1">
                        {item.question}
                      </span>
                      <div className="bg-black/60 p-2 border border-zinc-800 text-white shrink-0">
                        {isOpen ? <Minus className="w-4 h-4 text-[#cdf200]" /> : <Plus className="w-4 h-4 text-[#cdf200]" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 border-t-2 border-black/50 pt-5 bg-black/40 text-zinc-400 font-medium text-xs sm:text-sm leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL HERO CALL TO ACTION (CTA) */}
        <section className="px-4 md:px-12 py-16 overflow-hidden">
          <div className="relative bg-[#c0c1ff] border-4 border-black p-8 md:p-16 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row items-center gap-12 overflow-hidden">
            {/* Sticker badge */}
            <div className="absolute -top-6 -left-3 bg-[#b4d400] text-black px-6 py-3 border-4 border-black font-extrabold text-base md:text-lg rotate-3 uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              BOOKING AVAILABILITY: ACTIVE
            </div>

            <div className="flex-1 text-left relative z-10 pt-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-900 font-extrabold block mb-2">
                TAKE THE NEXT STEP
              </span>
              <h2 className="font-extrabold text-4xl sm:text-7xl uppercase leading-[0.9] tracking-tighter text-black mb-6">
                READY TO <br />
                <span className="text-white italic">ACCELERATE?</span>
              </h2>
              <p className="font-semibold text-zinc-900 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-snug">
                Stop dealing with slow marketing firms. Work with GBA to launch high-converting creative designs, websites, and hiring paths.
              </p>
              
              <button 
                onClick={toggleModal}
                className="bg-black text-white font-extrabold text-sm sm:text-[15px] uppercase tracking-wider px-10 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-4 group"
              >
                Book Your Call Now
                <TrendingUp className="w-5 h-5 text-[#b4d400] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Asymmetric Circle Visual widget */}
            <div className="hidden xl:flex flex-1 justify-end relative z-10 pr-6">
              <div className="w-48 h-48 bg-[#cdf200] border-4 border-black rounded-full flex items-center justify-center -rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-transform duration-500">
                <Zap className="w-24 h-24 text-black fill-black stroke-black" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full px-4 md:px-12 py-16 bg-[#0c0c0d] border-t-4 border-black flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#b4d400] text-black px-2 py-0.5 border border-black font-extrabold text-sm transform -rotate-2">
              GBA
            </div>
            <span className="font-extrabold text-lg uppercase tracking-tight text-white block">
              GROWTH AGENCY
            </span>
          </div>
          <p className="font-medium text-[#908fa0] text-xs leading-relaxed">
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-[#cdf200] uppercase font-extrabold block mb-1">Navigation</span>
            <button onClick={scrollToServices} className="text-left text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Services</button>
            <button onClick={() => { const v = document.getElementById("ventures"); v?.scrollIntoView({ behavior:"smooth" }); }} className="text-left text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Ventures</button>
            <button onClick={() => { const p = document.getElementById("process"); p?.scrollIntoView({ behavior:"smooth" }); }} className="text-left text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Framework</button>
            <button onClick={toggleModal} className="text-left text-zinc-500 hover:text-white transition-colors text-xs uppercase font-extrabold">Book Consultation</button>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-[#cdf200] uppercase font-extrabold block mb-1">Legal Nodes</span>
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
                  <h3 className="font-extrabold text-2xl uppercase tracking-tighter text-white">
                    BOOK YOUR CONSULTATION
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fill out the form below. We will analyze your project and schedule a consultation within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-zinc-400 font-bold mb-1.5">
                      Your Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Robin Brooks" 
                      className="w-full bg-black border-2 border-zinc-850 focus:border-[#cdf200] p-3 text-sm text-white font-medium outline-hidden"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-zinc-400 font-bold mb-1.5">
                      Your Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. robin@company.com" 
                      className="w-full bg-black border-2 border-zinc-850 focus:border-[#cdf200] p-3 text-sm text-white font-medium outline-hidden"
                    />
                  </div>

                  {/* Company field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-zinc-400 font-bold mb-1.5">
                      Company or Project Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="e.g. Nexa Dynamics" 
                      className="w-full bg-black border-2 border-zinc-850 focus:border-[#cdf200] p-3 text-sm text-white font-medium outline-hidden"
                    />
                  </div>

                  {/* Selected services */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-zinc-400 font-bold mb-2">
                      Which Services Do You Need?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
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
                    <label className="block font-mono text-[10px] uppercase text-zinc-400 font-bold mb-1.5">
                      Tell us about your project
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Share your goals, timeline, or any specific requests..." 
                      className="w-full bg-black border-2 border-zinc-850 focus:border-[#cdf200] p-3 text-sm text-white font-medium outline-hidden resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#cdf200] text-black font-extrabold text-xs uppercase tracking-wider py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  Send Consultation Request
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </form>
            )}

            {bookingStep === "sending" && (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 border-4 border-dashed border-[#b4d400] border-t-transparent rounded-full animate-spin mb-6"></div>
                <h4 className="font-extrabold text-lg uppercase text-white mb-2 tracking-tight">
                  Sending Your Request
                </h4>
                <p className="text-xs text-zinc-500 font-mono">
                  Connecting to our database...
                </p>
              </div>
            )}

            {bookingStep === "success" && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="bg-[#b4d400] text-black p-4 border-4 border-black rounded-full inline-flex items-center justify-center">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-extrabold text-2xl uppercase text-white tracking-tight">
                    Request Submitted!
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Thank you! We will review your info for <span className="text-[#cdf200] font-bold">{formData.company}</span> and reply back at <span className="text-[#c0c1ff] font-bold">{formData.email}</span> within 2 hours to book your call.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-white hover:bg-neutral-200 text-black px-6 py-3 border-2 border-black font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  Close Menu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
