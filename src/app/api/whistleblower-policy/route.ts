import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/json-store";

const FILE = "whistleblower-policy.json";
const fallback = { content: "" };

export async function GET() {
  return NextResponse.json(await readJson(FILE, fallback));
}

export async function PUT(request: Request) {
  const payload = await request.json();
  if (!payload || typeof payload !== "object" || typeof payload.content !== "string") {
    return NextResponse.json({ error: "Invalid whistleblower payload" }, { status: 400 });
  }
  return NextResponse.json(await writeJson(FILE, payload));
}
