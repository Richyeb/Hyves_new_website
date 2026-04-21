import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Loader2 } from "lucide-react";

interface IMSPolicy {
  commitment: string;
  qualityObjectives: string[];
  informationSecurity: string[];
  healthSafety: string[];
  compliance: string;
  continuousImprovement: string[];
}

const defaultPolicy: IMSPolicy = {
  commitment: "Hyves Technology Limited is committed to establishing, implementing, maintaining, and continually improving an Integrated Management System (IMS) that meets the requirements of ISO 9001:2015, ISO 27001:2022, and ISO 45001:2018. This policy demonstrates our dedication to quality, information security, and occupational health and safety.",
  qualityObjectives: [
    "Deliver products and services that consistently meet customer requirements and expectations",
    "Enhance customer satisfaction through effective quality management processes",
    "Continually improve the effectiveness of the Quality Management System",
    "Ensure compliance with applicable legal and regulatory requirements"
  ],
  informationSecurity: [
    "Protect the confidentiality, integrity, and availability of information assets",
    "Implement robust cybersecurity measures to safeguard against threats",
    "Conduct regular risk assessments and security audits",
    "Provide ongoing security awareness training for all employees"
  ],
  healthSafety: [
    "Provide a safe and healthy work environment for all employees and stakeholders",
    "Identify and control workplace hazards to prevent injury and illness",
    "Promote employee well-being through wellness programs and initiatives",
    "Ensure compliance with occupational health and safety regulations"
  ],
  compliance: "Our Integrated Management System is certified to the following international standards: ISO 9001:2015 (Quality Management), ISO 27001:2022 (Information Security), and ISO 45001:2018 (Occupational Health & Safety).",
  continuousImprovement: [
    "Regular internal audits and management reviews",
    "Monitoring and measurement of key performance indicators",
    "Implementation of corrective and preventive actions",
    "Engagement with stakeholders for feedback and improvement"
  ]
};

export default function IMSPolicy() {
  const [policy, setPolicy] = useState<IMSPolicy>(defaultPolicy);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ims-policy")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.commitment) {
          setPolicy(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching IMS Policy:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-hyves-bg min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-hyves-gold animate-spin" />
      </div>
    );
  }

  const allContent = [
    { title: "Our Commitment", content: policy.commitment || defaultPolicy.commitment },
    { title: "Quality Objectives", content: (policy.qualityObjectives?.length > 0 ? policy.qualityObjectives : defaultPolicy.qualityObjectives).join(" • ") },
    { title: "Information Security", content: (policy.informationSecurity?.length > 0 ? policy.informationSecurity : defaultPolicy.informationSecurity).join(" • ") },
    { title: "Health & Safety", content: (policy.healthSafety?.length > 0 ? policy.healthSafety : defaultPolicy.healthSafety).join(" • ") },
    { title: "Compliance", content: policy.compliance || defaultPolicy.compliance },
    { title: "Continuous Improvement", content: (policy.continuousImprovement?.length > 0 ? policy.continuousImprovement : defaultPolicy.continuousImprovement).join(" • ") }
  ];

  return (
    <div className="bg-hyves-bg min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-hyves-navy via-slate-900 to-hyves-navy relative overflow-hidden">
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

      {/* Single Statement Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="space-y-8">
                {allContent.map((item, index) => (
                  <div key={index} className={index === allContent.length - 1 ? "" : "pb-6 border-b border-slate-100"}>
                    <h3 className="text-lg font-bold text-hyves-gold mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}