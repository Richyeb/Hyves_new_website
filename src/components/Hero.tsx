import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-hyves-bg">
      {/* Creative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large gradient orbs with animation */}
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-br from-amber-200/20 via-hyves-gold/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-slate-800/20 via-hyves-navy/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-hyves-gold/5 to-hyves-navy/5 rounded-full blur-3xl" />
        
        {/* Animated mesh pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-24 left-[15%] w-16 h-16 border-2 border-hyves-gold/20 rotate-12 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-[20%] w-12 h-12 bg-hyves-gold/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-[25%] w-20 h-20 border border-hyves-navy/15 rotate-45 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-[15%] w-14 h-14 bg-hyves-navy/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        
        {/* Accent lines */}
        <div className="absolute top-32 left-0 w-24 h-px bg-gradient-to-r from-hyves-gold/40 to-transparent" />
        <div className="absolute top-48 right-0 w-32 h-px bg-gradient-to-l from-hyves-navy/30 to-transparent" />
        <div className="absolute bottom-40 left-20 w-px h-40 bg-gradient-to-b from-hyves-gold/30 to-transparent" />
        <div className="absolute bottom-24 right-16 w-px h-32 bg-gradient-to-t from-hyves-navy/20 to-transparent" />
        
        {/* Decorative dots */}
        <div className="absolute top-28 right-1/4 w-2 h-2 bg-hyves-gold/40 rounded-full" />
        <div className="absolute top-60 left-1/3 w-3 h-3 bg-hyves-navy/30 rounded-full" />
        <div className="absolute bottom-48 right-1/3 w-2 h-2 bg-hyves-gold/30 rounded-full" />
        <div className="absolute bottom-28 left-1/4 w-3 h-3 bg-hyves-navy/20 rounded-full" />
        
        {/* Subtle wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hyves-bg to-transparent" />
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
