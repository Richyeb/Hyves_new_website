"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Briefcase, FileText, Image as ImageIcon, Pencil, Plus, Save, Shield, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminProtection from "@/components/AdminProtection";

const BLOGS_ENDPOINT = "https://hyves-backend.onrender.com/api/blogs";

type BlogCategory = "blog" | "career" | "policies";
type BlogStatus = "draft" | "published";

interface BlogItem {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  author?: string;
  category: BlogCategory;
  tags?: string[];
  status?: BlogStatus;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: BlogCategory;
  tags: string;
  status: BlogStatus;
}

const emptyForm: BlogFormData = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  author: "Hyves Team",
  category: "blog",
  tags: "",
  status: "published",
};

const categoryOptions: Array<{ value: BlogCategory; label: string; icon: React.ElementType; description: string }> = [
  { value: "blog", label: "Blog", icon: FileText, description: "Company news, product updates, and thought leadership." },
  { value: "career", label: "Career", icon: Briefcase, description: "Hiring updates, role content, and culture stories." },
  { value: "policies", label: "Policies", icon: Shield, description: "Policy content managed through the unified backend." },
];

const getItemId = (item: BlogItem) => item._id || item.id || item.slug || item.title;
const getItemDate = (item: BlogItem) => item.createdAt || item.updatedAt || new Date().toISOString();

const getResponseMessage = async (res: Response) => {
  const data = await res.json().catch(() => null);
  if (data?.message) return data.message;
  if (data?.error) return data.error;
  return `${res.status} ${res.statusText}`;
};

export default function BlogAdmin() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("blog");
  const [items, setItems] = useState<BlogItem[]>([]);
  const [formData, setFormData] = useState<BlogFormData>(emptyForm);
  const [isAdding, setIsAdding] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<null | { type: "success" | "error"; message: string }>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(BLOGS_ENDPOINT);
      if (!res.ok) throw new Error(await getResponseMessage(res));
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data?.blogs || data?.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "Unable to load backend content.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!notification) return;
    const timeout = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timeout);
  }, [notification]);

  const visibleItems = useMemo(
    () => items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  );

  const itemToFormData = (item: BlogItem): BlogFormData => ({
    title: item.title || "",
    excerpt: item.excerpt || "",
    content: item.content || "",
    coverImage: item.coverImage || "",
    author: item.author || "Hyves Team",
    category: item.category || "blog",
    tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
    status: item.status || "published",
  });

  const closeForm = () => {
    setIsAdding(false);
    setEditingItemId(null);
    setFormData(emptyForm);
  };

  const openCreateForm = (category = activeCategory) => {
    setFormData({ ...emptyForm, category });
    setEditingItemId(null);
    setIsAdding(true);
  };

  const openEditForm = async (item: BlogItem) => {
    const itemId = getItemId(item);

    try {
      setSaving(true);
      setEditingItemId(itemId);
      setFormData(itemToFormData(item));
      setIsAdding(true);

      const res = await fetch(`${BLOGS_ENDPOINT}/${itemId}`);
      if (!res.ok) return;

      const data = await res.json();
      const blog = data?.blog || data?.data || data;
      setFormData(itemToFormData(blog));
    } catch (err) {
      console.error("Error fetching content for edit:", err);
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "Unable to load content for editing.",
      });
    } finally {
      setSaving(false);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required.";
    if (!formData.content.trim()) return "Content is required.";
    if (!formData.category) return "Category is required.";
    if (!["blog", "career", "policies"].includes(formData.category)) {
      return "Category must be one of: blog, career, policies.";
    }
    return "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setNotification({ type: "error", message: validationError });
      return;
    }

    const payload = {
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      content: formData.content.trim(),
      coverImage: formData.coverImage.trim(),
      author: formData.author.trim(),
      category: formData.category,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: formData.status,
    };

    try {
      setSaving(true);
      const endpoint = editingItemId ? `${BLOGS_ENDPOINT}/${editingItemId}` : BLOGS_ENDPOINT;
      const res = await fetch(endpoint, {
        method: editingItemId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await getResponseMessage(res));

      setNotification({
        type: "success",
        message: editingItemId ? "Content updated successfully." : "Content published successfully.",
      });
      closeForm();
      setActiveCategory(payload.category);
      await fetchBlogs();
    } catch (err) {
      console.error("Error creating backend content:", err);
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "Unable to publish content.",
      });
    } finally {
      setSaving(false);
    }
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;

    const itemId = getItemId(deleteConfirm);
    try {
      setDeleting(true);
      const res = await fetch(`${BLOGS_ENDPOINT}/${itemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await getResponseMessage(res));

      setNotification({ type: "success", message: "Content deleted successfully." });
      setDeleteConfirm(null);
      await fetchBlogs();
    } catch (err) {
      console.error("Error deleting content:", err);
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "Unable to delete content.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminProtection>
      <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-bold text-hyves-black">Content Backoffice</h1>
              <p className="text-slate-500">Manage blog, career, and policy content</p>
            </div>
            <Button
              onClick={() => openCreateForm()}
              className="bg-hyves-gold text-hyves-black font-bold rounded-full px-6 hover:bg-hyves-gold/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Content
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {categoryOptions.map((category) => {
              const Icon = category.icon;
              const count = items.filter((item) => item.category === category.value).length;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setActiveCategory(category.value)}
                  className={`text-left rounded-3xl border p-5 transition-all ${activeCategory === category.value
                    ? "border-hyves-gold bg-hyves-gold/10 shadow-sm"
                    : "border-slate-200 bg-white hover:border-hyves-gold/60"
                    }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-hyves-gold">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold rounded-full bg-white px-3 py-1 text-slate-500 border border-slate-100">
                      {count}
                    </span>
                  </div>
                  <h2 className="font-bold text-hyves-black mb-1">{category.label}</h2>
                  <p className="text-sm text-slate-500">{category.description}</p>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAdding && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeForm}
                  className="absolute inset-0 bg-hyves-black/60 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-hyves-black">{editingItemId ? "Edit Content" : "Create Content"}</h2>
                      <p className="text-sm text-slate-500">Required fields: title, category, and content.</p>
                    </div>
                    <button onClick={closeForm} className="text-slate-400 hover:text-hyves-black">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-hyves-black">Title</label>
                        <input
                          required
                          type="text"
                          value={formData.title}
                          onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                          placeholder="Enter title"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-hyves-black">Category</label>
                        <select
                          required
                          value={formData.category}
                          onChange={(event) => setFormData({ ...formData, category: event.target.value as BlogCategory })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                        >
                          <option value="blog">Blog</option>
                          <option value="career">Career</option>
                          <option value="policies">Policies</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-hyves-black">Author</label>
                        <input
                          type="text"
                          value={formData.author}
                          onChange={(event) => setFormData({ ...formData, author: event.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-hyves-black">Status</label>
                        <select
                          value={formData.status}
                          onChange={(event) => setFormData({ ...formData, status: event.target.value as BlogStatus })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-hyves-black">Cover Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={formData.coverImage}
                          onChange={(event) => setFormData({ ...formData, coverImage: event.target.value })}
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
                        value={formData.excerpt}
                        onChange={(event) => setFormData({ ...formData, excerpt: event.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-24 resize-none"
                        placeholder="Short summary..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-hyves-black">Tags</label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(event) => setFormData({ ...formData, tags: event.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                        placeholder="cooperatives, product, finance"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-hyves-black">Content</label>
                      <textarea
                        required
                        value={formData.content}
                        onChange={(event) => setFormData({ ...formData, content: event.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none h-64 resize-none"
                        placeholder="Write content here..."
                      />
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button type="button" variant="ghost" onClick={closeForm}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={saving} className="bg-hyves-gold text-hyves-black font-bold px-8">
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? "Saving..." : editingItemId ? "Save Changes" : "Publish"}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-hyves-black capitalize">{activeCategory} Content</h2>
              </div>
              <Button variant="outline" onClick={fetchBlogs}>
                Refresh
              </Button>
            </div>

            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="p-12 text-center text-slate-400">Loading...</div>
              ) : visibleItems.length === 0 ? (
                <div className="p-12 text-center text-slate-400">No {activeCategory} content found.</div>
              ) : (
                visibleItems.map((item) => (
                  <div key={getItemId(item)} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-hyves-gold">{item.category}</span>
                          <span className={`text-xs rounded-full px-2 py-1 ${item.status === "draft" ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-700"}`}>
                            {item.status || "published"}
                          </span>
                        </div>
                        <h3 className="font-bold text-hyves-black">{item.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                          {item.excerpt || item.content.slice(0, 140)}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          By {item.author || "Hyves Team"} · {new Date(getItemDate(item)).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(item)}
                          className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-hyves-gold hover:text-hyves-gold transition-colors flex items-center justify-center"
                          aria-label={`Edit ${item.title}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(item)}
                          className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-destructive hover:text-destructive transition-colors flex items-center justify-center"
                          aria-label={`Delete ${item.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className={`fixed right-6 bottom-6 z-[200] max-w-sm w-full rounded-xl shadow-xl p-4 text-sm ${notification.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">{notification.message}</div>
                <button className="opacity-70 hover:opacity-100" onClick={() => setNotification(null)}>
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {deleteConfirm && (
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDeleteConfirm(null)}
                className="absolute inset-0 bg-hyves-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-destructive flex items-center justify-center mb-5">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-hyves-black mb-3">Delete Content</h3>
                <p className="text-slate-600 mb-8">
                  Are you sure you want to delete <span className="font-bold text-hyves-black">{deleteConfirm.title}</span>? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-xl"
                    onClick={() => setDeleteConfirm(null)}
                    disabled={deleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-destructive text-white rounded-xl hover:bg-destructive/90"
                    onClick={executeDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete"}
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
