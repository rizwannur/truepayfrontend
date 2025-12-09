import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Signal,
  Wifi,
  Battery,
  RefreshCw,
  Check,
  ChevronRight,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MerchantCreateSubscription() {
  const [location, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [interval, setInterval] = useState("monthly");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-muted-foreground hover:text-white"
                onClick={() => setLocation("/merchant")}
            >
                <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-bold tracking-tight">Create Subscription</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
        
        <div className="space-y-4">
            <label className="text-sm font-medium text-white ml-1">Plan Name</label>
            <Input 
                placeholder="e.g. Pro Monthly" 
                className="bg-card/30 border-white/10 h-12 text-white focus-visible:ring-primary/50 rounded-xl"
            />
        </div>
        
        <div className="space-y-4">
            <label className="text-sm font-medium text-white ml-1">Billing Interval</label>
            <div className="grid grid-cols-3 gap-2">
                {["weekly", "monthly", "yearly"].map((i) => (
                    <button 
                        key={i}
                        className={cn(
                            "py-3 rounded-xl border text-sm font-medium capitalize transition-all",
                            interval === i 
                                ? "bg-primary/20 border-primary text-primary shadow-sm" 
                                : "bg-card/30 border-white/5 text-muted-foreground hover:bg-white/5"
                        )}
                        onClick={() => setInterval(i)}
                    >
                        {i}
                    </button>
                ))}
            </div>
        </div>

        <div className="space-y-4">
            <label className="text-sm font-medium text-white ml-1">Recurring Price</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</div>
                <Input 
                    type="number"
                    placeholder="0.00" 
                    className="bg-card/30 border-white/10 h-12 pl-8 text-white focus-visible:ring-primary/50 rounded-xl"
                />
            </div>
        </div>

        <div className="space-y-4">
            <label className="text-sm font-medium text-white ml-1">Trial Period (Days)</label>
            <Input 
                type="number"
                placeholder="0" 
                className="bg-card/30 border-white/10 h-12 text-white focus-visible:ring-primary/50 rounded-xl"
            />
        </div>

      </main>

      {/* Footer Actions */}
      <div className="p-6">
        <Button 
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(129,140,248,0.4)]"
            onClick={() => setLocation("/merchant")}
        >
            Create Subscription <Check className="w-5 h-5 ml-2" />
        </Button>
      </div>

    </div>
  );
}