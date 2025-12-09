import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle2, 
  Loader2, 
  Globe, 
  Building2,
  Signal,
  Wifi,
  Battery
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreateAccount() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/create-account/:currency");
  const currency = params?.currency || "EUR";
  
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate API call to generate account
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getAccountDetails = () => {
    if (currency === "GBP") {
      return {
        title: "British Pound Account",
        symbol: "£",
        details: [
          { label: "Account Holder", value: "John Doe" },
          { label: "Account Number", value: "12345678" },
          { label: "Sort Code", value: "04-00-04" },
          { label: "IBAN", value: "GB89 NWBK 6016 1331 9268 19" },
          { label: "Bank Name", value: "TruePay UK Ltd." },
          { label: "Address", value: "123 Finance Street, London, UK" }
        ]
      };
    }
    return {
      title: "Euro Account",
      symbol: "€",
      details: [
        { label: "Account Holder", value: "John Doe" },
        { label: "IBAN", value: "LT89 3780 0000 0012 3456" },
        { label: "BIC / SWIFT", value: "TRPALT21" },
        { label: "Bank Name", value: "TruePay Europe UAB" },
        { label: "Address", value: "Konstitucijos pr. 21B, Vilnius, Lithuania" }
      ]
    };
  };

  const account = getAccountDetails();

  return (
    <div className="h-full w-full bg-obsidian-shiny text-foreground font-sans select-none overflow-hidden relative flex flex-col pb-8">
      
      {/* iOS Status Bar */}
      <div className="sticky top-0 z-[60] bg-black/80 backdrop-blur-md text-white px-6 pt-3 pb-2 flex justify-between items-center text-xs font-medium border-b border-white/5">
        <div className="w-[80px] text-center font-semibold text-[15px] tracking-tight">{currentTime}</div>
        <div className="flex items-center gap-1.5">
          <Signal className="w-4 h-4 fill-current" />
          <Wifi className="w-4 h-4" strokeWidth={2.5} />
          <div className="relative">
            <Battery className="w-[22px] h-[11px] text-white/40" />
            <div className="absolute top-[2px] left-[2px] w-[16px] h-[7px] bg-white rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-muted-foreground hover:text-white"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">New Account</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 flex flex-col items-center">
        
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Generating {currency} Account</h3>
              <p className="text-sm text-muted-foreground">Verifying details with banking partners...</p>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(129,140,248,0.3)] mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">{account.title}</h2>
              <p className="text-muted-foreground text-sm max-w-[280px] mx-auto">
                Your account is ready. You can now receive transfers in {currency}.
              </p>
            </div>

            <Card className="bg-[#1c1c1e] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
              {account.details.map((item, index) => (
                <div key={index} className="p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</div>
                    <div className="text-sm font-medium text-white font-mono">{item.value}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-white opacity-50 group-hover:opacity-100"
                    onClick={() => handleCopy(item.value, item.label)}
                  >
                    {copiedField === item.label ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </Card>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Account Active</h4>
                <p className="text-xs text-muted-foreground">
                  This account is fully active and connected to the SEPA (Euro) / Faster Payments (GBP) network. Transfers usually arrive within minutes.
                </p>
              </div>
            </div>

            <Button 
              className="w-full h-12 bg-white text-black hover:bg-gray-100 font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              onClick={() => setLocation("/")}
            >
              Done
            </Button>

          </div>
        )}
      </main>
    </div>
  );
}