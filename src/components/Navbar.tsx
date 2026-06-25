import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onStartBuildingClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartBuildingClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#131313]/90 backdrop-blur-md border-b-4 border-black px-4 md:px-12 py-4 flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {/* Brand Logo */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-3 text-left focus:outline-none"
      >
        <img 
          alt="GBA Logo" 
          className="w-8 h-8 object-contain" 
          referrerPolicy="no-referrer" 
          src="/icon.png" 
          style={{
            width: "120px",
            height: "auto"
          }}
        />

      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 font-poppins">
        <button 
          onClick={() => scrollToSection("services")}
          className="text-white hover:text-[#c0c1ff] font-semibold text-sm uppercase tracking-wider transition-colors"
        >
          Services
        </button>
        <button 
          onClick={() => scrollToSection("ventures")}
          className="text-white hover:text-[#c0c1ff] font-semibold text-sm uppercase tracking-wider transition-colors"
        >
          Ventures
        </button>
        <button 
          onClick={() => scrollToSection("process")}
          className="text-white hover:text-[#8B5CF6] font-semibold text-sm uppercase tracking-wider transition-colors"
        >
          Framework
        </button>
        <button 
          onClick={() => scrollToSection("faq")}
          className="text-white hover:text-[#c0c1ff] font-semibold text-sm uppercase tracking-wider transition-colors"
        >
          FAQ
        </button>
      </nav>

      {/* Action CTA */}
      <div className="hidden md:flex items-center gap-4 font-poppins">
        <button
          onClick={onStartBuildingClick}
          className="bg-[#c0c1ff] text-black font-extrabold text-xs uppercase tracking-wider px-5 py-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 flex items-center gap-2"
        >
          Book Consultation
          <ArrowUpRight className="w-4 h-4 text-black stroke-[3]" />
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden bg-zinc-800 text-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-[75px] left-0 w-full bg-[#181818] border-b-4 border-black p-6 flex flex-col gap-5 md:hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-poppins">
          <button 
            onClick={() => scrollToSection("services")}
            className="text-left text-white font-extrabold text-base uppercase pb-2 border-b border-zinc-800"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection("ventures")}
            className="text-left text-white font-extrabold text-base uppercase pb-2 border-b border-zinc-800"
          >
            Ventures
          </button>
          <button 
            onClick={() => scrollToSection("process")}
            className="text-left text-white font-extrabold text-base uppercase pb-2 border-b border-zinc-800"
          >
            Framework
          </button>
          <button 
            onClick={() => scrollToSection("faq")}
            className="text-left text-white font-extrabold text-base uppercase pb-2 border-b border-zinc-800"
          >
            FAQ
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onStartBuildingClick();
            }}
            className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] text-white text-center font-extrabold text-sm uppercase py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all"
          >
            Book Consultation
          </button>
        </div>
      )}
    </header>
  );
};
