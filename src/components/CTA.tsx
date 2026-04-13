import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[3rem] bg-hyves-black p-12 md:p-20 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-hyves-gold/5 skew-x-12 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-hyves-gold/5 -skew-x-12 -translate-x-1/4 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Start Digitizing Your <br />
                Cooperative Today.
              </h2>
              <p className="text-lg text-slate-300 mb-12 max-w-xl mx-auto">
                Join thousands of cooperatives across Nigeria that are already using Hyves to power their digital transformation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-hyves-gold hover:bg-hyves-gold/90 text-hyves-black rounded-full px-10 h-14 text-base font-bold group w-full sm:w-auto">
                  Get Started Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="text-hyves-gold border-hyves-gold hover:bg-hyves-gold hover:text-hyves-black rounded-full px-10 h-14 text-base font-bold w-full sm:w-auto" asChild>
                  <a href="/login">Login to Account</a>
                </Button>
              </div>
              
              <p className="mt-8 text-sm text-slate-400">
                No credit card required. Setup takes less than 10 minutes.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
