"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Briefcase, Calendar, Mail, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const BLOGS_ENDPOINT = "https://hyves-backend.onrender.com/api/blogs";

interface CareerItem {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  author?: string;
  category: "blog" | "career" | "policies";
  tags?: string[];
  status?: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
}

const values = [
  { letter: "B", title: "Brave", description: "We take bold, thoughtful bets in service of cooperatives and the people behind them." },
  { letter: "E", title: "Energetic", description: "We bring pace, optimism, and ownership to hard problems without losing our humanity." },
  { letter: "E", title: "Efficient", description: "We build systems that make everyday work simpler, faster, and more reliable." },
  { letter: "S", title: "Synergy", description: "We believe strong teams compound individual talent through trust and shared context." },
];

const culture = [
  { title: "Mission-led work", description: "Help digitize cooperative operations and expand access to financial tools across Africa." },
  { title: "Small team, real ownership", description: "Work close to product, customers, and leadership with room to shape the outcome." },
  { title: "Learning rhythm", description: "We value curiosity, clear feedback, and steady improvement over noise and theatrics." },
];

const getItemId = (item: CareerItem) => item._id || item.id || item.slug || item.title;
const getItemDate = (item: CareerItem) => item.createdAt || item.updatedAt || new Date().toISOString();
const getSummary = (item: CareerItem) =>
  item.excerpt || item.content.replace(/\s+/g, " ").trim().slice(0, 180);

export default function JoinOurTeam() {
  const [items, setItems] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(BLOGS_ENDPOINT);
        if (!res.ok) throw new Error(`Failed to fetch career applications (${res.status})`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : data?.blogs || data?.data || []);
      } catch (err) {
        console.error("Error fetching career applications:", err);
        setError(err instanceof Error ? err.message : "Unable to load career applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const careerItems = useMemo(
    () => items.filter((item) => item.category === "career" && item.status !== "draft"),
    [items],
  );

  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <section className="grid gap-12 lg:grid-cols-[1fr_420px] items-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-hyves-gold mb-5">Join Our Team</p>
            <h1 className="text-4xl md:text-6xl font-bold text-hyves-black mb-6 leading-tight">
              Build the future of cooperative finance with us.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Hyves is building digital infrastructure for modern cooperatives. We are looking for people who care about excellent products, clear systems, and meaningful impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-hyves-black text-white rounded-[2rem] p-8 border border-white/10"
          >
            <div className="w-14 h-14 rounded-2xl bg-hyves-gold text-hyves-black flex items-center justify-center mb-8">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Work that compounds</h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Every role touches real cooperative operators and members. The work is practical, visible, and built to last.
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Users className="w-4 h-4 text-hyves-gold" />
              Remote-friendly team based in Lagos, Nigeria
            </div>
          </motion.div>
        </section>

        <section className="mb-24">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-hyves-black mb-4">Our Core Values</h2>
            <p className="text-slate-600">BEES is how we remind ourselves to move with courage, energy, discipline, and collaboration.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={`${value.letter}-${value.title}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-white border border-slate-100 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-hyves-gold/10 text-hyves-gold flex items-center justify-center text-xl font-black mb-6">
                  {value.letter}
                </div>
                <h3 className="text-lg font-bold text-hyves-black mb-3">{value.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[360px_1fr] mb-24">
          <div>
            <h2 className="text-3xl font-bold text-hyves-black mb-4">How we work</h2>
            <p className="text-slate-600 leading-relaxed">
              We keep the team focused, direct, and close to the people using what we build.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {culture.map((item) => (
              <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-6">
                <h3 className="font-bold text-hyves-black mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-hyves-black mb-4">Join our Team!</h2>
            </div>

          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading career applications...</div>
          ) : error ? (
            <div className="bg-white p-12 rounded-3xl border border-rose-100 text-center">
              <p className="text-rose-600">{error}</p>
            </div>
          ) : careerItems.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
              <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-hyves-black mb-2">No open applications right now</h3>
              <p className="text-slate-500 mb-6">Check back later or send an open application to careers@hyves.ng.</p>
              <Button asChild className="bg-hyves-gold text-hyves-black font-bold rounded-full px-8 hover:bg-hyves-gold/90">
                <a href="mailto:careers@hyves.ng?subject=Open%20Application%20to%20Hyves">Send Open Application</a>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {careerItems.map((item, index) => (
                <motion.article
                  key={getItemId(item)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 hover:border-hyves-gold transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-hyves-gold bg-hyves-gold/10 px-3 py-1 rounded-full">
                          Career
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          Posted {new Date(getItemDate(item)).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-hyves-black mb-3">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed max-w-3xl">{getSummary(item)}</p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-xs rounded-full bg-slate-100 px-3 py-1 text-slate-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button asChild className="bg-hyves-black text-white rounded-full px-8 hover:bg-hyves-gold hover:text-hyves-black transition-all">
                      <a href={`mailto:careers@hyves.ng?subject=Application%20for%20${encodeURIComponent(item.title)}`}>
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
