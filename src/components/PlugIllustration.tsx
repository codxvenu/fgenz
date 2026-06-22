import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PlugIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPlugRef = useRef<SVGGElement>(null);
  const rightPlugRef = useRef<SVGGElement>(null);
  const sparkRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Elegant hovering breathing loop for both plugs using GSAP
    if (leftPlugRef.current && rightPlugRef.current) {
      gsap.to(leftPlugRef.current, {
        x: "-=3",
        y: "+=3",
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(rightPlugRef.current, {
        x: "+=3",
        y: "-=3",
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2
      });
    }
  }, []);

  // Magnetic snap-in on mouse enter & dynamic spark burst on key contact
  const handleMouseEnter = () => {
    if (leftPlugRef.current && rightPlugRef.current && sparkRef.current) {
      gsap.to(leftPlugRef.current, {
        x: 18,
        y: -18,
        duration: 0.35,
        ease: "back.out(2)"
      });
      gsap.to(rightPlugRef.current, {
        x: -18,
        y: 18,
        duration: 0.35,
        ease: "back.out(2)"
      });
      
      // Flash structural sparks
      gsap.fromTo(
        sparkRef.current,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { scale: 1.4, opacity: 1, duration: 0.15, ease: "power1.out" }
      );
      gsap.to(sparkRef.current, {
        scale: 0.9,
        opacity: 0,
        delay: 0.25,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  const handleMouseLeave = () => {
    if (leftPlugRef.current && rightPlugRef.current) {
      gsap.to(leftPlugRef.current, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(rightPlugRef.current, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center cursor-pointer relative"
    >
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Core Connection Glow in center */}
        <circle cx="250" cy="250" r="120" fill="url(#core-glow)" opacity="0.3" className="pointer-events-none" />

        {/* Dynamic Electric Spark overlay element */}
        <path 
          ref={sparkRef}
          d="M 235 242 L 245 228 L 240 252 L 255 240 L 248 263 L 260 252 L 255 272"
          stroke="#cdf200"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="opacity-0 filter drop-shadow-[0_0_12px_#cdf200]"
        />

        {/* ----------------- LEFT PLUG GROUP (MALE) ----------------- */}
        <g ref={leftPlugRef}>
          {/* Black background curve border (Cable Shadow outline) */}
          <path 
            d="M 50 365 C 65 365, 120 380, 160 300 Q 180 260, 210 270" 
            stroke="black" 
            strokeWidth="24" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Core Lime Green Cable wire */}
          <path 
            d="M 50 365 C 65 365, 120 380, 160 300 Q 180 260, 210 270" 
            stroke="#cdf200" 
            strokeWidth="14" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* Plug Prongs/Pins with sharp black offset shadow */}
          <path d="M 218 245 L 243 220" stroke="black" strokeWidth="16" strokeLinecap="round" />
          <path d="M 218 245 L 243 220" stroke="#cdf200" strokeWidth="8" strokeLinecap="round" />
          
          <path d="M 233 260 L 258 235" stroke="black" strokeWidth="16" strokeLinecap="round" />
          <path d="M 233 260 L 258 235" stroke="#cdf200" strokeWidth="8" strokeLinecap="round" />

          {/* Plug Main Body 3D Drop-Shadow Offset */}
          <path 
            d="M 183 262 C 176 255, 178 242, 196 224 L 217 213 C 235 195, 248 197, 255 204 L 255 214 L 223 246 Z" 
            fill="black" 
          />

          {/* Plug Main Body (Lime green with thick black stroke) */}
          <g transform="translate(-5, 5)">
            <path 
              d="M 183 262 C 176 255, 178 242, 196 224 L 217 213 C 235 195, 248 197, 255 204 L 223 246 Z" 
              fill="#b4d400" 
              stroke="black" 
              strokeWidth="6" 
              strokeLinejoin="round" 
            />
            {/* Embedded custom bold Bolt icon */}
            <path 
              d="M 210 238 L 218 226 L 214 238 L 224 234 L 216 246 L 220 238 Z" 
              fill="black" 
              stroke="black" 
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* ----------------- RIGHT PLUG GROUP (FEMALE) ----------------- */}
        <g ref={rightPlugRef}>
          {/* Black shadow border outlines */}
          <path 
            d="M 450 135 C 435 135, 380 120, 340 200 Q 320 240, 290 230" 
            stroke="black" 
            strokeWidth="24" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Core wire */}
          <path 
            d="M 450 135 C 435 135, 380 120, 340 200 Q 320 240, 290 230" 
            stroke="#cdf200" 
            strokeWidth="14" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* Header connector base 3D shadow */}
          <path 
            d="M 317 238 L 285 206 C 278 199, 280 186, 298 168 L 319 157 C 337 139, 350 141, 357 148 L 325 180 Z" 
            fill="black" 
          />

          {/* Header connector base (Lime Green, black stroke) */}
          <g transform="translate(-5, 5)">
            <path 
              d="M 317 238 C 310 231, 280 186, 298 168 L 319 157 C 337 139, 347 145, 354 152 Z" 
              fill="#b4d400" 
              stroke="black" 
              strokeWidth="6" 
              strokeLinejoin="round" 
            />
            {/* Embedded Bolt icon */}
            <path 
              d="M 314 186 L 322 174 L 318 186 L 328 182 L 320 194 L 324 186 Z" 
              fill="black" 
              stroke="black" 
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Female socket inputs */}
            <circle cx="282" cy="198" r="4" fill="black" />
            <circle cx="294" cy="210" r="4" fill="black" />
          </g>
        </g>

        {/* Definitions for gorgeous visual background glowing drop shadows */}
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#cdf200" />
            <stop offset="100%" stopColor="#cdf200" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
