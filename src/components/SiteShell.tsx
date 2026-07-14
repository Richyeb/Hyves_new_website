"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans selection:bg-hyves-gold/30 selection:text-hyves-black">
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
