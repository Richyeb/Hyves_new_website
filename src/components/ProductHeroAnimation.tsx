import { motion } from "motion/react";

export default function ProductHeroAnimation() {
  return (
    <div className="relative w-full">
      <div className="flex items-end justify-center gap-4">
        {/* Laptop Screen */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-2xl border-8 border-slate-800 bg-slate-800 shadow-2xl overflow-hidden aspect-[16/10] w-72 lg:w-96">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
              {/* Animated Dashboard Content */}
              <div className="p-3 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                {/* Content */}
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-slate-600/50 rounded-lg"
                  />
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    className="bg-slate-600/50 rounded-lg"
                  />
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    className="bg-slate-600/50 rounded-lg"
                  />
                </div>
                {/* Chart */}
                <div className="mt-2 h-12 bg-slate-600/30 rounded-lg relative overflow-hidden">
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-hyves-gold/40"
                    animate={{ height: ["30%", "60%", "40%", "70%", "50%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Laptop Base */}
          <div className="w-72 lg:w-96 h-3 bg-slate-700 rounded-b-lg mx-auto -mt-1" />
          <div className="w-20 h-1 bg-slate-600 rounded-b-lg mx-auto" />
        </motion.div>

        {/* Phone Screen */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative -mb-8"
        >
          <div className="w-24 rounded-[2rem] border-8 border-slate-800 bg-slate-800 shadow-2xl overflow-hidden aspect-[9/19]">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
              {/* Phone Content */}
              <div className="p-2 h-full flex flex-col">
                {/* Header */}
                <div className="h-4 bg-slate-600/50 rounded mb-2" />
                {/* Cards */}
                <div className="space-y-1">
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-6 bg-slate-600/50 rounded"
                  />
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="h-6 bg-slate-600/50 rounded"
                  />
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="h-6 bg-slate-600/50 rounded"
                  />
                </div>
              </div>
            </div>
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-4 bg-slate-800 rounded-b-xl" />
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-0 right-0 w-20 h-20 bg-hyves-gold/20 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/20 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
}