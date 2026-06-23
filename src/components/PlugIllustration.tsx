import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PlugIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      // Gentle floating animation mimicking plug connectivity tension
      gsap.to(imgRef.current, {
        y: "-=8",
        rotation: "+=1.5",
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  const handleMouseEnter = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.08,
        rotation: 0,
        duration: 0.35,
        ease: "back.out(1.7)"
      });
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1,
        rotation: -1.5,
        duration: 0.35,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[280px] sm:max-w-[320px] flex items-center justify-center cursor-pointer relative"
    >
      <img
        ref={imgRef}
        src="/socket.png"
        alt="Core Connection Socket"
        className="w-fit h-auto"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
