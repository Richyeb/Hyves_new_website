import { motion } from "motion/react";

const partners = [
  "Partner One", "Partner Two", "Partner Three", "Partner Four", "Partner Five"
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-slate-400 mb-10">
          Trusted by leading institutions & cooperatives
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <div key={partner} className="text-2xl font-black text-slate-300 hover:text-hyves-black transition-colors cursor-default">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
