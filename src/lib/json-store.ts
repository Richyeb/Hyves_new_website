import fs from "fs/promises";
import os from "os";
import path from "path";

export type StoreResult = {
  success: true;
  ephemeral?: true;
  note?: string;
};

const root = process.cwd();

export function storePath(filename: string) {
  return path.join(root, filename);
}

export async function readJson<T>(filename: string, fallback: T): Promise<T> {
  const file = storePath(filename);
  const tmp = path.join(os.tmpdir(), filename);

  try {
    const data = await fs.readFile(file, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    try {
      const data = await fs.readFile(tmp, "utf-8");
      return JSON.parse(data) as T;
    } catch {
      await writeJson(filename, fallback).catch(() => undefined);
      return fallback;
    }
  }
}

export async function writeJson(filename: string, value: unknown): Promise<StoreResult> {
  const file = storePath(filename);
  const payload = JSON.stringify(value, null, 2);

  try {
    await fs.writeFile(file, payload);
    return { success: true };
  } catch (error: any) {
    if (error?.code === "EROFS" || /read-only/i.test(String(error))) {
      const tmp = path.join(os.tmpdir(), filename);
      await fs.writeFile(tmp, payload);
      return { success: true, ephemeral: true, note: `Saved to tmp (${tmp})` };
    }
    throw error;
  }
}

export async function writeBuffer(filename: string, data: Buffer): Promise<StoreResult> {
  const target = path.join(root, "public", "assets", "team", filename);

  try {
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, data);
    return { success: true };
  } catch (error: any) {
    if (error?.code === "EROFS" || /read-only/i.test(String(error))) {
      const tmp = path.join(os.tmpdir(), filename);
      await fs.writeFile(tmp, data);
      return { success: true, ephemeral: true, note: `Saved to tmp (${tmp})` };
    }
    throw error;
  }
}
