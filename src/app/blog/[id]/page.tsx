import BlogPost from "@/pages/BlogPost";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hyves Blog Article | Cooperative Finance Insights",
  description:
    "Read Hyves articles about cooperative finance, savings and loan management, digital operations, and financial technology for cooperatives.",
  path: "/blog",
  keywords: ["cooperative finance article", "cooperative management insights", "Hyves blog"],
});

export default BlogPost;
