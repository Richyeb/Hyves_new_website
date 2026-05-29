import fs from "fs";
import path from "path";
import os from "os";

const WHISTLEBLOWER_POLICY_FILE = path.join(process.cwd(), "whistleblower-policy.json");

try {
  fs.accessSync(WHISTLEBLOWER_POLICY_FILE);
} catch (e) {
  try {
    fs.writeFileSync(
      WHISTLEBLOWER_POLICY_FILE,
      JSON.stringify({ content: "" }, null, 2)
    );
  } catch (err) {
    // ignore write errors on read-only filesystems
  }
}

let _whistleblowerCache: any = null;

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      if (_whistleblowerCache) return res.status(200).json(_whistleblowerCache);
      try {
        const data = fs.readFileSync(WHISTLEBLOWER_POLICY_FILE, "utf-8");
        const parsed = JSON.parse(data);
        _whistleblowerCache = parsed;
        return res.status(200).json(parsed);
      } catch (err) {
        const tmpPath = path.join(os.tmpdir(), path.basename(WHISTLEBLOWER_POLICY_FILE));
        const data = fs.readFileSync(tmpPath, "utf-8");
        const parsed = JSON.parse(data);
        _whistleblowerCache = parsed;
        return res.status(200).json(parsed);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to read Whistleblower Policy" });
    }
  } else if (req.method === "PUT") {
    try {
      const policyData = req.body;
      if (!policyData || typeof policyData !== "object" || typeof policyData.content !== "string") {
        return res.status(400).json({ error: "Invalid whistleblower payload" });
      }
      try {
        fs.writeFileSync(WHISTLEBLOWER_POLICY_FILE, JSON.stringify(policyData, null, 2));
      } catch (writeErr: any) {
        if (writeErr && (writeErr.code === "EROFS" || /read-only/i.test(String(writeErr)))) {
          const tmpPath = path.join(os.tmpdir(), path.basename(WHISTLEBLOWER_POLICY_FILE));
          fs.writeFileSync(tmpPath, JSON.stringify(policyData, null, 2));
          _whistleblowerCache = policyData;
          return res.status(200).json({ success: true, ephemeral: true, note: `Saved to tmp (${tmpPath})` });
        }
        throw writeErr;
      }
      _whistleblowerCache = policyData;
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("api/whistleblower-policy PUT error:", error);
      res.status(500).json({ error: "Failed to save Whistleblower Policy", detail: String(error) });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
