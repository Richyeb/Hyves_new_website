import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/json-store";

type Post = {
  id: string;
};

const FILE = "blog-posts.json";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const posts = await readJson<Post[]>(FILE, []);
  await writeJson(
    FILE,
    posts.filter((post) => post.id !== id),
  );
  return NextResponse.json({ success: true });
}
