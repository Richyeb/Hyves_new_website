"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";

const BLOGS_ENDPOINT = "https://hyves-backend.onrender.com/api/blogs";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

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
const getPostImage = (post: BlogItem) => post.coverImage || post.image || FALLBACK_IMAGE;

export default function BlogPost() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [post, setPost] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(BLOGS_ENDPOINT);
        if (!res.ok) throw new Error(`Failed to fetch blog post (${res.status})`);
        const data = await res.json();
        const items: BlogItem[] = Array.isArray(data) ? data : data?.blogs || data?.data || [];
        const found = items.find((item) => item.slug === id || item._id === id || item.id === id);
        setPost(found || null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(err instanceof Error ? err.message : "Unable to load blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-hyves-bg min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-hyves-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-hyves-black mb-6">{error ? "Unable to Load Post" : "Post Not Found"}</h1>
          {error && <p className="text-rose-600 mb-6">{error}</p>}
          <Link href="/blog" className="text-hyves-gold font-bold hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-hyves-gold transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="aspect-video rounded-[2rem] overflow-hidden mb-12 shadow-xl bg-slate-100">
              <img src={getPostImage(post)} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(getPostDate(post)).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author || "Hyves Team"}
              </span>
              <span className="flex items-center gap-2 capitalize">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-hyves-black mb-8 leading-tight">{post.title}</h1>

            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
