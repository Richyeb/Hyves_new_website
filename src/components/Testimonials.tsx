import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chief Omoh",
    role: "Vanni International Security System Cooperative Multipurpose Society Limited",
    location: "Lagos State",
    content: "Members that left the Cooperative are now coming back"
  },
  {
    name: "Mr. Goddey",
    role: "APCAA Greenfields Multi-Purpose Cooperative Society Limited",
    location: "Edo State",
    content: "The platform is robust addressing key processes we need. They are also quick to continue improving as we are one of their beta customers"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-hyves-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-hyves-black mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600">
            Hear from cooperatives that have transformed their operations with Hyves.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden rounded-lg">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-hyves-gold">
                    <Quote className="w-6 h-6 text-hyves-gold mx-auto mb-3" />
                    <p className="text-base text-slate-700 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="text-center">
                      <h4 className="font-semibold text-hyves-black">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                      <p className="text-xs text-slate-500 mt-1">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-hyves-black" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-hyves-black" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-hyves-green" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}