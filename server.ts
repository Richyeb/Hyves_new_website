import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_FILE = path.join(__dirname, "blog-posts.json");
const ROLES_FILE = path.join(__dirname, "roles.json");

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
