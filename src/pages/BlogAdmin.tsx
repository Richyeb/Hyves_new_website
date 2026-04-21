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
  const [activeTab, setActiveTab] = useState<"posts" | "roles" | "ims">("posts");
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
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  
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
      fetchImsPolicy();
    }
  }, [activeTab]);

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

  const fetchImsPolicy = () => {
    setLoading(true);
    fetch("/api/ims-policy")
      .then((res) => res.json())
      .then((data) => {
        setImsPolicy(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching IMS Policy:", err);
        setLoading(false);
      });
  };

  const handleImsPolicySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/ims-policy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imsPolicy)
      });
      if (res.ok) {
        setIsAdding(false);
        alert("IMS Policy saved successfully!");
      }
    } catch (error) {
      console.error("Error saving IMS Policy:", error);
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
            <p className="text-slate-500">Manage your blog content and open positions.</p>
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
              onClick={() => setActiveTab("ims")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "ims" ? "bg-hyves-black text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <Shield className="w-4 h-4" />
              IMS Policy
            </button>
          </div>
          {activeTab !== "ims" && (
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

        {/* IMS Policy Section */}
        {activeTab === "ims" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200 p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-hyves-black flex items-center gap-2">
                  <Shield className="w-5 h-5 text-hyves-gold" />
                  IMS Policy Management
                </h2>
                <p className="text-slate-500 text-sm mt-1">Update the Integrated Management System Policy content</p>
              </div>
              <Button 
                onClick={handleImsPolicySubmit}
                className="bg-hyves-gold text-hyves-black font-bold rounded-full px-6 hover:bg-hyves-gold/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <div className="space-y-6">
              {/* Our Commitment */}
              <div className="space-y-2">
                <label className="text-lg font-bold text-hyves-black flex items-center gap-2">
                  <FileText className="w-5 h-5 text-hyves-gold" />
                  Our Commitment
                </label>
                <textarea 
                  value={imsPolicy.commitment}
                  onChange={(e) => setImsPolicy({ ...imsPolicy, commitment: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-24 resize-none text-base"
                  placeholder="Describe the company's commitment to quality, security, and safety..."
                />
              </div>

              {/* Quality Objectives */}
              <div className="space-y-2">
                <label className="text-lg font-bold text-hyves-black flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-hyves-gold" />
                  Quality Objectives
                </label>
                <textarea 
                  value={imsPolicy.qualityObjectives.join("\n")}
                  onChange={(e) => setImsPolicy({ ...imsPolicy, qualityObjectives: e.target.value.split("\n").filter(Boolean) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-24 resize-none text-base"
                  placeholder="Enter each objective on a new line..."
                />
              </div>

              {/* Information Security */}
              <div className="space-y-2">
                <label className="text-lg font-bold text-hyves-black flex items-center gap-2">
                  <Lock className="w-5 h-5 text-hyves-gold" />
                  Information Security
                </label>
                <textarea 
                  value={imsPolicy.informationSecurity.join("\n")}
                  onChange={(e) => setImsPolicy({ ...imsPolicy, informationSecurity: e.target.value.split("\n").filter(Boolean) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-24 resize-none text-base"
                  placeholder="Enter each point on a new line..."
                />
              </div>

              {/* Health & Safety */}
              <div className="space-y-2">
                <label className="text-lg font-bold text-hyves-black flex items-center gap-2">
                  <Users className="w-5 h-5 text-hyves-gold" />
                  Health & Safety
                </label>
                <textarea 
                  value={imsPolicy.healthSafety.join("\n")}
                  onChange={(e) => setImsPolicy({ ...imsPolicy, healthSafety: e.target.value.split("\n").filter(Boolean) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-24 resize-none text-base"
                  placeholder="Enter each point on a new line..."
                />
              </div>

              {/* Compliance */}
              <div className="space-y-2">
                <label className="text-lg font-bold text-hyves-black flex items-center gap-2">
                  <Globe className="w-5 h-5 text-hyves-gold" />
                  Compliance & Certification
                </label>
                <textarea 
                  value={imsPolicy.compliance}
                  onChange={(e) => setImsPolicy({ ...imsPolicy, compliance: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-24 resize-none text-base"
                  placeholder="Describe compliance and certification details..."
                />
              </div>

              {/* Continuous Improvement */}
              <div className="space-y-2">
                <label className="text-lg font-bold text-hyves-black flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-hyves-gold" />
                  Continuous Improvement
                </label>
                <textarea 
                  value={imsPolicy.continuousImprovement.join("\n")}
                  onChange={(e) => setImsPolicy({ ...imsPolicy, continuousImprovement: e.target.value.split("\n").filter(Boolean) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-24 resize-none text-base"
                  placeholder="Enter each point on a new line..."
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab !== "ims" && (
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
    </div>
    </AdminProtection>
  );
}
