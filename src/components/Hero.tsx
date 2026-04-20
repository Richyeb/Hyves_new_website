import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-hyves-bg">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-hyves-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-hyves-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-hyves-black mb-6 leading-[1.1]">
              Digitize Your Cooperative, <br />
              <span className="text-hyves-gold">Empower Your Members.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="bg-hyves-black hover:bg-hyves-black/90 text-white rounded-full px-8 h-14 text-base font-semibold group" asChild>
              <a href="/contact">
                Get Started for Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold border-slate-200 hover:bg-slate-50 text-hyves-black" asChild>
              <a href="/contact">Book a Demo</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
