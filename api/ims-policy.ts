import fs from "fs";
import path from "path";

const IMS_POLICY_FILE = path.join(process.cwd(), "ims-policy.json");

// Ensure the file exists
try {
  fs.accessSync(IMS_POLICY_FILE);
} catch {
  fs.writeFileSync(IMS_POLICY_FILE, JSON.stringify({
    commitment: "",
    qualityObjectives: [],
    informationSecurity: [],
    healthSafety: [],
    compliance: "",
    continuousImprovement: []
  }, null, 2));
}

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(IMS_POLICY_FILE, "utf-8");
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read IMS Policy" });
    }
  } else if (req.method === "PUT") {
    try {
      const policyData = req.body;
      if (!policyData || typeof policyData !== "object") {
        return res.status(400).json({ error: "Invalid IMS policy payload" });
      }
      fs.writeFileSync(IMS_POLICY_FILE, JSON.stringify(policyData, null, 2));
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("api/ims-policy PUT error:", error);
      res.status(500).json({ error: "Failed to save IMS Policy", detail: String(error) });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}