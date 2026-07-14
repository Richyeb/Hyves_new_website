import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/json-store";

type Role = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  date: string;
};

const FILE = "roles.json";

export async function GET() {
  const roles = await readJson<Role[]>(FILE, []);
  return NextResponse.json(roles);
}

export async function POST(request: Request) {
  const { title, department, location, type, description } = await request.json();
  const roles = await readJson<Role[]>(FILE, []);
  const role: Role = {
    id: String(Date.now()),
    title,
    department,
    location,
    type,
    description,
    date: new Date().toISOString(),
  };

  roles.unshift(role);
  await writeJson(FILE, roles);
  return NextResponse.json(role, { status: 201 });
}
