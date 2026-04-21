import { motion } from "motion/react";

export default function ProductHeroAnimation() {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-hyves-navy via-slate-800 to-hyves-navy overflow-hidden shadow-2xl">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Central Animated Circle */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="w-48 h-48 rounded-full border-2 border-hyves-gold/30" />
      </motion.div>

      {/* Inner Circle */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -180, -360]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="w-32 h-32 rounded-full border-2 border-hyves-gold/50" />
      </motion.div>

      {/* Center Icon */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-20 h-20 bg-hyves-gold/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          <div className="w-10 h-10 bg-hyves-gold rounded-lg" />
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-hyves-gold/60 rounded-full"
          initial={{ 
            x: Math.random() * 300 + 50, 
            y: Math.random() * 200 + 50,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -100 + 50],
            opacity: [0, 0.8, 0]
          }}
          transition={{ 
            duration: 4 + Math.random() * 3, 
            repeat: Infinity,
            delay: Math.random() * 3
          }}
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 bg-hyves-gold/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Data Flow Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d="M 0 50 Q 150 100 300 50 T 600 50"
          fill="none"
          stroke="rgba(249, 181, 9, 0.2)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 150 Q 150 200 300 150 T 600 150"
          fill="none"
          stroke="rgba(249, 181, 9, 0.15)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.path
          d="M 0 250 Q 150 300 300 250 T 600 250"
          fill="none"
          stroke="rgba(249, 181, 9, 0.1)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}