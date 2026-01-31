import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { businessInfo, images } from '../data/mock';

export const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Auto Detailing"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#00A3FF]/10 border border-[#00A3FF]/30 px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-[#00A3FF]" />
            <span className="text-[#00A3FF] text-sm font-medium">Lafayette's Premier Detailing Service</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            <span className="block">Dirty</span>
            <span className="text-[#00A3FF]">D's</span>
            <span className="block text-white">Auto Shine</span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl sm:text-3xl text-white/80 italic mb-4">
            {businessInfo.tagline}
          </p>

          {/* Description */}
          <p className="text-lg text-white/60 mb-10 max-w-lg">
            Professional auto detailing services in Lafayette, Indiana. We transform your vehicle from dirty to dazzling with our premium detailing packages.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToBooking}
              className="group flex items-center justify-center gap-3 bg-[#00A3FF] text-black px-8 py-4 text-lg font-medium hover:bg-white transition-all duration-400"
            >
              Book Your Detail
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={`tel:${businessInfo.phone}`}
              className="flex items-center justify-center gap-3 bg-white/10 text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-400 border border-white/20"
            >
              Call {businessInfo.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};
