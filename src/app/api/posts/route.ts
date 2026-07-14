import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/json-store";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
};

const FILE = "blog-posts.json";

export async function GET() {
  const posts = await readJson<Post[]>(FILE, []);
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const { title, content, author, date, excerpt, image } = await request.json();
  const posts = await readJson<Post[]>(FILE, []);
  const now = Date.now();
  const post: Post = {
    id: String(now),
    title,
    content,
    author,
    date: date || new Date().toISOString(),
    excerpt,
    image: image || `https://picsum.photos/seed/${now}/800/400`,
  };

  posts.unshift(post);
  await writeJson(FILE, posts);
  return NextResponse.json(post, { status: 201 });
}
