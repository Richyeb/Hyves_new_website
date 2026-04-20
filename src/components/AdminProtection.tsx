import { useState } from "react";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminProtectionProps {
  children: React.ReactNode;
}

export default function AdminProtection({ children }: AdminProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // In production, use environment variable or secure method
  const ADMIN_PASSWORD = "hyvesadmin2024";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="pt-32 pb-20 bg-hyves-bg min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-hyves-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-hyves-gold" />
              </div>
              <h1 className="text-2xl font-bold text-hyves-black">Admin Access</h1>
              <p className="text-slate-500 mt-2">Enter your password to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm">Incorrect password. Please try again.</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-hyves-black hover:bg-hyves-black/90 text-white font-bold h-12"
              >
                Access Dashboard
              </Button>
            </form>

            <p className="text-center text-slate-400 text-sm mt-6">
              Contact your administrator if you forgot your password.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}