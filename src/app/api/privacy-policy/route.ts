import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/json-store";

const FILE = "privacy-policy.json";
const fallback = { content: "" };

export async function GET() {
  return NextResponse.json(await readJson(FILE, fallback));
}

async function save(request: Request) {
  const payload = await request.json();
  if (!payload || typeof payload !== "object" || typeof payload.content !== "string") {
    return NextResponse.json({ error: "Invalid Privacy Policy payload" }, { status: 400 });
  }
  return NextResponse.json(await writeJson(FILE, payload));
}

export const PUT = save;
export const POST = save;
