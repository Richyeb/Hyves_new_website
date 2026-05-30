import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Loader2, Shield, AlertTriangle, Lock } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface IMSPolicy {
  commitment: string;
  qualityObjectives: string[];
  informationSecurity: string[];
  healthSafety: string[];
  compliance: string;
  continuousImprovement: string[];
}

const defaultPolicy: IMSPolicy = {
  commitment: "",
  qualityObjectives: [],
  informationSecurity: [],
  healthSafety: [],
  compliance: "",
  continuousImprovement: []
};

const defaultWhistleblower = {
  content: "",
};

const policies = [
  {
    id: "ims",
    title: "IMS Policy",
    description: "Integrated Management System policy for quality, security, and safety.",
    icon: Shield,
  },
  {
    id: "whistleblower",
    title: "Whistleblower Policy",
    description: "How to report concerns confidentially and without fear of retaliation.",
    icon: AlertTriangle,
  },
  {
    id: "information-security",
    title: "Information Security Policy",
    description: "Protecting the confidentiality, integrity, and availability of information assets.",
    icon: Lock,
  }
];

export default function Policies() {
  const location = useLocation();
  const [selectedPolicy, setSelectedPolicy] = useState("ims");
  const [imsPolicy, setImsPolicy] = useState<IMSPolicy>(defaultPolicy);
  const [whistleblowerContent, setWhistleblowerContent] = useState(defaultWhistleblower.content);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && policies.some((policy) => policy.id === hash)) {
      setSelectedPolicy(hash);
    }
  }, [location.hash]);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const [imsRes, wbRes] = await Promise.all([
        fetch("/api/ims-policy"),
        fetch("/api/whistleblower-policy")
      ]);
      const imsData = imsRes.ok ? await imsRes.json() : null;
      const wbData = wbRes.ok ? await wbRes.json() : null;

      // Accept and apply policy objects even if fields are empty.
      if (imsData) {
        setImsPolicy(imsData);
      } else {
        setImsPolicy(defaultPolicy);
      }

      if (wbData) {
        setWhistleblowerContent(wbData.content ?? "");
      } else {
        setWhistleblowerContent(defaultWhistleblower.content);
      }
    } catch (error) {
      console.error("Error loading policies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();

    // Listen for updates from admin via BroadcastChannel
    let bc: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        bc = new BroadcastChannel("policies");
        bc.onmessage = (ev) => {
          if (ev.data?.type === "updated") {
            fetchPolicies();
          }
        };
      }
    } catch (e) {
      // ignore
    }

    return () => {
      if (bc) bc.close();
    };
  }, []);

  const activePolicy = useMemo(() => {
    return policies.find((policy) => policy.id === selectedPolicy) || policies[0];
  }, [selectedPolicy]);

const markdownComponents = {
    h1: ({node, ...props}: any) => <h1 className="text-2xl font-bold text-hyves-black mt-6 mb-4" {...props} />,
    h2: ({node, ...props}: any) => <h2 className="text-xl font-bold text-hyves-black mt-5 mb-3" {...props} />,
    h3: ({node, ...props}: any) => <h3 className="text-lg font-bold text-hyves-black mt-4 mb-2" {...props} />,
    p: ({node, ...props}: any) => <p className="text-slate-600 leading-relaxed mb-4" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-disc list-inside space-y-2 mb-4 text-slate-600" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-600" {...props} />,
    li: ({node, ...props}: any) => <li className="text-slate-600" {...props} />,
    strong: ({node, ...props}: any) => <strong className="font-bold text-hyves-black" {...props} />,
    em: ({node, ...props}: any) => <em className="italic text-slate-600" {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-hyves-gold pl-4 italic text-slate-600 my-4" {...props} />,
    code: ({node, inline, ...props}: any) => inline ? 
      <code className="bg-slate-100 rounded px-2 py-1 text-sm font-mono text-hyves-black" {...props} /> :
      <code className="bg-slate-100 rounded-lg p-4 block my-4 text-sm font-mono text-slate-600 overflow-auto" {...props} />,
  };

  const renderContent = () => {
    if (activePolicy.id === "ims") {
      return (
        <>
          {imsPolicy.commitment ? (
            <div className="prose prose-sm max-w-none mb-6">
              <ReactMarkdown components={markdownComponents}>{imsPolicy.commitment}</ReactMarkdown>
            </div>
          ) : null}
          <div className="grid gap-8 md:grid-cols-2">
            {imsPolicy.qualityObjectives.length > 0 ? (
              <div className="bg-slate-50 rounded-3xl p-6">
                <h3 className="font-semibold text-hyves-black mb-4">Quality Objectives</h3>
                <ul className="space-y-3 text-slate-600 list-disc list-inside">
                  {imsPolicy.qualityObjectives.map((item) => (
                    <li key={item}><ReactMarkdown components={markdownComponents}>{item}</ReactMarkdown></li>
                  ))}
                </ul>
              </div>
            ) : null}

            {imsPolicy.informationSecurity.length > 0 ? (
              <div className="bg-slate-50 rounded-3xl p-6">
                <h3 className="font-semibold text-hyves-black mb-4">Information Security</h3>
                <ul className="space-y-3 text-slate-600 list-disc list-inside">
                  {imsPolicy.informationSecurity.map((item) => (
                    <li key={item}><ReactMarkdown components={markdownComponents}>{item}</ReactMarkdown></li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="grid gap-8 md:grid-cols-2 mt-8">
            {imsPolicy.healthSafety.length > 0 ? (
              <div className="bg-slate-50 rounded-3xl p-6">
                <h3 className="font-semibold text-hyves-black mb-4">Health & Safety</h3>
                <ul className="space-y-3 text-slate-600 list-disc list-inside">
                  {imsPolicy.healthSafety.map((item) => (
                    <li key={item}><ReactMarkdown components={markdownComponents}>{item}</ReactMarkdown></li>
                  ))}
                </ul>
              </div>
            ) : null}

            {imsPolicy.continuousImprovement.length > 0 ? (
              <div className="bg-slate-50 rounded-3xl p-6">
                <h3 className="font-semibold text-hyves-black mb-4">Continuous Improvement</h3>
                <ul className="space-y-3 text-slate-600 list-disc list-inside">
                  {imsPolicy.continuousImprovement.map((item) => (
                    <li key={item}><ReactMarkdown components={markdownComponents}>{item}</ReactMarkdown></li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {imsPolicy.compliance ? (
            <div className="mt-8 bg-slate-50 rounded-3xl p-6">
              <h3 className="font-semibold text-hyves-black mb-4">Compliance</h3>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown components={markdownComponents}>{imsPolicy.compliance}</ReactMarkdown>
              </div>
            </div>
          ) : null}
        </>
      );
    }

    if (activePolicy.id === "whistleblower") {
      return (
        <div className="prose prose-sm max-w-none space-y-6">
          {whistleblowerContent ? <ReactMarkdown components={markdownComponents}>{whistleblowerContent}</ReactMarkdown> : null}
        </div>
      );
    }

    if (activePolicy.id === "information-security") {
      return (
        <div className="space-y-6">
          {imsPolicy.informationSecurity.length > 0 ? (
            <div className="bg-slate-50 rounded-3xl p-6">
              <h3 className="font-semibold text-hyves-black mb-4">Information Security Principles</h3>
              <ul className="space-y-3 text-slate-600 list-disc list-inside">
                {imsPolicy.informationSecurity.map((item) => (
                  <li key={item}><ReactMarkdown components={markdownComponents}>{item}</ReactMarkdown></li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-hyves-bg min-h-screen">
      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hyves-black mb-4 leading-tight">
              Company Policies
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              All of the company policies in one place for easy review and navigation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-hyves-black mb-4">Policies</h2>
                <nav className="space-y-2">
                  {policies.map((policy) => {
                    const Icon = policy.icon;
                    const isActive = policy.id === activePolicy.id;
                    return (
                      <Link
                        key={policy.id}
                        to={`/policies#${policy.id}`}
                        className={`block rounded-2xl px-4 py-3 transition-all ${isActive ? "bg-hyves-gold/10 border border-hyves-gold text-hyves-black" : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-hyves-gold/70 hover:bg-slate-100"}`}
                        onClick={() => setSelectedPolicy(policy.id)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-hyves-gold">
                            <Icon className="w-5 h-5" />
                          </span>
                          <div>
                            <p className="font-semibold">{policy.title}</p>
                            <p className="text-xs text-slate-500">{policy.description}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              {loading ? (
                <div className="flex min-h-[320px] items-center justify-center">
                  <Loader2 className="w-8 h-8 text-hyves-gold animate-spin" />
                </div>
              ) : (
                <>
                  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-hyves-gold">Policy</p>
                      <h2 className="text-3xl font-bold text-hyves-black mt-2">{activePolicy.title}</h2>
                    </div>
                    <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      {activePolicy.description}
                    </div>
                  </div>
                  <div className="space-y-6">
                    {renderContent()}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
