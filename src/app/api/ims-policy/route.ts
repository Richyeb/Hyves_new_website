import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/json-store";

const FILE = "ims-policy.json";
const fallback = {
  commitment: "",
  qualityObjectives: [],
  informationSecurity: [],
  healthSafety: [],
  compliance: "",
  continuousImprovement: [],
};

export async function GET() {
  return NextResponse.json(await readJson(FILE, fallback));
}

export async function PUT(request: Request) {
  const payload = await request.json();
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid IMS policy payload" }, { status: 400 });
  }
  return NextResponse.json(await writeJson(FILE, payload));
}
