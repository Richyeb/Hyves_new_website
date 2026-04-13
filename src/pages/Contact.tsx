import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Contact() {
  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-hyves-black mb-8">Contact Us</h1>
            <p className="text-lg text-slate-600">Have questions? We are here to help.</p>
          </motion.div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea 
                  id="message" 
                  className="w-full min-h-[150px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <Button className="w-full bg-hyves-gold text-hyves-black font-bold h-12 rounded-xl hover:bg-hyves-gold/90">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
