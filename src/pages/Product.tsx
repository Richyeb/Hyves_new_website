import { motion } from "motion/react";
import Features from "@/components/Features";
import ProductHeroAnimation from "@/components/ProductHeroAnimation";

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

            <div className="lg:w-1/2 relative">
              <ProductHeroAnimation />
            </div>
          </div>
        </div>
      </section>

      <Features />
    </div>
  );
}
