import React, { useState } from 'react';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { CalendarIcon, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { services, timeSlots, businessInfo } from '../data/mock';
import { toast } from 'sonner';

export const BookingForm = () => {
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    time: '',
    vehicle: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!date || !formData.name || !formData.email || !formData.phone || !formData.service || !formData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Mock submission - will be replaced with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Booking submitted:', {
        ...formData,
        date: format(date, 'PPP')
      });
      
      setIsSubmitted(true);
      toast.success('Booking request sent successfully!');
    } catch (error) {
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-[#00A3FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[#00A3FF]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Booking Request Sent!</h3>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Thank you for choosing Dirty D's Auto Shine. We'll contact you shortly to confirm your appointment.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              service: '',
              time: '',
              vehicle: '',
              notes: ''
            });
            setDate(null);
          }}
          className="bg-[#00A3FF] text-black px-8 py-3 font-medium hover:bg-white transition-colors"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2 text-sm">Full Name *</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-2 text-sm">Email *</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2 text-sm">Phone Number *</label>
          <Input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(765) 555-0123"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-2 text-sm">Vehicle Make/Model</label>
          <Input
            name="vehicle"
            value={formData.vehicle}
            onChange={handleInputChange}
            placeholder="e.g., 2022 Ford F-150"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12"
          />
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-white mb-2 text-sm">Select Service *</label>
        <Select
          value={formData.service}
          onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
        >
          <SelectTrigger className="bg-white/5 border-white/20 text-white h-12">
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent className="bg-[#121212] border-white/20">
            {services.map((service) => (
              <SelectItem
                key={service.id}
                value={service.name}
                className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
              >
                {service.name} - {service.price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2 text-sm">Preferred Date *</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full h-12 px-4 bg-white/5 border border-white/20 text-left flex items-center justify-between text-white hover:bg-white/10 transition-colors"
              >
                <span className={date ? 'text-white' : 'text-white/40'}>
                  {date ? format(date, 'PPP') : 'Select a date'}
                </span>
                <CalendarIcon className="w-5 h-5 text-white/40" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#121212] border-white/20" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="text-white"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="block text-white mb-2 text-sm">Preferred Time *</label>
          <Select
            value={formData.time}
            onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
          >
            <SelectTrigger className="bg-white/5 border-white/20 text-white h-12">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/40" />
                <SelectValue placeholder="Select a time" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#121212] border-white/20">
              {timeSlots.map((time) => (
                <SelectItem
                  key={time}
                  value={time}
                  className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                >
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-white mb-2 text-sm">Additional Notes</label>
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Any special requests or details about your vehicle..."
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[120px]"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#00A3FF] hover:bg-white text-black font-medium h-14 text-lg transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Booking Request'
        )}
      </Button>

      <p className="text-center text-white/40 text-sm">
        We'll contact you at {businessInfo.email} to confirm your appointment
      </p>
    </form>
  );
};
