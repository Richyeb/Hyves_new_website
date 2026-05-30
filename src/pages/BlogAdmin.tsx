import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Save, X, Image as ImageIcon, Briefcase, FileText, Shield, CheckCircle, Lock, Users, Globe, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminProtection from "@/components/AdminProtection";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
}

interface Role {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  date: string;
}

interface IMSPolicy {
  commitment: string;
  qualityObjectives: string[];
  informationSecurity: string[];
  healthSafety: string[];
  compliance: string;
  continuousImprovement: string[];
}

export default function BlogAdmin() {
  const [activeTab, setActiveTab] = useState<"posts" | "roles" | "policies">("posts");
  const [selectedPolicy, setSelectedPolicy] = useState<"ims" | "whistleblower" | "information-security" | "terms-of-service" | "privacy-policy">("ims");
  const [posts, setPosts] = useState<Post[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [imsPolicy, setImsPolicy] = useState<IMSPolicy>({
    commitment: "",
    qualityObjectives: [],
    informationSecurity: [],
    healthSafety: [],
    compliance: "",
    continuousImprovement: []
  });
  const [originalImsPolicy, setOriginalImsPolicy] = useState<IMSPolicy>({
    commitment: "",
    qualityObjectives: [],
    informationSecurity: [],
    healthSafety: [],
    compliance: "",
    continuousImprovement: []
  });
  const [whistleblowerPolicy, setWhistleblowerPolicy] = useState("");
  const [originalWhistleblowerPolicy, setOriginalWhistleblowerPolicy] = useState("");
  const [termsOfServicePolicy, setTermsOfServicePolicy] = useState("");
  const [originalTermsOfServicePolicy, setOriginalTermsOfServicePolicy] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [originalPrivacyPolicy, setOriginalPrivacyPolicy] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<null | { type: "success" | "error"; message: string }>(null);
  const [teamFiles, setTeamFiles] = useState<{ [seed: string]: File | null }>({
    richmond: null,
    ekundayo: null,
    wisdom: null,
    precious: null,
  });
  
  const [postFormData, setPostFormData] = useState({
    title: "",
    content: "",
    author: "Hyves Team",
    excerpt: "",
    image: ""
  });

  const [roleFormData, setRoleFormData] = useState({
    title: "",
    department: "Engineering",
    location: "Lagos, Nigeria (Remote)",
    type: "Full-time",
    description: ""
  });

  useEffect(() => {
    if (activeTab === "posts") {
      fetchPosts();
    } else if (activeTab === "roles") {
      fetchRoles();
    } else {
      // Fetch all policy content and only set loading to false when complete
      setLoading(true);
      Promise.all([fetchImsPolicy(), fetchWhistleblowerPolicy(), fetchTermsPolicy(), fetchPrivacyPolicy()]).finally(() => {
        setLoading(false);
      });
    }
  }, [activeTab]);

  // Auto-dismiss notification
  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(t);
  }, [notification]);

  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; type: "post" | "role" } | null>(null);

  const fetchPosts = () => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  };

  const fetchRoles = () => {
    setLoading(true);
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
  };

  const fetchImsPolicy = async () => {
    try {
      const res = await fetch("/api/ims-policy");
      if (!res.ok) throw new Error(`IMS Policy: ${res.status}`);
      const data = await res.json();
      setImsPolicy(data);
      setOriginalImsPolicy(data);
      return true;
    } catch (err) {
      console.error("Error fetching IMS Policy:", err);
      return false;
    }
  };

  const fetchWhistleblowerPolicy = async () => {
    try {
      const res = await fetch("/api/whistleblower-policy");
      if (!res.ok) throw new Error(`Whistleblower Policy: ${res.status}`);
      const data = await res.json();
      const content = data?.content || "";
      setWhistleblowerPolicy(content);
      setOriginalWhistleblowerPolicy(content);
      return true;
    } catch (err) {
      console.error("Error fetching Whistleblower Policy:", err);
      return false;
    }
  };

  const fetchTermsPolicy = async () => {
    try {
      const res = await fetch("/api/terms-of-service-policy");
      if (!res.ok) throw new Error(`Terms of Service Policy: ${res.status}`);
      const data = await res.json();
      const content = data?.content || "";
      setTermsOfServicePolicy(content);
      setOriginalTermsOfServicePolicy(content);
      return true;
    } catch (err) {
      console.error("Error fetching Terms of Service Policy:", err);
      return false;
    }
  };

  const fetchPrivacyPolicy = async () => {
    try {
      const res = await fetch("/api/privacy-policy");
      if (!res.ok) throw new Error(`Privacy Policy: ${res.status}`);
      const data = await res.json();
      const content = data?.content || "";
      setPrivacyPolicy(content);
      setOriginalPrivacyPolicy(content);
      return true;
    } catch (err) {
      console.error("Error fetching Privacy Policy:", err);
      return false;
    }
  };

  const handlePolicySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const [imsResponse, whistleblowerResponse, termsResponse, privacyResponse] = await Promise.all([
        fetch("/api/ims-policy", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(imsPolicy)
        }),
        fetch("/api/whistleblower-policy", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: whistleblowerPolicy })
        }),
        fetch("/api/terms-of-service-policy", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: termsOfServicePolicy })
        }),
        fetch("/api/privacy-policy", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: privacyPolicy })
        })
      ]);

      const imsBody = imsResponse.ok ? await imsResponse.json().catch(() => ({})) : await imsResponse.text().catch(() => "");
      const wbBody = whistleblowerResponse.ok ? await whistleblowerResponse.json().catch(() => ({})) : await whistleblowerResponse.text().catch(() => "");
      const termsBody = termsResponse.ok ? await termsResponse.json().catch(() => ({})) : await termsResponse.text().catch(() => "");
      const privacyBody = privacyResponse.ok ? await privacyResponse.json().catch(() => ({})) : await privacyResponse.text().catch(() => "");

      if (imsResponse.ok && whistleblowerResponse.ok && termsResponse.ok && privacyResponse.ok) {
        setOriginalImsPolicy(imsPolicy);
        setOriginalWhistleblowerPolicy(whistleblowerPolicy);
        setOriginalTermsOfServicePolicy(termsOfServicePolicy);
        setOriginalPrivacyPolicy(privacyPolicy);

        const notes: string[] = [];
        if (imsBody && typeof imsBody === "object" && imsBody.note) notes.push(imsBody.note);
        if (wbBody && typeof wbBody === "object" && wbBody.note) notes.push(wbBody.note);
        if (termsBody && typeof termsBody === "object" && termsBody.note) notes.push(termsBody.note);
        if (privacyBody && typeof privacyBody === "object" && privacyBody.note) notes.push(privacyBody.note);
        const successMessage = notes.length > 0 ? `Policies saved (note: ${notes.join("; ")})` : "Policies saved successfully.";
        setNotification({ type: "success", message: successMessage });
        try {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            const bc = new BroadcastChannel("policies");
            bc.postMessage({ type: "updated" });
            bc.close();
          }
        } catch (e) {
          // ignore
        }
        try {
          if (Object.values(teamFiles).some(Boolean) && typeof window !== "undefined" && "BroadcastChannel" in window) {
            const bc2 = new BroadcastChannel("policies");
            bc2.postMessage({ type: "updated" });
            bc2.close();
          }
        } catch (e) {
          // ignore
        }
      } else {
        const parts: string[] = [];
        if (!imsResponse.ok) parts.push(`IMS: ${typeof imsBody === "string" ? imsBody : JSON.stringify(imsBody)}`);
        if (!whistleblowerResponse.ok) parts.push(`Whistleblower: ${typeof wbBody === "string" ? wbBody : JSON.stringify(wbBody)}`);
        if (!termsResponse.ok) parts.push(`Terms of Service: ${typeof termsBody === "string" ? termsBody : JSON.stringify(termsBody)}`);
        if (!privacyResponse.ok) parts.push(`Privacy Policy: ${typeof privacyBody === "string" ? privacyBody : JSON.stringify(privacyBody)}`);
        const message = `Failed to save policies. ${parts.join(" | ")}`;
        console.error(message, imsResponse, whistleblowerResponse, termsResponse, privacyResponse);
        setNotification({ type: "error", message });
      }
    } catch (error) {
      console.error("Error saving policies:", error);
      setNotification({ type: "error", message: String(error) });
    }
  };

  const handleTeamFileChange = (seed: string, file: File | null) => {
    setTeamFiles((prev) => ({ ...prev, [seed]: file }));
  };

  const fileToDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const uploadTeamImages = async () => {
    const seeds = Object.keys(teamFiles);
    const parts: string[] = [];
    try {
      for (const seed of seeds) {
        const file = teamFiles[seed];
        if (!file) continue;
        const dataUrl = await fileToDataUrl(file);
        const filename = `${seed}.jpg`;
        const res = await fetch('/api/upload-team-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, data: dataUrl })
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => 'upload failed');
          parts.push(`${seed}: ${txt}`);
        }
      }
      if (parts.length === 0) {
        setNotification({ type: 'success', message: 'Team images uploaded.' });
        try {
          if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
            const bc = new BroadcastChannel('policies'); bc.postMessage({ type: 'updated' }); bc.close();
          }
        } catch (e) {}
        // clear file inputs
        setTeamFiles({ richmond: null, ekundayo: null, wisdom: null, precious: null });
      } else {
        setNotification({ type: 'error', message: `Some uploads failed: ${parts.join('; ')}` });
      }
    } catch (err) {
      console.error('Error uploading team images:', err);
      setNotification({ type: 'error', message: String(err) });
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postFormData)
      });
      if (res.ok) {
        setIsAdding(false);
        setPostFormData({ title: "", content: "", author: "Hyves Team", excerpt: "", image: "" });
        fetchPosts();
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roleFormData)
      });
      if (res.ok) {
        setIsAdding(false);
        setRoleFormData({ title: "", department: "Engineering", location: "Lagos, Nigeria (Remote)", type: "Full-time", description: "" });
        fetchRoles();
      }
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;
    
    const { id, type } = deleteConfirm;
    const endpoint = type === "post" ? `/api/posts/${id}` : `/api/roles/${id}`;
    
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (res.ok) {
        if (type === "post") fetchPosts();
        else fetchRoles();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  return (
    <AdminProtection>
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-hyves-black">Backoffice</h1>
            <p className="text-slate-500">Manage your blog content, career listings, and deployed policies.</p>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "posts" ? "bg-hyves-black text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <FileText className="w-4 h-4" />
              Blog Posts
            </button>
            <button 
              onClick={() => setActiveTab("roles")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "roles" ? "bg-hyves-black text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <Briefcase className="w-4 h-4" />
              Careers
            </button>
            <button 
              onClick={() => setActiveTab("policies")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "policies" ? "bg-hyves-black text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <Shield className="w-4 h-4" />
              Policies
            </button>
          </div>
          {activeTab !== "policies" && (
            <Button 
              onClick={() => setIsAdding(true)}
              className="bg-hyves-gold text-hyves-black font-bold rounded-full px-6 hover:bg-hyves-gold/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              {activeTab === "posts" ? "New Post" : "New Role"}
            </Button>
          )}
        </div>

        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-hyves-black">
                {activeTab === "posts" ? "Create New Post" : "Add New Role"}
              </h2>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-hyves-black">
                <X className="w-6 h-6" />
              </button>
            </div>

            {activeTab === "posts" ? (
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hyves-black">Title</label>
                    <input 
                      required
                      type="text"
                      value={postFormData.title}
                      onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                      placeholder="Enter post title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hyves-black">Author</label>
                    <input 
                      required
                      type="text"
                      value={postFormData.author}
                      onChange={(e) => setPostFormData({ ...postFormData, author: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-hyves-black">Image URL (Optional)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={postFormData.image}
                      onChange={(e) => setPostFormData({ ...postFormData, image: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-hyves-black">Excerpt</label>
                  <textarea 
                    required
                    value={postFormData.excerpt}
                    onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-24 resize-none"
                    placeholder="A short summary of the post..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-hyves-black">Content (Markdown supported)</label>
                  <textarea 
                    required
                    value={postFormData.content}
                    onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-64 resize-none"
                    placeholder="Write your post content here..."
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                  <Button type="submit" className="bg-hyves-gold text-hyves-black font-bold px-8">
                    <Save className="w-4 h-4 mr-2" />
                    Publish Post
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRoleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hyves-black">Role Title</label>
                    <input 
                      required
                      type="text"
                      value={roleFormData.title}
                      onChange={(e) => setRoleFormData({ ...roleFormData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                      placeholder="e.g. Senior Frontend Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hyves-black">Department</label>
                    <select 
                      value={roleFormData.department}
                      onChange={(e) => setRoleFormData({ ...roleFormData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                    >
                      <option>Engineering</option>
                      <option>Product</option>
                      <option>Design</option>
                      <option>Sales & Marketing</option>
                      <option>Operations</option>
                      <option>Customer Success</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hyves-black">Location</label>
                    <input 
                      required
                      type="text"
                      value={roleFormData.location}
                      onChange={(e) => setRoleFormData({ ...roleFormData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                      placeholder="e.g. Lagos, Nigeria (Remote)"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hyves-black">Job Type</label>
                    <select 
                      value={roleFormData.type}
                      onChange={(e) => setRoleFormData({ ...roleFormData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-hyves-black">Description</label>
                  <textarea 
                    required
                    value={roleFormData.description}
                    onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-48 resize-none"
                    placeholder="Describe the role, requirements, and responsibilities..."
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                  <Button type="submit" className="bg-hyves-gold text-hyves-black font-bold px-8">
                    <Save className="w-4 h-4 mr-2" />
                    Post Role
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* Policies Section */}
        {activeTab === "policies" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200 p-8"
          >
            {loading ? (
              <div className="p-12 text-center text-slate-400">Loading policies...</div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-hyves-black flex items-center gap-2">
                      <Shield className="w-5 h-5 text-hyves-gold" />
                      Policy Management
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Edit all deployed policies and deploy changes to the public policy page.</p>
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-hyves-black uppercase tracking-[0.24em] mb-4">Policies</h3>
                <div className="space-y-3">
                  {[
                    { id: "ims", label: "IMS Policy" },
                    { id: "whistleblower", label: "Whistleblower Policy" },
                    { id: "information-security", label: "Information Security Policy" },
                    { id: "terms-of-service", label: "Terms of Service" },
                    { id: "privacy-policy", label: "Privacy Policy" }
                  ].map((policy) => (
                    <button
                      key={policy.id}
                      type="button"
                      onClick={() => setSelectedPolicy(policy.id as "ims" | "whistleblower" | "information-security" | "terms-of-service" | "privacy-policy")}
                      className={`w-full text-left rounded-2xl px-4 py-3 transition ${selectedPolicy === policy.id ? "bg-hyves-gold/10 border border-hyves-gold text-hyves-black" : "border border-slate-200 bg-white text-slate-600 hover:border-hyves-gold/70"}`}
                    >
                      {policy.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-hyves-black mb-2">{selectedPolicy === "ims" ? "IMS Policy" : selectedPolicy === "whistleblower" ? "Whistleblower Policy" : selectedPolicy === "information-security" ? "Information Security Policy" : selectedPolicy === "terms-of-service" ? "Terms of Service" : "Privacy Policy"}</h3>
                  <p className="text-slate-500 text-sm">
                    {selectedPolicy === "ims" ? "Edit the full IMS policy content deployed to the public policies page." : selectedPolicy === "whistleblower" ? "Edit the whistleblower policy content deployed to the public policies page." : selectedPolicy === "information-security" ? "Edit the information security policy statements deployed to the public policies page." : selectedPolicy === "terms-of-service" ? "Edit the terms of service content deployed to the public policies page." : "Edit the privacy policy content deployed to the public policies page."}
                  </p>
                </div>

                <form onSubmit={handlePolicySubmit} className="space-y-8">
                  {selectedPolicy === "ims" ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-lg font-bold text-hyves-black">IMS Policy Content</label>
                        <textarea
                          value={imsPolicy.commitment}
                          onChange={(e) => setImsPolicy({ ...imsPolicy, commitment: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-64 resize-none text-base"
                          placeholder="Enter the full IMS policy content here..."
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-lg font-bold text-hyves-black">Quality Objectives</label>
                          <textarea
                            value={imsPolicy.qualityObjectives.join("\n")}
                            onChange={(e) => setImsPolicy({ ...imsPolicy, qualityObjectives: e.target.value.split("\n").filter(Boolean) })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-48 resize-none text-base"
                            placeholder="Enter one objective per line"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-lg font-bold text-hyves-black">Information Security</label>
                          <textarea
                            value={imsPolicy.informationSecurity.join("\n")}
                            onChange={(e) => setImsPolicy({ ...imsPolicy, informationSecurity: e.target.value.split("\n").filter(Boolean) })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-48 resize-none text-base"
                            placeholder="Enter one security statement per line"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-lg font-bold text-hyves-black">Health & Safety</label>
                          <textarea
                            value={imsPolicy.healthSafety.join("\n")}
                            onChange={(e) => setImsPolicy({ ...imsPolicy, healthSafety: e.target.value.split("\n").filter(Boolean) })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-48 resize-none text-base"
                            placeholder="Enter one health & safety statement per line"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-lg font-bold text-hyves-black">Continuous Improvement</label>
                          <textarea
                            value={imsPolicy.continuousImprovement.join("\n")}
                            onChange={(e) => setImsPolicy({ ...imsPolicy, continuousImprovement: e.target.value.split("\n").filter(Boolean) })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-48 resize-none text-base"
                            placeholder="Enter one improvement action per line"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-lg font-bold text-hyves-black">Compliance Summary</label>
                        <textarea
                          value={imsPolicy.compliance}
                          onChange={(e) => setImsPolicy({ ...imsPolicy, compliance: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-32 resize-none text-base"
                          placeholder="Enter the IMS compliance statement here..."
                        />
                      </div>
                    </>
                  ) : selectedPolicy === "whistleblower" ? (
                    <div className="space-y-2">
                      <label className="text-lg font-bold text-hyves-black">Whistleblower Policy Content</label>
                      <textarea
                        value={whistleblowerPolicy}
                        onChange={(e) => setWhistleblowerPolicy(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-96 resize-none text-base"
                        placeholder="Enter the full whistleblower policy content here..."
                      />
                    </div>
                  ) : selectedPolicy === "terms-of-service" ? (
                    <div className="space-y-2">
                      <label className="text-lg font-bold text-hyves-black">Terms of Service Content</label>
                      <textarea
                        value={termsOfServicePolicy}
                        onChange={(e) => setTermsOfServicePolicy(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-96 resize-none text-base"
                        placeholder="Enter the full Terms of Service content here..."
                      />
                    </div>
                  ) : selectedPolicy === "privacy-policy" ? (
                    <div className="space-y-2">
                      <label className="text-lg font-bold text-hyves-black">Privacy Policy Content</label>
                      <textarea
                        value={privacyPolicy}
                        onChange={(e) => setPrivacyPolicy(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-96 resize-none text-base"
                        placeholder="Enter the full Privacy Policy content here..."
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-lg font-bold text-hyves-black">Information Security Policy Statements</label>
                      <textarea
                        value={imsPolicy.informationSecurity.join("\n")}
                        onChange={(e) => setImsPolicy({ ...imsPolicy, informationSecurity: e.target.value.split("\n").filter(Boolean) })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-96 resize-none text-base"
                        placeholder="Enter one information security statement per line"
                      />
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-hyves-black mb-3">Team Images (upload to update About page)</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { name: "Richmond Oghenedoro", seed: "richmond" },
                          { name: "Ekundayo Kiyesi", seed: "ekundayo" },
                          { name: "Wisdom Diala", seed: "wisdom" },
                          { name: "Precious Obodo", seed: "precious" }
                        ].map((m) => (
                          <div key={m.seed} className="space-y-2">
                            <label className="text-sm font-medium">{m.name}</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleTeamFileChange(m.seed, e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                              className="w-full text-sm"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-3">
                        <Button type="button" variant="outline" onClick={uploadTeamImages}>Upload Team Images</Button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => {
                      setImsPolicy(originalImsPolicy);
                      setWhistleblowerPolicy(originalWhistleblowerPolicy);
                    }}>
                      Reset
                    </Button>
                    
                    <Button type="submit" className="bg-hyves-gold text-hyves-black font-bold px-8">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
                </form>
              </div>
            </div>
              </>
            )}
          </motion.div>
        )}

        {activeTab !== "policies" && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-bold text-hyves-black">
              {activeTab === "posts" ? "Recent Posts" : "Open Roles"}
            </h2>
          </div>
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-12 text-center text-slate-400">Loading...</div>
            ) : activeTab === "posts" ? (
              posts.length === 0 ? (
                <div className="p-12 text-center text-slate-400">No posts found. Create your first one!</div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="p-6 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={post.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h3 className="font-bold text-hyves-black">{post.title}</h3>
                        <p className="text-xs text-slate-400">
                          By {post.author} • {new Date(post.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-destructive"
                        onClick={() => setDeleteConfirm({ id: post.id, type: "post" })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )
            ) : (
              roles.length === 0 ? (
                <div className="p-12 text-center text-slate-400">No roles found. Add your first one!</div>
              ) : (
                roles.map((role) => (
                  <div key={role.id} className="p-6 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-hyves-gold/10 flex items-center justify-center text-hyves-gold flex-shrink-0">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-hyves-black">{role.title}</h3>
                        <p className="text-xs text-slate-400">
                          {role.department} • {role.location} • {new Date(role.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-destructive"
                        onClick={() => setDeleteConfirm({ id: role.id, type: "role" })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-hyves-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-hyves-black mb-4">Confirm Deletion</h3>
              <p className="text-slate-600 mb-8">
                Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-destructive text-white rounded-xl hover:bg-destructive/90"
                  onClick={executeDelete}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className={`fixed right-6 bottom-6 z-[200] max-w-sm w-full rounded-xl shadow-xl p-4 text-sm ${notification.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">{notification.message}</div>
              <button className="opacity-70 hover:opacity-100" onClick={() => setNotification(null)}>Dismiss</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </AdminProtection>
  );
}
