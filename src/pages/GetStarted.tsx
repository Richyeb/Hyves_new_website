import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GetStarted() {
  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-hyves-black mb-8">Get Started with Hyves</h1>
            <p className="text-lg text-slate-600">Fill in your details and our sales team will reach out to you.</p>
          </motion.div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coop-name">Cooperative Name</Label>
                  <Input id="coop-name" placeholder="My Cooperative" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input id="contact-person" placeholder="Jane Doe" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="jane@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+234 ..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="members">Number of Members</Label>
                <Input id="members" type="number" placeholder="e.g. 500" />
              </div>
              <Button className="w-full bg-hyves-gold text-hyves-black font-bold h-12 rounded-xl hover:bg-hyves-gold/90">
                Submit Interest
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
