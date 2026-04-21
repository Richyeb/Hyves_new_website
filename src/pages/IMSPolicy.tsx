import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

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

  const allContent = policy.commitment || defaultPolicy.commitment;

  return (
    <div className="bg-hyves-bg min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hyves-black mb-4 leading-tight">
              Integrated Management System <span className="text-hyves-gold">Policy</span>
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Our commitment to quality, safety, and excellence in everything we do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-600">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <p className="text-slate-600 leading-relaxed text-lg">{allContent}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}