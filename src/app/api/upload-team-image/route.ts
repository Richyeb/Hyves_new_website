import { NextResponse } from "next/server";
import { writeBuffer } from "@/lib/json-store";

export async function POST(request: Request) {
  const { filename, data } = await request.json();
  if (!filename || !data || typeof filename !== "string" || typeof data !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const base64 = data.startsWith("data:") ? data.split(",")[1] : data;
  return NextResponse.json(await writeBuffer(filename, Buffer.from(base64, "base64")));
}
