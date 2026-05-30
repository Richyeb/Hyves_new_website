import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_FILE = path.join(__dirname, "blog-posts.json");
const ROLES_FILE = path.join(__dirname, "roles.json");
const IMS_POLICY_FILE = path.join(__dirname, "ims-policy.json");
const WHISTLEBLOWER_POLICY_FILE = path.join(__dirname, "whistleblower-policy.json");
const TERMS_POLICY_FILE = path.join(__dirname, "terms-of-service-policy.json");
const PRIVACY_POLICY_FILE = path.join(__dirname, "privacy-policy.json");

// In-memory fallbacks for environments with read-only filesystems (serverless)
let _imsPolicyCache: any = null;
let _whistleblowerCache: any = null;
let _termsPolicyCache: any = null;
let _privacyPolicyCache: any = null;

async function ensureFiles() {
  try {
    await fs.access(BLOG_FILE);
  } catch {
    await fs.writeFile(BLOG_FILE, JSON.stringify([]));
  }
  try {
    await fs.access(ROLES_FILE);
  } catch {
    await fs.writeFile(ROLES_FILE, JSON.stringify([]));
  }
  try {
    await fs.access(IMS_POLICY_FILE);
  } catch {
    await fs.writeFile(IMS_POLICY_FILE, JSON.stringify({
      commitment: "",
      qualityObjectives: [],
      informationSecurity: [],
      healthSafety: [],
      compliance: "",
      continuousImprovement: []
    }));
  }
  try {
    await fs.access(WHISTLEBLOWER_POLICY_FILE);
  } catch {
    await fs.writeFile(WHISTLEBLOWER_POLICY_FILE, JSON.stringify({
      content: ""
    }));
  }
  try {
    await fs.access(TERMS_POLICY_FILE);
  } catch {
    await fs.writeFile(TERMS_POLICY_FILE, JSON.stringify({
      content: ""
    }));
  }
  try {
    await fs.access(PRIVACY_POLICY_FILE);
  } catch {
    await fs.writeFile(PRIVACY_POLICY_FILE, JSON.stringify({
      content: ""
    }));
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  await ensureFiles();

  app.use(express.json());

  // API Routes
  app.get("/api/posts", async (req, res) => {
    try {
      const data = await fs.readFile(BLOG_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read posts" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const { title, content, author, date, excerpt, image } = req.body;
      const data = await fs.readFile(BLOG_FILE, "utf-8");
      const posts = JSON.parse(data);
      
      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        author,
        date: date || new Date().toISOString(),
        excerpt,
        image: image || `https://picsum.photos/seed/${Date.now()}/800/400`
      };
      
      posts.unshift(newPost);
      await fs.writeFile(BLOG_FILE, JSON.stringify(posts, null, 2));
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to save post" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await fs.readFile(BLOG_FILE, "utf-8");
      let posts = JSON.parse(data);
      posts = posts.filter((p: any) => p.id !== id);
      await fs.writeFile(BLOG_FILE, JSON.stringify(posts, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Roles API
  app.get("/api/roles", async (req, res) => {
    try {
      const data = await fs.readFile(ROLES_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read roles" });
    }
  });

  app.post("/api/roles", async (req, res) => {
    try {
      const { title, department, location, type, description } = req.body;
      const data = await fs.readFile(ROLES_FILE, "utf-8");
      const roles = JSON.parse(data);
      
      const newRole = {
        id: Date.now().toString(),
        title,
        department,
        location,
        type,
        description,
        date: new Date().toISOString()
      };
      
      roles.unshift(newRole);
      await fs.writeFile(ROLES_FILE, JSON.stringify(roles, null, 2));
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: "Failed to save role" });
    }
  });

  app.delete("/api/roles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await fs.readFile(ROLES_FILE, "utf-8");
      let roles = JSON.parse(data);
      roles = roles.filter((r: any) => r.id !== id);
      await fs.writeFile(ROLES_FILE, JSON.stringify(roles, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete role" });
    }
  });

  // IMS Policy API
  app.get("/api/ims-policy", async (req, res) => {
    try {
      // Prefer in-memory cache if present
      if (_imsPolicyCache) return res.json(_imsPolicyCache);

      try {
        const data = await fs.readFile(IMS_POLICY_FILE, "utf-8");
        const parsed = JSON.parse(data);
        _imsPolicyCache = parsed;
        return res.json(parsed);
      } catch (err) {
        // try tmp fallback
        const tmpPath = path.join(os.tmpdir(), path.basename(IMS_POLICY_FILE));
        try {
          const data = await fs.readFile(tmpPath, "utf-8");
          const parsed = JSON.parse(data);
          _imsPolicyCache = parsed;
          return res.json(parsed);
        } catch (err2) {
          throw err; // original
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to read IMS Policy" });
    }
  });

  app.put("/api/ims-policy", async (req, res) => {
    try {
      const policyData = req.body;
      if (!policyData || typeof policyData !== "object") {
        return res.status(400).json({ error: "Invalid IMS policy payload" });
      }
      // ensure directory exists (defensive)
      await fs.mkdir(path.dirname(IMS_POLICY_FILE), { recursive: true }).catch(() => {});
      try {
        await fs.writeFile(IMS_POLICY_FILE, JSON.stringify(policyData, null, 2));
      } catch (writeErr: any) {
        // If filesystem is read-only on serverless, fall back to tmp dir and memory cache
        if (writeErr && (writeErr.code === "EROFS" || /read-only/i.test(String(writeErr)))) {
          const tmpPath = path.join(os.tmpdir(), path.basename(IMS_POLICY_FILE));
          await fs.writeFile(tmpPath, JSON.stringify(policyData, null, 2));
          _imsPolicyCache = policyData;
          return res.json({ success: true, ephemeral: true, note: `Saved to tmp (${tmpPath})` });
        }
        throw writeErr;
      }
      _imsPolicyCache = policyData;
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving IMS policy:", error);
      res.status(500).json({ error: "Failed to save IMS Policy", detail: String(error) });
    }
  });

  app.get("/api/whistleblower-policy", async (req, res) => {
    try {
      if (_whistleblowerCache) return res.json(_whistleblowerCache);
      try {
        const data = await fs.readFile(WHISTLEBLOWER_POLICY_FILE, "utf-8");
        const parsed = JSON.parse(data);
        _whistleblowerCache = parsed;
        return res.json(parsed);
      } catch (err) {
        const tmpPath = path.join(os.tmpdir(), path.basename(WHISTLEBLOWER_POLICY_FILE));
        const data = await fs.readFile(tmpPath, "utf-8");
        const parsed = JSON.parse(data);
        _whistleblowerCache = parsed;
        return res.json(parsed);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to read Whistleblower Policy" });
    }
  });

  app.put("/api/whistleblower-policy", async (req, res) => {
    try {
      const policyData = req.body;
      if (!policyData || typeof policyData !== "object" || typeof policyData.content !== "string") {
        return res.status(400).json({ error: "Invalid whistleblower payload" });
      }
      await fs.mkdir(path.dirname(WHISTLEBLOWER_POLICY_FILE), { recursive: true }).catch(() => {});
      try {
        await fs.writeFile(WHISTLEBLOWER_POLICY_FILE, JSON.stringify(policyData, null, 2));
      } catch (writeErr: any) {
        if (writeErr && (writeErr.code === "EROFS" || /read-only/i.test(String(writeErr)))) {
          const tmpPath = path.join(os.tmpdir(), path.basename(WHISTLEBLOWER_POLICY_FILE));
          await fs.writeFile(tmpPath, JSON.stringify(policyData, null, 2));
          _whistleblowerCache = policyData;
          return res.json({ success: true, ephemeral: true, note: `Saved to tmp (${tmpPath})` });
        }
        throw writeErr;
      }
      _whistleblowerCache = policyData;
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving Whistleblower policy:", error);
      res.status(500).json({ error: "Failed to save Whistleblower Policy", detail: String(error) });
    }
  });

  app.get("/api/terms-of-service-policy", async (req, res) => {
    try {
      if (_termsPolicyCache) return res.json(_termsPolicyCache);
      try {
        const data = await fs.readFile(TERMS_POLICY_FILE, "utf-8");
        const parsed = JSON.parse(data);
        _termsPolicyCache = parsed;
        return res.json(parsed);
      } catch (err) {
        const tmpPath = path.join(os.tmpdir(), path.basename(TERMS_POLICY_FILE));
        try {
          const data = await fs.readFile(tmpPath, "utf-8");
          const parsed = JSON.parse(data);
          _termsPolicyCache = parsed;
          return res.json(parsed);
        } catch {
          return res.json({ content: "" });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to read Terms of Service Policy" });
    }
  });

  app.put("/api/terms-of-service-policy", async (req, res) => {
    try {
      const policyData = req.body;
      if (!policyData || typeof policyData !== "object" || typeof policyData.content !== "string") {
        return res.status(400).json({ error: "Invalid Terms of Service payload" });
      }
      await fs.mkdir(path.dirname(TERMS_POLICY_FILE), { recursive: true }).catch(() => {});
      try {
        await fs.writeFile(TERMS_POLICY_FILE, JSON.stringify(policyData, null, 2));
      } catch (writeErr: any) {
        if (writeErr && (writeErr.code === "EROFS" || /read-only/i.test(String(writeErr)))) {
          const tmpPath = path.join(os.tmpdir(), path.basename(TERMS_POLICY_FILE));
          await fs.writeFile(tmpPath, JSON.stringify(policyData, null, 2));
          _termsPolicyCache = policyData;
          return res.json({ success: true, ephemeral: true, note: `Saved to tmp (${tmpPath})` });
        }
        throw writeErr;
      }
      _termsPolicyCache = policyData;
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving Terms of Service policy:", error);
      res.status(500).json({ error: "Failed to save Terms of Service Policy", detail: String(error) });
    }
  });

  app.get("/api/privacy-policy", async (req, res) => {
    try {
      if (_privacyPolicyCache) return res.json(_privacyPolicyCache);
      try {
        const data = await fs.readFile(PRIVACY_POLICY_FILE, "utf-8");
        const parsed = JSON.parse(data);
        _privacyPolicyCache = parsed;
        return res.json(parsed);
      } catch (err) {
        const tmpPath = path.join(os.tmpdir(), path.basename(PRIVACY_POLICY_FILE));
        try {
          const data = await fs.readFile(tmpPath, "utf-8");
          const parsed = JSON.parse(data);
          _privacyPolicyCache = parsed;
          return res.json(parsed);
        } catch {
          return res.json({ content: "" });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to read Privacy Policy" });
    }
  });

  app.put("/api/privacy-policy", async (req, res) => {
    try {
      const policyData = req.body;
      if (!policyData || typeof policyData !== "object" || typeof policyData.content !== "string") {
        return res.status(400).json({ error: "Invalid Privacy Policy payload" });
      }
      await fs.mkdir(path.dirname(PRIVACY_POLICY_FILE), { recursive: true }).catch(() => {});
      try {
        await fs.writeFile(PRIVACY_POLICY_FILE, JSON.stringify(policyData, null, 2));
      } catch (writeErr: any) {
        if (writeErr && (writeErr.code === "EROFS" || /read-only/i.test(String(writeErr)))) {
          const tmpPath = path.join(os.tmpdir(), path.basename(PRIVACY_POLICY_FILE));
          await fs.writeFile(tmpPath, JSON.stringify(policyData, null, 2));
          _privacyPolicyCache = policyData;
          return res.json({ success: true, ephemeral: true, note: `Saved to tmp (${tmpPath})` });
        }
        throw writeErr;
      }
      _privacyPolicyCache = policyData;
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving Privacy policy:", error);
      res.status(500).json({ error: "Failed to save Privacy Policy", detail: String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
