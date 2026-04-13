import { motion } from "motion/react";
import { Building2, Briefcase, Users, Heart, Sprout } from "lucide-react";

const targets = [
  {
    icon: Building2,
    title: "Registered Cooperatives",
    description: "Traditional cooperatives looking to modernize their operations and improve member trust."
  },
  {
    icon: Briefcase,
    title: "Corporate Cooperatives",
    description: "Staff cooperatives within organizations that need efficient payroll deduction and loan management."
  },
  {
    icon: Users,
    title: "Trade & Professional Groups",
    description: "Associations of professionals or traders managing collective savings and credit schemes."
  },
  {
    icon: Heart,
    title: "Religious & Alumni Groups",
    description: "Community-based groups that manage funds for member welfare and development projects."
  },
  {
    icon: Sprout,
    title: "Agri-based Cooperatives",
    description: "Agricultural cooperatives managing member inputs, contributions, and collective marketing."
  }
];

export default function TargetUsers() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-hyves-black mb-4">
            Built for Every Type of Cooperative
          </h2>
          <p className="text-lg text-slate-600">
            Whether you are a small community group or a large corporate cooperative, Hyves scales with you.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {targets.map((target, index) => (
            <motion.div
              key={target.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-start gap-6 p-8 rounded-3xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-lg transition-all duration-300 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-hyves-gold">
                <target.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-hyves-black mb-2">{target.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {target.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
