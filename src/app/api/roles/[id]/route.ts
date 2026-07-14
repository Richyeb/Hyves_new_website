import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/json-store";

type Role = {
  id: string;
};

const FILE = "roles.json";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const roles = await readJson<Role[]>(FILE, []);
  await writeJson(
    FILE,
    roles.filter((role) => role.id !== id),
  );
  return NextResponse.json({ success: true });
}
