import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { businessInfo } from '../data/mock';

export const Contact = () => {
  // Google Maps embed URL for Lafayette, Indiana
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48791.56584653047!2d-86.91529!3d40.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812e2a0a6430697%3A0x5f3d31eb04e9fd4b!2sLafayette%2C%20IN!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus`;

  return (
    <section id="contact" className="bg-[#0a0a0a] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Get In <span className="text-[#00A3FF]">Touch</span>
            </h2>
            <p className="text-white/60 text-lg mb-12">
              Have questions? Ready to schedule your detail? We're here to help!
            </p>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Phone */}
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 hover:border-[#00A3FF]/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#00A3FF]/10 flex items-center justify-center group-hover:bg-[#00A3FF]/20 transition-colors">
                  <Phone className="w-6 h-6 text-[#00A3FF]" />
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-1">Call Us</p>
                  <p className="text-white text-xl font-medium">{businessInfo.phone}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 hover:border-[#00A3FF]/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#00A3FF]/10 flex items-center justify-center group-hover:bg-[#00A3FF]/20 transition-colors">
                  <Mail className="w-6 h-6 text-[#00A3FF]" />
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-1">Email Us</p>
                  <p className="text-white text-xl font-medium">{businessInfo.email}</p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-6">
                <div className="w-14 h-14 bg-[#00A3FF]/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#00A3FF]" />
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-1">Location</p>
                  <p className="text-white text-xl font-medium">{businessInfo.address}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-6">
                <div className="w-14 h-14 bg-[#00A3FF]/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#00A3FF]" />
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-1">Business Hours</p>
                  <p className="text-white text-lg font-medium">Mon - Sat: 9AM - 6PM</p>
                  <p className="text-white/60 text-sm">Sunday: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="h-full min-h-[500px]">
            <div className="bg-white/5 border border-white/10 h-full overflow-hidden">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dirty D's Auto Shine Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
