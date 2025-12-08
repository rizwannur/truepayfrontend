import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Wifi, 
  Smartphone, 
  Globe, 
  CreditCard as SwipeIcon,
  Wallet,
  Check,
  Signal,
  Battery
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CardManage() {
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  
  // State for card management
  const [isFrozen, setIsFrozen] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [spendingLimit, setSpendingLimit] = useState([5000]);
  const [cardLabel, setCardLabel] = useState("My Obsidian Card");
  
  // Toggles
  const [onlineTx, setOnlineTx] = useState(true);
  const [swipeTx, setSwipeTx] = useState(true);
  const [contactlessTx, setContactlessTx] = useState(true);
  
  // Funding source
  const [fundingSource, setFundingSource] = useState("main"); // main, savings, crypto

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">Manage Card</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        
        {/* Card Visual */}
        <div className="flex justify-center py-2">
            <div className="relative h-[200px] w-[320px] rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_40px_-10px_rgba(129,140,248,0.4)] overflow-hidden group transition-transform duration-500 hover:scale-[1.02]">
               {/* Matte Finish Texture */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
               
               {/* Frozen Overlay */}
               {isFrozen && (
                 <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-[2px] z-20 flex items-center justify-center border-2 border-blue-400/30 rounded-2xl">
                   <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/50 flex items-center gap-2">
                     <Lock className="w-4 h-4 text-blue-400" />
                     <span className="text-sm font-bold text-blue-100">CARD FROZEN</span>
                   </div>
                 </div>
               )}

               <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <div className="font-bold text-xl tracking-wider text-white/90">TRUEPAY</div>
                  <div className="text-xs font-semibold tracking-widest text-white/50">OBSIDIAN</div>
               </div>
               
               <div className="absolute top-20 left-6 w-12 h-8 rounded bg-gradient-to-br from-yellow-200 to-yellow-600 opacity-80" />
               
               <div className="absolute bottom-6 left-6 space-y-1">
                 <div className="text-lg font-mono tracking-widest text-white/80 flex items-center gap-2">
                   <span>••••</span><span>••••</span><span>••••</span><span>8842</span>
                 </div>
                 <div className="text-xs font-medium text-white/50 tracking-wider">JOHN DOE</div>
               </div>
               
               <div className="absolute bottom-6 right-6">
                 <div className="flex flex-col items-end">
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/80 mix-blend-screen" />
                      <div className="w-8 h-8 rounded-full bg-yellow-500/80 mix-blend-screen" />
                    </div>
                 </div>
               </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className={cn(
              "h-14 flex flex-col gap-1 border-white/10 hover:bg-white/5 hover:text-white", 
              isFrozen ? "bg-blue-500/10 border-blue-500/50 text-blue-400" : "bg-card/50"
            )}
            onClick={() => setIsFrozen(!isFrozen)}
          >
            {isFrozen ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            <span className="text-xs font-medium">{isFrozen ? "Unfreeze Card" : "Freeze Card"}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-14 flex flex-col gap-1 bg-card/50 border-white/10 hover:bg-white/5 hover:text-white"
            onClick={() => setShowPin(!showPin)}
          >
            {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span className="text-xs font-medium">{showPin ? "Hide PIN" : "View PIN"}</span>
          </Button>
        </div>

        {showPin && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center animate-in fade-in slide-in-from-top-2">
            <p className="text-xs text-muted-foreground mb-1">Your Card PIN</p>
            <div className="text-3xl font-mono font-bold text-white tracking-[1em] pl-4">8492</div>
            <p className="text-[10px] text-muted-foreground mt-2">Never share your PIN with anyone</p>
          </div>
        )}

        {/* Settings Sections */}
        <div className="space-y-6">
          
          {/* Label Card */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground ml-1">Card Label</label>
            <Input 
              value={cardLabel} 
              onChange={(e) => setCardLabel(e.target.value)}
              className="bg-card/50 border-white/10 h-12 text-white focus-visible:ring-primary/50"
            />
          </div>

          {/* Spending Limit */}
          <div className="space-y-4 bg-card/30 rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white">Monthly Spending Limit</label>
              <span className="text-primary font-bold">${spendingLimit[0].toLocaleString()}</span>
            </div>
            <Slider 
              value={spendingLimit} 
              onValueChange={setSpendingLimit} 
              max={20000} 
              step={100}
              className="py-2"
            />
            <p className="text-[10px] text-muted-foreground">Adjust your monthly spending limit for security.</p>
          </div>

          {/* Funding Source */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground ml-1">Spending Source</label>
            <div className="grid grid-cols-1 gap-2">
              <div 
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all",
                  fundingSource === "main" ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_-5px_rgba(129,140,248,0.3)]" : "bg-card/30 border-white/5 hover:bg-white/5"
                )}
                onClick={() => setFundingSource("main")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Main Account (USD)</div>
                    <div className="text-xs text-muted-foreground">$5,240.50 Available</div>
                  </div>
                </div>
                {fundingSource === "main" && <Check className="w-5 h-5 text-primary" />}
              </div>

              <div 
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all",
                  fundingSource === "crypto" ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_-5px_rgba(129,140,248,0.3)]" : "bg-card/30 border-white/5 hover:bg-white/5"
                )}
                onClick={() => setFundingSource("crypto")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-orange-500">BTC</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Bitcoin Wallet</div>
                    <div className="text-xs text-muted-foreground">0.45 BTC Available</div>
                  </div>
                </div>
                {fundingSource === "crypto" && <Check className="w-5 h-5 text-primary" />}
              </div>
            </div>
          </div>

          {/* Security Controls */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground ml-1">Security & Permissions</label>
            <div className="bg-card/30 rounded-xl border border-white/5 overflow-hidden divide-y divide-white/5">
              
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Online Transactions</div>
                    <div className="text-[10px] text-muted-foreground">Allow payments on websites</div>
                  </div>
                </div>
                <Switch checked={onlineTx} onCheckedChange={setOnlineTx} />
              </div>

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <SwipeIcon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Swipe Payments</div>
                    <div className="text-[10px] text-muted-foreground">Allow magnetic stripe usage</div>
                  </div>
                </div>
                <Switch checked={swipeTx} onCheckedChange={setSwipeTx} />
              </div>

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Wifi className="w-4 h-4 text-green-400 rotate-90" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Contactless Payments</div>
                    <div className="text-[10px] text-muted-foreground">Allow NFC/Tap to Pay</div>
                  </div>
                </div>
                <Switch checked={contactlessTx} onCheckedChange={setContactlessTx} />
              </div>

            </div>
          </div>

          {/* Linked Wallets */}
          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground ml-1">Linked Digital Wallets</label>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-primary hover:text-primary/80">Add New</Button>
             </div>
             <div className="bg-card/30 rounded-xl p-4 border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                   <svg viewBox="0 0 24 24" className="w-6 h-6" fill="black"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </div>
                <div>
                   <div className="text-sm font-medium text-white">Apple Pay</div>
                   <div className="text-[10px] text-green-400 flex items-center gap-1">
                     <Check className="w-3 h-3" /> Active on iPhone 15 Pro
                   </div>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}