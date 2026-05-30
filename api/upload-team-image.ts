import fs from "fs";
import path from "path";
import os from "os";

const TEAM_DIR = path.join(process.cwd(), "public", "assets", "team");

function ensureDir(dir: string) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { filename, data } = req.body || {};
    if (!filename || !data || typeof filename !== "string" || typeof data !== "string") {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // strip data URL prefix if present
    const base64 = data.startsWith("data:") ? data.split(",")[1] : data;
    const buffer = Buffer.from(base64, "base64");

    try {
      ensureDir(TEAM_DIR);
      const target = path.join(TEAM_DIR, filename);
      fs.writeFileSync(target, buffer);
      return res.status(200).json({ success: true });
    } catch (writeErr: any) {
      // Attempt to write to tmp when filesystem is read-only
      if (writeErr && (writeErr.code === "EROFS" || /read-only/i.test(String(writeErr)))) {
        const tmpPath = path.join(os.tmpdir(), filename);
        fs.writeFileSync(tmpPath, buffer);
        return res.status(200).json({ success: true, ephemeral: true, note: `Saved to tmp (${tmpPath})` });
      }
      throw writeErr;
    }
  } catch (err) {
    console.error("api/upload-team-image error:", err);
    res.status(500).json({ error: "Failed to save image", detail: String(err) });
  }
}
