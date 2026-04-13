/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import GetStarted from "@/pages/GetStarted";
import Blog from "@/pages/Blog";
import BlogAdmin from "@/pages/BlogAdmin";
import Careers from "@/pages/Careers";
import BlogPost from "@/pages/BlogPost";
import Product from "@/pages/Product";
import Process from "@/pages/Process";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen font-sans selection:bg-hyves-gold/30 selection:text-hyves-black">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/how-it-works" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog/admin" element={<BlogAdmin />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

