import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Briefcase, MapPin, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Role {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  date: string;
}

export default function Careers() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching roles:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-hyves-black mb-8">Join the Hive</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            We are building the infrastructure for the next generation of cooperatives in Africa. 
            Come help us shape the future of community finance.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading open positions...</div>
          ) : roles.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
              <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-hyves-black mb-2">No open positions right now</h3>
              <p className="text-slate-500">Check back later or follow us on LinkedIn for updates.</p>
            </div>
          ) : (
            roles.map((role) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 hover:border-hyves-gold transition-all group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-hyves-gold bg-hyves-gold/10 px-3 py-1 rounded-full">
                        {role.department}
                      </span>
                      <span className="text-xs text-slate-400">
                        Posted {new Date(role.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-hyves-black mb-4 group-hover:text-hyves-gold transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {role.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {role.type}
                      </div>
                    </div>
                  </div>
                  <Button className="bg-hyves-black text-white rounded-full px-8 group-hover:bg-hyves-gold group-hover:text-hyves-black transition-all">
                    Apply Now
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <section className="max-w-4xl mx-auto mt-24 bg-hyves-navy text-white p-12 rounded-[3rem] text-center">
          <h2 className="text-3xl font-bold mb-6">Don't see a fit?</h2>
          <p className="text-slate-300 mb-8">
            We are always looking for talented people. Send your CV to careers@hyves.ng and we'll keep you in mind.
          </p>
          <Button className="bg-hyves-gold text-hyves-black font-bold px-8 py-4 h-auto rounded-full hover:bg-hyves-gold/90 transition-colors">
            Send Open Application
          </Button>
        </section>
      </div>
    </div>
  );
}
