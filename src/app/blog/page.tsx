import Blog from "@/pages/Blog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hyves Blog | Cooperative Finance, Savings & Digital Transformation",
  description:
    "Read Hyves insights on cooperative finance, savings and loan operations, digital transformation, member management, and financial inclusion.",
  path: "/blog",
  keywords: ["cooperative finance blog", "cooperative savings insights", "financial inclusion Nigeria"],
});

export default Blog;
