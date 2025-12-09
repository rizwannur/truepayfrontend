import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Signal,
  Wifi,
  Battery,
  User,
  Check,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SendAmount() {
  const [location, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  
  // Get type from URL or default to fiat
  const searchParams = new URLSearchParams(window.location.search);
  const type = searchParams.get("type") || "fiat";
  const isCrypto = type === "crypto";
  const currency = isCrypto ? "BTC" : "USD";
  const symbol = isCrypto ? "₿" : "$";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSend = () => {
    // In a real app, this would process the transaction
    // For mockup, we can just go back or show a success state
    // Let's just go back to home for now to close the loop
    setLocation("/");
  };

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

      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-muted-foreground hover:text-white"
          onClick={() => setLocation("/send")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">Send {currency}</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col">
        
        {/* Recipient Input */}
        <div className="bg-card/30 border border-white/10 rounded-xl p-4 mb-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-1">To</label>
                <Input 
                    placeholder="Name, @username, or address" 
                    className="bg-transparent border-none h-6 p-0 text-white placeholder:text-white/30 focus-visible:ring-0 font-medium"
                />
            </div>
            <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                <ChevronRight className="w-5 h-5" />
            </Button>
        </div>

        {/* Amount Input */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8">
            <div className="flex items-center justify-center gap-1">
                <span className="text-4xl font-bold text-white/50">{symbol}</span>
                <Input 
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent border-none text-6xl font-bold text-white placeholder:text-white/20 text-center w-[200px] p-0 focus-visible:ring-0 h-auto"
                    autoFocus
                />
            </div>
            <div className="text-sm text-muted-foreground mt-2 bg-white/5 px-3 py-1 rounded-full">
                Balance: {isCrypto ? "0.45 BTC" : "$5,240.50"}
            </div>
        </div>

        {/* Note Input */}
        <div className="bg-card/30 border border-white/10 rounded-xl p-4 mb-6">
            <Input 
                placeholder="Add a note (optional)" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-transparent border-none p-0 text-white placeholder:text-white/30 focus-visible:ring-0 text-sm"
            />
        </div>

        {/* Transaction Details */}
        <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="text-white font-medium">{isCrypto ? "0.0001 BTC" : "$0.00"}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Arrival Time</span>
                <span className="text-white font-medium">Instant</span>
            </div>
        </div>

      </main>

      {/* Confirmation Slider/Button */}
      <div className="px-6 pb-2">
        <Button 
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_20px_rgba(129,140,248,0.4)] rounded-2xl flex items-center justify-between px-2 pl-6 group overflow-hidden relative"
            onClick={handleSend}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="tracking-wide">Confirm & Send</span>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ArrowRight className="w-6 h-6" />
            </div>
        </Button>
      </div>

    </div>
  );
}