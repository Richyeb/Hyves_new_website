import { motion } from "motion/react";
import { Shield, CheckCircle, AlertTriangle, FileText, Users, Lock, Globe } from "lucide-react";

export default function IMSPolicy() {
  return (
    <div className="bg-hyves-bg min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-br from-hyves-navy via-slate-900 to-hyves-navy relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-hyves-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-hyves-gold/20 text-hyves-gold px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              Quality & Safety
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Integrated Management System <span className="text-hyves-gold">Policy</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Our commitment to quality, safety, and excellence in everything we do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8 border-l-4 border-hyves-gold"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-hyves-gold/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-hyves-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-hyves-black mb-4">Our Commitment</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Hyves Technology Limited is committed to establishing, implementing, maintaining, and continually improving an Integrated Management System (IMS) that meets the requirements of ISO 9001:2015, ISO 27001:2022, and ISO 45001:2018. This policy demonstrates our dedication to quality, information security, and occupational health and safety.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quality Objectives */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8"
            >
              <h2 className="text-2xl font-bold text-hyves-black mb-6 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-hyves-gold" />
                Quality Objectives
              </h2>
              <div className="space-y-4">
                {[
                  "Deliver products and services that consistently meet customer requirements and expectations",
                  "Enhance customer satisfaction through effective quality management processes",
                  "Continually improve the effectiveness of the Quality Management System",
                  "Ensure compliance with applicable legal and regulatory requirements"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-hyves-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-hyves-gold" />
                    </div>
                    <p className="text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Information Security */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8"
            >
              <h2 className="text-2xl font-bold text-hyves-black mb-6 flex items-center gap-3">
                <Lock className="w-7 h-7 text-hyves-gold" />
                Information Security
              </h2>
              <div className="space-y-4">
                {[
                  "Protect the confidentiality, integrity, and availability of information assets",
                  "Implement robust cybersecurity measures to safeguard against threats",
                  "Conduct regular risk assessments and security audits",
                  "Provide ongoing security awareness training for all employees"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-hyves-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lock className="w-4 h-4 text-hyves-gold" />
                    </div>
                    <p className="text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Health & Safety */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8"
            >
              <h2 className="text-2xl font-bold text-hyves-black mb-6 flex items-center gap-3">
                <Users className="w-7 h-7 text-hyves-gold" />
                Occupational Health & Safety
              </h2>
              <div className="space-y-4">
                {[
                  "Provide a safe and healthy work environment for all employees and stakeholders",
                  "Identify and control workplace hazards to prevent injury and illness",
                  "Promote employee well-being through wellness programs and initiatives",
                  "Ensure compliance with occupational health and safety regulations"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-hyves-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-hyves-gold" />
                    </div>
                    <p className="text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Compliance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8"
            >
              <h2 className="text-2xl font-bold text-hyves-black mb-6 flex items-center gap-3">
                <Globe className="w-7 h-7 text-hyves-gold" />
                Compliance & Certification
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our Integrated Management System is certified to the following international standards:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "ISO 9001:2015", desc: "Quality Management" },
                  { title: "ISO 27001:2022", desc: "Information Security" },
                  { title: "ISO 45001:2018", desc: "Occupational Health & Safety" }
                ].map((cert, index) => (
                  <div key={index} className="bg-hyves-bg rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-hyves-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-hyves-gold" />
                    </div>
                    <h3 className="font-bold text-hyves-black">{cert.title}</h3>
                    <p className="text-sm text-slate-500">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Continuous Improvement */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-hyves-navy to-slate-900 rounded-2xl shadow-lg p-8 md:p-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <AlertTriangle className="w-7 h-7 text-hyves-gold" />
                Continuous Improvement
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                We are committed to the principle of continual improvement. This involves:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Regular internal audits and management reviews",
                  "Monitoring and measurement of key performance indicators",
                  "Implementation of corrective and preventive actions",
                  "Engagement with stakeholders for feedback and improvement"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-hyves-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-hyves-gold" />
                    </div>
                    <p className="text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}