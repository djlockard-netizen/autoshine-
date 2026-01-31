import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { businessInfo } from '../data/mock';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold">
              <span className="text-white">Dirty </span>
              <span className="text-[#00A3FF]">D's</span>
            </div>
            <span className="hidden sm:block text-white/60 text-sm italic">Auto Shine</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-white/70 hover:text-white transition-colors duration-300 text-lg"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className="text-white/70 hover:text-white transition-colors duration-300 text-lg"
            >
              Book Now
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white/70 hover:text-white transition-colors duration-300 text-lg"
            >
              Contact
            </button>
            <a
              href={`tel:${businessInfo.phone}`}
              className="flex items-center gap-2 bg-[#00A3FF] text-black px-6 py-3 font-medium hover:bg-[#00A3FF]/80 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              {businessInfo.phone}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('services')}
                className="text-white/70 hover:text-white transition-colors text-left py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className="text-white/70 hover:text-white transition-colors text-left py-2"
              >
                Book Now
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/70 hover:text-white transition-colors text-left py-2"
              >
                Contact
              </button>
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex items-center gap-2 bg-[#00A3FF] text-black px-6 py-3 font-medium w-fit"
              >
                <Phone className="w-4 h-4" />
                {businessInfo.phone}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
