import About from "@/pages/About";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Hyves | Digital Infrastructure for Modern Cooperatives",
  description:
    "Learn about Hyves, the Nigerian financial technology company helping cooperatives digitize operations, member management, savings, and access to finance.",
  path: "/about",
  keywords: ["about Hyves", "cooperative technology company", "fintech for cooperatives"],
});

export default About;
