import fs from "fs";
import path from "path";
import os from "os";

const IMS_POLICY_FILE = path.join(process.cwd(), "ims-policy.json");

// Ensure the file exists (best-effort)
try {
  fs.accessSync(IMS_POLICY_FILE);
} catch (e) {
  try {
    fs.writeFileSync(IMS_POLICY_FILE, JSON.stringify({
      commitment: "",
      qualityObjectives: [],
      informationSecurity: [],
      healthSafety: [],
      compliance: "",
      continuousImprovement: []
    }, null, 2));
  } catch (err) {
    // ignore write errors on read-only filesystems
  }
}

// in-memory cache for serverless containers
let _imsPolicyCache: any = null;

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      if (_imsPolicyCache) return res.status(200).json(_imsPolicyCache);
      try {
        const data = fs.readFileSync(IMS_POLICY_FILE, "utf-8");
        const parsed = JSON.parse(data);
        _imsPolicyCache = parsed;
        return res.status(200).json(parsed);
      } catch (err) {
        // try tmp fallback
        const tmpPath = path.join(os.tmpdir(), path.basename(IMS_POLICY_FILE));
        const data = fs.readFileSync(tmpPath, "utf-8");
        const parsed = JSON.parse(data);
        _imsPolicyCache = parsed;
        return res.status(200).json(parsed);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to read IMS Policy" });
    }
  } else if (req.method === "PUT") {
    try {
      const policyData = req.body;
      if (!policyData || typeof policyData !== "object") {
        return res.status(400).json({ error: "Invalid IMS policy payload" });
      }
      try {
        fs.writeFileSync(IMS_POLICY_FILE, JSON.stringify(policyData, null, 2));
      } catch (writeErr: any) {
        if (writeErr && (writeErr.code === "EROFS" || /read-only/i.test(String(writeErr)))) {
          const tmpPath = path.join(os.tmpdir(), path.basename(IMS_POLICY_FILE));
          fs.writeFileSync(tmpPath, JSON.stringify(policyData, null, 2));
          _imsPolicyCache = policyData;
          return res.status(200).json({ success: true, ephemeral: true, note: `Saved to tmp (${tmpPath})` });
        }
        throw writeErr;
      }
      _imsPolicyCache = policyData;
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("api/ims-policy PUT error:", error);
      res.status(500).json({ error: "Failed to save IMS Policy", detail: String(error) });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}