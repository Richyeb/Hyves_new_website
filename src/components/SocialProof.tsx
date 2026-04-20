import { motion } from "motion/react";


import vanni from "@/assets/Partners/Vanni.png";
import bold from "@/assets/Partners/Bold.png";
import fincra from "@/assets/Partners/Fincra.png";
import peswa from "@/assets/Partners/Peswa.png";
import prembly from "@/assets/Partners/Prembly.png";

const partners = [
  bold,
  fincra,
  peswa,
  prembly,
  vanni,
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-slate-400 mb-10">
          Trusted by leading institutions & cooperatives
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((logo, index) => (
  <img
    key={index}
    src={logo}
    alt="Partner logo"
    className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
  />
))}
        </div>
      </div>
    </section>
  );
}
