import { motion } from "motion/react";

export default function ProductAnimation() {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden shadow-2xl">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Dashboard Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main Dashboard Card */}
        <div className="w-4/5 h-4/5 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 shadow-xl">
          {/* Dashboard Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
            <div className="w-20 h-2 bg-slate-600 rounded" />
            <div className="w-16 h-2 bg-slate-600 rounded ml-auto" />
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="h-16 bg-slate-700/50 rounded-lg border border-slate-600/30 animate-pulse" />
            <div className="h-16 bg-slate-700/50 rounded-lg border border-slate-600/30 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="h-16 bg-slate-700/50 rounded-lg border border-slate-600/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* Chart Area */}
          <div className="h-24 bg-slate-700/30 rounded-lg border border-slate-600/30 relative overflow-hidden p-2">
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end h-16">
              <div className="w-6 bg-amber-400/60 rounded-t animate-[height_3s_ease-in-out_infinite]" style={{ height: '40%' }} />
              <div className="w-6 bg-amber-400/60 rounded-t animate-[height_3s_ease-in-out_infinite]" style={{ height: '65%', animationDelay: '0.2s' }} />
              <div className="w-6 bg-amber-400/60 rounded-t animate-[height_3s_ease-in-out_infinite]" style={{ height: '45%', animationDelay: '0.4s' }} />
              <div className="w-6 bg-amber-400/60 rounded-t animate-[height_3s_ease-in-out_infinite]" style={{ height: '80%', animationDelay: '0.6s' }} />
              <div className="w-6 bg-amber-400/60 rounded-t animate-[height_3s_ease-in-out_infinite]" style={{ height: '55%', animationDelay: '0.8s' }} />
              <div className="w-6 bg-amber-400/60 rounded-t animate-[height_3s_ease-in-out_infinite]" style={{ height: '70%', animationDelay: '1s' }} />
              <div className="w-6 bg-amber-400/60 rounded-t animate-[height_3s_ease-in-out_infinite]" style={{ height: '60%', animationDelay: '1.2s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Glowing Orb */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}