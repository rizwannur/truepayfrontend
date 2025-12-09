import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Signal,
  Wifi,
  Battery,
  Gift,
  Copy,
  Share2,
  Users,
  DollarSign,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Referral() {
  const [location, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("truepay.cc/r/johndoe");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full w-full bg-obsidian-shiny text-foreground pb-8 font-sans select-none overflow-hidden relative flex flex-col">
      
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
        <h1 className="text-lg font-bold tracking-tight">Refer & Earn</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 relative">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />

        {/* Hero Section */}
        <div className="relative text-center space-y-4 pt-4">
            <div className="relative inline-block">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(129,140,248,0.5)] animate-pulse">
                    <Gift className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-yellow-200">
                    $50 FREE
                </div>
            </div>
            
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]">
                    Invite Friends, <br /> Get <span className="text-primary">$50</span>
                </h2>
                <p className="text-muted-foreground text-sm max-w-[280px] mx-auto">
                    Earn $50 for every friend who joins TruePay and adds $50 to their account.
                </p>
            </div>
        </div>

        {/* Referral Link Card */}
        <Card className="bg-card/40 border-white/10 p-1 rounded-2xl backdrop-blur-md shadow-xl overflow-hidden group">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-center justify-between gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex-1 min-w-0 z-10">
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Your Invite Link</div>
                    <div className="text-sm font-mono text-white truncate">truepay.cc/r/johndoe</div>
                </div>
                
                <Button 
                    size="sm" 
                    className={cn(
                        "h-9 px-4 font-medium transition-all z-10",
                        copied ? "bg-green-500 text-white" : "bg-white text-black hover:bg-white/90"
                    )}
                    onClick={handleCopy}
                >
                    {copied ? <span className="flex items-center gap-1">Copied <CheckCircle2 className="w-3 h-3" /></span> : "Copy"}
                </Button>
            </div>
            <div className="grid grid-cols-2 divide-x divide-white/5 border-t border-white/5">
                <button className="p-3 flex items-center justify-center gap-2 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="p-3 flex items-center justify-center gap-2 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                    <Users className="w-4 h-4" /> Contacts
                </button>
            </div>
        </Card>

        {/* How it works */}
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider ml-1">How it works</h3>
            <div className="relative space-y-6 pl-4 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                <div className="relative flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <Share2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="pt-1">
                        <div className="font-bold text-white text-sm">Share your link</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Send your unique link to friends via message or social media.</div>
                    </div>
                </div>
                
                <div className="relative flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <DollarSign className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="pt-1">
                        <div className="font-bold text-white text-sm">Friend deposits $50</div>
                        <div className="text-xs text-muted-foreground mt-0.5">They must sign up and add at least $50 to their account.</div>
                    </div>
                </div>

                <div className="relative flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="pt-1">
                        <div className="font-bold text-white text-sm">You both get $50</div>
                        <div className="text-xs text-muted-foreground mt-0.5">The reward is instantly credited to both of your accounts.</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
            <Card className="bg-card/30 border-white/5 p-4 rounded-xl space-y-1">
                <div className="text-[10px] text-muted-foreground font-medium uppercase">Friends Invited</div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-[10px] text-green-400 font-medium">3 pending</div>
            </Card>
            <Card className="bg-card/30 border-white/5 p-4 rounded-xl space-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <div className="text-[10px] text-muted-foreground font-medium uppercase relative z-10">Total Earned</div>
                <div className="text-2xl font-bold text-white relative z-10">$450</div>
                <div className="text-[10px] text-green-400 font-medium relative z-10">+$50 this week</div>
            </Card>
        </div>

      </main>

      {/* Footer CTA */}
      <div className="p-6">
        <Button className="w-full h-12 bg-white hover:bg-white/90 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
            Invite Contacts <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

    </div>
  );
}