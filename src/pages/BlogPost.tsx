import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, User, ArrowLeft } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
}

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: Post) => p.id === id);
        setPost(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-hyves-bg min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-hyves-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-hyves-black mb-6">Post Not Found</h1>
          <Link to="/blog" className="text-hyves-gold font-bold hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-hyves-gold transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="aspect-video rounded-[2rem] overflow-hidden mb-12 shadow-xl">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400 mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-hyves-black mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
