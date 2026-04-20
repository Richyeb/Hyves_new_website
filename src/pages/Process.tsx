import { motion } from "motion/react";

export default function Process() {
  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-hyves-black mb-8">How It Works</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our streamlined process ensures a smooth transition to digital operations for your cooperative.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
