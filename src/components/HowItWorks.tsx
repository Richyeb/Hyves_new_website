import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Register Your Cooperative",
    description: "Sign up and complete your profile. Our team will guide you through the initial setup process.",
    color: "bg-emerald-50 border-emerald-100"
  },
  {
    number: "02",
    title: "Digitize Operations",
    description: "Import your member data and set up your contribution and loan products in minutes.",
    color: "bg-blue-50 border-blue-100"
  },
  {
    number: "03",
    title: "Scale & Access Insights",
    description: "Start managing operations digitally and unlock access to financial tools and growth insights.",
    color: "bg-purple-50 border-purple-100"
  },
  {
    number: "04",
    title: "Access Financial Services",
    description: "Financial services are from partners with financial products built specifically for Cooperatives and their members.",
    color: "bg-orange-50 border-orange-100"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-hyves-black mb-4">
            Getting Started is Simple
          </h2>
          <p className="text-lg text-slate-600">
            Transitioning to a digital system does not have to be complicated. We have streamlined the process for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-slate-100 -z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative z-10 p-8 rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 ${step.color}`}
            >
              <div className="text-5xl font-black text-black/5 mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-hyves-black mb-4">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
