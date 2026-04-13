import { motion } from "motion/react";
import { 
  Users2, 
  Wallet, 
  LayoutDashboard, 
  HandCoins, 
  Globe, 
  Lock,
  Coins,
  BookOpen,
  BarChart3
} from "lucide-react";

const features = [
  {
    icon: HandCoins,
    title: "Loan Management",
    description: "Automate your entire loan lifecycle from application and credit scoring to disbursement and repayment tracking."
  },
  {
    icon: Coins,
    title: "Contribution Tracking",
    description: "Automate the collection of daily, weekly, or monthly savings with real-time balance updates for all members."
  },
  {
    icon: Wallet,
    title: "Digital Wallet",
    description: "Provide members with personal digital wallets for seamless contributions, withdrawals, and internal transfers."
  },
  {
    icon: LayoutDashboard,
    title: "Real-time Dashboard",
    description: "Access a comprehensive overview of your cooperative's financial performance, member growth, and operational health."
  },
  {
    icon: BookOpen,
    title: "Bookkeeping",
    description: "Maintain accurate and automated financial ledgers that track every transaction within your cooperative ecosystem."
  },
  {
    icon: BarChart3,
    title: "Financial Reporting",
    description: "Generate detailed financial statements, audit trails, and performance reports with a single click."
  },
  {
    icon: Users2,
    title: "Member Management",
    description: "Maintain a centralized and secure database of all member profiles, historical records, and contribution data."
  },
  {
    icon: Globe,
    title: "Multi-branch Support",
    description: "Manage and monitor multiple cooperative branches from a single, unified administrative interface."
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Utilize bank-grade encryption and advanced security protocols to ensure the total protection of your data."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-hyves-black text-white overflow-hidden relative" id="product">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-hyves-gold/5 skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Powerful Features for <span className="text-hyves-gold">Growth.</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Everything you need to run a high-performing cooperative, built with the latest financial technology.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-hyves-gold group-hover:bg-hyves-gold group-hover:text-hyves-black transition-all duration-300 shadow-sm">
                <feature.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-hyves-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
