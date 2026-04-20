import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const countryCodes = [
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+233", country: "Ghana" },
  { code: "+225", country: "Ivory Coast" },
  { code: "+221", country: "Senegal" },
  { code: "+237", country: "Cameroon" },
  { code: "+254", country: "Kenya" },
  { code: "+256", country: "Uganda" },
  { code: "+251", country: "Ethiopia" },
  { code: "+20", country: "Egypt" },
  { code: "+27", country: "South Africa" },
];

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: `${formData.get("countryCode")} ${formData.get("phone")}`,
      request: formData.get("request"),
    };

    // Create mailto link
    const subject = encodeURIComponent("Contact Us Form Submission");
    const body = encodeURIComponent(
      `Full Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nRequest:\n${data.request}`
    );
    window.location.href = `mailto:info@hyves.ng?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-hyves-black mb-4">Contact Us</h1>
            <p className="text-lg text-slate-600">Have questions? We are here to help.</p>
          </motion.div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName"
                  placeholder="John Doe" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-3">
                  <select 
                    name="countryCode"
                    className="h-10 rounded-lg border border-slate-200 px-3 bg-transparent text-sm focus:ring-2 focus:ring-hyves-gold outline-none"
                    required
                  >
                    {countryCodes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code} ({item.country})
                      </option>
                    ))}
                  </select>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    className="flex-1"
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="request">Your Request</Label>
                <textarea 
                  id="request" 
                  name="request"
                  className="w-full min-h-[150px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-hyves-gold outline-none text-base"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-hyves-gold text-hyves-black font-bold h-12 rounded-xl hover:bg-hyves-gold/90"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
