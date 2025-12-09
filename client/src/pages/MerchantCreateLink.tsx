import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Signal,
  Wifi,
  Battery,
  Link,
  Upload,
  Check,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MerchantCreateLink() {
  const [location, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
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
            <h1 className="text-lg font-bold tracking-tight">Create Payment Link</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between px-8 mb-4">
            <div className={cn("w-3 h-3 rounded-full transition-colors", step >= 1 ? "bg-primary" : "bg-white/20")} />
            <div className={cn("flex-1 h-0.5 mx-2 transition-colors", step >= 2 ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-3 h-3 rounded-full transition-colors", step >= 2 ? "bg-primary" : "bg-white/20")} />
            <div className={cn("flex-1 h-0.5 mx-2 transition-colors", step >= 3 ? "bg-primary" : "bg-white/10")} />
            <div className={cn("w-3 h-3 rounded-full transition-colors", step >= 3 ? "bg-primary" : "bg-white/20")} />
        </div>

        {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-white ml-1">Product Name</label>
                    <Input 
                        placeholder="e.g. Premium Consultation" 
                        className="bg-card/30 border-white/10 h-12 text-white focus-visible:ring-primary/50 rounded-xl"
                    />
                </div>
                
                <div className="space-y-4">
                    <label className="text-sm font-medium text-white ml-1">Price</label>
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
                    <label className="text-sm font-medium text-white ml-1">Description (Optional)</label>
                    <textarea 
                        className="w-full bg-card/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-[100px] text-sm resize-none placeholder:text-muted-foreground"
                        placeholder="What are you selling?"
                    />
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-white ml-1">Product Image</label>
                    <div className="border-2 border-dashed border-white/10 rounded-2xl h-48 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-white">Tap to upload image</span>
                    </div>
                </div>

                 <div className="space-y-4">
                    <label className="text-sm font-medium text-white ml-1">Redirect URL (Optional)</label>
                    <Input 
                        placeholder="https://your-site.com/thank-you" 
                        className="bg-card/30 border-white/10 h-12 text-white focus-visible:ring-primary/50 rounded-xl"
                    />
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-8 animate-in fade-in zoom-in-95">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Check className="w-10 h-10 text-green-500" strokeWidth={3} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Link Created!</h2>
                    <p className="text-muted-foreground">Your payment link is ready to share.</p>
                </div>
                
                <div className="w-full bg-card/30 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Link className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                        <div className="text-xs text-muted-foreground">Payment Link</div>
                        <div className="text-sm text-primary font-medium truncate">truepay.cc/pay/premium-consultation</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">Copy</Button>
                </div>
            </div>
        )}

      </main>

      {/* Footer Actions */}
      <div className="p-6">
        <Button 
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(129,140,248,0.4)]"
            onClick={() => {
                if (step < 3) setStep(step + 1);
                else setLocation("/merchant");
            }}
        >
            {step === 3 ? "Done" : "Continue"} <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>

    </div>
  );
}