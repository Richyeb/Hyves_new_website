"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Tag, User } from "lucide-react";
import Link from "next/link";
import { normalizeBlogImageUrl } from "@/lib/blog-images";

const BLOGS_ENDPOINT = "https://hyves-backend.onrender.com/api/blogs";

interface BlogItem {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  content: string;
  author?: string;
  excerpt?: string;
  coverImage?: string;
  image?: string;
  category: "blog" | "career" | "policies";
  status?: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
  date?: string;
}

const getPostId = (post: BlogItem) => post._id || post.id || post.slug || post.title;
const getPostDate = (post: BlogItem) => post.createdAt || post.updatedAt || post.date || new Date().toISOString();
const getPostImage = (post: BlogItem) => normalizeBlogImageUrl(post.coverImage || post.image);
const getPostExcerpt = (post: BlogItem) =>
  post.excerpt || post.content.replace(/\s+/g, " ").trim().slice(0, 150);

export default function Blog() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(BLOGS_ENDPOINT);
        if (!res.ok) throw new Error(`Failed to fetch blog posts (${res.status})`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : data?.blogs || data?.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err instanceof Error ? err.message : "Unable to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const posts = useMemo(
    () => items.filter((item) => item.category === "blog" && item.status !== "draft"),
    [items],
  );

  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-hyves-gold mb-4">Hyves Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold text-hyves-black mb-4">Insights for modern cooperatives</h1>
          <p className="text-slate-600 text-lg">Company updates, product thinking, and practical guides from the Hyves team.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-hyves-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-rose-100">
            <p className="text-rose-600">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <p className="text-slate-500">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={getPostId(post)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={getPostImage(post)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(getPostDate(post)).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author || "Hyves Team"}
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-hyves-black mb-3 group-hover:text-hyves-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">{getPostExcerpt(post)}</p>
                  <Link
                    href={`/blog/${post.slug || getPostId(post)}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-hyves-black hover:text-hyves-gold transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
