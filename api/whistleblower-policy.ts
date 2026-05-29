import fs from "fs";
import path from "path";

const WHISTLEBLOWER_POLICY_FILE = path.join(process.cwd(), "whistleblower-policy.json");

try {
  fs.accessSync(WHISTLEBLOWER_POLICY_FILE);
} catch {
  fs.writeFileSync(
    WHISTLEBLOWER_POLICY_FILE,
    JSON.stringify({ content: "" }, null, 2)
  );
}

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(WHISTLEBLOWER_POLICY_FILE, "utf-8");
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read Whistleblower Policy" });
    }
  } else if (req.method === "PUT") {
    try {
      const policyData = req.body;
      if (!policyData || typeof policyData !== "object" || typeof policyData.content !== "string") {
        return res.status(400).json({ error: "Invalid whistleblower payload" });
      }
      fs.writeFileSync(WHISTLEBLOWER_POLICY_FILE, JSON.stringify(policyData, null, 2));
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("api/whistleblower-policy PUT error:", error);
      res.status(500).json({ error: "Failed to save Whistleblower Policy", detail: String(error) });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
