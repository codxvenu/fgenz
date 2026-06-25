import React, { useState, useEffect, useRef } from "react";
import { Zap, ArrowUpRight } from "lucide-react";
import B1 from "./blob/B1";
import B2 from "./blob/B2";
import B3 from "./blob/B3";
import B4 from "./blob/B4";
import B5 from "./blob/B5";
import B6 from "./blob/B6";
import B7 from "./blob/B7";
import B8 from "./blob/B8";
import B9 from "./blob/B9";
import B10 from "./blob/B10";
import B11 from "./blob/B11";
import B12 from "./blob/B12";
import B13 from "./blob/B13";
import B14 from "./blob/B14";

interface BlobCard {
  id: string;
  component: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description?: string;
  serviceId?: string;
  color: "green" | "purple";
  width: number;
  height: number;
  top: number;
  left: number;
  floatClass: string;
}

const BLOCKS_DATA: BlobCard[] = [
  {
    id: "b1",
    component: B1,
    title: "WEB DEVELOPMENT",
    description: "Engineering blazing-fast, pixel-precise React applications and premium responsive full-stack products.",
    serviceId: "web-dev",
    color: "green",
    width: 282,
    height: 223.14,
    top: 5,
    left: 6.2,
    floatClass: "float-1",
  },
  {
    id: "b2",
    component: B2,
    title: "STRATEGY",
    color: "purple",
    width: 296.5,
    height: 204.55,
    top: 6,
    left: 288.7,
    serviceId: "brand-strategy",
    floatClass: "float-2",
  },
  {
    id: "b3",
    component: B3,
    title: "BRAND STRATEGY",
    description: "Architecting memorable visual guidelines, unique positioning matrices, and corporate design directives.",
    serviceId: "brand-strategy",
    color: "green",
    width: 272,
    height: 196.4,
    top: 9,
    left: 573.2,
    floatClass: "float-3",
  },
  {
    id: "b7",
    component: B7,
    title: "PERFORMANCE",
    color: "purple",
    width: 242.5,
    height: 200.075,
    top: 10,
    left: 847.2,
    serviceId: "performance-mkt",
    floatClass: "float-4",
  },
  {
    id: "b4",
    component: B4,
    title: "CREATIVE",
    color: "purple",
    width: 273,
    height: 219.4,
    top: 203,
    left: 4.2,
    serviceId: "ui-ux-design",
    floatClass: "float-4",
  },
  {
    id: "b5",
    component: B5,
    title: "UI/UX DESIGN",
    description: "Drafting stunning bespoke wireframes, high-fidelity user environments, and flawless interaction mechanics.",
    serviceId: "ui-ux-design",
    color: "green",
    width: 306.5,
    height: 281.725,
    top: 176,
    left: 254.2,
    floatClass: "float-1",
  },
  {
    id: "b6",
    component: B6,
    title: "ANALYTICS",
    color: "purple",
    width: 291,
    height: 203.9,
    top: 189.5,
    left: 545.2,
    serviceId: "performance-mkt",
    floatClass: "float-2",
  },
  {
    id: "b8",
    component: B8,
    title: "GROWTH MARKETING",
    description: "Scaling high-intent distribution models, hyper-targeted campaigns, and referral loops.",
    serviceId: "growth-marketing",
    color: "green",
    width: 253,
    height: 222.163,
    top: 174,
    left: 836.2,
    floatClass: "float-3",
  },
  {
    id: "b9",
    component: B9,
    title: "SEO",
    color: "purple",
    width: 267.5,
    height: 294.875,
    top: 423,
    left: 6.2,
    serviceId: "seo-optimization",
    floatClass: "float-3",
  },
  {
    id: "b10",
    component: B10,
    title: "CONTENT CREATION",
    description: "Producing cinematic video content, viral assets, and elegant editorial brand communication decks.",
    serviceId: "content-creation",
    color: "green",
    width: 266,
    height: 261.038,
    top: 462,
    left: 179.2,
    floatClass: "float-4",
  },
  {
    id: "b11",
    component: B11,
    title: "CRAWL MAX",
    color: "purple",
    width: 317.5,
    height: 193.475,
    top: 347,
    left: 421.2,
    serviceId: "social-media",
    floatClass: "float-1",
  },
  {
    id: "b12",
    component: B12,
    title: "RETENTION",
    color: "purple",
    width: 253,
    height: 179.5,
    top: 541,
    left: 416.2,
    serviceId: "email-marketing",
    floatClass: "float-2",
  },
  {
    id: "b13",
    component: B13,
    title: "SOCIAL MEDIA",
    description: "Fostering active brand feeds, deep community connections, and multi-channel viral growth loops.",
    serviceId: "social-media",
    color: "green",
    width: 221,
    height: 210.438,
    top: 508,
    left: 666.2,
    floatClass: "float-3",
  },
  {
    id: "b14",
    component: B14,
    title: "EMAIL RETENTION",
    color: "purple",
    width: 206,
    height: 185.6,
    top: 535,
    left: 880.2,
    serviceId: "email-marketing",
    floatClass: "float-4",
  }
];

interface BlobServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function BlobServices({ onSelectService }: BlobServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Dynamic automatic resize scaling scaled down to .87 for bigger screens
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Standard full canvas width is exactly 1100px. Multiply by 0.87 to scale it down perfectly.
        const currentScale = Math.min(width / 1100, 1) * 0.87;
        setScale(currentScale);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative py-8 overflow-hidden">
      
      {/* 1. DESKTOP IMMERSIVE ABSOLUTE PEBBLE GRID (Scaled elements) */}
      <div className="hidden lg:flex items-center justify-center min-h-[760px] relative">
        <div 
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            width: "1100px",
            height: "740px"
          }}
          className="relative shrink-0 transition-transform duration-300 ease-out"
        >
          {BLOCKS_DATA.map((card) => {
            const SvgComponent = card.component;
            const isHovered = hoveredCardId === card.id;

            const greenCards = BLOCKS_DATA.filter((c) => c.color === "green");
            const greenIndex = greenCards.findIndex((c) => c.id === card.id);
            const cardNumber = greenIndex !== -1 ? String(greenIndex + 1).padStart(2, "0") : "";
            const formattedTitle = card.title
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase());

            // Green/Yellow cards with color #d9ff0069
            if (card.color === "green") {
              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => card.serviceId && onSelectService(card.serviceId)}
                  style={{
                    position: "absolute",
                    top: `${card.top}px`,
                    left: `${card.left}px`,
                    width: `${card.width}px`,
                    height: `${card.height}px`,
                    perspective: "1000px",
                    zIndex: isHovered ? 50 : 10
                  }}
                  className={`cursor-pointer transition-all duration-500 ${card.floatClass} ${
                    isHovered ? "scale-105 -translate-y-1.5" : ""
                  }`}
                >
                  <div 
                    className={`w-full h-full relative transform-style-3d transition-all duration-[600ms] ease-out ${
                      isHovered ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* FRONT SIDE (Luminous #8B5CF6 Shape overlay and Title) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center">
                      <SvgComponent 
                        className="w-full h-full transition-all duration-500 ease-out"
                        style={{
                          color: "#000000",
                          stroke: isHovered ? "#8B5CF6" : "transparent",
                          strokeWidth: "1.5px",
                          filter: isHovered ? "drop-shadow(0 0 20px rgba(139,92,246,0.6))" : "drop-shadow(0 0 4px rgba(139,92,246,0.15))"
                        }}
                      />
                      
                      {/* Labeled overlay carrying strictly only the service name - with highly legible text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none select-none z-10">
                        <h4 
                          className={`font-sans font-black text-xs sm:text-[13px] md:text-[13px] tracking-[0.18em] leading-normal uppercase max-w-[85%] mx-auto ${
                            (greenIndex === 0 || greenIndex === 1) ? "text-[#8B5CF6] drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" : "text-[#d9ff00]"
                          }`}
                          style={{
                            fontSize: "48px",
                            fontFamily: "poppins, sans-serif"
                          }}
                        >
                          {cardNumber}
                          <span 
                            className="font-sans font-black text-xs sm:text-[13px] md:text-[13px] tracking-[0.18em] leading-normal uppercase max-w-[85%] mx-auto text-[#8B5CF6] block" 
                            style={{
                              fontSize: "18px",
                              fontFamily: "poppins, sans-serif",
                              color: "white"
                            }}
                          >
                            {formattedTitle}
                          </span>
                        </h4>
                      </div>
                    </div>

                    {/* BACK SIDE (Strictly the service description text on flipped card) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center">
                      <SvgComponent 
                        className="w-full h-full transition-all duration-500 ease-out"
                        style={{
                          color: "#000000",
                          stroke: isHovered ? "#8B5CF6" : "transparent",
                          strokeWidth: "1.5px",
                          filter: isHovered ? "drop-shadow(0 0 25px rgba(139,92,246,0.5))" : "none"
                        }}
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none select-none z-10">
                        <p 
                          className="leading-relaxed text-[#C8C4FF] max-w-[85%] mx-auto filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                          style={{
                            fontFamily: "'Lato', sans-serif",
                            textTransform: "capitalize",
                            letterSpacing: "1px",
                            fontSize: "14px"
                          }}
                        >
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              // Lavender cards with color #C8C4FF
              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => card.serviceId && onSelectService(card.serviceId)}
                  style={{
                    position: "absolute",
                    top: `${card.top}px`,
                    left: `${card.left}px`,
                    width: `${card.width}px`,
                    height: `${card.height}px`,
                    zIndex: isHovered ? 40 : 10
                  }}
                  className={`cursor-pointer transition-all duration-500 ease-out ${card.floatClass} ${
                    isHovered ? "scale-105 -translate-y-1.5" : ""
                  }`}
                >
                  <div className="w-full h-full relative">
                    <SvgComponent 
                      className="w-full h-full transition-all duration-500 ease-out purple-blob"
                      style={{
                        color: "transparent",
                        stroke: isHovered ? "#C8C4FF" : "transparent",
                        strokeWidth: "1.5px",
                        filter: isHovered ? "drop-shadow(0 0 20px rgba(200,196,255,0.6))" : "drop-shadow(0 0 4px rgba(200,196,255,0.15))"
                      }}
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* 2. MOBILE RESPONSIVE ADAPTIVE LAYOUT (Authentic Raw Neo-Brutalist Service Cards) */}
      <div className="block lg:hidden px-4 py-6">
        <div className="flex flex-col gap-6">
          {BLOCKS_DATA.filter((card) => card.color === "green").map((card, idx) => {
            const SvgComponent = card.component;
            const isBlackBg = idx % 2 === 0;

            return (
              <div
                key={card.id}
                onClick={() => {
                  if (card.serviceId) onSelectService(card.serviceId);
                }}
                className={
                  isBlackBg
                    ? "relative bg-[#0D0D0D] border border-[#8B5CF6]/50 p-6 flex flex-col justify-between min-h-[180px] shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:border-[#8B5CF6] transition-all duration-300 cursor-pointer overflow-hidden group rounded-xl"
                    : "relative bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] p-6 flex flex-col justify-between min-h-[180px] border border-white/20 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300 cursor-pointer overflow-hidden group rounded-xl"
                }
              >
                {/* Background Organic SVG watermark element */}
                <div className="absolute right-[-15px] bottom-[-15px] w-[140px] h-[140px] pointer-events-none select-none z-0">
                  <SvgComponent 
                    style={{
                      color: isBlackBg ? "#8B5CF6" : "#ffffff",
                      stroke: isBlackBg ? "#8B5CF6" : "#ffffff",
                      strokeWidth: "2px",
                      opacity: isBlackBg ? 0.08 : 0.12
                    }}
                  />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      {isBlackBg ? (
                        <span className="font-mono text-[9px] bg-purple-950/40 backdrop-blur-md border border-purple-500/30 text-purple-200 px-2.5 py-1 font-bold uppercase tracking-widest rounded-full">
                          CORE SERVICE
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] bg-white/15 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 font-bold uppercase tracking-widest rounded-full">
                          CORE SERVICE
                        </span>
                      )}
                      <ArrowUpRight className={isBlackBg ? "w-5 h-5 text-[#8B5CF6] stroke-[3px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" : "w-5 h-5 text-white stroke-[3px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"} />
                    </div>
                    
                    <h3 className={isBlackBg ? "font-oswald font-extrabold text-2xl text-white uppercase tracking-tight leading-none mb-1 group-hover:text-[#A855F7] transition-colors duration-300" : "font-oswald font-extrabold text-2xl text-white uppercase tracking-tight leading-none mb-1 group-hover:text-purple-200 transition-colors duration-300"}>
                      {card.title}
                    </h3>

                    {card.description && (
                      <p className={isBlackBg ? "font-sans text-xs text-[#CFCFCF] border-t border-zinc-850 pt-3 mt-3 leading-relaxed font-medium" : "font-sans text-xs text-purple-100 border-t border-white/10 pt-3 mt-3 leading-relaxed font-medium"}>
                        {card.description}
                      </p>
                    )}
                  </div>

                  {isBlackBg ? (
                    <div className="mt-5 flex justify-between items-center bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] text-white font-mono text-[10px] font-extrabold px-3 py-2 uppercase rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.2)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-[1.01]">
                      <span className="tracking-widest">ACTIVATE DYNAMIC WORKSHOP</span>
                      <Zap className="w-3.5 h-3.5 ml-2 text-white fill-white animate-pulse" />
                    </div>
                  ) : (
                    <div className="mt-5 flex justify-between items-center bg-black/40 hover:bg-black/60 border border-white/15 text-white font-mono text-[10px] font-extrabold px-3 py-2 uppercase rounded-lg transition-all duration-300 shadow-sm">
                      <span className="tracking-widest text-purple-100">ACTIVATE DYNAMIC WORKSHOP</span>
                      <Zap className="w-3.5 h-3.5 ml-2 text-purple-200 fill-purple-200" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
