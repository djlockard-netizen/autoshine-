import React from 'react';
import { Droplets, Sparkles, Star, Shield, Cog, ChevronRight } from 'lucide-react';
import { services, images } from '../data/mock';

const iconMap = {
  Droplets: Droplets,
  Sparkles: Sparkles,
  Star: Star,
  Shield: Shield,
  Cog: Cog
};

export const Services = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="text-[#00A3FF]">Services</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From quick washes to full ceramic coatings, we offer a complete range of detailing services to keep your vehicle looking its best.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group bg-white/5 border border-white/10 p-8 hover:border-[#00A3FF]/50 hover:bg-white/10 transition-all duration-400"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-[#00A3FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#00A3FF]/20 transition-colors">
                  <IconComponent className="w-7 h-7 text-[#00A3FF]" />
                </div>

                {/* Service Name */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-white/60 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Price & Duration */}
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="text-[#00A3FF] font-bold text-lg">{service.price}</p>
                    <p className="text-white/40 text-sm">{service.duration}</p>
                  </div>
                  <button
                    onClick={scrollToBooking}
                    className="flex items-center gap-1 text-white/60 hover:text-[#00A3FF] transition-colors"
                  >
                    Book
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square overflow-hidden">
            <img
              src={images.detailing1}
              alt="Detailing work"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <img
              src={images.detailing2}
              alt="Detailing work"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <img
              src={images.detailing3}
              alt="Detailing work"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <img
              src={images.carWash}
              alt="Car wash"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
