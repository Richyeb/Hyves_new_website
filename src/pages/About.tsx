import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function About() {
  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-hyves-black mb-8">About Hyves</h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            Hyves is dedicated to empowering cooperatives across Nigeria with cutting-edge digital infrastructure.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left mb-20">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-hyves-black mb-4">Our Vision</h3>
              <p className="text-slate-600">To create an African ecosystem of thriving cooperatives by 2030</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-hyves-black mb-4">Our Mission</h3>
              <p className="text-slate-600">Streamlining cooperative management and operations</p>
            </div>
          </div>

          <div className="space-y-24 text-left">
            <section>
              <h2 className="text-3xl font-bold text-hyves-black mb-8">Our Values (BEES)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { title: "Brave", description: "We are courageous in our pursuit of innovation." },
                  { title: "Energetic", description: "We bring passion and vitality to our work every day." },
                  { title: "Efficient", description: "We optimize processes to deliver maximum value." },
                  { title: "Synergy", description: "We believe in the power of collective action and collaboration." }
                ].map((value) => (
                  <div key={value.title} className="p-6 rounded-2xl bg-white border border-slate-100">
                    <h4 className="font-bold text-hyves-black mb-2">{value.title}</h4>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-hyves-black mb-8">Core Team</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Richmond Oghenedoro", role: "Cofounder / Chief Executive Officer", seed: "richmond" },
                  { name: "Ekundayo Kiyesi", role: "Cofounder / Chief Growth Officer", seed: "ekundayo" },
                  { name: "Wisdom Diala", role: "Head of Engineering", seed: "wisdom" },
                  { name: "Precious Obodo", role: "Product Manager", seed: "precious" }
                ].map((member) => (
                  <div key={member.name} className="group">
                    <div className="aspect-square rounded-2xl bg-slate-100 mb-4 overflow-hidden">
                      <img 
                        src={`https://picsum.photos/seed/${member.seed}/400/400`} 
                        alt={member.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className="font-bold text-hyves-black">{member.name}</h4>
                    <p className="text-sm text-slate-500">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-hyves-black mb-8">Our Culture</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <h4 className="font-bold text-hyves-black mb-2">Transparency</h4>
                  <p className="text-slate-600 text-sm">We believe in open communication and radical honesty in everything we do.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <h4 className="font-bold text-hyves-black mb-2">Innovation</h4>
                  <p className="text-slate-600 text-sm">We are constantly pushing boundaries to find better ways to serve cooperatives.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <h4 className="font-bold text-hyves-black mb-2">Family</h4>
                  <p className="text-slate-600 text-sm">We treat our members and partners like family, fostering deep trust and long-term relationships.</p>
                </div>
              </div>
            </section>

            <section className="bg-hyves-black text-white p-12 rounded-[3rem] text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                We are always looking for passionate individuals who want to make a real impact.
              </p>
              <Link to="/careers" className="inline-block bg-hyves-gold text-hyves-black font-bold px-8 py-4 rounded-full hover:bg-hyves-gold/90 transition-colors">
                View Open Positions
              </Link>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
