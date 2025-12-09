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

          {/* Digital Wallets */}
          <div className="space-y-3">
             <label className="text-sm font-medium text-muted-foreground ml-1">Digital Wallets</label>
             <div className="grid grid-cols-1 gap-3">
                <Button className="w-full h-12 bg-black hover:bg-black/80 text-white border border-white/10 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <svg viewBox="0 0 384 512" className="w-4 h-4 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                   <span className="font-semibold">Add to Apple Wallet</span>
                </Button>
                
                <Button className="w-full h-12 bg-white hover:bg-gray-100 text-black border border-transparent rounded-xl flex items-center justify-center gap-2 relative overflow-hidden">
                   <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24-1.19-2.24z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                   <span className="font-semibold">Add to Google Pay</span>
                </Button>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}