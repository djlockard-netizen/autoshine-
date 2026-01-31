import React from 'react';
import { BookingForm } from './BookingForm';
import { images } from '../data/mock';

export const Booking = () => {
  return (
    <section id="booking" className="bg-[#0a0a0a] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Info */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Book Your <span className="text-[#00A3FF]">Detail</span>
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Ready to get your vehicle looking its best? Schedule your appointment online and we'll take care of the rest.
            </p>

            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={images.detailing4}
                alt="Professional detailing"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
            </div>

            {/* Quick Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-2 h-2 bg-[#00A3FF]" />
                <span>Same-day appointments available</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-2 h-2 bg-[#00A3FF]" />
                <span>Mobile detailing service</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-2 h-2 bg-[#00A3FF]" />
                <span>Satisfaction guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white/5 border border-white/10 p-8">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};
