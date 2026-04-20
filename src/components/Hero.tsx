import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-hyves-bg">
      {/* Creative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-hyves-gold/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-hyves-navy/10 to-transparent rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Decorative lines */}
        <div className="absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-hyves-gold/30 to-transparent" />
        <div className="absolute top-40 right-20 w-px h-48 bg-gradient-to-b from-hyves-navy/20 to-transparent" />
        <div className="absolute bottom-32 left-1/3 w-px h-24 bg-gradient-to-b from-hyves-gold/20 to-transparent" />
        
        {/* Subtle circles */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 border border-hyves-gold/10 rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-hyves-navy/10 rounded-full" />
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
