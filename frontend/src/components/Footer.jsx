import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { businessInfo } from '../data/mock';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold">
                <span className="text-white">Dirty </span>
                <span className="text-[#00A3FF]">D's</span>
                <span className="text-white"> Auto Shine</span>
              </h3>
              <p className="text-white/60 italic mt-2">{businessInfo.tagline}</p>
            </div>
            <p className="text-white/60 max-w-md leading-relaxed">
              Lafayette's premier auto detailing service. We're dedicated to making your vehicle look its absolute best with our professional detailing services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <nav className="space-y-4">
              <button
                onClick={() => scrollToSection('services')}
                className="block text-white/60 hover:text-[#00A3FF] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className="block text-white/60 hover:text-[#00A3FF] transition-colors"
              >
                Book Now
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block text-white/60 hover:text-[#00A3FF] transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <div className="space-y-4">
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex items-center gap-3 text-white/60 hover:text-[#00A3FF] transition-colors"
              >
                <Phone className="w-5 h-5" />
                {businessInfo.phone}
              </a>
              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-center gap-3 text-white/60 hover:text-[#00A3FF] transition-colors"
              >
                <Mail className="w-5 h-5" />
                {businessInfo.email}
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-5 h-5" />
                {businessInfo.address}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Dirty D's Auto Shine. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            {businessInfo.domain}
          </p>
        </div>
      </div>
    </footer>
  );
};
