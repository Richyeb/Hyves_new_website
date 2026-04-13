import { motion } from "motion/react";
import Features from "@/components/Features";

export default function Product() {
  return (
    <div className="bg-hyves-bg min-h-screen">
      {/* Product Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-hyves-black mb-8 leading-tight">
                A Unified Platform for <span className="text-hyves-gold">Modern Cooperatives.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Experience the power of a comprehensive ERP system designed to streamline every aspect of your cooperative's operations, from member management to automated financial reporting.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm font-bold text-hyves-navy">
                  <div className="w-2 h-2 rounded-full bg-hyves-gold" />
                  Mobile Ready
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-hyves-navy">
                  <div className="w-2 h-2 rounded-full bg-hyves-gold" />
                  Cloud Based
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              {/* Laptop Mockup */}
              <div className="relative z-10 rounded-2xl border-8 border-slate-800 bg-slate-800 shadow-2xl overflow-hidden aspect-[16/10]">
                <img 
                  src="/src/assets/product-laptop.svg" 
                  alt="Hyves Dashboard on Laptop" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Mobile Mockup */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-10 -left-10 z-20 w-1/3 rounded-[2.5rem] border-8 border-slate-800 bg-slate-800 shadow-2xl overflow-hidden aspect-[9/19]"
              >
                <img 
                  src="/src/assets/product-mobile.svg" 
                  alt="Hyves Mobile App" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-hyves-gold/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <Features />
    </div>
  );
}
