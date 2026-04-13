import { motion } from "motion/react";
import { FileX, EyeOff, TrendingDown, Link2Off } from "lucide-react";

const problems = [
  {
    icon: FileX,
    title: "Manual Operations",
    description: "Paper-based systems are slow, prone to errors, and difficult to scale as your cooperative grows."
  },
  {
    icon: EyeOff,
    title: "Lack of Transparency",
    description: "Members struggle to track their contributions and loan statuses in real-time, leading to mistrust."
  },
  {
    icon: TrendingDown,
    title: "Poor Access to Finance",
    description: "Without digital records, cooperatives find it nearly impossible to secure external funding or credit."
  },
  {
    icon: Link2Off,
    title: "Financial Disconnection",
    description: "Being disconnected from the formal financial system limits your ability to offer modern banking services."
  }
];

export default function Problem() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-hyves-navy mb-4">
            The Challenges of Traditional Cooperatives
          </h2>
          <p className="text-lg text-slate-600">
            Managing a cooperative should not be a headache. We have identified the core hurdles that hold you back.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-transparent transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-hyves-emerald group-hover:scale-110 transition-all mb-6">
                <problem.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-hyves-navy mb-3">{problem.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
