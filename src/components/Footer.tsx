import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1">
            <Logo className="mb-6" />
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              The end-to-end ERP system powering digital transformation for modern cooperatives in Nigeria.
            </p>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-hyves-gold hover:border-hyves-gold transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-hyves-gold hover:border-hyves-gold transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-hyves-gold hover:border-hyves-gold transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-hyves-gold hover:border-hyves-gold transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-2 bg-hyves-black text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors w-fit">
                <div className="w-5 h-5">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5,12c0,0.5-0.1,1-0.3,1.5c-0.5,1.4-1.8,2.5-3.4,2.5c-1.6,0-2.9-1.1-3.4-2.5c-0.2-0.5-0.3-1-0.3-1.5s0.1-1,0.3-1.5 c0.5-1.4,1.8-2.5,3.4-2.5c1.6,0,2.9,1.1,3.4,2.5C17.4,11,17.5,11.5,17.5,12z M21.4,12c0-5.2-4.2-9.4-9.4-9.4S2.6,6.8,2.6,12 s4.2,9.4,9.4,9.4S21.4,17.2,21.4,12z M13.8,17.5c-2.4,0-4.4-1.6-5.1-3.8c-0.3-0.8-0.4-1.7-0.4-2.6s0.1-1.8,0.4-2.6 c0.7-2.2,2.7-3.8,5.1-3.8c2.4,0,4.4,1.6,5.1,3.8c0.3,0.8,0.4,1.7,0.4,2.6s-0.1,1.8-0.4,2.6C18.2,15.9,16.2,17.5,13.8,17.5z"/></svg>
                </div>
                <div className="text-[10px] leading-tight">
                  <span className="block text-slate-400">Download on the</span>
                  <span className="block font-bold text-sm">App Store</span>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-hyves-black text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors w-fit">
                <div className="w-5 h-5">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.9,3.4,2.5,4,2.5c0.2,0,0.3,0,0.5,0.1l15,8.5c0.5,0.3,0.6,0.9,0.4,1.4c-0.1,0.1-0.2,0.2-0.4,0.4l-15,8.5 c-0.5,0.3-1.1,0.1-1.4-0.4C3,20.8,3,20.7,3,20.5z M5,17.8l9.8-5.6L5,6.6V17.8z"/></svg>
                </div>
                <div className="text-[10px] leading-tight">
                  <span className="block text-slate-400">GET IT ON</span>
                  <span className="block font-bold text-sm">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-hyves-black mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/product" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">Features</Link></li>
              <li><Link to="/contact" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-hyves-black mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">About Us</Link></li>
              <li><Link to="/about" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">Team</Link></li>
              <li><Link to="/about" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">Culture</Link></li>
              <li><Link to="/about" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">Join our team</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-hyves-black mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">Whistleblower policy</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">IMS policy</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">Information Security Policy</a></li>
              <li><Link to="/blog" className="text-slate-500 text-sm hover:text-hyves-gold transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-hyves-black mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-500 text-sm">
                <Mail className="w-4 h-4 text-hyves-gold" />
                hello@hyves.ng
              </li>
              <li className="flex items-center gap-3 text-slate-500 text-sm">
                <Phone className="w-4 h-4 text-hyves-gold" />
                +2347058789944
              </li>
              <li className="flex items-start gap-3 text-slate-500 text-sm">
                <MapPin className="w-4 h-4 text-hyves-gold mt-1" />
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Hyves Technology Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 text-xs hover:text-hyves-gold">Terms of Service</a>
            <a href="#" className="text-slate-400 text-xs hover:text-hyves-gold">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
