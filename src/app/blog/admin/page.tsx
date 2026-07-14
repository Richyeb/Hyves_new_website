import BlogAdmin from "@/pages/BlogAdmin";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hyves Content Admin",
  description: "Private Hyves content management area.",
  path: "/blog/admin",
  noIndex: true,
});

export default BlogAdmin;
